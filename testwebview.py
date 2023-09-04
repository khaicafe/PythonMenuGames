import os
import sys
import threading
import time

from PyQt5 import QtCore, QtWidgets
from PyQt5.QtCore import Qt
# from PyQt4.QtWebKit import QWebSettings
from PyQt5.QtWidgets import QApplication, QVBoxLayout, QWidget
from PyQt5.QtCore import QUrl, QEventLoop
from PyQt5.QtWebEngineWidgets import QWebEngineProfile, QWebEngineView
from pyftpdlib.authorizers import DummyAuthorizer
from pyftpdlib.handlers import FTPHandler
from pyftpdlib.servers import FTPServer

# QtWidgets.QApplication.setAttribute(QtCore.Qt.AA_EnableHighDpiScaling, True)
try:
    from ctypes import windll  # Only exists on Windows.
    myappid = "mycompany.myproduct.subproduct.version"
    windll.shell32.SetCurrentProcessExplicitAppUserModelID(myappid)
except ImportError:
    pass


import PySimpleGUI as sg
import pyWinhook
import pythoncom

# layout=[[sg.Button('Exit')]]

def blockKeys(event):
    if event.Key.lower() in ['lwin', 'tab', 'lmenu']:
        return False    # block these keys
    else:
        # return True to pass the event to other handlers
        return True

def releaseKeys(event):
    return True
# window = sg.Window('Window Title', layout, return_keyboard_events=True , finalize=True)
hm = pyWinhook.HookManager()
hm.MouseAll = releaseKeys
hm.KeyAll = blockKeys
hm.HookMouse()
hm.HookKeyboard()
# pythoncom.PumpMessages()
# while True:
#     event,values = window.read()
#     print(event,values)
#
#     if event =='Exit':
#         hm = pyWinhook.HookManager()
#         hm.MouseAll = releaseKeys
#         hm.KeyAll = releaseKeys
#         hm.HookMouse()
#         hm.HookKeyboard()
#         # pythoncom.PumpMessages()
#         break;
#
# window.close()

class WebPage(QWebEngineView):
    def __init__(self):
        QWebEngineView.__init__(self)
        self.setFixedSize(1780, 1030)

        self.setWindowFlags(Qt.WindowStaysOnTopHint)
        self.setAttribute(Qt.WA_ShowWithoutActivating)
        # self.showFullScreen()

        self.profile = QWebEngineProfile.defaultProfile()
        self.profile.cookieStore().deleteAllCookies()  # 初次运行软件时删除所有cookies
        self.load(QUrl("http://127.0.0.1:8100/login-order"))
        self.loadFinished.connect(self._on_load_finished)
        self.page().profile().downloadRequested.connect(
            self.on_downloadRequested
        )

    def _on_load_finished(self):
        print("Finished Loading")
        self.page().toHtml(self.Callable)
        # self.page().settings().setAttribute(QWebSettings.JavascriptCanOpenWindows, True)
        path = os.getcwd()
        # self.settings().setUserStyleSheetUrl(QUrl.fromLocalFile(path +'/templates/assets/css/style_main.css'))

    def Callable(self, html_str):
        self.html = html_str
        # getElementById, getElementsByName

        self.page().runJavaScript("document.getElementById('username').value = 'test'")
        self.page().runJavaScript("document.getElementById('password').value = 'test'")
        self.page().runJavaScript ("document.getElementById('_login').click()")

    @QtCore.pyqtSlot("QWebEngineDownloadItem*")
    def on_downloadRequested(self, download):
        old_path = download.url().path()  # download.path()
        suffix = QtCore.QFileInfo(old_path).suffix()
        path, _ = QtWidgets.QFileDialog.getSaveFileName(
            self, "Save File", old_path, "*.xlsx" + suffix
        )
        if path:
            download.setPath(path)
            download.accept()

# from ftplib import FTP
#
# # connect to FTP server
# client = FTP(host="127.0.0.1")
# client.login()

# list the contents of directory
# client.retrlines('LIST')

if __name__ == "__main__":
    try:
        app = QApplication(sys.argv)
        # app.setAttribute(QtCore.Qt.AA_UseSoftwareOpenGL, True)
        web = WebPage()
        web.show()

        sys.exit(app.exec_())
    except:
        # os.execv(sys.executable, ['python'] + sys.argv)
        pass
    #   # only need one app, one running event loop

