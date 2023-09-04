import os
import subprocess
import sys
import win32serviceutil
import win32service
import win32event
import servicemanager
import socket

module_path = sys.argv[0]
module_file = os.path.splitext(os.path.abspath(module_path))[0] + '.exe'
class AppServerSvc (win32serviceutil.ServiceFramework):
    _svc_name_ = 'MenuGames'
    _svc_display_name_ = 'KLMenu@2022'
    _svc_description_ = 'KLMenu@2022'
    _exe_name_ = module_file
    _app_exe_name_ = "Client-monitor.exe"

    def __init__(self,args):
        win32serviceutil.ServiceFramework.__init__(self,args)
        self.hWaitStop = win32event.CreateEvent(None,0,0,None)
        socket.setdefaulttimeout(60)

    def SvcStop(self):
        self.ReportServiceStatus(win32service.SERVICE_STOP_PENDING)
        os.system(f"TASKKILL /F /IM {self._app_exe_name_}")
        win32event.SetEvent(self.hWaitStop)

    def SvcDoRun(self):
        servicemanager.LogMsg(servicemanager.EVENTLOG_INFORMATION_TYPE,
                          servicemanager.PYS_SERVICE_STARTED,
                          (self._svc_name_,''))
        self.main()

    def main(self):
        # Your business logic or call to any class should be here
        # this time it creates a text.txt and writes Test Service in a daily manner

        if getattr(sys, 'frozen', False):
            application_path = os.path.dirname(sys.executable)
        elif __file__:
            application_path = os.path.dirname(__file__)
        self.p = subprocess.call(self._app_exe_name_, cwd=application_path)


if __name__ == '__main__':
    if len(sys.argv) == 1:
        servicemanager.Initialize()
        servicemanager.PrepareToHostSingle(AppServerSvc)
        servicemanager.StartServiceCtrlDispatcher()
    else:
        win32serviceutil.HandleCommandLine(AppServerSvc)