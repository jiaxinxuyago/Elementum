# -----------------------------------------------------------------------------
# setup-backup-key.ps1 -- one-time setup for the customer-data backup routine
# -----------------------------------------------------------------------------
# Stores the Supabase service key as the ELEMENTUM_SUPABASE_SERVICE_KEY user
# environment variable (machine-local, same pattern as ELEMENTUM_REPORT_KEY).
# The hidden prompt keeps the key out of chat transcripts and shell history.
#
# Where to get the key: supabase.com dashboard -> project nbactbfxqslzehzbgetp
# -> Project Settings -> API keys -> the SECRET service key (sb_secret_...).
#
# Run:  powershell -ExecutionPolicy Bypass -File tools/setup-backup-key.ps1
#       (classic PowerShell window: paste = RIGHT-CLICK)
# -----------------------------------------------------------------------------
$ErrorActionPreference = 'Stop'

Write-Host 'Paste the Supabase SECRET service key (sb_secret_...). Input is HIDDEN.'
$sec = Read-Host 'Service key' -AsSecureString
$key = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
  [Runtime.InteropServices.Marshal]::SecureStringToBSTR($sec))
$key = if ($key) { $key.Trim() } else { '' }

if ($key.Length -eq 0) { throw 'Received EMPTY input - paste with RIGHT-CLICK in a classic console, then press Enter.' }
if (-not $key.StartsWith('sb_secret_')) {
  $peek = $key.Substring(0, [Math]::Min(10, $key.Length))
  throw "Received $($key.Length) chars starting '$peek...' - expected an sb_secret_... key. Re-copy from the Supabase dashboard."
}

Write-Host '1/2 validating against the entitlements table...'
try {
  $r = Invoke-RestMethod -Uri 'https://nbactbfxqslzehzbgetp.supabase.co/rest/v1/entitlements?select=user_id&limit=1' `
    -Headers @{ apikey = $key; Authorization = "Bearer $key" }
} catch { throw "Key FAILED validation - nothing was saved. ($($_.Exception.Message))" }
Write-Host '    valid (entitlements table reachable).'

Write-Host '2/2 saving as user environment variable...'
[Environment]::SetEnvironmentVariable('ELEMENTUM_SUPABASE_SERVICE_KEY', $key, 'User')
Write-Host 'Done. NOTE: already-open terminals do not see new env vars - the'
Write-Host 'scheduled task will; for a manual test run, open a FRESH terminal:'
Write-Host '  node Elementum_App\tools\backup-customer-data.mjs'
