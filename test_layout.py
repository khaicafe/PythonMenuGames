# import sys
# from PyQt5.QtWidgets import (QWidget, QPushButton,
#                              QHBoxLayout, QVBoxLayout, QApplication)
#
#
# class Example(QWidget):
#
#     def __init__(self):
#         super().__init__()
#
#         self.initUI()
#
#     def initUI(self):
#
#         okButton = QPushButton("OK")
#         cancelButton = QPushButton("Cancel")
#
#         hbox = QHBoxLayout()
#         hbox.addStretch(1)
#         hbox.addWidget(okButton)
#         hbox.addWidget(cancelButton)
#
#         vbox = QVBoxLayout()
#         vbox.addStretch(1)
#         vbox.addLayout(hbox)
#
#         self.setLayout(vbox)
#
#         self.setGeometry(300, 300, 300, 150)
#         self.setWindowTitle('Buttons')
#         self.show()
#
#
# def main():
#     app = QApplication(sys.argv)
#     ex = Example()
#     sys.exit(app.exec_())

#
# if __name__ == '__main__':
#     main()

from win32api import CloseHandle, GetLastError, SetConsoleCtrlHandler
import os
import sys
import time

import win32serviceutil
import win32service
import win32event
import servicemanager

import traceback



class AppServerSvc (win32serviceutil.ServiceFramework):
    _svc_name_ = "test"
    _svc_display_name_ = "test"

    def __init__(self,args):
        win32serviceutil.ServiceFramework.__init__(self,args)
        SetConsoleCtrlHandler(lambda x: True, True)
        self.hWaitStop = win32event.CreateEvent(None,0,0,None)




    def SvcStop(self):
        self.ReportServiceStatus(win32service.SERVICE_STOP_PENDING)
        win32event.SetEvent(self.hWaitStop)
        self.run = False
    def SvcDoRun(self):

        servicemanager.LogMsg(servicemanager.EVENTLOG_INFORMATION_TYPE,
                              servicemanager.PYS_SERVICE_STARTED,
                              (self._svc_name_,''))
        self.run = True
        try: # try main
            self.main()
        except:
            servicemanager.LogErrorMsg(traceback.format_exc()) # if error print it to event log
            os._exit(-1)#return some value other than 0 to os so that service knows to restart


    def main(self):

        while self.run == True:
            time.sleep(30)
            t = 1/0

if __name__ == '__main__':
    win32serviceutil.HandleCommandLine(AppServerSvc)