import sys
import time

from PyQt5 import QtCore, QtWidgets, QtWebEngineWidgets
from PyQt5.QtCore import Qt, QByteArray, QSize, QRect, QThreadPool
from PyQt5.QtGui import QMovie, QRegion
from PyQt5.QtWidgets import QDialog, QGraphicsDropShadowEffect, QLabel, QDialogButtonBox, QFormLayout, QGroupBox, \
    QVBoxLayout, QMainWindow, QDesktopWidget

from PyQt5.QtCore import QThread, pyqtSignal
from PyQt5.QtWidgets import (QApplication, QDialog,
                             QProgressBar, QPushButton)
from PyQt5.uic.Compiler.qtproxies import QtGui

TIME_LIMIT = 100

class External(QThread):
    """
    Runs a counter thread.
    """
    countChanged = pyqtSignal(int)

    def run(self):
        count = 0
        while count < TIME_LIMIT:
            count +=1
            time.sleep(1)
            self.countChanged.emit(count)

class Actions(QDialog):
    """
    Simple dialog that consists of a Progress Bar and a Button.
    Clicking on the button results in the start of a timer and
    updates the progress bar.
    """
    def __init__(self, value=0):
        super().__init__()
        self.initUI()

    def initUI(self):
        self.setWindowTitle('Progress Bar')
        self.progress = QProgressBar(self)
        self.progress.setGeometry(0, 0, 300, 25)
        self.progress.setMaximum(100)
        self.button = QPushButton('Start', self)
        self.button.move(0, 30)
        # self.show()


        self.button.clicked.connect(self.onButtonClick)

    def onButtonClick(self):
        self.calc = External()
        self.calc.countChanged.connect(self.onCountChanged)
        self.calc.start()

    def onCountChanged(self, value):
        self.progress.setValue(value)




class Widget(QtWidgets.QWidget):
    def __init__(self):
        super(Widget, self).__init__()
        lay = QtWidgets.QVBoxLayout(self)
        self.browser = QtWebEngineWidgets.QWebEngineView()
        lay.addWidget(self.browser)
        self.browser.setUrl(QtCore.QUrl("https://www.youtube.com"))
        self.browser.loadStarted.connect(self.loadStartedHandler)
        self.browser.loadProgress.connect(self.loadProgressHandler)
        self.browser.loadFinished.connect(self.loadFinishedHandler)


        self.progress = QProgressBar(self)
        self.progress.setAlignment(QtCore.Qt.AlignCenter)
        # self.progress.setGeometry(0, 0, 300, 25)
        self.progress.setMaximum(100)
        # self.window = Actions()
        # window.show()

    @QtCore.pyqtSlot()
    def loadStartedHandler(self):
        print(time.time(), ": load started")
        self.progress.show()

    @QtCore.pyqtSlot(int)
    def loadProgressHandler(self, prog):
        print(time.time(), ":load progress", prog)
        self.progress.setValue(prog)
        if prog == 100:
            self.progress.hide()

    @QtCore.pyqtSlot()
    def loadFinishedHandler(self):
        print(time.time(), ": load finished")
        self.progress.hide()



import asyncio
from typing import Dict, List
from fastapi import WebSocket

# notice: active_connections is changed to a dict (key= ws_token), so we know which user listens to which model
class ConnectionManager:

    def __init__(self):
        self.active_connections: Dict[str, List[WebSocket]] = {}

    async def connect(self, websocket: WebSocket, ws_token: str):
        await websocket.accept()
        if ws_token in self.active_connections:
            self.active_connections.get(ws_token).append(websocket)
        else:
            self.active_connections.update({ws_token: [websocket]})

    def disconnect(self, websocket: WebSocket, ws_token: str):
        self.active_connections.get(ws_token).remove(websocket)
        if (len(self.active_connections.get(ws_token)) == 0):
            self.active_connections.pop(ws_token)

    # notice: changed from async to sync as background tasks messes up with async functions
    def send_message(self, data: dict, ws_token: str):
        sockets = self.active_connections.get(ws_token)
        if sockets:
            # notice: socket send is originally async. We have to change it to syncronous code -
            loop = asyncio.new_event_loop()
            asyncio.set_event_loop(loop)

            for socket in sockets:
                socket.send_text
                loop.run_until_complete(socket.send_json(data))

socket_connections = ConnectionManager()



if __name__ == '__main__':
    app = QtWidgets.QApplication(sys.argv)

    view = Widget()
    view.show()

    sys.exit(app.exec_())
    pass

