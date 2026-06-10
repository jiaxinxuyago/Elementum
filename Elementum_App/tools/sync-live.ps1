# ===================================================================
# ELEMENTUM - live-demo sync (Claude Code Stop hook)
# ===================================================================
# Keeps https://elementum.jiaxinxuyago.workers.dev in step with the local
# app. Fingerprints the app tree (committed state + uncommitted tracked
# diffs + untracked file listing); when it differs from the last deployed
# fingerprint, rebuilds and redeploys. No-ops in well under a second when
# nothing changed, so it is safe to run on every turn end.
# Manual run:  powershell -File tools/sync-live.ps1   (from anywhere)
# Log:         %TEMP%\elementum-live-sync\deploy.log  (last run only)
# ===================================================================
$ErrorActionPreference = 'Continue'
$app = 'D:\Elementum\Elementum_Project\Elementum_App'
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
    Write-Output '{"systemMessage":"Live demo synced -> https://elementum.jiaxinxuyago.workers.dev"}'
} finally {
    Remove-Item $lock -Force -ErrorAction SilentlyContinue
}
