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
if ($key -match '[^\x21-\x7E]') {
  throw 'The pasted value contains masked/non-ASCII characters (the dashboard placeholder bullets). In Supabase: click the EYE icon on the key to REVEAL it first, then copy the revealed value (or use the copy button AFTER revealing).'
}

$peek = $key.Substring(0, [Math]::Min(14, $key.Length))
Write-Host ("    received {0} chars, starting '{1}...'" -f $key.Length, $peek)

Write-Host '1/2 validating against the entitlements table...'
$uri = 'https://nbactbfxqslzehzbgetp.supabase.co/rest/v1/entitlements?select=user_id&limit=1'
$ok = $false
# IMPORTANT: Supabase REJECTS secret keys from browser-looking clients (401) so
# they can't be shipped client-side. PowerShell's default User-Agent starts with
# Mozilla/5.0 -- so every request must declare a non-browser agent.
$UA = 'elementum-backup-setup'
# Variant A: apikey header only (new sb_secret_ keys are NOT JWTs).
try {
  Invoke-RestMethod -Uri $uri -UserAgent $UA -Headers @{ apikey = $key } | Out-Null
  $ok = $true; Write-Host '    valid (apikey-only variant).'
} catch {
  $codeA = try { [int]$_.Exception.Response.StatusCode } catch { '?' }
  Write-Host ("    variant A (apikey only): HTTP {0}" -f $codeA)
}
# Variant B: apikey + Bearer (the shape the workers use).
if (-not $ok) {
  try {
    Invoke-RestMethod -Uri $uri -UserAgent $UA -Headers @{ apikey = $key; Authorization = "Bearer $key" } | Out-Null
    $ok = $true; Write-Host '    valid (apikey+Bearer variant).'
  } catch {
    $codeB = try { [int]$_.Exception.Response.StatusCode } catch { '?' }
    Write-Host ("    variant B (apikey+Bearer): HTTP {0}" -f $codeB)
  }
}
if (-not $ok) { throw 'Key FAILED validation on both variants - nothing was saved. Report the two HTTP codes + char count above.' }

Write-Host '2/2 saving as user environment variable...'
[Environment]::SetEnvironmentVariable('ELEMENTUM_SUPABASE_SERVICE_KEY', $key, 'User')
Write-Host 'Done. NOTE: already-open terminals do not see new env vars - the'
Write-Host 'scheduled task will; for a manual test run, open a FRESH terminal:'
Write-Host '  node Elementum_App\tools\backup-customer-data.mjs'
