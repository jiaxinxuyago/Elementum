' ELEMENTUM - windowless launcher for the customer-data backup (Task Scheduler shim).
' Same pattern as run-daily-qa.vbs: window style 0 = no console flash for a
' human to close mid-run (the 2026-07-08 0xC000013A lesson). Log lands in temp.
CreateObject("WScript.Shell").Run "cmd /c node ""D:\Elementum\Elementum_Project\Elementum_App\tools\backup-customer-data.mjs"" > ""C:\Users\NOBOD\AppData\Local\Temp\customer-backup.log"" 2>&1", 0, True
