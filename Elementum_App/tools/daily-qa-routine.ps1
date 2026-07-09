# ===================================================================
# ELEMENTUM - daily QA routine (Windows Task Scheduler, ~09:00 daily)
# ===================================================================
# Runs the full automated QA stack with zero token cost and reports
# only when something is wrong:
#   1. Engine golden-fixture regression   (tools/qa-engine-regression.mjs)
#   2. Route sweep, all screens x 3 sizes (tools/qa-route-sweep.mjs;
#      reuses a live dev server on :5173, else starts its own on :5199)
#   3. Live-site + worker health          (elementum.life, push, webhook)
#   4. Git hygiene                        (drift vs origin/main, dirty
#      tree, leftover failure sentinels)
#
# Output -> tools/qa-output/daily-routine/latest.md (report, every run)
# Failure -> DAILY_QA_FAILED.md at the project root (untracked sentinel;
#            surfaces in the next session's branch-hygiene preflight)
#            + a Windows balloon notification.
#
# Register (once):
#   schtasks /Create /F /SC DAILY /ST 08:57 /TN "Elementum Daily QA" ^
#     /TR "powershell -NoProfile -ExecutionPolicy Bypass -File D:\Elementum\Elementum_Project\Elementum_App\tools\daily-qa-routine.ps1"
# Manual run:  powershell -File tools/daily-qa-routine.ps1
# ===================================================================
$ErrorActionPreference = 'Continue'
$app  = 'D:\Elementum\Elementum_Project\Elementum_App'
$root = 'D:\Elementum\Elementum_Project'
$outDir = Join-Path $app 'tools\qa-output\daily-routine'
New-Item -ItemType Directory -Force $outDir | Out-Null
$reportPath = Join-Path $outDir 'latest.md'
$sentinel   = Join-Path $root 'DAILY_QA_FAILED.md'
$findings = @()
$sections = @()
Set-Location $app

# -- 1. Engine regression -------------------------------------------
$engOut = cmd /c "node tools\qa-engine-regression.mjs 2>&1"
if ($LASTEXITCODE -ne 0) { $findings += "Engine regression check failed (exit $LASTEXITCODE)" }
$sections += "## 1 - Engine regression (exit $LASTEXITCODE)`n``````text`n$($engOut -join "`n")`n``````"

