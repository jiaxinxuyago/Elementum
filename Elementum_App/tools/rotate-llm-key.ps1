# -----------------------------------------------------------------------------
# rotate-llm-key.ps1 -- rotate the elementum-llm worker's ANTHROPIC_API_KEY
# -----------------------------------------------------------------------------
# Automates every rotation step that CAN be automated (key creation/revocation
# are console-only by Anthropic's design -- deliberately, so nothing on this
# machine can mint keys). Full procedure (~60 seconds):
#
#   1. console.anthropic.com -> API Keys -> Create Key (no expiration) -> copy
#   2. powershell -ExecutionPolicy Bypass -File tools/rotate-llm-key.ps1
#      (Bypass is required -- Windows blocks .ps1 by default; applies to this
#       invocation only. Paste at the hidden prompt: in a CLASSIC PowerShell
#       window paste is RIGHT-CLICK, not Ctrl+V.)
#   3. console.anthropic.com -> disable the OLD key
#   4. send the consultant one message = proof-of-life
#
# The hidden prompt keeps the key out of chat transcripts, shell history, and
# files -- the failure mode this script exists to prevent.
# Ops doctrine (DOC10 section 4.3): rotation is EVENT-driven (exposure /
# offboarding / annual hygiene), not scheduled -- the $50/mo kill-switch
# bounds idle risk. This file is deliberately ASCII-only: PowerShell 5.1
# misreads BOM-less UTF-8 and turns fancy characters into mojibake.
# -----------------------------------------------------------------------------
$ErrorActionPreference = 'Stop'
Set-Location (Join-Path $PSScriptRoot '..')   # Elementum_App root (wrangler config paths)

Write-Host 'Paste the NEW Anthropic API key below. Input is HIDDEN - nothing'
Write-Host 'will appear as you paste. Classic console: paste = RIGHT-CLICK.'
$sec = Read-Host 'New key' -AsSecureString
$key = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
  [Runtime.InteropServices.Marshal]::SecureStringToBSTR($sec))
$key = if ($key) { $key.Trim() } else { '' }

if ($key.Length -eq 0) {
  throw 'Received EMPTY input - the paste did not register. In a classic PowerShell window use RIGHT-CLICK to paste, then press Enter.'
}
if (-not $key.StartsWith('sk-ant-')) {
  $peek = $key.Substring(0, [Math]::Min(5, $key.Length))
  throw "Received $($key.Length) characters starting '$peek...' - not an Anthropic key (expected sk-ant-...). Re-copy from the console and retry."
}

Write-Host '1/3 validating the key against the API...'
$body = '{"model":"claude-sonnet-5","max_tokens":1,"messages":[{"role":"user","content":"ping"}]}'
try {
  $r = Invoke-RestMethod -Uri 'https://api.anthropic.com/v1/messages' -Method Post `
    -Headers @{ 'x-api-key' = $key; 'anthropic-version' = '2023-06-01' } `
    -ContentType 'application/json' -Body $body
} catch { throw "Key FAILED validation - nothing was changed. ($($_.Exception.Message))" }
Write-Host "    valid (responding model: $($r.model))"

Write-Host '2/3 installing on the elementum-llm worker...'
$key | npx wrangler secret put ANTHROPIC_API_KEY --config workers/llm/wrangler.jsonc
if ($LASTEXITCODE -ne 0) { throw 'wrangler secret put failed - the worker still has the previous key.' }

Write-Host '3/3 done. Remaining MANUAL steps:'
Write-Host '    - console.anthropic.com -> API Keys -> disable the OLD key'
Write-Host '    - send the consultant one message on elementum.life (proof-of-life)'
