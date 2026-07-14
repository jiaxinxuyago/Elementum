' ELEMENTUM - windowless launcher for the daily QA routine (Task Scheduler shim).
' Interactive-session tasks open a visible console for their action; a console
' window popping up mid-run gets closed by humans, which kills the run
' (2026-07-08 incident: 0xC000013A). WScript.Shell.Run with window style 0
' runs the same command with NO window, while staying in the interactive
' session (so the failure balloon can still display).
CreateObject("WScript.Shell").Run "cmd /c powershell -NoProfile -ExecutionPolicy Bypass -File ""D:\Elementum\Elementum_Project\Elementum_App\tools\daily-qa-routine.ps1"" > ""C:\Users\NOBOD\AppData\Local\Temp\dq-task.log"" 2>&1", 0, True