# -- 2. Route sweep ---------------------------------------------------
# Self-heal: the pinned browser must exist on the REAL filesystem — dev
# sessions install into a sandbox overlay this scheduled context cannot
# see (2026-07-08 incident). Idempotent: no-op when already present.
cmd /c "npx playwright install chromium >nul 2>&1"
$base = 'http://localhost:5173/'
$started = $null
$serverOk = $false
try { $serverOk = (Invoke-WebRequest -Uri $base -UseBasicParsing -TimeoutSec 5).StatusCode -eq 200 } catch { $serverOk = $false }
if (-not $serverOk) {
    $base = 'http://localhost:5199/'
    $started = Start-Process cmd -ArgumentList '/c', 'npx vite --port 5199' -WorkingDirectory $app -WindowStyle Hidden -PassThru
    $deadline = (Get-Date).AddSeconds(90)
    while ((Get-Date) -lt $deadline) {
        try { if ((Invoke-WebRequest -Uri $base -UseBasicParsing -TimeoutSec 3).StatusCode -eq 200) { $serverOk = $true; break } } catch {}
        Start-Sleep 2
    }
}
if ($serverOk) {
    $env:QA_BASE = $base
    $swOut = cmd /c "node tools\qa-route-sweep.mjs 2>&1"
    $sweepExit = $LASTEXITCODE
    $rep = Join-Path $app 'tools\qa-output\route-sweep\latest\report.json'
    if (($sweepExit -ne 0) -or (-not (Test-Path $rep))) {
        $findings += "Route sweep failed to run (exit $sweepExit)"
        $sections += "## 2 - Route sweep FAILED (exit $sweepExit)`n``````text`n$(($swOut | Select-Object -Last 25) -join "`n")`n``````"
    } else {
        $flags = (Get-Content $rep -Raw | ConvertFrom-Json).summary.flagged
        $bad = $flags.PSObject.Properties | Where-Object { $_.Value -gt 0 }
        if ($bad) {
            $flagStr = ($bad | ForEach-Object { "$($_.Name)=$($_.Value)" }) -join ', '
            $findings += "Route sweep flagged cells: $flagStr"
            $sections += "## 2 - Route sweep: FLAGS ($flagStr)`nTriage: open a Claude session and say `"run the QA sweep`" (the qa-sweep agent verifies each flag against screenshots). Report: $rep"
        } else {
            $sections += '## 2 - Route sweep: clean (all flag categories 0)'
        }
    }

    # -- 2b. Journey sweep (REAL user interactions - runbook 2c) ------
    # Onboarding wheel-drags through to the golden-pillar assertion +
    # the reading journeys (dissolve, energy cycling, tabs, drill-downs).
    $jOut = cmd /c "node tools\qa-journey-sweep.mjs 2>&1"
    $jExit = $LASTEXITCODE
    if ($jExit -ne 0) {
        $findings += "Journey sweep failed (exit $jExit)"
        $sections += "## 2b - Journey sweep FAILED (exit $jExit)`n``````text`n$(($jOut | Select-Object -Last 20) -join "`n")`n``````"
    } else {
        $jSummary = ($jOut | Select-String 'SUMMARY' | Select-Object -Last 1)
        $sections += "## 2b - Journey sweep: clean ($jSummary)"
    }
} else {
    $findings += 'Route sweep skipped: could not reach or start a dev server'
    $sections += '## 2 - Route sweep SKIPPED (no dev server)'
    $sections += '## 2b - Journey sweep SKIPPED (no dev server)'
}
if ($started) { cmd /c "taskkill /PID $($started.Id) /T /F >nul 2>&1" }

# -- 3. Live-site + worker health -------------------------------------
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$health = @()
function Get-ProbeStatus($url, $method, $body) {
    try {
        if ($method -eq 'Post') { $r = Invoke-WebRequest -Uri $url -Method Post -Body $body -ContentType 'application/json' -UseBasicParsing -TimeoutSec 25 }
        else { $r = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 25 }
        return @{ code = [int]$r.StatusCode; body = $r.Content }
    } catch {
        $resp = $_.Exception.Response
        if ($resp) { return @{ code = [int]$resp.StatusCode; body = '' } }
        return @{ code = -1; body = $_.Exception.Message }
    }
}
$site = Get-ProbeStatus 'https://elementum.life' 'Get' $null
if (($site.code -ne 200) -or ($site.body -notmatch '<div id="root">')) { $findings += "Live site unhealthy (HTTP $($site.code))" }
$health += "elementum.life -> HTTP $($site.code), app root present: $($site.body -match '<div id=""root"">')"
$push = Get-ProbeStatus 'https://elementum-push.jiaxinxuyago.workers.dev/' 'Get' $null
if (($push.code -ne 200) -or ($push.body -notmatch 'elementum-push')) { $findings += "Push worker unhealthy (HTTP $($push.code))" }
$health += "push worker -> HTTP $($push.code)"
# Webhook: unsigned POST must be REJECTED with a 4xx (signature check working).
# 2xx would mean signature verification is broken; 5xx/timeout means it's down.
$wh = Get-ProbeStatus 'https://elementum-stripe-webhook.jiaxinxuyago.workers.dev' 'Post' '{}'
if (($wh.code -lt 400) -or ($wh.code -ge 500)) { $findings += "Stripe webhook worker unexpected response (HTTP $($wh.code); expected 4xx for unsigned POST)" }
$health += "stripe-webhook worker -> HTTP $($wh.code) for unsigned POST (4xx expected)"
$sections += "## 3 - Live health`n" + (($health | ForEach-Object { "- $_" }) -join "`n")

# -- 4. Git hygiene ----------------------------------------------------
git -C $root fetch origin --quiet 2>$null
$dirty = (git -C $root status --short) -join "`n"
$counts = (git -C $root rev-list --left-right --count origin/main...main 2>$null) -join ''
$hyg = @()
if ($dirty) { $hyg += "Uncommitted changes:`n$dirty" }
if ($counts -and ($counts -notmatch '^0\s+0$')) { $hyg += "main vs origin/main (behind/ahead): $counts" }
if (Test-Path (Join-Path $root 'DEPLOY_SMOKE_FAILED.md')) { $hyg += 'DEPLOY_SMOKE_FAILED.md sentinel present (a deploy failed its smoke check)'; $findings += 'Deploy smoke-failure sentinel present' }
if ($hyg) { $sections += "## 4 - Git hygiene (informational)`n" + (($hyg | ForEach-Object { "- $_" }) -join "`n") }
else { $sections += '## 4 - Git hygiene: clean (in sync, no uncommitted changes)' }

# -- Report + alerting -------------------------------------------------
$verdict = if ($findings) { "FINDINGS ($($findings.Count))" } else { 'ALL CLEAN' }
$md = @("# Elementum daily QA - $(Get-Date -Format s) - $verdict", '')
if ($findings) { $md += ($findings | ForEach-Object { "- **$_**" }); $md += '' }
$md += $sections
$md -join "`n" | Out-File $reportPath -Encoding utf8

# Email the report on findings (immediate technical alert; the 2:32 PM triage
# agent emails the plain-English digest on every run). Needs the shared key in
# the ELEMENTUM_REPORT_KEY user env var; skips gracefully without it.
function Send-QaEmail($subject, $bodyText) {
    if (-not $env:ELEMENTUM_REPORT_KEY) { return }
    try {
        Invoke-WebRequest -Uri 'https://elementum-push.jiaxinxuyago.workers.dev/report' -Method Post -UseBasicParsing -TimeoutSec 30 `
            -Headers @{ 'x-report-key' = $env:ELEMENTUM_REPORT_KEY } -ContentType 'application/json' `
            -Body (@{ subject = $subject; text = $bodyText } | ConvertTo-Json) | Out-Null
    } catch {}
}

if ($findings) {
    Send-QaEmail "Elementum daily QA - $verdict" (Get-Content $reportPath -Raw)
    @"
# DAILY QA ROUTINE FOUND PROBLEMS

- **When:** $(Get-Date -Format s)
$(($findings | ForEach-Object { "- $_" }) -join "`n")

Full report: Elementum_App/tools/qa-output/daily-routine/latest.md
Delete this file after triage (it re-appears if a later run fails).
Written by tools/daily-qa-routine.ps1.
"@ | Set-Content $sentinel
    try {
        Add-Type -AssemblyName System.Windows.Forms
        Add-Type -AssemblyName System.Drawing
        $n = New-Object System.Windows.Forms.NotifyIcon
        $n.Icon = [System.Drawing.SystemIcons]::Warning
        $n.Visible = $true
        $n.ShowBalloonTip(15000, 'Elementum daily QA', (($findings | Select-Object -First 3) -join ' | '), [System.Windows.Forms.ToolTipIcon]::Warning)
        Start-Sleep 16
        $n.Dispose()
    } catch {}
} else {
    Remove-Item $sentinel -Force -ErrorAction SilentlyContinue
}
Write-Output "daily QA: $verdict -> $reportPath"
