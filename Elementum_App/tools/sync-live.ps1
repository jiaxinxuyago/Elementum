# ===================================================================
# ELEMENTUM - live-demo sync (Claude Code Stop hook)
# ===================================================================
# Keeps the live demo (URL in site.config.json) in step with the local
# app. Fingerprints the app tree (committed state + uncommitted tracked
# diffs + untracked file listing); when it differs from the last deployed
# fingerprint, rebuilds and redeploys. No-ops in well under a second when
# nothing changed, so it is safe to run on every turn end.
# Manual run:  powershell -File tools/sync-live.ps1   (from anywhere)
# Log:         %TEMP%\elementum-live-sync\deploy.log  (last run only)
# ===================================================================
$ErrorActionPreference = 'Continue'
$app = 'D:\Elementum\Elementum_Project\Elementum_App'
# Live URL is single-sourced from site.config.json; fall back safely if absent.
$cfgPath = Join-Path $app 'site.config.json'
$liveUrl = if (Test-Path $cfgPath) { (Get-Content $cfgPath -Raw | ConvertFrom-Json).liveUrl } else { 'the live demo' }
$tmp = Join-Path $env:TEMP 'elementum-live-sync'
New-Item -ItemType Directory -Force $tmp | Out-Null
$stamp = Join-Path $tmp 'fingerprint.txt'
$lock  = Join-Path $tmp 'deploy.lock'
$log   = Join-Path $tmp 'deploy.log'

# -- Fingerprint the app tree ---------------------------------------
$head = git -C $app rev-parse 'HEAD:Elementum_App'
if ($LASTEXITCODE -ne 0) { exit 0 }   # not a git repo / detached oddity - do nothing
$diff = (git -C $app diff HEAD -- .) -join "`n"
$untracked = (git -C $app ls-files --others --exclude-standard -- .) | ForEach-Object {
    $fi = Get-Item (Join-Path $app $_) -ErrorAction SilentlyContinue
    if ($fi) { '{0}|{1}|{2}' -f $_, $fi.Length, $fi.LastWriteTimeUtc.Ticks }
}
$material = $head + "`n" + $diff + "`n" + ($untracked -join "`n")
$sha = [BitConverter]::ToString(
    [Security.Cryptography.SHA256]::Create().ComputeHash(
        [Text.Encoding]::UTF8.GetBytes($material))) -replace '-', ''

# -- Gates ----------------------------------------------------------
if ((Test-Path $stamp) -and ((Get-Content $stamp -Raw).Trim() -eq $sha)) { exit 0 }
if ((Test-Path $lock) -and (((Get-Date) - (Get-Item $lock).LastWriteTime).TotalMinutes -lt 15)) { exit 0 }
New-Item -ItemType File -Force $lock | Out-Null

# -- Build + deploy -------------------------------------------------
try {
    Set-Location $app
    "=== sync-live $(Get-Date -Format s) fingerprint $($sha.Substring(0,12)) ===" | Set-Content $log
    cmd /c "npm run build >> `"$log`" 2>&1"
    if ($LASTEXITCODE -ne 0) { Write-Output ('{"systemMessage":"Live-demo sync: BUILD FAILED - see ' + $log.Replace('\', '/') + '"}'); exit 0 }
    cmd /c "npx wrangler deploy >> `"$log`" 2>&1"
    if ($LASTEXITCODE -ne 0) { Write-Output ('{"systemMessage":"Live-demo sync: DEPLOY FAILED (wrangler login expired?) - see ' + $log.Replace('\', '/') + '"}'); exit 0 }
    Set-Content $stamp $sha

    # -- Post-deploy smoke check --------------------------------------
    # Deploy reported success; verify the live site actually serves the
    # app (200 + root div + a built JS asset). On failure: sentinel file
    # at the project root (untracked -> surfaces in git status at the
    # next session's branch-hygiene preflight) + loud systemMessage.
    $sentinel = 'D:\Elementum\Elementum_Project\DEPLOY_SMOKE_FAILED.md'
    function Test-LiveSite {
        try {
            [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
            $r = Invoke-WebRequest -Uri $liveUrl -UseBasicParsing -TimeoutSec 25
            if ($r.StatusCode -ne 200) { return "HTTP $($r.StatusCode) from $liveUrl" }
            if ($r.Content -notmatch '<div id="root">') { return 'HTTP 200 but app root div missing from HTML' }
            if ($r.Content -match 'src="(/assets/[^"]+\.js)"') {
                $asset = $Matches[1]
                $a = Invoke-WebRequest -Uri ($liveUrl.TrimEnd('/') + $asset) -UseBasicParsing -TimeoutSec 25 -Method Head
                if ($a.StatusCode -ne 200) { return "built asset $asset -> HTTP $($a.StatusCode)" }
            }
            return $null
        } catch { return "request failed: $($_.Exception.Message)" }
    }
    $smokeFail = Test-LiveSite
    if ($smokeFail) { Start-Sleep 6; $smokeFail = Test-LiveSite }   # one retry for edge propagation
    if ($smokeFail) {
        $safeFail = $smokeFail -replace '"', "'"
        @"
# DEPLOY SMOKE CHECK FAILED

- **When:** $(Get-Date -Format s)
- **Deploy:** wrangler reported success, but the live site failed verification.
- **Failure:** $smokeFail
- **Check:** $liveUrl  ·  build/deploy log: $($log.Replace('\', '/'))

Delete this file once the live site is verified healthy (it re-appears if a
later deploy fails its smoke check again). Written by tools/sync-live.ps1.
"@ | Set-Content $sentinel
        Write-Output ('{"systemMessage":"Live-demo sync: deployed BUT SMOKE CHECK FAILED - ' + $safeFail + ' (sentinel: DEPLOY_SMOKE_FAILED.md)"}')
    } else {
        Remove-Item $sentinel -Force -ErrorAction SilentlyContinue
        Write-Output ('{"systemMessage":"Live demo synced -> ' + $liveUrl + ' (smoke check passed)"}')
    }
} finally {
    Remove-Item $lock -Force -ErrorAction SilentlyContinue
}
