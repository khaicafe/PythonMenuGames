import asyncio
import base64
import ctypes
# import datetime
import shutil
from datetime import datetime
import os
import socket

import random
import sqlite3
import subprocess
import sys
import threading
import time
import urllib.parse
from urllib.error import URLError
from urllib.request import urlopen

import bs4
import pandas as pd
import win32con
import win32gui
import PIL
from PIL import ImageQt
# from PyQt5.QtSql import QSqlQueryModel
from tqdm import tqdm
from win32process import CREATE_NO_WINDOW
import psutil
import pythoncom
import uvicorn
import json as js
from PyQt5 import QtWidgets, QtCore, QtGui
from PyQt5.QtCore import *
from PyQt5.QtGui import *
from PyQt5.QtWidgets import QMenu, QAction, QTableWidgetItem, QMenuBar, QDialog, QLabel, QSizeGrip, QFileDialog, \
    QSizePolicy, QWidgetAction, QMessageBox, QAbstractItemView, QHeaderView, QTableView, QVBoxLayout, QLineEdit, \
    QDialogButtonBox, QFormLayout, QProgressBar, QGraphicsDropShadowEffect, QGroupBox, QWidget, QSplashScreen, QFrame, \
    QPushButton
from PyQt5.uic import loadUi
import requests
from PIL import Image, ImageGrab
import wmi
import io
from qroundprogressbar import QRoundProgressBar
import atexit
from pathlib import Path
# import requests
import getpass
# import json
import os
import base64
from pathlib import Path

import appdirs
import numpy as np
import pygetwindow as gw

import keyboard
###################### thu vien google #############################ss
import logging
import os
import os.path
from google.auth.transport.requests import Request
from google_auth_oauthlib.flow import InstalledAppFlow
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from googleapiclient.http import MediaIoBaseDownload

########################### ctypes ################################
# requests.packages.urllib3.disable_warnings()

# import ctypes
# ctypes.windll.kernel32.SetConsoleTitleW("Dashboard")
######################## Mở duy nhất 1 lần đồng thời ###############################

from win32event import CreateMutex
from win32api import CloseHandle, GetLastError
from winerror import ERROR_ALREADY_EXISTS

######################## Box loading screen ############################
widget = None
def show_QMainWindow():
    global widget
    widget = Dashboard()
class Thread(QThread):
    progressChanged = pyqtSignal(int)

    def run(self):
        self.progressChanged.emit(1)
        print('khoi dong app')

        # myapp = singleinstance()
        # if myapp.alreadyrunning():
        #     print("Another instance of this program is already running")
        #     keyboard.press('ctrl+shift+k+l')
        #     keyboard.release('ctrl+shift+k+l')
        #     sys.exit(1)
        # else:
        #     print("program is already running")

        global local_ip
        hostname = socket.getfqdn()
        local_ip = socket.gethostbyname_ex(hostname)[2][0]
        print("IP Address:", socket.gethostbyname_ex(hostname)[2], len(socket.gethostbyname_ex(hostname)[2]))
        if len(socket.gethostbyname_ex(hostname)[2]) > 1:
            local_ip = socket.gethostbyname_ex(hostname)[2][1]

        Save_localip()

        threading.Thread(daemon=True, target=Begin_checkdown_game_loading).start()

        print('login resilio')
        global keyResilio
        keyResilio = check_keyResilio()

        url = 'https://script.google.com/macros/s/AKfycbyvhJU56RfOvbePo45F6aQQrF-ECdTkUY-K-ewmeBYPq9_6o6i8tLTDpv0IzipMCvptwQ/exec'
        print('login server')

        global keyServer
        query = "SELECT * FROM Design"
        getdesign = get_curSQL('datagame.db', query=query)
        keyServer = getdesign[0]['KeyServer']
        # keyServer='5888-8392-3360-3787'

        print('login_server')
        loginserver_getToken(url, keyServer, keyResilio)
class SplashScreen(QDialog):
    # def __init__(self):
    #     super().__init__()
    #     self.setWindowTitle('Spash Screen Example')
    #     self.setFixedSize(1100, 500)
    #     self.setWindowFlag(Qt.FramelessWindowHint)
    #     self.setAttribute(Qt.WA_TranslucentBackground)
    #     self.setWindowFlag(Qt.WindowStaysOnTopHint)
    #     self.initUI()
    def __init__(self):
        super().__init__()
        self.setFixedSize(350, 300)
        self.setWindowFlags(self.windowFlags() | Qt.FramelessWindowHint | Qt.WindowStaysOnTopHint)
        self.setAttribute(QtCore.Qt.WA_TranslucentBackground)
        # set click chỉ hoat dong tren child form
        self.setWindowModality(QtCore.Qt.ApplicationModal)

        layout = QVBoxLayout()
        self.label_animation = QLabel(self)
        self.movie = QMovie('loading.gif', cacheMode=QtGui.QMovie.CacheAll)
        self.label_animation.setMovie(self.movie)
        layout.addWidget(self.label_animation, alignment=Qt.AlignCenter)
        self.movie.start()
        # self.show()

    def initUI(self):
        layout = QVBoxLayout()
        self.setLayout(layout)

        self.frame = QFrame()
        layout.addWidget(self.frame)

        self.labelTitle = QLabel(self.frame)
        self.labelTitle.setObjectName('LabelTitle')

        # center labels
        self.labelTitle.resize(self.width() - 10, 150)
        self.labelTitle.move(0, 40)  # x, y
        self.labelTitle.setText('Splash Screen')
        self.labelTitle.setAlignment(Qt.AlignCenter)

        self.labelDescription = QLabel(self.frame)
        self.labelDescription.resize(self.width() - 10, 50)
        self.labelDescription.move(0, self.labelTitle.height())
        self.labelDescription.setObjectName('LabelDesc')
        self.labelDescription.setText('<strong>Working on Task #1</strong>')
        self.labelDescription.setAlignment(Qt.AlignCenter)

        self.progressBar = QProgressBar(self.frame)
        self.progressBar.resize(self.width() - 200 - 10, 50)
        self.progressBar.move(100, self.labelDescription.y() + 130)
        self.progressBar.setAlignment(Qt.AlignCenter)
        self.progressBar.setFormat('%p%')
        self.progressBar.setTextVisible(True)
        self.progressBar.setRange(0, 100)
        self.progressBar.setValue(20)

        self.labelLoading = QLabel(self.frame)
        self.labelLoading.resize(self.width() - 10, 50)
        self.labelLoading.move(0, self.progressBar.y() + 70)
        self.labelLoading.setObjectName('LabelLoading')
        self.labelLoading.setAlignment(Qt.AlignCenter)
        self.labelLoading.setText('loading...')

        self.setStyleSheet('''
                        #LabelTitle {
                            font-size: 60px;
                            color: #93deed;
                        }

                        #LabelDesc {
                            font-size: 30px;
                            color: #c2ced1;
                        }

                        #LabelLoading {
                            font-size: 30px;
                            color: #e8e8eb;
                        }

                        QFrame {
                            background-color: #2F4454;
                            color: rgb(220, 220, 220);
                        }

                        QProgressBar {
                            background-color: #DA7B93;
                            color: rgb(200, 200, 200);
                            border-style: none;
                            border-radius: 10px;
                            text-align: center;
                            font-size: 30px;
                        }

                        QProgressBar::chunk {
                            border-radius: 10px;
                            background-color: qlineargradient(spread:pad x1:0, x2:1, y1:0.511364, y2:0.523, stop:0 #1C3334, stop:1 #376E6F);
                        }
                    ''')
    def closes(self):
        global widget
        self.close()
        widget.show()
        global Server_Status
        if Server_Status == 'ERROR-submit':
            keyServer = boxlogin()
    def closea(self):
        self.close()
class Func_loading:
    def loading(self):
        self.screen = SplashScreen()
        self.screen.show()
        self.thread = Thread()
        self.thread.progressChanged.connect(show_QMainWindow)
        self.thread.finished.connect(self.screen.closes)
        self.thread.start()

#################### check is another instance of same program running ###################
class singleinstance:
    """ Limits application to single instance """

    def __init__(self):
        self.mutexname = "Dashboard_{D0E858DF-985E-4907-B7FB-8D732C3FC3B9}"
        self.mutex = CreateMutex(None, False, self.mutexname)
        self.lasterror = GetLastError()

    def alreadyrunning(self):
        return (self.lasterror == ERROR_ALREADY_EXISTS)

    def __del__(self):
        if self.mutex:
            try:
                CloseHandle(self.mutex)
            except:
                pass
myapp = singleinstance()
if myapp.alreadyrunning():
    print ("Another instance of this program is already running")
    keyboard.press('ctrl+shift+k+l')
    keyboard.release('ctrl+shift+k+l')
    sys.exit(1)
else:
    print("program is already running")

############################### bien system ##################################

PathService = "C:\\Windows\\System32\\System"
api = None
searchgame = None
service_google = None
Pass_sqlite = 'khaicafe'
token = ''
url = 'https://script.google.com/macros/s/AKfycbyvhJU56RfOvbePo45F6aQQrF-ECdTkUY-K-ewmeBYPq9_6o6i8tLTDpv0IzipMCvptwQ/exec'
session = requests.Session()
Server_api=None
Server_Status=None

# hostname = socket.gethostname()
# local_ip = socket.gethostbyname(hostname)
# print(local_ip)
local_ip =''
# hostname = socket.getfqdn()
# local_ip = socket.gethostbyname_ex(hostname)[2][0]
# print("IP Address:",socket.gethostbyname_ex(hostname)[2],len(socket.gethostbyname_ex(hostname)[2]))
# if len(local_ip) > 1:
#     local_ip = socket.gethostbyname_ex(hostname)[2][1]

######################## Path maker ##################
if getattr(sys, 'frozen', False) and hasattr(sys, '_MEIPASS'):
    path = sys._MEIPASS + '/'
else:
    path = ''
state = os.getpid()# mã pid trong taskmanager

########################## convert sqlite to dict #########################
def changevalue_dictionnary(l, target):
    for i in l:
        if target in i['ID']:
            i["ID"] = 'kkaka'
            i['name'] = 'khaicafe'
            return l
    return None
def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d

QtWidgets.QApplication.setAttribute(QtCore.Qt.AA_EnableHighDpiScaling, True) #enable highdpi scaling
QtWidgets.QApplication.setAttribute(QtCore.Qt.AA_UseHighDpiPixmaps, True) #use highdpi icons

################### Class Thread and Class Hop thoai #######################
class InputDialog(QDialog):
    def __init__(self, parent=None, lineedit=[], titletemp='', textedit='', label=None):
        super().__init__(parent)#parent
        self.setWindowFlags(self.windowFlags() | Qt.FramelessWindowHint | Qt.WindowStaysOnTopHint)
        self.pool = QtCore.QThreadPool.globalInstance()  # .globalInstance
        self.lineedit = lineedit
        self.title = titletemp
        self.textedit = textedit
        self.labeltitile = label
        self.frame_Top = QtWidgets.QFrame()
        self.label = QtWidgets.QLabel(self.title.title())
        self.label.setAlignment(Qt.AlignCenter)
        self.label.setStyleSheet("border : 10px solid black")
        # self.frame_Top.setLayout(label)

        # creating a QGraphicsDropShadowEffect object
        shadow = QGraphicsDropShadowEffect()
        shadow.setOffset(0, 0)
        # setting blur radius
        shadow.setBlurRadius(15)
        # setting border color
        shadow.setColor(Qt.white)

        # adding shadow to the label
        self.label.setGraphicsEffect(shadow)

        # self.setWindowFlag(Qt.FramelessWindowHint)

        if self.title == 'Register for the Menu-KL':
            self.gif_file = QMovie("loading2.gif", QByteArray(), parent=self)  # This is the "wrong" gif
            self.gif_file.setScaledSize(QSize().scaled(150, 150, Qt.KeepAspectRatio | Qt.SmoothTransformation))
            self.gif_file.setCacheMode(QMovie.CacheAll)
            self.gif_file.start()
            self.gif_label = QLabel(self)
            self.gif_label.setMovie(self.gif_file)
            self.gif_label.move(0, 120)
            # self.gif_label.setAlignment(Qt.AlignCenter)
            self.gif_label.setWindowFlags(Qt.FramelessWindowHint)
            # self.gif_label.setAttribute(Qt.WA_TranslucentBackground)
            self.gif_label.setFixedSize(150, 150)
            self.gif_label.setScaledContents(True)
            self.gif_label.show()

        ########### waiting loading screen #############################
        self.gif_file1 = QMovie("loading1.gif", QByteArray(), parent=self)  # This is the "wrong" gif
        self.gif_file1.setScaledSize(QSize().scaled(50, 50, Qt.KeepAspectRatio | Qt.SmoothTransformation))
        self.gif_file1.setCacheMode(QMovie.CacheAll)
        self.gif_file1.start()
        self.gif_label1 = QLabel(self)
        self.gif_label1.setMovie(self.gif_file1)
        self.gif_label1.move(195, 150)
        # self.gif_label.setAlignment(Qt.AlignCenter)
        self.gif_label1.setWindowFlags(Qt.FramelessWindowHint)
        # self.gif_label.setAttribute(Qt.WA_TranslucentBackground)
        self.gif_label1.setFixedSize(50, 50)
        self.gif_label1.setScaledContents(True)
        self.gif_label1.hide()

        self.buttonBox = QDialogButtonBox(QDialogButtonBox.Ok| QDialogButtonBox.Cancel, self) #
        # buttonBox = QDialogButtonBox()
        # # self.buttonBox.addButton("Help", QtGui.QDialogButtonBox.HelpRole)
        # buttonBox.addButton("Apply", QDialogButtonBox.AcceptRole)
        # buttonBox.addButton("Cancel", QDialogButtonBox.RejectRole)

        okBtn = self.buttonBox.button(QDialogButtonBox.Ok)
        # okBtn.clicked.connect(self.okbutton)

        cancelBtn = self.buttonBox.button(QDialogButtonBox.Cancel)
        # cancelBtn.clicked.connect(self.cancelbutton)

        layout = QFormLayout(self)
        # layout is a defined VBox or HBox
        # layout.setContentsMargins(left, top, right, bottom)
        layout.setContentsMargins(10, 0, 10, 0)
        self.label.setStyleSheet("font: 20pt; padding: 0px 0px 0px 0px; font-weight: bold;")#font: 30pt Comic Sans MS
        # label style không có thuộc tính margin nên phải set như bên dưới
        self.label.setMargin(20)
        layout.addRow(self.label)
        # layout.setLabelAlignment(Qt.AlignCenter)
        # layout.setFormAlignment(Qt.AlignCenter)
        # self.setAttribute(Qt.WA_TranslucentBackground)
        # self.setWindowFlag(Qt.FramelessWindowHint)

        self.setWindowTitle(self.title)
        self.setStyleSheet("""
    QDialog{
        background-color: rgb(57, 57, 85);color: rgb(255, 255, 255);
    }
    QInputDialog {
        background-color: rgb(57, 57, 85);color: rgb(255, 255, 255);
    }
    QLabel{
        font-size:12px;
        font-weight:bold;
        font-family:Arial;
        color: rgb(255, 255, 255);
    }
    QLineEdit{
        font-size:12px;
        font-weight:bold;
        font-family:Arial;
        background-color: rgb(57, 57, 85);
        color: rgb(255, 255, 255);
        border-radius: 5px;
        border: 1px solid #ccc;
        padding-left: 5px;
    }
    QPushButton{
        font-size:12px;
        text-align: center;
        color: rgb(255, 255, 255);
        bottom: 5px;
        background:transparent;
        border-radius: 5px;
        padding: 5px;
        width: 80px;
    }
    QPushButton:hover{
        background-color: rgba(0, 172, 252, 50);
    }
    QPushButton:pressed{  
        background-color: rgba(0, 120, 252, 150);
        border-style: inset;
        border-width: 2px;

    }
    QGroupBox { 
     border: 2px solid yellow; 
     border-radius: 5px; 
     color: white;
    } 
    """)
        # qproperty-alignment: AlignCenter;
        # initial_texts=["hello", "world"]
        self.editors = []
        for i, text in enumerate(self.lineedit, start=1):
            editor = QtWidgets.QLineEdit()#(text=text)
            try:
                editor.setText(str(self.textedit[i-1]))
            except:
                pass
            layout.addRow(text, editor)
            self.editors.append(editor)

        # test code
        if self.title=='Register for the Menu-KL':
            query = "SELECT * FROM Design"
            getdesign = get_curSQL('datagame.db', query=query)
            Ngayhethan = getdesign[0]['Ngayhethan']
            Soluongmay = getdesign[0]['Soluongmay']
            Diachi = getdesign[0]['DiaChi']
            tenphongmay = getdesign[0]['tenphongmay']
            Logo = getdesign[0]['Logo']
            Status = getdesign[0]['Status']
            KeyServer = getdesign[0]['KeyServer']

            self.lbtenphongmay = QLabel(tenphongmay)
            self.lbtenphongmay.setStyleSheet("color: yellow;padding-top: 5px;font-size:20px;")
            self.lbDiachi = QLabel('ĐC: '+Diachi)
            self.lbSoluongmay = QLabel('PC: ' +Soluongmay)
            self.lbconnect = QLabel('Cannot connect to server')
            self.lbconnect.setStyleSheet("color: #fc0606;")
            self.lbcopyright = QLabel('Copyright © 2010–2022 Menu-KL')

            self.lbtenphongmay.setAlignment(Qt.AlignCenter)
            self.lbDiachi.setAlignment(Qt.AlignCenter)
            self.lbSoluongmay.setAlignment(Qt.AlignCenter)
            self.lbcopyright.setAlignment(Qt.AlignCenter)
            self.lbcopyright.setStyleSheet("padding-top: 10px;")

            self.lblWBS = QLabel("HSD: "+Ngayhethan)
            self.lblDialog = QtWidgets.QLabel("Status: "+Status)
            self.editors[0].setText(KeyServer)

            if Status != 'ERROR-submit':
                self.lbconnect = QLabel('Server connected')
                self.lbconnect.setStyleSheet("color: #01f837;")

                self.buttonBox.accepted.connect(self.accept)
                self.buttonBox.rejected.connect(self.reject)
            else:
                okBtn.clicked.connect(self.okbutton)
                cancelBtn.clicked.connect(self.cancelbutton)

            if KeyServer == '' or Status=='ERROR-submit':
                self.editors[0].setDisabled(False)
            else:
                self.editors[0].setDisabled(True)

            self.lblWBS.setStyleSheet("color: yellow;")
            self.lblWBS.setAlignment(Qt.AlignCenter)
            self.lblDialog.setStyleSheet("color: #01f837;")
            self.lblDialog.setAlignment(Qt.AlignCenter)
            self.lbconnect.setAlignment(Qt.AlignCenter)

            layout.addRow(self.lbtenphongmay)
            layout.addRow(self.lbDiachi)
            layout.addRow(self.lbSoluongmay)
            layout.addRow(self.lblWBS)
            layout.addRow(self.lblDialog)
            layout.addRow(self.lbconnect)
            layout.addRow(self.lbcopyright)
        else:
            self.buttonBox.accepted.connect(self.accept)
            self.buttonBox.rejected.connect(self.reject)

        self.formGroupBox = QGroupBox("Menu-KL")
        self.formGroupBox.setLayout(layout)
        mainLayout = QVBoxLayout()

        # adding form group box to the layout
        mainLayout.addWidget(self.formGroupBox)
        mainLayout.addWidget(self.buttonBox)
        self.setLayout(mainLayout)
        # layout.addWidget(buttonBox)

        #====== event click trái di chuyển form đi chung với hàm mousePressEvent ===========#
        def moveWindow(e):
            # print('hàm movewindow')
            if self.isMaximized() == False:
                if e.buttons() == Qt.LeftButton:
                    self.move(self.pos() + e.globalPos() - self.clickPosition)
                    self.clickPosition = e.globalPos()
                    e.accept()
        # self.label.mouseMoveEvent = moveWindow
        self.formGroupBox.mouseMoveEvent = moveWindow
        print(self.size())
        self.setFixedSize(self.width() - 200, self.height() - 150)
        # self.resize(640, 480)
        print(self.size())

        ################################# boder-raido #########################
        radius = 10
        base = self.rect()
        ellipse = QRect(0, 0, 2 * radius, 2 * radius)

        base_region = QRegion(base.adjusted(radius, 0, -radius, 0))
        base_region |= QRegion(base.adjusted(0, radius, 0, -radius))

        base_region |= QRegion(ellipse, QRegion.Ellipse)
        ellipse.moveTopRight(base.topRight())
        base_region |= QRegion(ellipse, QRegion.Ellipse)
        ellipse.moveBottomRight(base.bottomRight())
        base_region |= QRegion(ellipse, QRegion.Ellipse)
        ellipse.moveBottomLeft(base.bottomLeft())
        base_region |= QRegion(ellipse, QRegion.Ellipse)

        self.setMask(base_region)

    # =============== START func to return value for ============= #
    @QtCore.pyqtSlot()
    def okbutton(self):
        if self.title == 'Register for the Menu-KL':
            if self.editors[0].text() == '':
                Box_alert('Please enter License key, do not leave it blank!')
            elif len(self.editors[0].text()) != 19:
                Box_alert('Please re-enter the copyright! \n Example: xxxx-xxxx-xxxx-xxxx')
                self.editors[0].setText('')
            else:
                # ============================== Login server ============================ #
                self.gif_label1.show()
                self.editors[0].setDisabled(True)
                self.buttonBox.setDisabled(True)

                pool = QThreadPool.globalInstance()
                self.check_key_server = Worker(index='func_checkkey_server',
                                               func= self.editors[0].text())  # add biến vào hàm
                self.check_key_server.signals.finished.connect(self.complete)
                self.check_key_server.signals.error.connect(self.error_key)
                pool.start(self.check_key_server)

    def cancelbutton(self):
        if self.title == 'Register for the Menu-KL':
            global Server_Status
            if Server_Status == 'ERROR-submit':
                sys.exit(0)
            else:
                self.reject()

    def closeEvent(self, evnt):
        if self.title == 'Register for the Menu-KL':
            global Server_Status
            if Server_Status == 'ERROR-submit':
                sys.exit(0)
            else:
                self.reject()

    # ========================= END func to return value =========================== #
    def complete(self, dict):
        print(dict)
        if dict['func_name'] == 'func_checkkey_server':
            value = dict['rev_data']
            print(value['Status'])
            self.lblDialog.setText(value['Status'])
            self.gif_label1.hide()
            self.editors[0].setDisabled(False)
            self.buttonBox.setDisabled(False)
            self.lblDialog.setStyleSheet("color: #fc0606;")  # color Red
            self.lbconnect.setStyleSheet("color: #fc0606;")  # color Red
            if value['Status'] != 'ERROR-submit':
                self.editors[0].setDisabled(True)
                self.lbconnect.setText('Server connected')
                self.lblWBS.setText("HSD: "+ value['Ngayhethan'])
                self.lbconnect.setStyleSheet("color: #01f837;")# color Green
                self.lblDialog.setStyleSheet("color: #01f837;")# color Green


    def error_key(self,dict):
        self.gif_label1.hide()
        self.editors[0].setDisabled(False)
        self.buttonBox.setDisabled(False)
        pass

    def getInputs(self):
        return [editor.text() for editor in self.editors]

    # hàm này get postion mouse for event di chuyển form moveWindow() nằm trong init của widget
    def mousePressEvent(self, event):
        if event.button() == QtCore.Qt.LeftButton:
            #self.startPos = event.pos()
            self.clickPosition = event.globalPos()
            # print('mouse event ',self.clickPosition)
class ThreadClass(QtCore.QThread):
    any_signal = QtCore.pyqtSignal(object)
    signal = QtCore.pyqtSignal(object)

    def __init__(self, parent=None, index=0, speeddown = None, folderid=None, linkgame=None, Pathgame=None, IDgame=None):
        super(ThreadClass, self).__init__(parent)
        self.index = index
        self.folderid = folderid
        self.linkgame  = linkgame
        self.IDgame = IDgame
        self.Pathgame = Pathgame
        self.speedown = speeddown

        self.is_running = True
        self.landau= 0
        self.dfgoc = 0

    def showmonitor(self):
        # conclient = sqlite3.connect('clientdata.db')  # (":memory:")
        # curclient = conclient.cursor()
        # con = sqlite3.connect('clientdata.db')  # (":memory:")
        # # con.text_factory = lambda b: b.decode(errors='ignore')
        # con.row_factory = dict_factory
        # cur = con.cursor()
        # cur.execute(f"PRAGMA key={Pass_sqlite}")
        cur, con = get_curSQL('clientdata.db')
        print('Starting thread...', self.index)
        getdata = []
        while (True):
            # curclient.execute("SELECT * FROM listClient order by CAST(substr(IP, 10) AS NUMERIC)")# DESC
            # getdata = curclient.fetchall()
            query = "SELECT * FROM listClient order by CAST(substr(IP, 10) AS NUMERIC)"
            # getdata = get_curSQL('clientdata.db', query=query)
            cur.execute(query)
            getdata = cur.fetchall()
            data = []
            if getdata == [] or getdata == None:
                pass
            else:
                value = {'ID': '1',
                         'online': 'online', }
                r = None
                for i in range(len(getdata)):
                    start_time1 = time.time()
                    ipclient = getdata[i]['IP']
                    internet_on(ipclient, 8200)#check_port
                    # print('ip check', final)
                    try:
                        if final[ipclient] == "OPEN":#response == True:#response ==
                            r = requests.post(url='http://' + f"{getdata[i]['IP']}" + ':8200/recevie', data=js.dumps(value))
                            seconds = float(r.json()["online-time"])
                            hours = seconds // 3600
                            minutes = (seconds % 3600) // 60
                            seconds = (seconds % 60)
                            dataempty = {'Online-Time': f'{int(hours)}:{int(minutes)}:{int(seconds)}',
                                         'PC': f'{r.json()["tenmay"]}',
                                         'IP': f'{r.json()["ip"]}',
                                         'CpuUse': f'{r.json()["cpuused"]}',#f'{(random.randint(0, 100))}',#
                                         'CpuTemp': f'{r.json()["cputemp"]}',
                                         'FanSpeed': f'{r.json()["fans"]}',
                                         'VgaTemp': f'{r.json()["vgatemp"]}',
                                         'RamPercent': f'{r.json()["rampercent"]}',
                                         'RamUse': f'{r.json()["ramused"]}',
                                         'LanSpeed': f'{r.json()["lanspeed"]}',
                                         }
                            data.append(dataempty)
                            ###########  warrning hardware change ############################
                            thongbao= ''
                            if r.json()['vga'] != getdata[i]['VGA']:
                                thongbao = f"vga old: {getdata[i]['VGA']} changed Vga new: {r.json()['vga']}\n"
                                print('changed vga', r.json()['vga'], getdata[i]['VGA'])
                            if r.json()['cpuname'] != getdata[i]['CPU']:
                                thongbao = thongbao +f"Cpu old: {getdata[i]['CPU']} changed Cpu new: {r.json()['cpuname']}\n"
                                print('changed CPU')
                            if r.json()['Main'] != getdata[i]['Main']:
                                thongbao = thongbao+ f"Main old: {getdata[i]['Main']} changed Main new: {r.json()['Main']}\n"
                                print('changed Main')
                            if r.json()['ram'] != getdata[i]['Ram']:
                                thongbao = thongbao + f"Ram old: {str(getdata[i]['Ram'])} changed Ram new: {str(r.json()['ram'])}\n"
                                print('changed ram')
                            if thongbao != '':
                                # dd/mm/YY H:M:S
                                now = datetime.now()
                                curr_time = now.strftime("%d/%m/%Y %H:%M:%S")
                                # curr_time = time.strftime("%H:%M:%S", time.localtime())
                                # curclient.execute(f"UPDATE listClient SET VGA='{str(r.json()['vga'])}', Main='{r.json()['Main']}', CPU='{r.json()['cpuname']}',Ram='{str(r.json()['ram'])}', Status='{str(curr_time)} {thongbao}' WHERE IP='{r.json()['ip']}'")
                                # conclient.commit()
                                query = f"UPDATE listClient SET VGA='{str(r.json()['vga'])}', Main='{r.json()['Main']}', CPU='{r.json()['cpuname']}',Ram='{str(r.json()['ram'])}', Status='{str(curr_time)} {thongbao}' WHERE IP='{r.json()['ip']}'"
                                get_curSQL('clientdata.db', query=query)
                        else:
                            # print(ipclient, "offline")
                            # data.pop(i)
                            pass
                    except:
                        # print(ipclient, "offline")
                        pass
                    # end_time1 = time.time()
                    # elapsed_time = end_time1 - start_time1
                    #print((elapsed_time % 60))
                data = data
                new_row = pd.DataFrame(data)
                # print(len(new_row), self.dfgoc, new_row)
                if data == None or data == []:
                    self.any_signal.emit(data)
                    self.dfgoc = len(new_row)
                    pass
                else:
                    if self.dfgoc == 0 or self.dfgoc != len(new_row):
                        self.dfgoc = len(new_row)
                        print('set lai table')
                        self.any_signal.emit(data)
                    else:
                        self.signal.emit({"tableview": "showmonitor", "data": data})
            time.sleep(1)

    def showhardware(self):
        print('Starting thread...', self.index)
        # con = sqlite3.connect('clientdata.db')  # (":memory:")
        # # con.text_factory = lambda b: b.decode(errors='ignore')
        # con.row_factory = dict_factory
        # cur = con.cursor()
        # cur.execute(f"PRAGMA key={Pass_sqlite}")
        cur, con = get_curSQL('clientdata.db')
        while True:
            # conclient = sqlite3.connect('clientdata.db')  # (":memory:")
            # conclient.row_factory = dict_factory
            # curclient = conclient.cursor()
            # curclient.execute("SELECT * FROM listClient order by CAST(substr(IP, 10) AS NUMERIC)")# DESC
            # getdatamonitor = curclient.fetchall()

            query = "SELECT * FROM listClient order by CAST(substr(IP, 10) AS NUMERIC)"
            cur.execute(query)
            getdatamonitor = cur.fetchall()
            # getdatamonitor = get_curSQL('clientdata.db', query=query)
            dfgoc = Reading_sqlite_to_df('clientdata.db', 'listClient')
            # print(getdatamonitor)
            if getdatamonitor ==[] or getdatamonitor == None:
                pass
            else:
                if self.dfgoc == 0 or self.dfgoc != len(dfgoc):
                    # print('ddd')
                    self.dfgoc = len(dfgoc)
                    self.any_signal.emit(getdatamonitor)
                elif self.dfgoc == len(dfgoc):
                    self.signal.emit({"tableview": "showhardware", "data": getdatamonitor})
            time.sleep(5)

    def showallgame(self):
        print('Starting thread...', self.index)

        # con = sqlite3.connect('datagame.db')  # (":memory:")
        # # con.text_factory = lambda b: b.decode(errors='ignore')
        # con.row_factory = dict_factory
        # cur = con.cursor()
        # cur.execute(f"PRAGMA key={Pass_sqlite}")
        cur, con = get_curSQL('datagame.db')
        while True:
            self.searchgame = searchgame
            if self.searchgame == None:
                # cur.execute(
                #     f'SELECT * FROM Listgame order by CAST(ID AS INTEGER)')
                # getdata = cur.fetchall()
                query = f'SELECT * FROM Listgame order by CAST(ID AS INTEGER)'
                cur.execute(query)
                getdata = cur.fetchall()
                # getdata = get_curSQL('datagame.db', query=query)
                dfgoc = pd.DataFrame(getdata)
                dfgoc = dfgoc.rename(columns={'imagedata': 'Photo_Game', 'Groupgame': 'Group', 'Tengame': 'Games', 'Luotplay': 'Count_plays'})
                getdata = dfgoc.to_dict('records')
                # print(dfgoc)
                if getdata ==[] or getdata == None:
                    pass
                else:
                    if self.dfgoc == 0 or self.dfgoc != len(dfgoc):
                        self.dfgoc = len(dfgoc)
                        self.any_signal.emit(getdata)
                    elif self.dfgoc == len(dfgoc):
                        self.signal.emit({"tableview": "showallgame", "data": getdata})
            else:
                name = self.searchgame
                # cur.execute(
                #     f'SELECT * FROM Listgame Where Tengame GLOB "{str(name.upper())}*" order by CAST(ID AS INTEGER)')
                # getdata = cur.fetchall()
                query = f'SELECT * FROM Listgame Where Tengame GLOB "{str(name.upper())}*" order by CAST(ID AS INTEGER)'
                getdata = get_curSQL('datagame.db', query=query)
                dfsearch = pd.DataFrame(getdata)
                dfsearch = dfsearch.rename(columns={'imagedata': 'Photo_Game', 'Groupgame': 'Group', 'Tengame': 'Games',
                                              'Luotplay': 'Count_plays'})
                getdata = dfsearch.to_dict('records')
                if getdata == [] or getdata == None:
                    pass
                else:
                    if self.dfgoc == 0 or self.dfgoc != len(dfsearch):
                        # print('set lai')
                        self.dfgoc = len(dfsearch)
                        self.any_signal.emit(getdata)
                    elif self.dfgoc == len(dfsearch):
                        # print('khong set')
                        self.signal.emit({"tableview": "showallgame", "data": getdata})

            time.sleep(1)

    def showidc_gameonline(self):
        value = self.api.get_folders()
        # self.cur, con = get_curSQL('gamelist.db')
        self.cur.execute("SELECT * FROM Gamelist")
        self.gamelist = self.cur.fetchall()
        # query = "SELECT * FROM Gamelist"
        # self.gamelist = get_curSQL('gamelist.db', query=query)
        valuegame = []
        listresilio = []
        listsql = []

        # delete game trong resilio nếu list game đã xóa
        for i in self.gamelist:
            # if i['GroupGame'] == 'Game Online':
            if i['FolderID'] == None or i['FolderID'] == "":
                # print('list ID ', i['ID'])
                for j in value:
                    # print('list resilio: ', i['NameGame'], j['GameName'])
                    if j['GameName'] == i['NameGame'] and 'IDC' in i['ID']:
                        print('list resilio delete', j['GameName'], j['FolderID'])
                        self.api.delete_game(j['FolderID'])

        for i in self.gamelist:
            if i['GroupGame'] == 'Game Online':
                listsql.append(i['FolderID'])
                if i['FolderID'] == None or i['FolderID'] == "":
                    valuetemp = {
                        " ": '',
                        "FolderID": 'None',
                        "ID": i['ID'],
                        "Games": i['NameGame'],
                        "Game_Group": i['GroupGame'],
                        "Category": i['Category'],
                        "Process": 0,
                        "Speed_Down": '',
                        "Current_Down": '',
                        "Status": i['Status'],
                        "linkgame": i['linkgame'],
                        "filerun": i['filerun'],
                        # "Photo": i['Photo'],
                        "Photo": '',
                    }
                    # print('game chưa down')
                    valuegame.append(valuetemp)
                else:
                    for j in value:
                        listresilio.append(j['FolderID'])
                        if j['FolderID'] == i['FolderID']:
                            # print('game down roi',i['FolderID'])
                            valuetemp = {
                                " ": 'true',
                                "FolderID": j['FolderID'],
                                "ID": i['ID'],
                                "Games": i['NameGame'],
                                "Game_Group": i['GroupGame'],
                                "Category": i['Category'],
                                "Process": j['Status'],
                                "Speed_Down": j['Speed_Down'],
                                "Current_Down": j['Current_Down'],
                                "Status": i['Status'],
                                "linkgame": i['linkgame'],
                                "filerun": i['filerun'],
                                # "Photo": i['Photo'],
                                "Photo": '',
                            }
                            # print('hinhgoc',i['Photo'][:30])
                            valuegame.append(valuetemp)

        # xoá id folder không connect idc
        # Bạn cũng có thể chuyển set kết quả về kiểu list và thu về một list mới chứa các phần tử khác nhau trong 2 list ban đầu bằng cách sử dụng thêm hàm set() với hàm list() trong python như ví dụ sau:
        # da co list cac phan tu khac nhau sau do dùng list khac nhau này loc lại web resilio xoá và xoá folderid trong sqlite là xong
        if valuegame == None or valuegame == []:
            print('không co game nào kết nối', self.gamelist, value)
            pass
        else:
            if self.landau < 1:
                self.any_signal.emit(valuegame)
                self.landau += 1
            else:
                self.signal.emit({"tableview": "showidc_gameonline", "data": valuegame})

    def showidc_gameoffline(self):
        value = self.api.get_folders()
        self.cur.execute("SELECT * FROM Gamelist")
        self.gamelist = self.cur.fetchall()
        # query = "SELECT * FROM Gamelist"
        # self.gamelist = get_curSQL('gamelist.db', query=query)
        valuegame = []
        listresilio = []
        listsql = []
        for i in self.gamelist:
            if i['GroupGame'] == 'Game Offline':
                listsql.append(i['FolderID'])
                if i['FolderID'] == None or i['FolderID'] == "":
                    valuetemp = {
                        " ": '',
                        "FolderID": 'None',
                        "ID": i['ID'],
                        "Games": i['NameGame'],
                        "Game_Group": i['GroupGame'],
                        "Category": i['Category'],
                        "Process": 0,
                        "Speed_Down": '',
                        "Current_Down": i['Totalsize'],
                        "Status": i['Status'],
                        "linkgame": i['linkgame'],
                        "filerun": i['filerun'],
                        # "Photo": i['Photo'],
                        "Photo": '',
                    }
                    # print('game chưa down')
                    valuegame.append(valuetemp)
                else:
                    for j in value:
                        listresilio.append(j['FolderID'])
                        if j['FolderID'] == i['FolderID']:
                            # print('process: ',j['Status'])
                            valuetemp = {
                                " ": 'true',
                                "FolderID": j['FolderID'],
                                "ID": i['ID'],
                                "Games": i['NameGame'],
                                "Game_Group": i['GroupGame'],
                                "Category": i['Category'],
                                "Process": j['Status'],
                                "Speed_Down": j['Speed_Down'],
                                "Current_Down": j['Current_Down'],
                                "Status": i['Status'],
                                "linkgame": i['linkgame'],
                                "filerun": i['filerun'],
                                # "Photo": i['Photo'],
                                "Photo": '',
                            }
                            valuegame.append(valuetemp)
        newvaluegame = []
        for item in valuegame:
            if item['Status'] == 'Ready':
                item[' '] = 'true'
                if item['Process'] == 0:
                    item['Process'] = 100
                    item['Speed_Down'] = '0.0 Byte'
            else:
                item[' '] = ''
            newvaluegame.append(item)
        valuegame = newvaluegame
        new_row = pd.DataFrame(value)
        # print(new_row)
        if valuegame == None or valuegame == []:
            print('không co game nào kết nối', self.gamelist, value)
            pass
        else:
            if self.landau == 0:
                self.any_signal.emit(valuegame)
                self.landau += 1
            else:
                pass
                self.signal.emit({"tableview": "showidc_gameoffline","data": valuegame})

    def showlistAppNew(self):
        print('Starting thread...', self.index)
        # con = sqlite3.connect('clientdata.db')  # (":memory:")
        # # con.text_factory = lambda b: b.decode(errors = 'ignore')
        # con.row_factory = dict_factory
        # cur = con.cursor()
        # con = sqlite3.connect('clientdata.db')  # (":memory:")
        # # con.text_factory = lambda b: b.decode(errors='ignore')
        # con.row_factory = dict_factory
        # cur = con.cursor()
        # cur.execute(f"PRAGMA key={Pass_sqlite}")
        cur, con = get_curSQL('clientdata.db')
        while True:
            # cur.execute("SELECT * FROM AppNew")# order by CAST(ID AS INTEGER)
            # getdata = cur.fetchall()
            query = "SELECT * FROM AppNew"
            cur.execute(query)
            getdata = cur.fetchall()
            # getdata = get_curSQL('clientdata.db', query=query)
            dfgoc = Reading_sqlite_to_df('clientdata.db', 'AppNew')
            if getdata == [] or getdata == None:
                pass
            else:
                if self.dfgoc == 0 or self.dfgoc != len(dfgoc):
                    # print('ddd')
                    self.dfgoc = len(dfgoc)
                    list_dictblockApp = []
                    for item in getdata:
                        if item['Status'] == 'block':
                            item = {" ": 'true', **item}
                        else:
                            item = {" ": '', **item}
                        list_dictblockApp.append(item)
                    self.any_signal.emit(list_dictblockApp)#(getdata)
                elif self.dfgoc == len(dfgoc):
                    list_dictblockApp = []
                    for item in getdata:
                        if item['Status'] == 'block':
                            item = {" ": 'true', **item}
                        else:
                            item = {" ": '', **item}
                        list_dictblockApp.append(item)
                    self.signal.emit({"tableview": "showlistAppNew", "data": list_dictblockApp})
            # print(self.dfgoc,len(dfgoc))
            time.sleep(1)

    ################ Resilio Client ##########################
    def Resilio_login(self):
        try:
            host = 'localhost'
            port = '8888'
            username = 'admin'
            password = 'admin'
            global api
            if api == None:
                try:
                    self.api = ResilioSyncClient(
                        host=host,
                        port=port,
                        username=username,
                        password=password,
                    )
                    api = self.api
                    print('login oki')
                except Exception as e:
                    print('Lỗi not connect', e)
                    time.sleep(5)
            else:
                self.api = api


            self.cur, con = get_curSQL('gamelist.db')
            if self.index == 'IDC_GameOnline':
                while True:
                    try:
                        self.showidc_gameonline()
                    except Exception as e:
                        try:
                            self.api = ResilioSyncClient(
                                host=host,
                                port=port,
                                username=username,
                                password=password,
                            )
                            api = self.api
                            print('login oki game online')
                        except Exception as e:
                            print('Lỗi connect lai gameonline', e)
                            time.sleep(5)
                    time.sleep(2)

            elif self.index == 'IDC_GameOnline_deleteidc':
                self.api.delete_game(self.folderid)

            # elif self.index == 'IDC_GameOffline_deleteidc':
            #     self.showidc_gameoffline()

            elif self.index == 'IDC_GameOnline_downgameidc':
                self.api.add_linkgame(self.IDgame, self.linkgame, self.Pathgame)

            elif self.index == 'IDC_GameOnline_setdownload':
                try:
                    self.api.speed_downgame(self.speedown)
                except Exception as e:
                    try:
                        self.api = api
                        print('login oki setdownload')
                    except Exception as e:
                        print('Lỗi connect setdownload', e)

            elif self.index == 'IDC_GameOffline':
                while True:
                    try:
                        self.showidc_gameoffline()
                    except Exception as e:
                        try:
                            self.api = api
                            print('login oki offline')
                        except Exception as e:
                            print('Lỗi connect gameofflai', e)
                            time.sleep(5)
                    time.sleep(2)
        except:
            pass

    #===================== Login Server update game ==============#
    def get_api_server(self,url, keyServer, keyResilio):
        port = None
        api = connect_server(
            url=url,
            port=port,
            keyServer=keyServer,
            keyResilio=keyResilio,
        )
        return api

    def getinfo_setinfo(self,api):
        data = api.get_infoPM()['rev_data']
        # print('infoPM ', data, '\n')

        api.set_infoPM(data['Logo'], data['TenPhongMay'], data['DiaChi'], data['Soluongmay'], data['Ngayhethan'],
                       data['Status'])

        listgame = api.get_listgame()['rev_data']

        new_row = pd.DataFrame(listgame)
        print('listgame: ', new_row)

        api.sosanh_listgame(listgame)

        value_checkupdate = api.get_checkupdate()['rev_data']
        new_row = pd.DataFrame(value_checkupdate)
        print(new_row)

    async def loginserver_getToken(self,url, keyServer, keyResilio):
        count = 0
        global token
        while count <= 3:
            print('login server count: ', count, "\n")
            try:
                api = self.get_api_server(url, keyServer, keyResilio)
                # api = threading.Thread(target=lambda: get_api_server(url, keyServer, keyResilio), daemon=True)
                count = 4
            except:
                count += 1
        # Login thành công
        if token != "":
            self.getinfo_setinfo(api)
            # threading.Thread(target=lambda: getinfo_setinfo(api), daemon=True)

    def run(self):
        if self.index == 'monitor':
            self.showmonitor()
        if self.index == 'showallgame':
            self.showallgame()
        if self.index == 'showhardware':
            self.showhardware()
        if self.index == 'IDC_GameOnline' or self.index =='IDC_GameOnline_downgameidc' or self.index == 'IDC_GameOnline_deleteidc' \
            or self.index == 'IDC_GameOnline_setdownload':
            self.Resilio_login()
        if self.index == 'IDC_GameOffline':
            self.Resilio_login()
        if self.index == 'showlistAppNew':
            self.showlistAppNew()
        if self.index == 'connect_server':
            query = "SELECT * FROM Design"
            getdesign = get_curSQL('datagame.db', query=query)
            keyServer = getdesign[0]['KeyServer']
            # if keyServer == None or keyServer == '' or len(keyServer) != 19:
            #     Qwidget_main = False  # biến ghi log đã khởi động xong
            #     time.sleep(3)
            #     # ========== login server chưa có key ========== #
            keyServer = boxlogin()
            loginserver_getToken(self, url, keyServer, keyResilio)

    def stop(self):
        self.is_running = False
        print('Stopping thread...', self.index)

##################### Design Tableview ########################
class ImageCenterProxyStyle(QtWidgets.QProxyStyle):
    def subElementRect(self, subElement, option, widget=None):
        r = super(ImageCenterProxyStyle, self).subElementRect(
            subElement, option, widget
        )
        if subElement == QtWidgets.QStyle.SE_ItemViewItemDecoration:
            r.moveCenter(option.rect.center())
        return r
class ColorDelegate(QtWidgets.QStyledItemDelegate):
    def __init__(self, parent=None, index=0):
        super(ColorDelegate, self).__init__(parent)
        self.index = index
        self.row = []
        self.column = None
        self.progress = 0
        self.rows = None

        # Define the hover colour
        self.hoverBackground = QBrush(QColor('#F5F5F5'))
        # Initiate variables to invalid model indices
        self.currentHovered = QModelIndex()
        self.previousHovered = QModelIndex()

    def initStyleOption(self, option, index):
        super(ColorDelegate, self).initStyleOption(option, index)

        # Cache model indices
        # if option.state & QtWidgets.QStyle.State_MouseOver:
        #     if index.row() != self.currentHovered.row():
        #         self.previousHovered = self.currentHovered
        #         self.currentHovered = index


        # Set background brush if we're on a hover row
        # if index.row() == self.currentHovered.row():
        #     for i in range(index.model().columnCount()):
        #         # index.model().index
        #         index.model().setData(index.model().index(index.row(), i), QBrush(Qt.red), QtCore.Qt.BackgroundRole)
        #     # option.backgroundBrush = self.hoverBackground
        # else:
        #     for i in range(index.model().columnCount()):
        #         # index.model().index
        #         index.model().setData(index.model().index(index.row(), i), QBrush(Qt.darkBlue),
        #                               QtCore.Qt.BackgroundRole)
        if self.index == 'allgame':
            if option.text.strip()=='Game Online': # condition
                option.backgroundBrush = QtGui.QColor("red")

            elif option.text.strip()=='Game Offline': # condition
                option.backgroundBrush = QtGui.QColor("blue")

            elif index.column() == 1:
                # tengame = index.sibling(index.row(), 3).data()
                # if True:
                    # name = index.sibling(index.row(), 3).data()#self.searchgame.text()
                    # con = sqlite3.connect('datagame.db')  # (":memory:")
                    # # con.text_factory = lambda b: b.decode(errors = 'ignore')
                    # con.row_factory = dict_factory
                    # cur = con.cursor()
                    # cur.execute(
                    #     f'SELECT * FROM Listgame Where Tengame GLOB "{str(name.upper())}*"')
                    # getdata = cur.fetchone()
                # self.imagedata = getdata['imagedata']
                self.imagedata = index.data()#index.model().data(index, QtCore.Qt.DisplayRole)#index.data()
                option.text = ''
                pixmap = QPixmap()
                try:
                    pixmap.loadFromData(eval(self.imagedata))
                except:
                    try:
                        pixmap.loadFromData(self.imagedata)
                    except:
                        pass
                # pixmap.loadFromData(index.data(), "jpg")
                # pixmap.scaled(120,200, QtCore.Qt.KeepAspectRatio)
                # when i test ,just use option.rect.x(), option.rect.y(), no need scaled
                #painter.drawPixmap(option.rect, pixmap)

                if not pixmap.isNull():
                    option.features |= QtWidgets.QStyleOptionViewItem.HasDecoration
                    option.icon = QtGui.QIcon(pixmap)
                    option.decorationSize = QSize(50, 50)
                #   painter.drawPixmap(option.rect, pixmap)
        if self.index == 'IDC_GameOnline' or self.index == 'IDC_GameOffline':
            if index.column()==0:
                value = index.data()
                if value!='':
                    option.text = ''
                    option.features |= QtWidgets.QStyleOptionViewItem.HasDecoration
                    option.icon = QtGui.QIcon('./icons/done.png')
                else:
                    option.features |= QtWidgets.QStyleOptionViewItem.HasDecoration
                    option.icon = QtGui.QIcon('./icons/unchecked.png')

                # super().initStyleOption(option, index)
                # option.direction = QtCore.Qt.LeftToRight#RightToLeft
                # option.displayAlignment = QtCore.Qt.AlignCenter | QtCore.Qt.AlignVCenter

            # if index.column() == 1:
            #     #url = index.model().data(index, QtCore.Qt.EditRole)
            #     option.text = ''
            #     self.imagedata = index.data()
            #     pixmap = QPixmap()
            #     pixmap.loadFromData(eval(self.imagedata))
            #     if not pixmap.isNull():
            #         option.features |= QtWidgets.QStyleOptionViewItem.HasDecoration
            #         option.icon = QtGui.QIcon(pixmap)
            #         option.decorationSize = QSize(40, 40)
            #     # painter.drawPixmap(option.rect, pixmap)
        if self.index == 'showlistAppNew':
            if index.column() == 0:
                value = index.data()
                if value != '':
                    option.text = ''
                    option.features |= QtWidgets.QStyleOptionViewItem.HasDecoration
                    option.icon = QtGui.QIcon('./icons/done.png')
                else:
                    option.features |= QtWidgets.QStyleOptionViewItem.HasDecoration
                    option.icon = QtGui.QIcon('./icons/unchecked.png')

    def paint(self, painter, option, index):
        option.displayAlignment = QtCore.Qt.AlignCenter
        QtWidgets.QStyledItemDelegate.paint(self, painter, option, index)
        # if self.index != 'IDC_GameOnline':
        painter.save()

        if option.state & QtWidgets.QStyle.State_MouseOver:
            # if self.rows == index.row():
            #     self.rows = index.row()
            #     for i in range(index.model().columnCount()):
            #         indexmodel = index.model().index(index.row(), i)
            #
            #         print(self.rows)
            # else:
            #     self.rows = index.row()
                # table.initStyleOption(opt, indexmodel)
                # print(table)
                # options = QtWidgets.QStyleOptionViewItem(option)
                # self.initStyleOption(options, index)
                #
                # x = table.columnViewportPosition(indexmodel.column())
                # y = table.rowViewportPosition(indexmodel.row())
                # width = table.columnWidth(indexmodel.column())
                # height = table.rowHeight(indexmodel.row())
                # print(x, y, width / 2, height)
                # option.rect = QtCore.QRect(x, y, width / 2, height)
                # print(option.rect )
                # painter.fillRect(option.rect, QtGui.QColor(100,150,50))  # (100,150,50))#
                # QtWidgets.QStyledItemDelegate.paint(self, painter, option, index)
                # print(indexmodel)
                # rect2 = QtCore.QRect(option.rect.x() + 3, option.rect.y() + 3, option.rect.width() - 5,
                #                      option.rect.height() - 7)
                #
                #
                # painter.fillRect(option.rect, QtGui.QColor(143, 143, 143))  # (100,150,50))#
                # painter.fillRect(option.rect, ho);
                pass
            # print('model', index.model().columnCount())
            # # print('hover') # phai set mousetracking true
            # painter.fillRect(option.rect, option.palette.highlight())
            # painter.fillRect(option.rect, QtGui.QColor(143,143,143))#(100,150,50))#
            # QtWidgets.QStyledItemDelegate.paint(self, painter, option, index)
        # else:
        #     painter.fillRect(option.rect, QtGui.QColor(31, 37, 47))#(38,38,38))rgba(100,150,50,80);
        #     QtWidgets.QStyledItemDelegate.paint(self, painter, option, index)
        painter.restore()

        if self.index == 'monitor':
            if index.column() == 3 or index.column() == 7:
                # progress_bar_option = QtWidgets.QStyleOptionProgressBar()
                # progress_bar_option.rect = option.rect
                # progress_bar_option.state = QtWidgets.QStyle.State_Enabled
                # progress_bar_option.direction = QtCore.Qt.LayoutDirection.LeftToRight
                # progress_bar_option.fontMetrics = QtWidgets.QApplication.fontMetrics()
                #
                # progress_bar_option.minimum = 0
                # progress_bar_option.maximum = 100
                # progress_bar_option.textAlignment = QtCore.Qt.AlignCenter
                # progress_bar_option.textVisible = True
                # palette = progress_bar_option.palette
                # palette.setColor(QtGui.QPalette.Highlight, QtCore.Qt.red)
                # progress_bar_option.palette = palette
                #
                # progress_bar_option.progress = float(index.data().split(' ')[0])
                # progress_bar_option.text = index.data()
                #
                # QtWidgets.QApplication.style().drawControl(QtWidgets.QStyle.CE_ProgressBar,
                #                                            progress_bar_option, painter)

                progress = float(index.model().data(index, QtCore.Qt.DisplayRole))#(index.data())
                if index.column() == 3:
                    self.progress = progress
                if (progress >= 0):
                    rect = QtCore.QRect(option.rect.x() + 5, option.rect.y() + 5, option.rect.width(),
                                        option.rect.height() - 10)
                    painter.save()
                    painter.setRenderHint(QtGui.QPainter.Antialiasing, True)
                    painter.setBrush(QtGui.QColor(31, 37, 47))#(75, 75, 75))  # grigio molto scuro
                    painter.setPen(QtGui.QColor("transparent"))
                    width = option.rect.width() - 5
                    rect2 = QtCore.QRect(option.rect.x() + 3, option.rect.y() + 3, width,
                                         option.rect.height() - 7)
                    painter.drawRect(rect2)
                    progBarWidth = float((width * progress) / 100) ####### % progressbar ######
                    if (progBarWidth > 1):
                        # Painting the ProgressBar
                        painter.setRenderHint(QtGui.QPainter.Antialiasing, True)
                        painter.setBrush(QtGui.QColor(0, 122, 204))
                        rect5 = QtCore.QRect(option.rect.x() + 3, option.rect.y() + 3, progBarWidth - 5,
                                             option.rect.height() - 7)
                        painter.drawRect(rect5)
                    painter.setPen(QtGui.QColor(QtCore.Qt.white))
                    painter.drawText(rect2, QtCore.Qt.AlignCenter, str(progress) + "%") ####### text progressbar ######
                    painter.restore()


            # if self.progress > 20:
            #     painter.save()
            #     painter.setPen(QtGui.QPen(QtGui.QColor("green")))
            #     r = QtCore.QRect(option.rect)
            #     r.adjust(0, 0, 0, 0)
            #     painter.drawLine(r.topLeft(), r.topRight())
            #     painter.drawLine(r.bottomLeft(), r.bottomRight())
            #     painter.restore()
        if self.index == 'IDC_GameOnline' or self.index == 'IDC_GameOffline':
            if index.column() == 1:
                pass
            #     url = index.model().data(index, QtCore.Qt.EditRole)
            #     offset = eval(url)
            #     # offset = self.writeTofile(url)
            #     # print(url[:50])
            #
            #     # self.imagedata = index.data()
            #     pixmap = QPixmap()
            #     pixmap.loadFromData(eval(index.data()))
            #     # qimage = ImageQt(self.imagedata)
            #     # pixmap = QtGui.QPixmap.fromImage(qimage)
            #     # if pixmap.loadFromData(self.imagedata):
            #     # pixmap.loadFromData(index.data(), "jpg")
            #     # pixmap.scaled(120,200, QtCore.Qt.KeepAspectRatio)
            #     # when i test ,just use option.rect.x(), option.rect.y(), no need scaled
            #     painter.drawPixmap(option.rect, pixmap)

            #     if not pixmap.isNull():
            #         option.features |= QtWidgets.QStyleOptionViewItem.HasDecoration
            #         option.icon = QtGui.QIcon(pixmap)
            #         option.decorationSize = QSize(50, 50)
            #     # painter.drawPixmap(option.rect, pixmap)
            if index.column() == 6:
                progress = float(index.model().data(index, QtCore.Qt.DisplayRole))#(index.data())
                if (progress >= 0):
                    rect = QtCore.QRect(option.rect.x() + 5, option.rect.y() + 5, option.rect.width(),
                                        option.rect.height() - 10)
                    painter.save()
                    painter.setRenderHint(QtGui.QPainter.Antialiasing, True)
                    painter.setBrush(QtGui.QColor(31, 37, 47))  # (75, 75, 75))  # grigio molto scuro
                    painter.setPen(QtGui.QColor("transparent"))
                    width = option.rect.width() - 5
                    rect2 = QtCore.QRect(option.rect.x() + 3, option.rect.y() + 3, width,
                                         option.rect.height() - 7)
                    painter.drawRect(rect2)
                    progBarWidth = float((width * progress) / 100)  ####### % progressbar ######
                    if (progBarWidth > 1):
                        # Painting the ProgressBar
                        painter.setRenderHint(QtGui.QPainter.Antialiasing, True)
                        painter.setBrush(QtGui.QColor(0, 99, 0))
                        rect5 = QtCore.QRect(option.rect.x() + 3, option.rect.y() + 3, progBarWidth,
                                             option.rect.height() - 7)#option.rect.width() - 5
                        painter.drawRect(rect5)
                    painter.setPen(QtGui.QColor(QtCore.Qt.white))
                    painter.drawText(rect2, QtCore.Qt.AlignCenter, str(progress) + "%")  ####### text progressbar ######
                    painter.restore()

    def destroyEditor(self, editor, index):
        editor.clear()
    def setEditorData(self, editor, index):
        cell_text = index.model().data(index, QtCore.Qt.DisplayRole)
        editor.setHtml(cell_text)

    # def setEditorData(self, editor, index):
    #     text = self.VALUES[index.data(QtCore.Qt.DisplayRole).toInt()[0]]
    #     pos = editor.findText(text)
    #     if pos == -1:  # text not found, set cell value to first item in VALUES
    #         pos = 0
    #     editor.setCurrentIndex(pos)

    def setModelData(self, editor, model, index):
        print('setdata', model)
        model.setData(index, QtCore.QVariant(editor.currentIndex()))

class PandasModel(QtCore.QAbstractTableModel):
    """
    Class to populate a table view with a pandas dataframe
    """
    def __init__(self, data, parent=None):
        QtCore.QAbstractTableModel.__init__(self, parent)
        self._data = np.array(data.values)
        self._cols = data.columns
        self.r, self.c = np.shape(self._data)
        self.colors = dict()

    def rowCount(self, parent=None):
        return self.r

    def columnCount(self, parent=None):
        return self.c

    def data(self, index, role=QtCore.Qt.DisplayRole):
        if index.isValid():
            # ham goc
            if role == QtCore.Qt.DisplayRole:
                return str(self._data[index.row(), index.column()])
            if role == QtCore.Qt.EditRole:
                return str(self._data[index.row(), index.column()])
            if role == Qt.BackgroundRole:
                # print('color', self.colors)
                color = self.colors.get((index.row(), index.column()))
                if color is not None:
                    return color

            # if role == Qt.BackgroundRole:
            #     return QBrush(Qt.yellow)
        return None

    def setData(self, index, value, role=QtCore.Qt.EditRole):
        if not index.isValid():
            return False
        if role == QtCore.Qt.EditRole:
            self._data[index.row()][index.column()] = value
            # ham nay send rule va gia tri cho ham def data() ben tren ne
            self.dataChanged.emit(
                index, index, (QtCore.Qt.EditRole,)
            )  # NOT WORKING
        elif role == Qt.BackgroundRole:
        # # ix = self.index(row, column)
        #     # self.colors[(row, column)] = color
            ix = index
            self.colors[(ix.row(), ix.column())] = value
            self.dataChanged.emit(ix, ix, (Qt.BackgroundRole,))
        else:
            return False
        return True

    def headerData(self, p_int, orientation, role):
        if role == QtCore.Qt.DisplayRole:
            if orientation == QtCore.Qt.Horizontal:
                return self._cols[p_int]
            elif orientation == QtCore.Qt.Vertical:
                return p_int
        return None

    # def change_color(self, index, value, role=QtCore.Qt.EditRole):#(self, row, column, color):
    #     # ix = self.index(row, column)
    #     # self.colors[(row, column)] = color
    #     ix = index
    #     self.colors[(ix.row(), ix.column())] = value
    #     self.dataChanged.emit(ix, ix, (Qt.BackgroundRole,))


    @QtCore.pyqtSlot(int, int, QtCore.QVariant)
    def update_item(self, row, col, value):
        # print('old_value: ', str(self._data[row, col]))
        # print('new_value: ', value)
        old_value= str(self._data[row, col])
        new_value = value
        if old_value != new_value:
            # print('value: ', value)
            ix = self.index(row, col)
            self.setData(ix, value)
class SignalManager(QtCore.QObject):
    fooSignal = QtCore.pyqtSignal(int, int, QtCore.QVariant)

################## Class dành progressbar download #############
class WorkerSignals(QtCore.QObject):
    finished = QtCore.pyqtSignal(object)
    error = QtCore.pyqtSignal(str)
    result = QtCore.pyqtSignal(object)
    progress = QtCore.pyqtSignal(list)
class Worker(QtCore.QRunnable):
    def __init__(self, num = None, bar=None,label=None, index='updateMenu', dictgoogle = None, func=None):
        super(Worker, self).__init__()
        self.index = index
        self.dicgoogle = dictgoogle
        self.totalsize= ''
        self.func = func

        self.num = num
        self.bar = bar
        self.label = label
        self.signals = WorkerSignals()

    @pyqtSlot()
    def run(self):
        if self.index == 'updateMenu':
            self.update_menu()
            print('update_Menu')
        elif self.index == 'downgoogle':
            self.Googledrive()
        elif self.index == 'func_checkkey_server':
            global Server_api
            # _, Value = Server_api.login_App(self.func) # add biến vào hàm
            # print(self.func)
            Server_api.keyServer = self.func
            # Server_api.keyServer = '5888-8392-3360-3788'
            _, Value = Server_api.login_App()
            dict = {'func_name': self.index, 'rev_data': Value}
            self.func_return(dict)


    def func_return(self, dict):
        self.signals.finished.emit(dict)
        # try:
        #     # self.fn(*self.args, **self.kwargs)
        #     # self.fn()
        #     self.signals.finished.emit(dict)
        # except:
        #     traceback.print_exc()
        #     exctype, value = sys.exc_info()[:2]
        #     self.signals.error.emit((exctype, value, traceback.format_exc()))

    def Googledrive(self):
        global service_google
        # SCOPES = ['https://www.googleapis.com/auth/drive.readonly']
        SCOPES = ['https://www.googleapis.com/auth/drive']
        KEY_FILE_LOCATION = 'token.json'
        """Downloads a file
        Args:
            real_file_id: ID of the file to download
        Returns : IO object with location.

        Load pre-authorized user credentials from the environment.
        TODO(developer) - See https://developers.google.com/identity
        for guides on implementing OAuth2 for the application.
        """

        """Shows basic usage of the Drive v3 API.
            Prints the names and ids of the first 10 files the user has access to.
            """
        creds = None
        # The file token.json stores the user's access and refresh tokens, and is
        # created automatically when the authorization flow completes for the first
        # time.
        if os.path.exists('token.json'):
            creds = Credentials.from_authorized_user_file('token.json', SCOPES)
        # If there are no (valid) credentials available, let the user log in.
        if not creds or not creds.valid:
            if creds and creds.expired and creds.refresh_token:
                creds.refresh(Request())
            else:
                flow = InstalledAppFlow.from_client_secrets_file(
                    'credentials.json', SCOPES)
                creds = flow.run_local_server(access_type='offline', port=0)#access_type='offline',include_granted_scopes='true'
            # Save the credentials for the next run
            with open('token.json', 'w') as token:
                token.write(creds.to_json())
        try:
            # create drive api client
            service = build('drive', 'v3', credentials=creds, static_discovery=False)#static_discovery=False phai them vao khi build exe
            # Search file by name
            # response = service.files().list(q=q_parameter, spaces='drive', fields='*', pageToken=page_token).execute()
            response = service.files().list(fields='*').execute() # q=f"name='{file_name}'", spaces='drive', fields='nextPageToken, files(id, name)'
            # df = pd.DataFrame(response['files'])
            # print(df)
            list = []
            for file in response.get('files', []):
                file_id = file.get('id')
                file_size = file.get('size')
                try:
                    file_size  = humanbytes(int(file_size))
                except:
                    pass
                file_name = file.get('name')
                file_url = file.get("webContentLink")
                dicttemp = {
                    'file_name': file_name,
                    'file_size': file_size,
                    'file_id': file_id,
                    'file_url':file_url
                }
                list.append(dicttemp)

            # df = pd.DataFrame(list)
            # print(df)
            #self.signals.error.emit
            file=''
            try:
                file = service.files().get(fileId=self.dicgoogle['linkgame'], fields='name, id, size, modifiedTime').execute()
            except:
                print('link down Fail')
                self.signals.result.emit({"tableview": "showidc_gameoffline","row": self.dicgoogle['row'], "link_google_ERROR": self.dicgoogle['linkgame'], "IDgame": self.dicgoogle['IDgame']})
                return
            chunk_size = 50 * 1024 * 1024
            file_id = self.dicgoogle['linkgame']
            # pylint: disable=maybe-no-member
            request = service.files().get_media(fileId=file_id)

            # file = io.BytesIO()
            # Delete folder befor when download
            isExist = os.path.exists(self.dicgoogle['Pathgame'])
            if isExist:
                Remove_ContentsFolder(self.dicgoogle['Pathgame'])
            if not os.path.exists(self.dicgoogle['Pathgame']):
                os.makedirs(self.dicgoogle['Pathgame'])

            file = io.FileIO(os.path.join(self.dicgoogle['Pathgame'],self.dicgoogle["zipfilename"]), mode='wb')
            downloader = MediaIoBaseDownload(file, request)#, chunksize=chunk_size)#, chunksize=chunk_size
            done = False
            c_time = time.time()
            # with tqdm(unit='iB', unit_scale=True) as pbar:
            while done is False:
                status, done = downloader.next_chunk()#num_retries=1
                if status:
                    f_size = status.total_size
                    diff = time.time() - c_time
                    downloaded = status.resumable_progress
                    percentage = downloaded / f_size * 100
                    speed = round(downloaded / diff, 2)
                    eta = round((f_size - downloaded) / speed)

                    hours = eta // 3600
                    minutes = (eta % 3600) // 60
                    seconds = (eta % 60)
                    timecurent = f'{int(hours)}:{int(minutes)}:{int(seconds)}  '
                # print(humanbytes(f_size), humanbytes(downloaded), round(percentage, 2), humanbytes(speed), timecurent)
                self.signals.result.emit({"tableview": "showidc_gameoffline","row": self.dicgoogle['row'],"current": f"{humanbytes(downloaded)}/{humanbytes(f_size)}","speed": humanbytes(speed),"percentage": round(percentage, 2), })

            self.unzip(os.path.join(self.dicgoogle['Pathgame'], self.dicgoogle["zipfilename"]),self.dicgoogle['Pathgame'])

            self.signals.finished.emit({"tableview": "showidc_gameoffline", "row": self.dicgoogle['row'], "IDgame": self.dicgoogle['IDgame'],'Current_Down': self.totalsize})
        except HttpError as error:
            print(F'An error occurred: {error}')
            file = None

    def update_menu(self):
        query = f"SELECT * FROM Design"
        getdesign = get_curSQL('datagame.db', query=query)
        linkdown = getdesign[0]['linkdown']
        url = linkdown  # big file test
        # url = "http://localhost:8501/media/b217879d4881b4774ea867ac4be529a9501a1f44bee951122646ef74.bin?title=testfirebase%20%C2%B7%20Streamlit"
        # url = r"https://doc-08-6g-docs.googleusercontent.com/docs/securesc/9blqtrrgoac2qte0cp421ulnio76mqnh/i0unfhfv4cupa80v3b4obdkfdo0s1plr/1661751450000/11245555116073258449/11245555116073258449/1h1uehMtB8QhwIy9qe1ns1LZBWEfD-9MX?e=download&ax=AI9vYm4aSssuvLO28lV4XMrledxL280uBurcKkDfE0AjgxljMm7XqLJF4YVILFCCsEnY9IL8HIE7oC2WnUd6chfuaRyoLG0Hzw_WvCo9hY_4QnMiJ9diWsaRVpXYmeifaHSC4jcDiJ_Dn9oFpQjdJCMddvnrvkRUe8ICg9ojxb6185Wt93gM6ph40pGp255pk8VdNpUkPEMe-oTKuvO3waqQ8sbx1Ah6UZA7I1O2rw1g8vVzXEwodUb9h2uKV7q3bWqdKidNCupogR9ojNHW7QdJcZBWBKGKIXxqLXz9wTH7bBuNxlRWjlSWPdC0htXCk8LlntV8CWWk6Bjgs1RrF2ws7pCtDSQMxUbqIjsk8MKazarPpVgUd3VjEMRPZu1RVuTTdM86GU8ix2Y5QZUO29OO3uffEGK2RD2rY_z7lMMC9SvlVtNuCuqfn1PoSB161Sa7VG3rD6WXo2oO2syiy3ZWUDDx40ea3UiNVKYPSbUmDaOyQzWxzHCGPCUv7iSRCfMtQiof8-PcplF2VYPuOFTXsaiS5wjX09I4Twan3QgMo1e5o08Gu62J1nNFQikTx6BNDQepJRaoVAvIoAT105kOsPRaka4ajnoqX2D5HjCq2-JPVuoh-4SklU7RhnxknDFZm6PBx7t_acHDPvC754oL4c9VjZXlbXb930doR02RUmy_XQGHZZx9gOvvhxE4MHJMe67tbe81TLyDUQ&uuid=fdd6baed-76ae-47a0-8f28-b30ce29479c1&authuser=0&nonce=ppoid0489im2k&user=11245555116073258449&hash=obq7ure25qpj4s4g38deriubsmp15ok0"
        filename = url.split('/')[-1]
        response = None
        # Streaming, so we can iterate over the response.
        try:
            response = requests.get(url, stream=True)
        except:
            self.signals.error.emit("ERROR Download update, please update again!")
            print("ERROR, something went wrong")
            return
        total_size_in_bytes = int(response.headers.get('content-length', 0))
        block_size = 1024  # 1 Kibibyte
        progress_bar = tqdm(total=total_size_in_bytes, unit='iB', unit_scale=True)
        with open('update.zip', 'wb') as file:
            for data in response.iter_content(block_size):
                progress_bar.update(len(data))
                file.write(data)

                progress_dict = progress_bar.format_dict
                percentage = progress_dict['n'] / progress_dict['total'] * 100

                progress = str(progress_bar)
                Total = progress.split('|')[-1].split('/')[1].split('[')[0]
                currentspeed = progress.split('|')[-1].split('/')[0]
                time_val = progress.split('[')[-1].split(',')[0]
                elapsed = time_val.split('<')[0]
                remaining = time_val.split('<')[-1]

                message = f"Processing Total: {Total} at the rate of {currentspeed} Elapsed Time: {elapsed} Remaining Time {remaining} updating..."
                self.signals.progress.emit([self.bar, self.label, percentage, message])
        progress_bar.close()
        if total_size_in_bytes != 0 and progress_bar.n != total_size_in_bytes:
            self.signals.error.emit("ERROR Download update, please update again!")
            print("ERROR, something went wrong")
        else:
            # self.signals.finished.emit()
            self.extractall('update.zip', "E:\\test")

    #======================== extrac for App update ====================#
    def extractall(self,fzip, dest, desc="Extracting"):
        """zipfile.Zipfile(fzip).extractall(dest) with progress"""
        from zipfile import ZipFile
        from tqdm.utils import CallbackIOWrapper
        from pathlib import Path
        from shutil import copyfileobj
        from os import fspath

        dest = Path(dest).expanduser()
        with ZipFile(fzip) as zipf, tqdm(desc=desc, unit="B", unit_scale=True, unit_divisor=1024,
                                         total=sum(getattr(i, "file_size", 0) for i in zipf.infolist()), ) as pbar:
            for i in zipf.infolist():
                progress_dict = pbar.format_dict
                percentage = progress_dict['n'] / progress_dict['total'] * 100
                progress = str(pbar)
                Total = progress.split('|')[-1].split('/')[1].split('[')[0]
                currentspeed = progress.split('|')[-1].split('/')[0]
                time_val = progress.split('[')[-1].split(',')[0]
                elapsed = time_val.split('<')[0]
                remaining = time_val.split('<')[-1]

                message = f"Processing Total: {Total} at the rate of {currentspeed} Elapsed Time: {elapsed} Remaining Time {remaining} extract files..."
                if self.index == 'updateMenu':
                    self.signals.progress.emit([self.bar, self.label, percentage + 1, message])
                elif self.index == 'downgoogle':
                    self.signals.result.emit({"tableview": "showidc_gameoffline","row": self.dicgoogle['row'],"current": f"{currentspeed}/{Total}","speed": currentspeed,"percentage": percentage, })

                if not getattr(i, "file_size", 0):  # directory
                    zipf.extract(i, fspath(dest))
                else:
                    with zipf.open(i) as fi, open(fspath(dest / i.filename), "wb") as fo:
                        copyfileobj(CallbackIOWrapper(pbar.update, fi), fo)
            self.signals.finished.emit({"tableview": "update_app", })

    # ======================== unzip for Game ====================#
    def unzip(self, fzip, dest):
        import zipfile
        from os import fspath
        zf = zipfile.ZipFile(fzip)
        uncompress_size = sum((file.file_size for file in zf.infolist()))

        extracted_size = 0
        for file in zf.infolist():
            extracted_size += file.file_size
            percentage = extracted_size * 100 / uncompress_size
            self.totalsize = f"{humanbytes(extracted_size)}/{humanbytes(uncompress_size)}"
            self.signals.result.emit({"tableview": "showidc_gameoffline", "row": self.dicgoogle['row'], "current": self.totalsize, "speed": '', "percentage": round(percentage, 2), })
            zf.extract(file, fspath(dest))

#============================ Dashboard ================================#
class Dashboard(QtWidgets.QMainWindow):  # (QWidget):
    def __init__(self, parent=None):
        super(Dashboard, self).__init__(parent)
        # super().__init__()
        widget = loadUi(path +"Dashboard.ui", self)
        QMetaObject.connectSlotsByName(widget)
        self.setWindowIcon(QtGui.QIcon('logo.png'))

        # self.blockSignals(False)
        self.setUpdatesEnabled(True)
        # string value
        title = "Dashboard"
        # set the title
        self.setWindowTitle(title)
        # creating a QGraphicsDropShadowEffect object
        shadow = QGraphicsDropShadowEffect()
        shadow.setOffset(0, 0)
        # setting blur radius
        shadow.setBlurRadius(15)
        # setting border color
        shadow.setColor(Qt.green)
        self.showdata()
        self.initUI()
    def initUI(self):
        # adding shadow to the label
        # self.lblogo.setGraphicsEffect(shadow)

        ########### loading screen #############################

        self.gif_file = QMovie("loading.gif", parent=self)  # This is the "wrong" gif
        self.gif_file.start()
        self.gif_label = QLabel(self)
        self.gif_label.setMovie(self.gif_file)
        self.gif_label.move(self.width()/3.3, 100)
        self.gif_label.setAlignment(Qt.AlignCenter)
        self.gif_label.setWindowFlags(Qt.FramelessWindowHint)
        self.gif_label.setAttribute(Qt.WA_TranslucentBackground)
        self.gif_label.setFixedSize(500, 500)
        # .setGeometry(1427, 30, 162, 231)
        self.gif_label.hide()

        ######### Bottom Dashboard ##########
        # self.statusbar = self.statusBar()
        # self.statusbar.showMessage('message')
        #####################################

        #self.setWindowFlags(Qt.WindowStaysOnTopHint)
        # self.setWindowFlag(Qt.FramelessWindowHint)
        self.setWindowFlags(self.windowFlags() | Qt.FramelessWindowHint | Qt.WindowStaysOnTopHint)

        # khoi tao thread cap nhật tablewidget
        self.pool = QtCore.QThreadPool.globalInstance()  # .globalInstance

        #self.pool.setMaxThreadCount(1)
        self.end_time = time.time()

        self.thread = {}
        self.start_worker_1()


        # get event click tablewiget
        #self.tableWidget.setMouseTracking(True)

        # change color select row cho tableview
        # self.tableView.setStyleSheet("QTableView::item:selected{"
        #                            "background:rgb(135, 206, 255)}")
        # self.tableView.setMouseTracking(True)
        self.tableView.verticalHeader().setVisible(False)
        self.tableView.setItemDelegate(ColorDelegate(index='monitor'))
        self.tableView.setSelectionBehavior(QtWidgets.QAbstractItemView.SelectRows)
        self.tableView.setContextMenuPolicy(Qt.CustomContextMenu)
        # self.tableView.customContextMenuRequested.connect(self.ContextMenu_monitor)


        self.tableView_hardware.setItemDelegate(ColorDelegate(index='hardware'))
        self.tableView_hardware.setSelectionBehavior(QtWidgets.QAbstractItemView.SelectRows)
        self.tableView_hardware.setContextMenuPolicy(Qt.CustomContextMenu)
        # self.tableView_hardware.customContextMenuRequested.connect(self.ContextMenu_hardware)
        self.tableView_hardware.customContextMenuRequested.connect(self.contextMenu_total)


        self.tableViewhidesoft.verticalHeader().setVisible(False)
        self.tableViewhidesoft.setItemDelegate(ColorDelegate(index='hideapp'))
        self.tableViewhidesoft.setSelectionBehavior(QtWidgets.QAbstractItemView.SelectRows)
        self.tableViewhidesoft.setContextMenuPolicy(Qt.CustomContextMenu)
        # self.tableViewhidesoft.customContextMenuRequested.connect(self.ContextMenu_hideApp)
        self.tableViewhidesoft.customContextMenuRequested.connect(self.contextMenu_total)
        self.tableViewhidesoft.doubleClicked.connect(self.on_doubleClicked)

        self.tableView_gateway.verticalHeader().setVisible(False)
        self.tableView_gateway.setItemDelegate(ColorDelegate(index='gateway'))
        self.tableView_gateway.setSelectionBehavior(QtWidgets.QAbstractItemView.SelectRows)
        self.tableView_gateway.setContextMenuPolicy(Qt.CustomContextMenu)
        # self.tableView_gateway.customContextMenuRequested.connect(self.ContextMenu_gateway)
        self.tableView_gateway.customContextMenuRequested.connect(self.contextMenu_total)
        self.tableView_gateway.doubleClicked.connect(self.on_doubleClicked)

        # self.tableallgame.setMouseTracking(True)
        self.tableallgame.verticalHeader().setVisible(False)
        self.tableallgame.setItemDelegate(ColorDelegate(index='allgame'))
        self.tableallgame.setSelectionBehavior(QtWidgets.QAbstractItemView.SelectRows)
        self.tableallgame.setContextMenuPolicy(Qt.CustomContextMenu)
        # self.tableallgame.customContextMenuRequested.connect(self.ContextMenu_allgame)
        self.tableallgame.customContextMenuRequested.connect(self.contextMenu_total)
        self.tableallgame.doubleClicked.connect(self.on_doubleClicked)

        # IDC table
        # self.tableView_idcgameonline.setStyleSheet("::item:hover{background-color: rgb(249, 175, 42);}")

        # self.tableView_idcgameonline.setMouseTracking(True)
        self.tableView_idcgameonline.verticalHeader().setVisible(False)
        self.tableView_idcgameonline.setItemDelegate(ColorDelegate(index='IDC_GameOnline'))
        self.tableView_idcgameonline.setSelectionBehavior(QtWidgets.QAbstractItemView.SelectRows)
        self.tableView_idcgameonline.setContextMenuPolicy(Qt.CustomContextMenu)
        # self.tableView_idcgameonline.customContextMenuRequested.connect(self.ContextMenu_IDCGameOnline)
        self.tableView_idcgameonline.customContextMenuRequested.connect(self.contextMenu_total)
        self.tableView_idcgameonline.doubleClicked.connect(self.on_doubleClicked)

        self.tableView_idcgameoffline.verticalHeader().setVisible(False)
        # self.tableView_idcgameoffline.setShowGrid(False)
        self.tableView_idcgameoffline.setItemDelegate(ColorDelegate(index='IDC_GameOffline'))
        self.tableView_idcgameoffline.setSelectionBehavior(QtWidgets.QAbstractItemView.SelectRows)
        self.tableView_idcgameoffline.setContextMenuPolicy(Qt.CustomContextMenu)
        # self.tableView_idcgameonline.customContextMenuRequested.connect(self.ContextMenu_IDCGameOnline)
        self.tableView_idcgameoffline.customContextMenuRequested.connect(self.contextMenu_total)
        self.tableView_idcgameoffline.doubleClicked.connect(self.on_doubleClicked)

        self.tableView_idctool.verticalHeader().setVisible(False)
        self.tableView_idctool.setItemDelegate(ColorDelegate(index='IDC_Tools'))
        self.tableView_idctool.setSelectionBehavior(QtWidgets.QAbstractItemView.SelectRows)
        self.tableView_idctool.setContextMenuPolicy(Qt.CustomContextMenu)
        # self.tableView_idcgameonline.customContextMenuRequested.connect(self.ContextMenu_IDCGameOnline)
        self.tableView_idctool.customContextMenuRequested.connect(self.contextMenu_total)



        self.tablelistappnew.verticalHeader().setVisible(False)
        # self.tablelistappnew.setShowGrid(False)
        self.tablelistappnew.setItemDelegate(ColorDelegate(index='showlistAppNew'))
        self.tablelistappnew.setSelectionBehavior(QtWidgets.QAbstractItemView.SelectRows)
        self.tablelistappnew.setContextMenuPolicy(Qt.CustomContextMenu)
        self.tablelistappnew.doubleClicked.connect(self.on_doubleClicked)


        # self.tablelistappnew.customContextMenuRequested.connect(self.ContextMenu_allgame)

        # get event click tablewiget
        # self.tableWidget.viewport().installEventFilter(self)
        # self.tablemonitor.viewport().installEventFilter(self)
        # self.tablegameonline.viewport().installEventFilter(self)
        # self.tablehidesoft.viewport().installEventFilter(self)
        self.setAttribute(Qt.WA_TranslucentBackground)
        #self.centralWidget.setGraphicsEffect(self.shadow)
        #self.setWindowIcon(QtGui.QIcon("./icons/icons/black-shades.svg"))

        self.txtCpu.textChanged.connect(self.setCPU)
        self.txtRam.textChanged.connect(self.setRam)
        self.txtspeeddown.textChanged.connect(self.setdown_resilio)
        self.txtpathgameonline.textChanged.connect(self.setPathGameOnline)
        self.txtpathgameoffline.textChanged.connect(self.setPathGameOffline)
        self.txtpathtools.textChanged.connect(self.setPathTools)


        QSizeGrip(self.frame_resize)

        ###################### Design ###################################################
        self.Btnimage.clicked.connect(self.Getimage_banner)
        self.BtnchangeBg.clicked.connect(self.Getimage_backgroundClient)
        self.BtnStartBackgroundClient.clicked.connect(self.setBackgroundClient)
        self.savedesign.clicked.connect(self.save_design)
        self.Btntools.clicked.connect(self.getpath_tools)
        self.Btn_pathGameonline.clicked.connect(self.getpath_gameonline)
        self.Btn_pathGameoffline.clicked.connect(self.getpath_gameoffline)
        #self.hidensoft.stateChanged.connect(self.hide_soft)
        self.btnhide.clicked.connect(self.hide_soft)
        self.btnstartservice.clicked.connect(self.startstop_service)

        self.checklicsent.clicked.connect(boxlogin)

        for text, url in zip(("1920x1080","1600x900","1366x768"),("1920x1080","1600x900","1366x768")):
            self.comboBox.addItem(text, url)
        self.comboBox.currentIndexChanged.connect(self.combox_size)
        self.stackedWidget_Mainbody.currentChanged.connect(self.stackedwidget_change)


        self.BtnMax.clicked.connect(self.restore_max)
        self.BtnClose.clicked.connect(self.closeapp)
        self.BtnMin.clicked.connect(self.minimumapp)
        self.Btn_slide.clicked.connect(self.slideLeftMenu)
        self.btnversion.clicked.connect(self.stardownload2)

        self.searchgame.textChanged.connect(self.Search_game)
        self.pushButton_10.clicked.connect(lambda: find_files("txt", "C:\\a"))

        self.Setting.clicked.connect(lambda: self.stackedWidget_Mainbody.setCurrentIndex(2))
        self.Allgame.clicked.connect(lambda: self.stackedWidget_Mainbody.setCurrentIndex(0))
        self.Monitor.clicked.connect(lambda: self.stackedWidget_Mainbody.setCurrentIndex(3))
        self.idc.clicked.connect(lambda: self.stackedWidget_Mainbody.setCurrentIndex(1))

        self.startPos = None

        # event click trái di chuyển form đi chung với hàm mousePressEvent
        def moveWindow(e):
            if self.isMaximized() == False:
                if e.buttons() == Qt.LeftButton:
                    # print("click phải")
                    self.move(self.pos() + e.globalPos() - self.clickPosition)
                    self.clickPosition = e.globalPos()
                    e.accept()


        self.topBar.mouseMoveEvent = moveWindow
        self.update()  # where self is the name of the window you want to force to update
        app.processEvents()

        ############
        # self.RoundBar4 = QRoundProgressBar()
        # self.RoundBar4.setStyleSheet("background-color: rgb(31, 37, 47);")
        # self.RoundBar4.setBarStyle(QRoundProgressBar.BarStyle.DONUT)
        #
        # # style accordingly via palette
        # p1 = QPalette()
        # brush = QBrush(QColor(0, 0, 255))
        # brush.setStyle(Qt.SolidPattern)
        # p1.setBrush(QPalette.Active, QPalette.Highlight, brush)
        # p1.setBrush(QPalette.AlternateBase, QColor(58, 58, 102))
        # p1.setColor(QPalette.Text, Qt.yellow)
        # self.RoundBar4.setPalette(p1)
        #
        # #self.RoundBar4.setNullPosition(QRoundProgressBar.PositionLeft)
        # self.RoundBar4.setDecimals(0)
        # gradientPoints = [(0, Qt.green), (0.5, Qt.yellow), (1, Qt.red)]
        # self.RoundBar4.setDataColors(gradientPoints)
        #
        #
        # # self.progress.setPalette(p1)
        # # self.progress.setDecimals(2)
        # # self.progress.setOutlinePenWidth(1)
        # # self.progress.setDataPenWidth(2)
        #
        # lay = self.verticalLayout_9
        # lay.addWidget(self.RoundBar4)
        # self.setLayout(lay)
        ################# khởi tạo roundbar #####################
        self.RoundBar4= self.createQprogressbar(self.verticalLayout_9)
        self.RoundBar5 = self.createQprogressbar(self.verticalLayout_10)

        self.cpu_percent = 0
        self.ram_percent = 0
        self.traces = dict()
        self.timestamp = 0

        ################ event hotkey #############################

        manager = KeyBoardManager(self)
        manager.F1Signal.connect(self.showapp_window)
        manager.start()

        ############# loop info cpu ram of server #################

        self.current_timer_systemStat = QtCore.QTimer()
        self.current_timer_systemStat.timeout.connect(
            self.getsystemStatpercent)
        self.current_timer_systemStat.start(1000)

        ######### Check service ######################
        service = self.getService('rslsyncsvckl')
        if service:
            print("service found")
            # self.btnstartservice.setText("Service Menu Game is stopping...")
            if service and service['status'] == 'running':
                print("service is running")
            else:
                print("service is not running")
                self.btnstartservice.setText("Service Menu Game is stopping...")
                self.btnstartservice.setIcon(QtGui.QIcon('./icons/unchecked.png'))
        else:
            print("service not found")
            self.btnstartservice.setIcon(QtGui.QIcon('./icons/unchecked.png'))
            self.btnstartservice.setText("service not found...")

        ######### Check Server-monitor ######################
        internet_on('127.0.0.1', 8100)  # check_port
        print('ip check', final)
        # try:
        #     if final[ipclient] == "OPEN":
        if final['127.0.0.1'] == "CLOSED":
            print("Server-monitor is stopping")
            self.Btnautoupdate.setIcon(QtGui.QIcon('./icons/unchecked.png'))
            self.Btnautoupdate.setText("Server-monitor is stopping...")
        else:
            print("Server-monitor is Running")
            self.Btnautoupdate.setIcon(QtGui.QIcon('./icons/done.png'))
            self.Btnautoupdate.setText("Server-monitor is Running...")

        # self.showdata()
        # self.ThreadTrain = Workers(self.showdata)
        # self.ThreadTrain.start()
        # self.pool.start(self.showdata)

        self.threadgameoff = {}
        self.count = 0
        self._flags = self.windowFlags()

    ################## gameoffline_downgoogle #########################
    def start_thread_google(self, dictgoogle):
        if not 'resilio.com' in dictgoogle['linkgame']:
            # print('down_google')
            self.model_idcgameoffline.update_item(dictgoogle['row'], 0, 'Downloading...')
            self.model_idcgameoffline.update_item(dictgoogle['row'], 9, 'Waiting connect...')
            # self.worker = Worker(index='downgoogle', dictgoogle=dictgoogle)  # add biến vào hàm
            # self.worker.signals.result.connect(self.showtableview_loop)
            # self.worker.signals.finished.connect(self.end_dowload_google)
            # self.pool.start(self.worker)
            worker = Worker(index='downgoogle', dictgoogle=dictgoogle)  # add biến vào hàm
            worker.signals.result.connect(self.showtableview_loop)
            worker.signals.finished.connect(self.end_dowload_google)
            self.pool.start(worker)
    def end_dowload_google(self,dict):
        print('ket thuc down: ', dict)
        ID = dict["IDgame"]
        Current_Down = dict['Current_Down']
        row = dict['row']

        self.model_idcgameoffline.update_item(row, 7, '0.0 Byte')
        self.model_idcgameoffline.update_item(row, 9, 'Ready')
        query = f"UPDATE Gamelist SET Totalsize='{Current_Down}',Status='Ready' WHERE ID='{ID}'"
        get_curSQL('gamelist.db', query=query)

    ##################### cpu % progressbar ###########################
    def getsystemStatpercent(self):
        # gives a single float value
        self.cpu_percent = psutil.cpu_percent()
        self.ram_percent = psutil.virtual_memory().percent
        self.RoundBar4.rpb_setValue(self.ram_percent)
        self.RoundBar5.rpb_setValue(self.cpu_percent)

        end_time1 = time.time()
        seconds = end_time1 - self.end_time
        hours = seconds // 3600
        minutes = (seconds % 3600) // 60
        seconds = (seconds % 60)
        timecurent = f'{int(hours)}:{int(minutes)}:{int(seconds)}  '
        self.lbtime.setText(str(timecurent))
    # def setValue(self, value, labelPercentage, progressBarName, color):
    #
    #     sliderValue = value
    #
    #     # HTML TEXT PERCENTAGE
    #     htmlText = """<p align="center"><span style=" font-size:50pt;">{VALUE}</span><span style=" font-size:40pt; vertical-align:super;">%</span></p>"""
    #     labelPercentage.setText(htmlText.replace(
    #         "{VALUE}", f"{sliderValue:.1f}"))
    #
    #     # CALL DEF progressBarValue
    #     self.progressBarValue(sliderValue, progressBarName, color)
    #
    #     # DEF PROGRESS BAR VALUE
    #     ########################################################################
    #
    # def progressBarValue(self, value, widget, color):
    #     # PROGRESSBAR STYLESHEET BASE
    #     styleSheet = """
    #                        QFrame{
    #                        	border-radius: 110px;
    #                        	background-color: qconicalgradient(cx:0.5, cy:0.5, angle:90, stop:{STOP_1} rgba(255, 0, 127, 0), stop:{STOP_2} {COLOR});
    #                        }
    #                        """
    #
    #     # GET PROGRESS BAR VALUE, CONVERT TO FLOAT AND INVERT VALUES
    #     # stop works of 1.000 to 0.000
    #     progress = (100 - value) / 100.0
    #
    #     # GET NEW VALUES
    #     stop_1 = str(progress - 0.001)
    #     stop_2 = str(progress)
    #
    #     # FIX MAX VALUE
    #     if value == 100:
    #         stop_1 = "1.000"
    #         stop_2 = "1.000"
    #
    #     # SET VALUES TO NEW STYLESHEET
    #     newStylesheet = styleSheet.replace("{STOP_1}", stop_1).replace(
    #         "{STOP_2}", stop_2).replace("{COLOR}", color)
    #
    #     # APPLY STYLESHEET WITH NEW VALUES
    #     widget.setStyleSheet(newStylesheet)
    def createQprogressbar(self, QVBoxLayout):
        ############
        # CREATING THE ROUND PROGRESS BAR OBJECT
        rpb = roundProgressBar()
        # ADDING THE ROUND PROGRESS BAR OBJECT TO THE                                             # BOTTOM OF THE LAYOUT

        # RoundBar4 = QRoundProgressBar()
        #
        # RoundBar4.setStyleSheet("QRoundProgressBar{ border: 0; border-width: 6; border-radius: 12px; text-align: centre; margin-right: 12; }, QRoundProgressBar::chunk:vertical {border: 0;background-color: #05B8CC; width: 20px;}");
        # RoundBar4.setBarStyle(QRoundProgressBar.BarStyle.DONUT)
        #
        # # style accordingly via palette
        # p1 = QPalette()
        #
        # brush = QBrush(QColor(0, 0, 255))
        #
        # brush.setStyle(Qt.SolidPattern)
        # #p1.setBrush(QPalette.Active, QPalette.Highlight, brush)
        # p1.setBrush(QPalette.AlternateBase, QColor(31, 37, 47))
        # #p1.setColor(QPalette.Text, Qt.yellow)
        # RoundBar4.setPalette(p1)
        #
        # # self.RoundBar4.setNullPosition(QRoundProgressBar.PositionLeft)
        # RoundBar4.setDecimals(0)
        # gradientPoints = [(0, Qt.green), (0.5, Qt.yellow), (1, Qt.red)]
        # RoundBar4.setDataColors(gradientPoints)
        #rpb.rpb_setBarStyle('Line')
        rpb.rpb_setPathColor((43,42,51))
        rpb.rpb_setTextColor((255, 255, 255))
        rpb.rpb_setLineCap('RoundCap')
        #rpb.rpb_setLineWidth(10)
        rpb.rpb_setRange(0, 180)
        rpb.rpb_setTextRatio(6)
        lay = QVBoxLayout
        lay.addWidget(rpb)

        return rpb

    ###################### combobox design ############################
    @pyqtSlot(int)
    def combox_size(self, ix):
        url = self.comboBox.itemData(ix)
        # self.Groupgame.setText(url)
        print(url)

    ###################### download v2 update_menu ###################
    def stardownload2(self):
        self.stackedwidget_change()
        version = 1.0
        # response = requests.get(self.linkcheckupdate)  # "https://raw.githubusercontent.com/khaicafe/update/main/update.txt"
        # data = response.text
        if float(self.data_version) > float(version):
            ret = QMessageBox.question(self, 'MessageBox', f'Really update the menu new version {self.data_version} ?',
                                       QMessageBox.Yes | QMessageBox.No)
            if ret == QMessageBox.Yes:
                # self.statusbar = self.statusBar()
                print('oki down', self.data_version)
                # self.statusbar.showMessage('')
                self.btnversion.setEnabled(False)
                for i in range(1):
                    ProgressBar = QProgressBar()
                    ProgressBar.setGeometry(200, 100, 200, 30)
                    # setting the value
                    # ProgressBar.setValue(30)
                    # setting alignment to center
                    ProgressBar.setAlignment(Qt.AlignCenter)
                    # setting background to invisible
                    ProgressBar.setStyleSheet("""QProgressBar{
                                              background-color: rgba(0, 0, 0, 0);
                                              border: 0px;
                                              width: 100px;
                                              height: 10px;
                                              }""")
                    self.labeldownload = QLabel()
                    self.layoutdownload.addWidget(ProgressBar)
                    self.layoutdownload.addWidget(self.labeldownload)

                    self.worker = Worker(i, ProgressBar, self.labeldownload, index="updateMenu")  # add biến vào hàm
                    self.worker.signals.progress.connect(self.setProgress)
                    self.worker.signals.finished.connect(self.downloadFinished)
                    self.worker.signals.error.connect(self.error_download)
                    self.pool.start(self.worker)
        else:
            pass
    def setProgress(self, l):
        bar, label, num, message = l
        # self.statusbar.showMessage(message)

        # self.numage
        # self.progressBar_1.setValue(num)
        label.setText(message)
        bar.setValue(num)
    def downloadFinished(self):
        # Restore the button.
        self.btnversion.setEnabled(True)
        # Delete the thread when no longer needed.
        # del self.worker
        # self.statusbar.showMessage('The file has been downloaded!')
        self.labeldownload.setText('   Update successful!')
        # self.btnversion.setText(f"Version: 2.0")
        offmain()

        # zipextract('update.zip', "E:\\test")
    def error_download(self,errortext):
        self.labeldownload.setText(errortext)
        self.btnversion.setEnabled(True)
        pass

    ###################### event stackedwidget_change ###################
    def stackedwidget_change(self):
        for i in reversed(range(self.layoutdownload.count())):
            self.layoutdownload.itemAt(i).widget().deleteLater()
        currentWidget = self.stackedWidget_Mainbody.currentIndex()
        print('stackwidget ',currentWidget)

    ######################## show tableView ############################
    def start_worker_1(self):
        self.thread[1] = ThreadClass(parent=None, index='monitor')
        self.thread[1].start()
        self.thread[1].any_signal.connect(self.showmonitor)
        self.thread[1].signal.connect(self.showtableview_loop)

        self.thread[2] = ThreadClass(parent=None, index='showhardware')
        self.thread[2].start()
        self.thread[2].any_signal.connect(self.showhardware)
        self.thread[2].signal.connect(self.showtableview_loop)


        self.thread[3] = ThreadClass(parent=None, index='IDC_GameOnline')
        self.thread[3].start()
        self.thread[3].any_signal.connect(self.show_idcgameonline)
        self.thread[3].signal.connect(self.showtableview_loop)

        self.thread[6] = ThreadClass(parent=None, index='IDC_GameOffline')
        self.thread[6].start()
        self.thread[6].any_signal.connect(self.show_idcgameoffline)
        self.thread[6].signal.connect(self.showtableview_loop)

        # self.thread[7] = ThreadClass(parent=None, index='IDC_Tools')
        # self.thread[7].start()
        # self.thread[7].any_signal.connect(self.show_idcTools)
        # self.thread[7].signal.connect(self.showtableview_loop)

        self.thread[4] = ThreadClass(parent=None, index='showlistAppNew')
        self.thread[4].start()
        self.thread[4].any_signal.connect(self.showlistAppNew)
        self.thread[4].signal.connect(self.showtableview_loop)

        self.thread[5] = ThreadClass(parent=None, index='showallgame')
        self.thread[5].start()
        self.thread[5].any_signal.connect(self.showallgame)
        self.thread[5].signal.connect(self.showtableview_loop)

        # self.worker = Worker(1, self.tableTemp)  # add biến vào hàm
        # self.worker.signals.progress.connect(self.showmonitor)
        # #self.worker.signals.finished.connect(self.downloadFinished)
        # self.pool.start(self.worker)

    #============================= Hàm show Table ===========================#
    def showdata(self):

        # ======================= Refesh Resilio web ============================ #
        threading.Thread(daemon=True, target=self.Refesh_resilio).start()

        # ======================== connect database ============================#
        query = "SELECT * FROM Listgame Where Groupgame='Game Online' order by CAST(ID AS INTEGER)"
        getgameonline = get_curSQL('datagame.db',query=query)
        query = "SELECT * FROM Listgame Where Groupgame='Game Offline' order by CAST(ID AS INTEGER)"
        getgameoffline = get_curSQL('datagame.db', query=query)
        query = "SELECT * FROM Design"
        getdesign = get_curSQL('datagame.db', query=query)



        ########################### Setting #########################################
        self.txtCpu.setText(f"{getdesign[0]['setCPU']}")
        self.txtRam.setText(f"{getdesign[0]['setRAM']}")
        try:
            pixmap = QPixmap()
            pixmap.loadFromData(getdesign[0]['Banner'])
            # pixmap.devicePixelRatioFScale()
            # pixmap.scaledToHeight()
            self.lbimage.setPixmap(pixmap.scaled(500,100,Qt.KeepAspectRatio, Qt.SmoothTransformation))
            self.lbimage.setScaledContents(True)
        except:
            print('chua set banner')
            pass

        try:
            with open('./static/hinhnen/backgroundClient.jpg', 'rb') as f:
                filetemp = f.read()
            pixmap.loadFromData(filetemp)
            self.lbbackground.setPixmap(pixmap.scaled(500,100,Qt.KeepAspectRatio, Qt.SmoothTransformation))
            # self.lbbackground.setPixmap(pixmap.scaledToWidth(500))
            self.lbbackground.setScaledContents(True)
        except:
            print('chua set backgroundClient')
            pass

        self.Shopname.setText(getdesign[0]['tenphongmay'])
        self.TiteKM.setText(getdesign[0]['ADS'])
        self.containKM.setText(getdesign[0]['Contains'])
        self.labelipserver.setText("IP Server: "+ local_ip)
        self.txtspeeddown.setText(str(getdesign[0]['SpeedDown']))
        self.txtpathgameonline.setText(getdesign[0]['PathGameOnline'])
        self.txtpathgameoffline.setText(getdesign[0]['PathGameOffline'])
        self.txtpathtools.setText(getdesign[0]['PathTools'])

        if getdesign[0]['hidesoft'] == '0':
            self.btnhide.setIcon(QtGui.QIcon('./icons/unchecked.png'))
        else:
            self.btnhide.setIcon(QtGui.QIcon('./icons/done.png'))

        if getdesign[0]['BackgroundClient'] == '0':
            self.BtnStartBackgroundClient.setIcon(QtGui.QIcon('./icons/unchecked.png'))
        else:
            self.BtnStartBackgroundClient.setIcon(QtGui.QIcon('./icons/done.png'))

        self.labelipserver.setIcon(QtGui.QIcon('./icons/done.png'))
        self.Btnimage.setIcon(QtGui.QIcon('./icons/done.png'))
        self.btnhide_2.setIcon(QtGui.QIcon('./icons/done.png'))
        self.BtnClose.setIcon(QtGui.QIcon('./icons/power.svg'))
        self.BtnMax.setIcon(QtGui.QIcon('./icons/maximize-2.svg'))
        self.BtnMin.setIcon(QtGui.QIcon('./icons/minus.svg'))

        self.checklicsent.setIcon(QtGui.QIcon('./icons/done.png'))
        # self.Btnautoupdate.setIcon(QtGui.QIcon('./icons/done.png'))

        ''''''
        ########################## show table ###############################################
        self.showtable_hideapp()
        self.showtable_gateway()

        ############################ Tab All Game ###################################
        self.lbgameonline.setText('Online Games : '+str(len(getgameonline))) ### so luong games
        self.lbgameoff.setText('Offline Games : '+str(len(getgameoffline))) ### hien thi so luong games

        ######################### Save IP_Server ################################
        Save_localip()

        #============================= Check version ============================#
        version = getdesign[0]['version']
        new_version = getdesign[0]['new_version']
        threading.Thread(target=lambda: self.checkversion(version, new_version), daemon=True)
        # self.checkversion(version, new_version)

    def showmonitor(self,data):
        if data == [] or data == None:
            # print('data None')
            self.tableView.setModel(None)
        else:
            proxy, self.model_showmonitor = self.getdata_proxy(data)
            cpu = self.txtCpu.text()
            ram = self.txtRam.text()
            try:
                if isinstance(int(cpu), int):
                    pass
                    #print('oki')
            except:
                print('phải nhập số')
                cpu = 100
            try:
                if isinstance(int(ram), int):
                    pass
                    #print('oki')
            except:
                print('phải nhập số')
                ram = 100
            # paint first two rows
            Clientwarming = 0
            for i in range(len(data)):
                if (float(data[i]['CpuUse'])) >= int(cpu) or (float(data[i]['RamPercent'])) >= int(ram):
                    # print('pcwarming: ', int(cpu), int(ram), len(data[0]))
                    Clientwarming += 1
                    for j in range(len(data[0])):
                        self.model_showmonitor.setData(self.model_showmonitor.index(i, j), QBrush(Qt.red), QtCore.Qt.BackgroundRole)
                        # tasktablemodel.change_color(proxy.index(i, j), QBrush(Qt.red), QtCore.Qt.BackgroundRole)
                        pass

            self.tableView.setModel(proxy)
            self.tableView.setEditTriggers(QAbstractItemView.NoEditTriggers)
            self.tableView.horizontalHeader().setSectionResizeMode(QHeaderView.Stretch)
            self.tableView.setSelectionMode(QAbstractItemView.SingleSelection)

            ############ thong bao Client ####################
            query = "SELECT * FROM listClient"
            gettotal_client = get_curSQL('clientdata.db', query=query)
            self.lbtotalClient.setText(f"{str(len(data))}/{len(gettotal_client)}")
            self.lbwarming.setText(str(Clientwarming))


        #self.model.change_color(row, column, QBrush(Qt.red))

        # for i in range(0, proxy.rowCount()):
        #     progress = QtWidgets.QProgressBar()
        #     progress.setAlignment(Qt.AlignVCenter)
        #     progress.setStyleSheet(
        #         "QProgressBar { border: 1px solid grey; border-radius: 2px; color: #5555ff; text-align: center;}")
        #     progress.setValue(random.randint(0, 100))  # (float(data[i]['CpuUse'].split(' ')[0]))
        #     self.tableView.setIndexWidget(proxy.index(i, 3), progress)
        #
        #     progress1 = QtWidgets.QProgressBar()
        #     progress1.setAlignment(Qt.AlignVCenter)
        #     progress1.setStyleSheet(
        #         "QProgressBar {border: 1px solid grey; border-radius: 2px; color: #5555ff; text-align: center;}")
        #
        #     progress1.setValue(float(data[i]['RamPercent'].split(' ')[0]))
        #     self.tableView.setIndexWidget(proxy.index(i, 7), progress1)

            #id = indexa.sibling(indexa.row(), 9).data()



            # lay = QVBoxLayout()
            # RoundBar = self.createQprogressbar(lay)
            # RoundBar.rpb_setValue(float(data[i]['RamPercent'].split(' ')[0]))
            # print(RoundBar.sizeHint())
            # self.tableView.setIndexWidget(self.proxy.index(i, 7), RoundBar)
            # self.tableView.setSizeAdjustPolicy(QtWidgets.QAbstractScrollArea.AdjustToContents)
            #self.tableView.setFixedSize(20,20)



            # if self.tasktablemodel._data[i][8] == 0 and self.tasktablemodel._data[i][9] == 0:
            #     delete = QtWidgets.QPushButton()
            #     #delete.clicked.connect(self.Kill_Task_clicked)
            #     self.tasktablemodel.layoutChanged.connect(delete.deleteLater)
            #     delete.setText("")
            #     #delete.setIcon(QtGui.QIcon('src/ui/delete-icon.png'))
            #     self.TaskTable.setIndexWidget(self.tasktablemodel.index(i, 0), None)

        # self.tableView.setColumnHidden(8, True)
        # self.tableView.setColumnHidden(9, True)
        #self.tableView.resizeColumnsToContents()
        #self.tableView.scrollToBottom()
    def showhardware(self, data):
        if data == [] or data == None:
            pass
        else:
            pcwarming = 0
            for i in range(len(data)):
                if (len(data[i]['Status'])) > 1:
                    pcwarming += 1
            self.lbhardware.setText(str(pcwarming))

            proxy, self.model_showhardware = self.getdata_proxy(data)
            self.tableView_hardware.setModel(proxy)
            self.tableView_hardware.setEditTriggers(QAbstractItemView.NoEditTriggers)
            self.tableView_hardware.resizeColumnsToContents()
            self.tableView_hardware.resizeRowsToContents()

            self.tableView_hardware.horizontalHeader().setSectionResizeMode(2,QHeaderView.Stretch)
            self.tableView_hardware.horizontalHeader().setSectionResizeMode(3, QHeaderView.Stretch)
            self.tableView_hardware.horizontalHeader().setSectionResizeMode(6, QHeaderView.Stretch)

            self.tableView_hardware.setSelectionMode(QAbstractItemView.SingleSelection)

            # self.tableView_hardware.setWordWrap(True)
            # self.tableView_hardware.setSizeAdjustPolicy(QtWidgets.QAbstractScrollArea.AdjustToContents)
            # self.tableView_hardware.setRowHeight(0,100)
            # self.tableView_hardware.setSizeAdjustPolicy(QtWidgets.QAbstractScrollArea.AdjustToContents)
            # self.tableView_hardware.horizontalHeader().setStretchLastSection(True)
            # tableview.setSizePolicy(QtWidgets.QSizePolicy.Minimum, QtWidgets.QSizePolicy.Minimum) # ---
            # self.tableView_hardware.setSizePolicy(QtWidgets.QSizePolicy.Expanding, QtWidgets.QSizePolicy.Maximum)  # +++
            # self.tableView_hardware.horizontalHeader().setSectionResizeMode(6, QHeaderView.Stretch)
    def showallgame(self,data):
        if data == [] or data == None:
            pass
        else:
            columns = data[0].keys()
            proxy, self.model_showallgame = self.getdata_proxy(data)

            self.tableallgame.setModel(proxy)
            proxy = ImageCenterProxyStyle(self.tableallgame.style())
            self.tableallgame.setStyle(proxy)

            self.tableallgame.setEditTriggers(QAbstractItemView.NoEditTriggers)
            self.tableallgame.resizeColumnsToContents()
            self.tableallgame.resizeRowsToContents()

            for i in range(len(columns)):
                if i > 2:
                    self.tableallgame.horizontalHeader().setSectionResizeMode(i, QHeaderView.Stretch)
            # self.tableallgame.horizontalHeader().setSectionResizeMode(6, QHeaderView.Stretch)
            # self.tableallgame.resizeColumnsToContents()
            self.tableallgame.setColumnHidden(7, True)
            # self.tableallgame.setSelectionBehavior(QtWidgets.QTableView.SelectRows)
            self.tableallgame.setSelectionMode(QAbstractItemView.SingleSelection)

        # for i in range(0, proxy.rowCount()):
        #     label = QLabel(str(getdata[i]['Groupgame']), self)
        #     label.setAlignment(Qt.AlignCenter)
        #     label.setText("")
        #     label.setStyleSheet("padding: 0px; ")
        #     imagedata = getdata[i]['imagedata']
        #     try:
        #         pixmap = QPixmap()
        #         pixmap.loadFromData(imagedata)
        #         label.setPixmap(pixmap.scaled(50,30))
        #         #self.label.setScaledContents(True)
        #     except:
        #         pass
        #     label.setAlignment(Qt.AlignCenter)
        #     self.tableallgame.setIndexWidget(proxy.index(i, 1), label)

            # self.tableallgame.setIndexWidget(proxy.index(i, 2), label)
            #self.tableallgame.setItemDelegateForColumn(i, delegate)
        #self.tableallgame.resizeColumnsToContents()

            #if j == 1:
            # self.label.setText("")
            # self.label.setStyleSheet("padding: 0px; ")
            # self.imagedata = getdata[i][]
            # try:
            #     pixmap = QPixmap()
            #     pixmap.loadFromData(self.imagedata)
            #     self.label.setPixmap(pixmap.scaled(50,30))
            #     #self.label.setScaledContents(True)
            # except:
            #     pass
            # self.label.setAlignment(Qt.AlignCenter)
            # self.tableWidget.setCellWidget(i, j, self.label)
            # #else:
            #     try:
            #         # self.tableWidget.setItem(i, j, QTableWidgetItem(str(getdata[i][j])))
            #         self.tableWidget.setCellWidget(i, j, self.label)
            #     except:
            #         pass

            #id = indexa.sibling(indexa.row(), 9).data()



            # lay = QVBoxLayout()
            # RoundBar = self.createQprogressbar(lay)
            # RoundBar.rpb_setValue(float(data[i]['RamPercent'].split(' ')[0]))
            # print(RoundBar.sizeHint())
            # self.tableView.setIndexWidget(self.proxy.index(i, 7), RoundBar)
            # self.tableView.setSizeAdjustPolicy(QtWidgets.QAbstractScrollArea.AdjustToContents)
            #self.tableView.setFixedSize(20,20)



            # if self.tasktablemodel._data[i][8] == 0 and self.tasktablemodel._data[i][9] == 0:
            #     delete = QtWidgets.QPushButton()
            #     #delete.clicked.connect(self.Kill_Task_clicked)
            #     self.tasktablemodel.layoutChanged.connect(delete.deleteLater)
            #     delete.setText("")
            #     #delete.setIcon(QtGui.QIcon('src/ui/delete-icon.png'))
            #     self.TaskTable.setIndexWidget(self.tasktablemodel.index(i, 0), None)
    def showtable_hideapp(self):
        # with conclient:
        #     curclient.execute(
        #         "SELECT * FROM minimizesoft")
        #     getmini = curclient.fetchall()
        query = "SELECT * FROM minimizesoft"
        getmini = get_curSQL('clientdata.db', query=query)
        data = getmini
        if data == [] or data == None:
            self.tableViewhidesoft.setModel(None)
            print('empty data gateway')
            pass
        else:
            proxy, a = self.getdata_proxy(data)
            self.tableViewhidesoft.setModel(proxy)
            self.tableViewhidesoft.setEditTriggers(QAbstractItemView.NoEditTriggers)
            self.tableViewhidesoft.resizeColumnsToContents()
            self.tableViewhidesoft.horizontalHeader().setSectionResizeMode(0, QHeaderView.Stretch)
            self.tableViewhidesoft.setSelectionMode(QAbstractItemView.SingleSelection)
    def showtable_gateway(self):
        # with con:
        #     cur.execute(
        #         "SELECT * FROM listgateway")
        #     getmini = cur.fetchall()
        query = "SELECT * FROM listgateway"
        getgateway = get_curSQL('datagame.db', query=query)
        data = getgateway
        if data == [] or data == None:
            self.tableView_gateway.setModel(None)
            print('empty data gateway')
            pass
        else:
            proxy, a = self.getdata_proxy(data)
            self.tableView_gateway.setModel(proxy)
            self.tableView_gateway.setEditTriggers(QAbstractItemView.NoEditTriggers)
            self.tableView_gateway.resizeColumnsToContents()
            self.tableView_gateway.resizeRowsToContents()
            for i in range(4):
                self.tableView_gateway.horizontalHeader().setSectionResizeMode(i, QHeaderView.Stretch)
            self.tableView_gateway.setSelectionMode(QAbstractItemView.SingleSelection)
    def showlistAppNew(self, data):
        if data == [] or data == None:
            # self.tableView_gateway.setModel(None)
            # print('empty data gateway')
            pass
        else:
            columns = data[0].keys()
            proxy,self.model_tablelistappnew = self.getdata_proxy(data)
            self.tablelistappnew.setModel(proxy)
            proxy = ImageCenterProxyStyle(self.tablelistappnew.style())
            self.tablelistappnew.setStyle(proxy)
            #####################################################################

            # self.tableView_idcgameonline.setEditTriggers(QAbstractItemView.NoEditTriggers)
            self.tablelistappnew.setEditTriggers(QAbstractItemView.AllEditTriggers)
            # self.tableView_idcgameonline.horizontalHeader().setSectionResizeMode(QHeaderView.Stretch)
            self.tablelistappnew.setSelectionMode(QAbstractItemView.SingleSelection)
            # self.tableView_idcgameonline.resizeColumnsToContents()#khac nhau chu s
            self.tablelistappnew.resizeColumnToContents(0)

            for i in range(len(columns)):
                if i > 2:
                    self.tablelistappnew.horizontalHeader().setSectionResizeMode(i, QHeaderView.Stretch)
            self.tablelistappnew.setVerticalScrollMode(QAbstractItemView.ScrollPerPixel)
    def show_idcgameonline(self, data):
        # self.landau = False
        if data == [] or data == None:
            print('khong co data')
        else:
            columns = data[0].keys()
            proxy, self.model_idcgameonline = self.getdata_proxy(data)

            ############## set style image ######################################
            self.tableView_idcgameonline.setModel(proxy)
            self.tableView_idcgameonline.setColumnHidden(1, True)
            self.tableView_idcgameonline.setColumnHidden(10, True)
            self.tableView_idcgameonline.setColumnHidden(11, True)
            self.tableView_idcgameonline.setColumnHidden(12, True)
            proxy = ImageCenterProxyStyle(self.tableView_idcgameonline.style())
            self.tableView_idcgameonline.setStyle(proxy)
            #####################################################################

            # self.tableView_idcgameonline.setEditTriggers(QAbstractItemView.NoEditTriggers)
            self.tableView_idcgameonline.setEditTriggers(QAbstractItemView.AllEditTriggers)
            # self.tableView_idcgameonline.horizontalHeader().setSectionResizeMode(QHeaderView.Stretch)
            self.tableView_idcgameonline.setSelectionMode(QAbstractItemView.SingleSelection)
            # self.tableView_idcgameonline.resizeColumnsToContents()#khac nhau chu s
            self.tableView_idcgameonline.resizeColumnToContents(0)

            # self.tableView_idcgameonline.resizeColumnToContents(11)
            # self.tableView_idcgameonline.resizeColumnToContents(12)

            for i in range(len(columns)):
                if i > 2:
                    self.tableView_idcgameonline.horizontalHeader().setSectionResizeMode(i, QHeaderView.Stretch)
            self.tableView_idcgameonline.setVerticalScrollMode(QAbstractItemView.ScrollPerPixel)
    def show_idcgameoffline(self, data):
                # self.landau = False
                if data == [] or data == None:
                    print('khong co data')
                else:
                    columns = data[0].keys()
                    proxy, self.model_idcgameoffline = self.getdata_proxy(data)

                    ############## set style image ######################################
                    self.tableView_idcgameoffline.setModel(proxy)
                    self.tableView_idcgameoffline.setColumnHidden(1, True)
                    self.tableView_idcgameoffline.setColumnHidden(10, True)
                    self.tableView_idcgameoffline.setColumnHidden(11, True)
                    self.tableView_idcgameoffline.setColumnHidden(12, True)
                    proxy = ImageCenterProxyStyle(self.tableView_idcgameoffline.style())
                    self.tableView_idcgameoffline.setStyle(proxy)
                    #####################################################################

                    # self.tableView_idcgameonline.setEditTriggers(QAbstractItemView.NoEditTriggers)
                    self.tableView_idcgameoffline.setEditTriggers(QAbstractItemView.AllEditTriggers)
                    # self.tableView_idcgameonline.horizontalHeader().setSectionResizeMode(QHeaderView.Stretch)
                    self.tableView_idcgameoffline.setSelectionMode(QAbstractItemView.SingleSelection)
                    # self.tableView_idcgameonline.resizeColumnsToContents()#khac nhau chu s
                    self.tableView_idcgameoffline.resizeColumnToContents(0)

                    # self.tableView_idcgameonline.resizeColumnToContents(11)
                    # self.tableView_idcgameonline.resizeColumnToContents(12)

                    for i in range(len(columns)):
                        if i > 2:
                            self.tableView_idcgameoffline.horizontalHeader().setSectionResizeMode(i, QHeaderView.Stretch)
                    self.tableView_idcgameoffline.setVerticalScrollMode(QAbstractItemView.ScrollPerPixel)
    def show_idcTools(self, data):
        # self.landau = False
        if data == [] or data == None:
            print('khong co data')
        else:
            columns = data[0].keys()
            proxy, self.model_idcgameonline = self.getdata_proxy(data)

            ############## set style image ######################################
            self.tableView_idcgameonline.setModel(proxy)
            self.tableView_idcgameonline.setColumnHidden(1, True)
            self.tableView_idcgameonline.setColumnHidden(10, True)
            self.tableView_idcgameonline.setColumnHidden(11, True)
            self.tableView_idcgameonline.setColumnHidden(12, True)
            proxy = ImageCenterProxyStyle(self.tableView_idcgameonline.style())
            self.tableView_idcgameonline.setStyle(proxy)
            #####################################################################

            # self.tableView_idcgameonline.setEditTriggers(QAbstractItemView.NoEditTriggers)
            self.tableView_idcgameonline.setEditTriggers(QAbstractItemView.AllEditTriggers)
            # self.tableView_idcgameonline.horizontalHeader().setSectionResizeMode(QHeaderView.Stretch)
            self.tableView_idcgameonline.setSelectionMode(QAbstractItemView.SingleSelection)
            # self.tableView_idcgameonline.resizeColumnsToContents()#khac nhau chu s
            self.tableView_idcgameonline.resizeColumnToContents(0)

            # self.tableView_idcgameonline.resizeColumnToContents(11)
            # self.tableView_idcgameonline.resizeColumnToContents(12)

            for i in range(len(columns)):
                if i > 2:
                    self.tableView_idcgameonline.horizontalHeader().setSectionResizeMode(i, QHeaderView.Stretch)
            self.tableView_idcgameonline.setVerticalScrollMode(QAbstractItemView.ScrollPerPixel)

    #========= hàm show table khi data không thay đổi Row theard class resilio ============#
    def showtableview_loop(self,dict):
        # print(self.sender())
        #============ check key khoa tableview ===============#
        if Server_Status == 'Ready':
            self.tableView_idcgameonline.setEnabled(True)
        else:
            self.tableView_idcgameonline.setEnabled(False)

        # =============== table show ============= #
        if dict!= None:
            if dict['tableview'] == "showidc_gameonline":
                data = dict['data']
                # columns = data[0].keys()
                # df = pd.DataFrame(data, columns=columns)
                # self._data = np.array(df.values)
                # for row, item_list in enumerate(self._data):
                #     for col, key in enumerate(item_list):
                #         self.model_idcgameonline.update_item(row, col, str(self._data[row, col]))
                    # self.tableView_idcgameonline.setModel(self.model_idcgameonline)
                newvalue = []
                for item in data:
                    if "link.resilio.com" in item['linkgame']:
                        speed = item['Speed_Down']
                        current = item['Current_Down']
                        percentage = item['Process']
                        row = find_row_in_tableview(self.tableView_idcgameonline, item['ID'])
                        status = item['Status']
                        self.model_idcgameonline.update_item(row, 6, str(percentage))
                        self.model_idcgameonline.update_item(row, 7, str(speed))
                        self.model_idcgameonline.update_item(row, 8, str(current))
                        self.model_idcgameonline.update_item(row, 9, str(status))
                        if 0 < int(percentage) < 100:
                            self.model_idcgameonline.update_item(row, 9, str('Downloading...'))
                        newvalue.append(item)
                new_row = pd.DataFrame(newvalue)
                # print(new_row)
            if dict['tableview'] == "showidc_gameoffline":
                if "link_google_ERROR" in dict:
                    row = dict['row']
                    linkgame = dict['link_google_ERROR']
                    idgame = dict['IDgame']
                    self.model_idcgameoffline.update_item(row, 0, '')
                    self.model_idcgameoffline.update_item(row, 9, 'Download ERROR...')
                    query = f"UPDATE Gamelist SET Status='Download Error' WHERE ID='{idgame}'"
                    get_curSQL('gamelist.db', query=query)

                    query = f'DELETE FROM Listgame Where ID="{idgame}";'
                    get_curSQL('datagame.db', query=query)
                    #{"tableview": "showidc_gameoffline", "row": self.dicgoogle['row'], "link_google_ERROR": self.dicgoogle['linkgame']}
                elif "data" in dict:
                    data = dict['data']
                    newvalue = []
                    for item in data:
                        if "link.resilio.com" in item['linkgame']:
                            speed = item['Speed_Down']
                            current = item['Current_Down']
                            percentage = item['Process']
                            row = find_row_in_tableview(self.tableView_idcgameoffline, item['ID'])
                            status = item['Status']

                            if row == '' or row == None:
                                row = find_row_in_tableview(self.tableView_idcgameoffline, dict['ID'])

                            self.model_idcgameoffline.update_item(row, 6, str(percentage))
                            self.model_idcgameoffline.update_item(row, 7, str(speed))
                            self.model_idcgameoffline.update_item(row, 8, str(current))
                            self.model_idcgameoffline.update_item(row, 9, str(status))
                            # if str(percentage) == '100':
                            #     self.model_idcgameoffline.update_item(row, 9, str('Ready'))
                            #     query = f"UPDATE Gamelist SET Totalsize='{current}',Status='Ready' WHERE ID='{item['ID']}'"
                            #     get_curSQL('gamelist.db', query=query)
                            # elif status == 'Game Delete':
                            #     self.model_idcgameoffline.update_item(row, 9, str('Game Delete'))
                            if 0 < int(percentage) < 100:
                                self.model_idcgameoffline.update_item(row, 9, str('Downloading...'))
                            newvalue.append(item)
                    new_row = pd.DataFrame(newvalue)
                    # print(new_row)
                else:
                    # print(dict)
                    speed = dict['speed']
                    current = dict['current']
                    percentage = dict['percentage']
                    row = dict['row']
                    if row == '' or row == None:
                        row = find_row_in_tableview(self.tableView_idcgameoffline, dict['ID'])
                    self.model_idcgameoffline.update_item(row, 6, str(percentage))
                    self.model_idcgameoffline.update_item(row, 7, str(speed))
                    self.model_idcgameoffline.update_item(row, 8, str(current))
                    self.model_idcgameoffline.update_item(row, 9, 'Downloading...')
            if dict['tableview'] == "showlistAppNew":
                data = dict['data']
                columns = data[0].keys()
                df = pd.DataFrame(data, columns=columns)
                self._data = np.array(df.values)
                for row, item_list in enumerate(self._data):
                    for col, key in enumerate(item_list):
                        self.model_tablelistappnew.update_item(row, col, str(self._data[row, col]))
                pass
            if dict['tableview'] == "showmonitor":
                cpu = self.txtCpu.text()
                ram = self.txtRam.text()
                try:
                    if isinstance(int(cpu), int):
                        pass
                        # print('oki')
                except:
                    print('phải nhập số')
                    cpu = 100
                try:
                    if isinstance(int(ram), int):
                        pass
                        # print('oki')
                except:
                    print('phải nhập số')
                    ram = 100
                end_time1 = time.time()
                seconds = end_time1 - self.end_time
                hours = seconds // 3600
                minutes = (seconds % 3600) // 60
                seconds = (seconds % 60)
                timecurent = f'{int(hours)}:{int(minutes)}:{int(seconds)}  '

                data = dict['data']
                columns = data[0].keys()
                df = pd.DataFrame(data, columns=columns)
                self._data = np.array(df.values)
                Clientwarming = 0
                for row, item_list in enumerate(self._data):
                    if (float(data[row]['CpuUse'])) >= int(cpu) or (float(data[row]['RamPercent'])) >= int(ram):
                        Clientwarming += 1
                    for col, key in enumerate(item_list):
                        # paint rows
                        if (float(data[row]['CpuUse'])) >= int(cpu) or (float(data[row]['RamPercent'])) >= int(ram):
                            self.model_showmonitor.setData(self.model_showmonitor.index(row, col), QBrush(Qt.red),
                                                               QtCore.Qt.BackgroundRole)
                        else:
                            self.model_showmonitor.setData(self.model_showmonitor.index(row, col), None,
                                                           QtCore.Qt.BackgroundRole)
                        self.model_showmonitor.update_item(row, col, str(self._data[row, col]))

                ############ thong bao Client ####################
                self.lbtotalClient.setText(f"{str(len(data))}/{len(data)}")
                self.lbwarming.setText(str(Clientwarming))
                self.lbtime.setText(str(timecurent))
                pass
            if dict['tableview'] == "showhardware":
                data = dict['data']
                columns = data[0].keys()
                df = pd.DataFrame(data, columns=columns)
                pcwarming = 0
                self._data = np.array(df.values)
                for row, item_list in enumerate(self._data):
                    if (len(data[row]['Status'])) > 1:
                        pcwarming += 1
                    for col, key in enumerate(item_list):
                        self.model_showhardware.update_item(row, col, str(self._data[row, col]))

                self.lbhardware.setText(str(pcwarming))
                pass
            if dict['tableview'] == "showallgame":
                pass
                data = dict['data']
                columns = data[0].keys()
                df = pd.DataFrame(data, columns=columns)
                self._data = np.array(df.values)
                for row, item_list in enumerate(self._data):
                    for col, key in enumerate(item_list):
                        self.model_showallgame.update_item(row, col, str(self._data[row, col]))

    def getdata_proxy(self, data):
        if data == [] or data == None:
            print('khong co data')
        else:

            columns = data[0].keys()
            # tasktablemodel = QtGui.QStandardItemModel(0, len(columns), self)
            # for row, item_list in enumerate(data):
            #     for col, key in enumerate(item_list):
            #         tasktablemodel.setHeaderData(col, QtCore.Qt.Horizontal, key)
            #         if key!='imagedata':
            #             tasktablemodel.setItem(row, col, QtGui.QStandardItem(str(item_list[key])))

            df = pd.DataFrame(data, columns=columns)
            tasktablemodel = PandasModel(df)
            # tasktablemodel.destroyed()

            proxy = QtCore.QSortFilterProxyModel(self)
            proxy.setFilterKeyColumn(-1)  # Search all columns.
            proxy.setDynamicSortFilter(True)
            proxy.setSourceModel(tasktablemodel)

            # proxy.sort(0, Qt.DescendingOrder)#Qt.AscendingOrder)
            proxy.setFilterCaseSensitivity(False)
            return proxy, tasktablemodel
    def SetFilteredView(self, proxy):
        # print("Start set_filter")
        filter_text = 'abacdfdsf'
        proxy.setFilterFixedString(filter_text)
        filter_result = proxy.rowCount()
        # self.tableWidget.setRowCount(len(getdata))
        # self.tableWidget.setColumnWidth(0, len(getdata[0]))
        # for i in range(len(getdata)):
        #     for j in range(len(getdata[0])):
        #         self.label = QLabel(str(getdata[i][j]), self)
        #         self.label.setAlignment(Qt.AlignCenter)
        #         self.label.setStyleSheet("color: white;padding: 5px; background-color:rgb(31, 37, 47);")
        #
        #         if j == 2:
        #             if str(getdata[i][j]) == "Game Online":
        #                 self.label.setStyleSheet("background-color:rgba(56,0,0,90)")
        #             else:
        #                 self.label.setStyleSheet("background-color:rgba(0,0,68,90)")
        #         if j == 1:
        #             self.label.setText("")
        #             self.label.setStyleSheet("padding: 0px; ")
        #             self.imagedata = getdata[i][j]
        #             try:
        #                 pixmap = QPixmap()
        #                 pixmap.loadFromData(self.imagedata)
        #                 self.label.setPixmap(pixmap.scaled(50, 30))
        #                 # self.label.setScaledContents(True)
        #             except:
        #                 pass
        #             self.label.setAlignment(Qt.AlignCenter)
        #             self.tableWidget.setCellWidget(i, j, self.label)
        #         else:
        #             try:
        #                 # self.tableWidget.setItem(i, j, QTableWidgetItem(str(getdata[i][j])))
        #                 self.tableWidget.setCellWidget(i, j, self.label)
        #             except:
        #                 pass

    #========================= event click phải cho tableview ==========================#
    def contextMenu_total(self,pos):
        print(str(self.sender().objectName()))
        nameform = str(self.sender().objectName())
        tableView = self.sender()
        index = tableView.indexAt(pos)
        if tableView != None:
            if nameform == 'tableView_idcgameonline':
                # index = self.tableView_idcgameonline.indexAt(pos)
                a = index.row()
                if a > -1:
                    folderid = index.sibling(index.row(), 1).data()
                    Appname = index.sibling(index.row(), 3).data()
                    ID = index.sibling(index.row(), 2).data()
                    GroupGame = index.sibling(index.row(), 4).data()
                    Category = index.sibling(index.row(), 5).data()
                    linkgame = index.sibling(index.row(), 10).data()

                    pathonline = self.txtpathgameonline.text()
                    Pathgame = os.path.join(pathonline, Appname)
                    Filegame = os.path.join(Pathgame, index.sibling(index.row(), 11).data())
                    Photo = index.sibling(index.row(), 12).data()

                    menu = QMenu(self)
                    menu.setStyleSheet("""QMenu {
                                                background-color: rgb(8,51,91);
                                                color: rgb(255,255,255);
                                                border: 1px solid ;
                                                padding: 1px 1px 1px 1px;
                                            }
                                            QMenu::item::selected{background-color: rgba(0, 172, 252, 50); }""")

                    renameAction0 = QAction('Download Game', self)
                    renameAction1 = QAction('Download All Games', self)
                    renameAction2 = QAction('Delete', self)
                    renameAction3 = QAction('Delete All', self)

                    fbtl = QLabel(Appname)
                    fbtl.setStyleSheet("""QLabel {
                                                                            background-color: rgb(8,51,91);
                                                                            color: rgb(255,255,255);

                                                                        }""")
                    # fbtl.setSizePolicy(QSizePolicy.Expanding, QSizePolicy.Expanding)
                    fbtl.setAlignment(Qt.AlignCenter)
                    fbtlAction = QWidgetAction(fbtl)
                    fbtlAction.setDefaultWidget(fbtl)

                    menu.addAction(fbtlAction)
                    # Add rest of menu items
                    menu.addSeparator()
                    # renameAction0.setEnabled(False)
                    # renameAction1.setEnabled(False)
                    menu.addAction(renameAction0)
                    menu.addAction(renameAction1)
                    menu.addAction(renameAction2)
                    menu.addAction(renameAction3)

                    menu.popup(QCursor.pos())
                    selected_action = menu.exec_(tableView.viewport().mapToGlobal(pos))

                    if selected_action == renameAction0 and a > -1:
                        print("You have selected the Download Game")
                        self.model_idcgameonline.update_item(index.row(), 0, 'Downloading...')
                        self.model_idcgameonline.update_item(index.row(), 9, 'Waiting connect...')

                        self.thread[100+ index.row()] = ThreadClass(parent=None, index='IDC_GameOnline_downgameidc', linkgame=linkgame, Pathgame=Pathgame)
                        self.thread[100+ index.row()].start()

                        cur, con = get_curSQL('gamelist.db')
                        cur.execute(
                            f"SELECT * FROM Gamelist WHERE ID='{ID}'")
                        getgamelist = cur.fetchall()
                        Photo = getgamelist[0].get('Photo')
                        Photo = str(Photo)
                        args = (ID, Photo, GroupGame, Appname, Category, Filegame, '', '', 0)
                        query = 'INSERT INTO Listgame VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)'
                        # cur, con = get_curSQL('datagame.db')
                        # cur.execute(query, args)
                        # con.commit()
                        get_curSQL('datagame.db', query=query, args=args)

                    if selected_action == renameAction1:
                        print("You have selected the Download All Game")
                    if selected_action == renameAction2 and a > -1:
                        print("You have selected the Delete", Appname)
                        self.model_idcgameonline.update_item(index.row(), 0, '')
                        self.delete_game(ID, Appname, 'IDC_GameOnline_downgameidc', index)
                        # cur, con = get_curSQL('gamelist.db')
                        # cur.execute(
                        #     f"UPDATE Gamelist SET FolderID='', Status='Game Delete' WHERE FolderID='{folderid}'")
                        # con.commit()
                        #
                        # cur1, con = get_curSQL('datagame.db')
                        # # sql = 'DELETE FROM tasks WHERE id=?'
                        # cur1.execute(f"DELETE FROM Listgame WHERE ID='{str(ID)}';")
                        # con.commit()
                        # print(ID)
                        #
                        # # self.thread[2].start()
                        #
                        # self.thread[11] = ThreadClass(parent=None, index='IDC_GameOnline_deleteidc', folderid=folderid)
                        # self.thread[11].start()

                    if selected_action == renameAction3:
                        print("You have selected the Delete all")
                        # self.delete_all_game(id, Appname, 'hideapp')

                        ################ # hàm nhận event mouse click trên tablewidget #################################################

                pass
            if nameform == 'tableallgame':
                # index = self.tableallgame.indexAt(pos)
                a = index.row()
                id = index.sibling(index.row(), 0).data()
                tengame = index.sibling(index.row(), 3).data()
                menu = QMenu(self)
                menu.setStyleSheet("""QMenu {
                                            background-color: rgb(8,51,91);
                                            color: rgb(255,255,255);
                                            border: 1px solid ;
                                            padding: 1px 1px 1px 1px;
                                        }
                                        QMenu::item::selected{background-color: rgba(0, 172, 252, 50); }""")

                renameAction0 = QAction('Edit', self)
                renameAction1 = QAction('New', self)
                renameAction2 = QAction('Delete', self)
                renameAction3 = QAction('Delete All', self)

                fbtl = QLabel(tengame)
                fbtl.setStyleSheet("""QLabel {
                                            background-color: rgb(8,51,91);
                                            color: rgb(255,255,255);

                                        }""")
                # fbtl.setSizePolicy(QSizePolicy.Expanding, QSizePolicy.Expanding)
                fbtl.setAlignment(Qt.AlignCenter)
                fbtlAction = QWidgetAction(fbtl)
                fbtlAction.setDefaultWidget(fbtl)
                menu.addAction(fbtlAction)

                # Add rest of menu items
                menu.addSeparator()
                menu.addAction(renameAction0)
                menu.addAction(renameAction1)
                menu.addAction(renameAction2)
                menu.addAction(renameAction3)

                menu.popup(QCursor.pos())

                selected_action = menu.exec_(tableView.viewport().mapToGlobal(pos))
                if selected_action == renameAction0 and a > -1:
                    print("You have selected the edit")
                    print('id game', id)
                    self.showform_edit(id)
                if selected_action == renameAction1:
                    print("You have selected the New")
                    self.new_game()
                if selected_action == renameAction2 and a > -1:
                    print("You have selected the Delete")
                    self.delete_game(id, tengame, 'allgame', index)
                if selected_action == renameAction3:
                    print("You have selected the Delete all")
                    self.delete_all_game(id, tengame, 'allgame')
            if nameform == 'tableView_hardware':
                # index = self.tableView_hardware.indexAt(pos)
                a = index.row()
                id = index.sibling(index.row(), 0).data()
                ipclient = index.sibling(index.row(), 1).data()

                menu = QMenu(self)
                menu.setStyleSheet("""QMenu {
                                            background-color: rgb(8,51,91);
                                            color: rgb(255,255,255);
                                            border: 1px solid ;
                                            padding: 1px 1px 1px 1px;
                                        }
                                        QMenu::item::selected{background-color: rgba(0, 172, 252, 50); }""")

                renameAction0 = QAction('Edit', self)
                renameAction1 = QAction('New', self)
                renameAction2 = QAction('Delete', self)
                renameAction3 = QAction('Delete All', self)

                fbtl = QLabel(ipclient)
                fbtl.setStyleSheet("""QLabel {
                                            background-color: rgb(8,51,91);
                                            color: rgb(255,255,255);

                                        }""")
                # fbtl.setSizePolicy(QSizePolicy.Expanding, QSizePolicy.Expanding)
                fbtl.setAlignment(Qt.AlignCenter)
                fbtlAction = QWidgetAction(fbtl)
                fbtlAction.setDefaultWidget(fbtl)
                menu.addAction(fbtlAction)

                # Add rest of menu items
                menu.addSeparator()
                renameAction0.setEnabled(False)
                renameAction1.setEnabled(False)
                menu.addAction(renameAction0)

                menu.addAction(renameAction1)
                menu.addAction(renameAction2)
                menu.addAction(renameAction3)

                menu.popup(QCursor.pos())

                selected_action = menu.exec_(tableView.viewport().mapToGlobal(pos))
                if selected_action == renameAction0 and a > -1:
                    print("You have selected the edit")
                    print('id game', id)
                    self.showform_edit(id)
                if selected_action == renameAction1:
                    print("You have selected the New")
                    self.new_game()
                if selected_action == renameAction2 and a > -1:
                    print("You have selected the Delete", ipclient)
                    self.delete_game(ipclient, ipclient, 'tablehardware')
                if selected_action == renameAction3:
                    print("You have selected the Delete all")
                    self.delete_all_game(ipclient, ipclient, 'tablehardware')
            if nameform == 'tableView_gateway':
                # index = self.tableView_gateway.indexAt(pos)
                # print(index)
                a = index.row()
                id = index.sibling(index.row(), 0).data()
                GateWay = index.sibling(index.row(), 0).data()

                menu = QMenu(self)
                menu.setStyleSheet("""QMenu {
                                            background-color: rgb(8,51,91);
                                            color: rgb(255,255,255);
                                            border: 1px solid ;
                                            padding: 1px 1px 1px 1px;
                                        }
                                        QMenu::item::selected{background-color: rgba(0, 172, 252, 50); }""")

                renameAction0 = QAction('Edit', self)
                renameAction1 = QAction('New', self)
                renameAction2 = QAction('Delete', self)
                renameAction3 = QAction('Delete All', self)

                fbtl = QLabel(GateWay)
                fbtl.setStyleSheet("""QLabel {
                                            background-color: rgb(8,51,91);
                                            color: rgb(255,255,255);

                                        }""")
                # fbtl.setSizePolicy(QSizePolicy.Expanding, QSizePolicy.Expanding)
                fbtl.setAlignment(Qt.AlignCenter)
                fbtlAction = QWidgetAction(fbtl)
                fbtlAction.setDefaultWidget(fbtl)
                menu.addAction(fbtlAction)

                # Add rest of menu items
                menu.addSeparator()
                # renameAction0.setEnabled(False)
                # renameAction1.setEnabled(False)
                menu.addAction(renameAction0)
                menu.addAction(renameAction1)
                menu.addAction(renameAction2)
                menu.addAction(renameAction3)

                menu.popup(QCursor.pos())
                selected_action = menu.exec_(tableView.viewport().mapToGlobal(pos))

                if selected_action == renameAction0 and a > -1:
                    print("You have selected the edit")
                    print('id gateway', id)
                    self.on_doubleClicked(index)
                if selected_action == renameAction1:
                    print("You have selected the New")
                    dialog = InputDialog(lineedit=["GateWay", "NetWork", "DNS1", "DNS2", 'Speed', 'Note'], titletemp="Input GateWay")
                    if dialog.exec():
                        if dialog.getInputs()[0]:
                            try:
                                # with con:
                                query = f"INSERT INTO listgateway VALUES(?, ?, ?, ?, ?, ?)"
                                values = (dialog.getInputs()[0], dialog.getInputs()[1], dialog.getInputs()[2],
                                          dialog.getInputs()[3], dialog.getInputs()[4],dialog.getInputs()[5])
                                # cur.execute(query, values)
                                # query = f"INSERT INTO listgateway VALUES(?, ?, ?, ?)"
                                get_curSQL('datagame.db', query=query,args=values)

                                self.showtable_gateway()
                                print(dialog.getInputs())
                                # con.commit()
                                # (f"UPDATE listgateway Set GateWay={}, Network={}, DNS1={}, DNS2={} ")
                            except:
                                ret = QMessageBox.question(self, 'MessageBox',
                                                           f'Same Gateway {dialog.getInputs()[0]} Please re-enter !',
                                                           QMessageBox.Ok)

                if selected_action == renameAction2 and a > -1:
                    print("You have selected the Delete", GateWay)
                    self.delete_game(GateWay, GateWay, 'gateway')
                if selected_action == renameAction3:
                    print("You have selected the Delete all")
                    self.delete_all_game(GateWay, GateWay, 'gateway')
            if nameform == 'tableViewhidesoft':
                # index = self.tableViewhidesoft.indexAt(pos)
                a = index.row()
                id = index.sibling(index.row(), 0).data()
                Appname = index.sibling(index.row(), 0).data()

                menu = QMenu(self)
                menu.setStyleSheet("""QMenu {
                                            background-color: rgb(8,51,91);
                                            color: rgb(255,255,255);
                                            border: 1px solid ;
                                            padding: 1px 1px 1px 1px;
                                        }
                                        QMenu::item::selected{background-color: rgba(0, 172, 252, 50); }""")

                renameAction0 = QAction('Edit', self)
                renameAction1 = QAction('New', self)
                renameAction2 = QAction('Delete', self)
                renameAction3 = QAction('Delete All', self)

                fbtl = QLabel(Appname)
                fbtl.setStyleSheet("""QLabel {
                                            background-color: rgb(8,51,91);
                                            color: rgb(255,255,255);

                                        }""")
                # fbtl.setSizePolicy(QSizePolicy.Expanding, QSizePolicy.Expanding)
                fbtl.setAlignment(Qt.AlignCenter)
                fbtlAction = QWidgetAction(fbtl)
                fbtlAction.setDefaultWidget(fbtl)

                menu.addAction(fbtlAction)
                # Add rest of menu items
                menu.addSeparator()
                # renameAction0.setEnabled(False)
                # renameAction1.setEnabled(False)
                menu.addAction(renameAction0)
                menu.addAction(renameAction1)
                menu.addAction(renameAction2)
                menu.addAction(renameAction3)

                menu.popup(QCursor.pos())
                selected_action = menu.exec_(tableView.viewport().mapToGlobal(pos))

                if selected_action == renameAction0 and a > -1:
                    print("You have selected the edit")
                    print('id App', id)
                    self.on_doubleClicked(index)
                if selected_action == renameAction1:
                    print("You have selected the New")
                    dialog = InputDialog(lineedit=["AppDesktop"], titletemp="Input App Name")
                    if dialog.exec():
                        if dialog.getInputs()[0]:
                            if True:
                                # with conclient:
                                query = f"INSERT INTO minimizesoft VALUES(?)"
                                values = (dialog.getInputs()[0],)
                                # curclient.execute(query, values)
                                get_curSQL('clientdata.db', query=query, args=values)
                                self.showtable_hideapp()
                                print(dialog.getInputs())
                                # con.commit()
                                # (f"UPDATE listgateway Set GateWay={}, Network={}, DNS1={}, DNS2={} ")
                            # except:
                            #     ret = QMessageBox.question(self, 'MessageBox', f'Same Gateway {dialog.getInputs()[0]} Please re-enter !',
                            #                                QMessageBox.Ok)
                if selected_action == renameAction2 and a > -1:
                    print("You have selected the Delete", Appname)
                    self.delete_game(id, Appname, 'hideapp')
                if selected_action == renameAction3:
                    print("You have selected the Delete all")
                    self.delete_all_game(id, Appname, 'hideapp')

                    ################ # hàm nhận event mouse click trên tablewidget #################################################
    # hàm double click tableview ghi chú là không cần hàm click phải vì tableview có sẵn event
    @QtCore.pyqtSlot("QModelIndex")
    def on_doubleClicked(self, ix):
        # print(str(self.sender().objectName()))
        nameform = str(self.sender().objectName())
        tableView = self.sender()
        # index = tableView.indexAt(ix)
        if tableView !=None:
            if nameform == 'tablelistappnew':
                # print(ix.data(), ix.row(), ix.column())
                DisplayName = ix.sibling(ix.row(), 3).data()
                # print(DisplayName)
                # cur, con = get_curSQL('clientdata.db')
                # cur.execute(f"SELECT * FROM AppNew WHERE DisplayName='{DisplayName}'")
                # app = cur.fetchall()
                query = f"SELECT * FROM AppNew WHERE DisplayName='{DisplayName}'"
                app = get_curSQL('clientdata.db', query=query)
                if app[0]['Status'] != 'block':
                    # cur.execute(f"UPDATE AppNew SET Status='block' WHERE DisplayName='{DisplayName}'")
                    # con.commit()

                    query = f"UPDATE AppNew SET Status='block' WHERE DisplayName='{DisplayName}'"
                    get_curSQL('clientdata.db', query=query)
                else:
                    # cur.execute(f"UPDATE AppNew SET Status='' WHERE DisplayName='{DisplayName}'")
                    # con.commit()
                    query = f"UPDATE AppNew SET Status='' WHERE DisplayName='{DisplayName}'"
                    get_curSQL('clientdata.db', query=query)
                pass
            elif nameform == 'tableView_idcgameoffline':
                index = ix
                row = index.row()
                ID = index.sibling(index.row(), 2).data()
                zipfilename = index.sibling(index.row(), 3).data()
                linkgame = index.sibling(index.row(), 10).data()
                pathonline = self.txtpathgameoffline.text()
                Pathgame = os.path.join(pathonline, zipfilename)
                Filerun = os.path.join(Pathgame, index.sibling(index.row(), 11).data())
                dictgoogle ={"zipfilename": zipfilename+ '.zip', "Pathgame": Pathgame, "linkgame": linkgame, "row": row, "index": index, "IDgame": ID}

                ret = QMessageBox.question(self, 'MessageBox', f'Do you want to delete the {nameform} ?',
                                           QMessageBox.Yes | QMessageBox.No | QMessageBox.Cancel, QMessageBox.Cancel)
                # if ret == QMessageBox.Yes:

                folderid = index.sibling(index.row(), 1).data()
                Appname = index.sibling(index.row(), 3).data()
                ID = index.sibling(index.row(), 2).data()
                GroupGame = index.sibling(index.row(), 4).data()
                Category = index.sibling(index.row(), 5).data()
                linkgame = index.sibling(index.row(), 10).data()


                Pathgame = os.path.join(pathonline, Appname)
                Filegame = os.path.join(Pathgame, index.sibling(index.row(), 11).data())
                Photo = index.sibling(index.row(), 12).data()

                query = f"SELECT * FROM Gamelist WHERE ID='{ID}'"
                getgamelist = get_curSQL('gamelist.db', query=query)
                Photo = getgamelist[0].get('Photo')
                Photo = str(Photo)


                if not 'resilio.com' in dictgoogle['linkgame']:
                    print('down_google')
                    #
                    args = (ID, Photo, GroupGame, Appname, Category, Filegame, '', '', 0)
                    # print(args)
                    query = 'INSERT INTO Listgame VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)'
                    mess = get_curSQL('datagame.db', query=query, args=args)
                    if mess != 'Game đã tồn tại':
                        query = f"UPDATE Gamelist SET Status='Downloading...' WHERE ID='{ID}'"
                        get_curSQL('gamelist.db', query=query)
                        self.start_thread_google(dictgoogle)
                else:
                    if Server_Status == 'Ready':
                        print('down_resilio')
                        #
                        args = (ID, Photo, GroupGame, Appname, Category, Filegame, '', '', 0)
                        # print(args)
                        query = 'INSERT INTO Listgame VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)'
                        mess = get_curSQL('datagame.db', query=query, args=args)
                        if mess !='Game đã tồn tại':
                            self.model_idcgameoffline.update_item(index.row(), 0, 'Downloading...')
                            self.model_idcgameoffline.update_item(index.row(), 9, 'Waiting connect...')
                            self.thread[200 + index.row()] = ThreadClass(parent=None, index='IDC_GameOnline_downgameidc', linkgame=linkgame, Pathgame=Pathgame, IDgame=ID)
                            self.thread[200 + index.row()].start()
            elif nameform == 'tableView_idcgameonline':
                index = ix
                try:
                    folderid = index.sibling(index.row(), 1).data()
                    Appname = index.sibling(index.row(), 3).data()
                    ID = index.sibling(index.row(), 2).data()
                    GroupGame = index.sibling(index.row(), 4).data()
                    Category = index.sibling(index.row(), 5).data()
                    linkgame = index.sibling(index.row(), 10).data()

                    pathonline = self.txtpathgameonline.text()
                    Pathgame = os.path.join(pathonline, Appname)
                    Filegame = os.path.join(Pathgame, index.sibling(index.row(), 11).data())
                    Photo = index.sibling(index.row(), 12).data()

                    query = f"SELECT * FROM Gamelist WHERE ID='{ID}'"
                    getgamelist = get_curSQL('gamelist.db', query=query)
                    Photo = getgamelist[0].get('Photo')
                    Photo = str(Photo)

                    args = (ID, Photo, GroupGame, Appname, Category, Filegame, '', '', 0)
                    query = 'INSERT INTO Listgame VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)'
                    get_curSQL('datagame.db', query=query, args=args)

                    self.model_idcgameonline.update_item(index.row(), 0, 'Downloading...')
                    self.model_idcgameonline.update_item(index.row(), 9, 'Waiting connect...')
                    self.thread[100 + index.row()] = ThreadClass(parent=None, index='IDC_GameOnline_downgameidc', linkgame=linkgame, Pathgame=Pathgame, IDgame=ID)
                    self.thread[100 + index.row()].start()
                except Exception as e:
                    print('Failed to. Reason: %s' % (e))
            elif nameform == 'tableallgame':
                id = ix.sibling(ix.row(), 0).data()
                self.showform_edit(id)
            elif nameform == 'tableView_gateway':
                # get data 1 row tableview
                rows = {index.row() for index in tableView.selectionModel().selectedIndexes()}
                output = []
                for row in rows:
                    row_data = []
                    for column in range(tableView.model().columnCount()):
                        index = tableView.model().index(row, column)
                        row_data.append(index.data())
                    output.append(row_data)
                print(output)

                # get name column tableview kiếm cực lắm kaka
                labels = []
                for c in range(tableView.model().columnCount()):
                    # model = tableView.model()
                    it = tableView.model().headerData(c, Qt.Horizontal)
                    print('name column', it)
                    labels.append(str(it))
                print('tableView_gateway LABELS: ', labels)

                # get total data tableview
                """model = tableView.model()
                data = []
                for row in range(model.rowCount()):
                  data.append([])
                  for column in range(model.columnCount()):
                    index = model.index(row, column)
                    # We suppose data are strings
                    data[row].append(str(model.data(index).toString()))"""
                gp = QtGui.QCursor.pos()
                lp = tableView.viewport().mapFromGlobal(gp)
                ix_ = tableView.indexAt(lp)
                if ix_.isValid():
                    print('ix_data ', ix_.data(), lp)
                    print("You have selected the edit doulbe click trái")
                    dialog = InputDialog(lineedit=labels, titletemp=nameform, textedit=output[0])
                    if dialog.exec():
                        if dialog.getInputs()[0]:
                            if True:
                                # with conclient:
                                # query = f"INSERT INTO minimizesoft VALUES(?)"
                                values = (dialog.getInputs()[0],)
                                # curclient.execute(query, values)
                                query = f"INSERT INTO minimizesoft VALUES(?)"
                                get_curSQL('clientdata.db', query=query, args=values)
                                # show data lên tableview
                                self.showtable_hideapp()
                                # print(dialog.getInputs())
            else:
                # get data 1 row tableview
                rows = {index.row() for index in tableView.selectionModel().selectedIndexes()}
                output = []
                for row in rows:
                    row_data = []
                    for column in range(tableView.model().columnCount()):
                        index = tableView.model().index(row, column)
                        row_data.append(index.data())
                    output.append(row_data)
                print(output)

                # get name column tableview kiếm cực lắm kaka
                labels = []
                for c in range(tableView.model().columnCount()):
                    # model = tableView.model()
                    it = tableView.model().headerData(c, Qt.Horizontal)
                    print('name column',it)
                    labels.append(str(it))
                print('LABELS: ',labels)

                # get total data tableview
                """model = tableView.model()
                data = []
                for row in range(model.rowCount()):
                  data.append([])
                  for column in range(model.columnCount()):
                    index = model.index(row, column)
                    # We suppose data are strings
                    data[row].append(str(model.data(index).toString()))"""
                gp = QtGui.QCursor.pos()
                lp = tableView.viewport().mapFromGlobal(gp)
                ix_ = tableView.indexAt(lp)
                if ix_.isValid():
                    print('ix_data ',ix_.data(), lp)
                    print("You have selected the edit doulbe click trái")
                    dialog = InputDialog(lineedit=labels, titletemp=nameform, textedit=output[0])
                    if dialog.exec():
                        if dialog.getInputs()[0]:
                            if True:
                                # with conclient:
                                # query = f"INSERT INTO minimizesoft VALUES(?)"
                                values = (dialog.getInputs()[0],)
                                # curclient.execute(query, values)
                                query = f"INSERT INTO minimizesoft VALUES(?)"
                                get_curSQL('clientdata.db', query=query, args=values)
                                # show data lên tableview
                                self.showtable_hideapp()
                                # print(dialog.getInputs())
        else:
            print('không có tableview')

    ########################## hàm of menu click phải ###############################
    def showform_edit(self, idgame):
        import finput
        self.finput1 = finput.formchild(self)
        ######## nhận value từ biến form child #############
        self.finput1.id = self
        print('show form chon')
        self.finput1.show()
        ####### sendd value đến form child #################
        self.finput1.nhanvalue_main(idgame)
    def new_game(self):
        print("new game")
        import finput
        self.finput1 = finput.formchild(self)
        ######## nhận value từ biến form child #############
        self.finput1.id = self
        print('show form chon')
        self.finput1.show()
    def delete_game(self, idgame, namegame, table, index=None):
        ret = QMessageBox.question(self, 'MessageBox', f'Do you want to delete the {namegame} ?',
                                   QMessageBox.Yes | QMessageBox.No | QMessageBox.Cancel, QMessageBox.Cancel)
        if ret == QMessageBox.Yes:
            print("del", idgame)
            if table == 'tablehardware':
                # with conclient:
                #     curclient.execute(f"DELETE FROM listClient Where IP='{idgame}';")
                #     conclient.commit()
                query = f"DELETE FROM listClient Where IP='{idgame}';"
                get_curSQL('clientdata.db', query=query)
                self.showdata()
                print("del")
                pass
                print('Button QMessageBox.Yes clicked.')
                pass
            elif table == 'allgame' or table == 'IDC_GameOnline_downgameidc':
                Group = index.sibling(index.row(), 2).data()
                pathgame = index.sibling(index.row(), 5).data()
                pathfile = pathgame.split('\\')[-1]
                pathgame = pathgame.replace(pathfile, '')

                ################### phan xư lý ben IDC ####################
                if 'IDC' in idgame:
                    query = f"SELECT * FROM Gamelist WHERE ID='{idgame}'"
                    getgamelist = get_curSQL('gamelist.db', query=query)
                    folderid = getgamelist[0]['FolderID']
                    linkgame = getgamelist[0]['linkgame']
                    Status = getgamelist[0]['Status']
                    # ======================== clear game online va resilio tren tableview ====================#
                    # if Group == 'Game Online':
                    if 'link.resilio.com' in linkgame:
                        if Group == 'Game Online':
                            row = find_row_in_tableview(self.tableView_idcgameonline, idgame)
                            self.model_idcgameonline.update_item(row, 0, '')
                        elif Group == 'Game Offline':
                            row = find_row_in_tableview(self.tableView_idcgameoffline, idgame)
                            self.model_idcgameoffline.update_item(row, 0, '')
                        self.thread[100 + index.row()] = ThreadClass(parent=None, index='IDC_GameOnline_deleteidc',
                                                                     folderid=folderid)
                        self.thread[100 + index.row()].start()
                    #======================== clear game off tren tableview ==============================#
                    else:
                        if Status=='Downloading...':
                            ret = QMessageBox.question(self, 'MessageBox', f'Game {namegame} Downloading...',
                                                       QMessageBox.Ok)
                            if ret == QMessageBox.Ok:
                                return
                        row = find_row_in_tableview(self.tableView_idcgameoffline, idgame)
                        self.model_idcgameoffline.update_item(row, 0, '')
                        self.model_idcgameoffline.update_item(row, 6, '0')
                        self.model_idcgameoffline.update_item(row, 7, '')
                        self.model_idcgameoffline.update_item(row, 9, str('Game Delete'))
                        threading.Thread(daemon=True, target=lambda: Remove_ContentsFolder(pathgame)).start()
                    # ======================== clear database tren table all game ==============================#
                    query = f"UPDATE Gamelist SET FolderID='', Status='Game Delete' WHERE FolderID='{folderid}'"
                    get_curSQL('gamelist.db', query=query)
                # ======================== clear database tren table all game ==============================#
                query = f'DELETE FROM Listgame Where ID="{idgame}";'
                get_curSQL('datagame.db', query=query)
            elif table == 'gateway':
                # cur, con = get_curSQL('datagame.db')
                # cur.execute(f'DELETE FROM listgateway Where GateWay="{idgame}";')
                # con.commit()
                query = f'DELETE FROM listgateway Where GateWay="{idgame}";'
                get_curSQL('datagame.db', query=query)
                self.showtable_gateway()
            elif table == 'hideapp':
                # cur, con = get_curSQL('clientdata.db')
                # curclient.execute(f'DELETE FROM minimizesoft Where AppDesktop="{idgame}";')
                # con.commit()
                query = f'DELETE FROM minimizesoft Where AppDesktop="{idgame}";'
                get_curSQL('clientdata.db', query=query)
                self.showtable_hideapp()
    def delete_all_game(self, idgame, namegame, table):
        ret = QMessageBox.question(self, 'MessageBox', f'Do you want to delete all the game ?',
                                   QMessageBox.Yes | QMessageBox.No | QMessageBox.Cancel, QMessageBox.Cancel)
        if ret == QMessageBox.Yes:
            if table == 'tablehardware':
                # with conclient:
                #     curclient.execute(
                #         f'DELETE FROM listClient;')
                query = f'DELETE FROM listClient;'
                get_curSQL('clientdata.db', query=query)
                # self.showdata()
                print("del all")
                pass
                print('Button QMessageBox.Yes clicked.')
            elif table == 'allgame':
                # with con:
                #     cur.execute(
                #         f'DELETE FROM Listgame;')
                # self.showdata()
                query = f'DELETE FROM Listgame;'
                get_curSQL('datagame.db', query=query)
                print("del all")
                pass
                print('Button QMessageBox.Yes clicked.')
            elif table == 'gateway':
                # with con:
                #     cur.execute(
                #         f'DELETE FROM listgateway;')
                query = f'DELETE FROM listgateway;'
                get_curSQL('datagame.db', query=query)
                self.showtable_gateway()
                print("del all")
                pass
                print('Button QMessageBox.Yes clicked.')
            elif table == 'hideapp':
                # with conclient:
                #     curclient.execute(
                #         f'DELETE FROM minimizesoft;')
                query = f'DELETE FROM minimizesoft;'
                get_curSQL('clientdata.db', query=query)
                self.showtable_hideapp()
                print("del all")
                pass
                print('Button QMessageBox.Yes clicked.')
        # hàm nhận value từ form child
    def show_menu(self, value_child):
        # print("show main")
        # print("form cha nhận value từ child: ", value_child)
        if value_child == "Refesh Tablewidget":
            # self.showdata()
            pass
    def Search_game(self):
        global searchgame
        searchgame = self.searchgame.text()
        # con = sqlite3.connect('datagame.db')  # (":memory:")
        # # con.text_factory = lambda b: b.decode(errors = 'ignore')
        # con.row_factory = dict_factory
        # cur = con.cursor()
        # cur.execute(
        #     f'SELECT * FROM Listgame Where Tengame GLOB "{str(name.upper())}*" order by CAST(ID AS INTEGER)')
        # getdata = cur.fetchall()
        # # print(getdata)
        # self.showallgame(getdata)
        print(searchgame)

    ######### hàm này get postion mouse for event di chuyển form moveWindow() nằm trong init của widget #########
    def mousePressEvent(self, event):
        if event.button() == QtCore.Qt.LeftButton:
            # print('click trái')
            self.startPos = event.pos()
            self.clickPosition = event.globalPos()
        # elif (event.type() == QtCore.QEvent.MouseButtonDblClick and event.buttons() == QtCore.Qt.RightButton):
        #     print('double click')
    # Menu slide
    def slideLeftMenu(self):
        #get current left menu width
        width = self.frame_left_menu.width()
        if width == 28:
            newWidth = 150
        else:
            newWidth = 28
        # Animate the transition
        self.animation = QPropertyAnimation(self.frame_left_menu, b"minimumWidth")#Animate minimum
        self.animation.setDuration(250)
        self.animation.setStartValue(width)
        self.animation.setEndValue(newWidth)
        self.animation.setEasingCurve(QtCore.QEasingCurve.InOutQuart)
        self.animation.start()

        #################### hàm show form child và get value parent & xử lý contextMenu ################

    ######################## Check Version #######################################
    def checkversion(self, version, new_version):
        ### get url github ###
        # sock = urlopen(self.linkcheckupdate)
        # htmlSource = sock.read()
        # print(htmlSource.encode())
        # response = requests.get(self.linkcheckupdate)
        self.data_version = new_version
        print('current version: ',self.data_version)
        if float(self.data_version) > float(version):
            print('oki', self.data_version)
            self.btnversion.setText(f"Version: {version} - New Version Release: {self.data_version}")
        else:
            self.btnversion.setText(f"Version: {version}")
        try:
            pass
        except:
            print('loi check version')
            self.btnversion.setText(f"Version: {version}")
    # cách 1 get event click open show menu phụ dang không dùng
    def eventFilter(self, source, event):
        if event.type() == QtCore.QEvent.MouseButtonPress:
            if event.button() == QtCore.Qt.LeftButton:
                pass
                if source is self.tableWidget.viewport():
                    self.showdata()
                    index = self.tableWidget.indexAt(event.pos())
                    a = index.row()
                    if a > -1:
                        self.setColortoRow_table(self.tableWidget, a)

            elif event.button() == QtCore.Qt.RightButton:

                if source is self.tableWidget.viewport():# All Game
                    self.showdata()
                    tengame = 'All Game'
                    index = self.tableWidget.indexAt(event.pos()) # không cần biết đang click cái nào trong nhiều cái tablewidget
                    a = index.row()

                    if a > -1:
                        self.setColortoRow_table(self.tableWidget, a)

                        tengame = self.tableWidget.cellWidget(a, 3).text()
                        id = self.tableWidget.cellWidget(a, 0).text()
                    # clear selecte table
                    if True:
                        self.menu = QMenu(self)
                        self.menu.setStyleSheet("""QMenu {
                                                background-color: rgb(8,51,91);
                                                color: rgb(255,255,255);
                                                border: 1px solid ;
                                                padding: 1px 1px 1px 1px;
                                            }
                                            QMenu::item::selected{background-color: rgba(0, 172, 252, 50); }""")

                        renameAction0 = QAction('Edit', self)
                        renameAction1 = QAction('New', self)
                        renameAction2 = QAction('Delete', self)
                        renameAction3 = QAction('Delete All', self)

                        fbtl = QLabel(tengame)
                        fbtl.setStyleSheet("""QLabel {
                                                background-color: rgb(8,51,91);
                                                color: rgb(255,255,255);

                                            }""")
                        # fbtl.setSizePolicy(QSizePolicy.Expanding, QSizePolicy.Expanding)
                        fbtl.setAlignment(Qt.AlignCenter)
                        fbtlAction = QWidgetAction(fbtl)
                        fbtlAction.setDefaultWidget(fbtl)
                        self.menu.addAction(fbtlAction)

                        # Add rest of menu items
                        self.menu.addSeparator()
                        self.menu.addAction(renameAction0)
                        self.menu.addAction(renameAction1)
                        self.menu.addAction(renameAction2)
                        self.menu.addAction(renameAction3)

                        self.menu.popup(QCursor.pos())

                        selected_action = self.menu.exec_(event.globalPos())
                        if selected_action == renameAction0 and a > -1:
                            print("You have selected the edit")
                            print('id game', id)
                            self.showform_edit(id)
                        if selected_action == renameAction1:
                            print("You have selected the New")
                            self.new_game()
                        if selected_action == renameAction2 and a > -1:
                            print("You have selected the Delete")
                            self.delete_game(id, tengame)
                        if selected_action == renameAction3:
                            print("You have selected the Delete all")
                            self.delete_all_game(id, tengame)

                        # clear selecte table

                if source is self.tablemonitor.viewport(): # Monitor table
                    tengame = 'Monitor'
                    index = self.tablemonitor.indexAt(
                        event.pos())  # không cần biết đang click cái nào trong nhiều cái tablewidget
                    a = index.row()
                    if a > -1:
                        self.setColortoRow_table(self.tablemonitor, a)
                        tengame = self.tablemonitor.cellWidget(a, 1).text()
                        id = self.tablemonitor.cellWidget(a, 0).text()

                    # clear selecte table

                    if True:
                        self.menu = QMenu(self)
                        self.menu.setStyleSheet("""QMenu {
                                                                    background-color: rgb(8,51,91);
                                                                    color: rgb(255,255,255);
                                                                    border: 1px solid ;
                                                                    padding: 1px 1px 1px 1px;
                                                                }
                                                                QMenu::item::selected{background-color: rgba(0, 172, 252, 50); }""")
                        renameAction0 = QAction('Edit', self)
                        renameAction1 = QAction('New', self)
                        renameAction2 = QAction('Delete', self)
                        renameAction3 = QAction('Delete All', self)

                        fbtl = QLabel(tengame)
                        fbtl.setStyleSheet("""QLabel {
                                                                    background-color: rgb(8,51,91);
                                                                    color: rgb(255,255,255);

                                                                }""")
                        # fbtl.setSizePolicy(QSizePolicy.Expanding, QSizePolicy.Expanding)
                        fbtl.setAlignment(Qt.AlignCenter)
                        fbtlAction = QWidgetAction(fbtl)
                        fbtlAction.setDefaultWidget(fbtl)
                        self.menu.addAction(fbtlAction)

                        # Add rest of menu items
                        self.menu.addSeparator()
                        self.menu.addAction(renameAction0)
                        self.menu.addAction(renameAction1)
                        self.menu.addAction(renameAction2)
                        self.menu.addAction(renameAction3)

                        self.menu.popup(QCursor.pos())

                        selected_action = self.menu.exec_(event.globalPos())
                        if selected_action == renameAction0 and a > -1:
                            print("You have selected the edit")
                            print('id game', id)
                            #self.showform_edit(id)

                        if selected_action == renameAction1:
                            print("You have selected the New")
                            #self.new_game()
                        if selected_action == renameAction2 and a > -1:
                            print("You have selected the Delete")
                            #self.delete_game(id, tengame)
                        if selected_action == renameAction3:
                            print("You have selected the Delete all")
                            #self.delete_all_game(id, tengame)

                        # clear selecte table

                if source is self.tablegameonline.viewport(): # Down game table
                    tengame = 'IDC Game'
                    index = self.tablegameonline.indexAt(
                        event.pos())  # không cần biết đang click cái nào trong nhiều cái tablewidget
                    a = index.row()
                    if a > -1:
                        tengame = self.tablegameonline.cellWidget(a, 3).text()
                        id = self.tablegameonline.cellWidget(a, 0).text()

                    # clear selecte table

                    if True:
                        self.menu = QMenu(self)
                        self.menu.setStyleSheet("""QMenu {
                                                                    background-color: rgb(8,51,91);
                                                                    color: rgb(255,255,255);
                                                                    border: 1px solid ;
                                                                    padding: 1px 1px 1px 1px;
                                                                }
                                                                QMenu::item::selected{background-color: rgba(0, 172, 252, 50); }""")
                        renameAction0 = QAction('Edit', self)
                        renameAction1 = QAction('New', self)
                        renameAction2 = QAction('Delete', self)
                        renameAction3 = QAction('Delete All', self)

                        fbtl = QLabel(tengame)
                        fbtl.setStyleSheet("""QLabel {
                                                                    background-color: rgb(8,51,91);
                                                                    color: rgb(255,255,255);

                                                                }""")
                        # fbtl.setSizePolicy(QSizePolicy.Expanding, QSizePolicy.Expanding)
                        fbtl.setAlignment(Qt.AlignCenter)
                        fbtlAction = QWidgetAction(fbtl)
                        fbtlAction.setDefaultWidget(fbtl)
                        self.menu.addAction(fbtlAction)

                        # Add rest of menu items
                        self.menu.addSeparator()
                        self.menu.addAction(renameAction0)
                        self.menu.addAction(renameAction1)
                        self.menu.addAction(renameAction2)
                        self.menu.addAction(renameAction3)

                        self.menu.popup(QCursor.pos())

                        selected_action = self.menu.exec_(event.globalPos())
                        if selected_action == renameAction0 and a > -1:
                            print("You have selected the edit")
                            print('id game', id)
                            #self.showform_edit(id)

                        if selected_action == renameAction1:
                            print("You have selected the New")
                            #self.new_game()
                        if selected_action == renameAction2 and a > -1:
                            print("You have selected the Delete")
                            #self.delete_game(id, tengame)
                        if selected_action == renameAction3:
                            print("You have selected the Delete all")
                            #self.delete_all_game(id, tengame)

                        # clear selecte table

                if source is self.tablehidesoft.viewport(): # Down game table
                    tengame = 'Hide Apps'
                    index = self.tablehidesoft.indexAt(
                        event.pos())  # không cần biết đang click cái nào trong nhiều cái tablewidget
                    a = index.row()
                    if a > -1:
                        self.setColortoRow_table(self.tablehidesoft, a)
                        tengame = self.tablehidesoft.cellWidget(a, 1).text()
                        id = self.tablehidesoft.cellWidget(a, 0).text()

                    # clear selecte table

                    if True:
                        self.menu = QMenu(self)
                        self.menu.setStyleSheet("""QMenu {
                                                                    background-color: rgb(8,51,91);
                                                                    color: rgb(255,255,255);
                                                                    border: 1px solid ;
                                                                    padding: 1px 1px 1px 1px;
                                                                }
                                                                QMenu::item::selected{background-color: rgba(0, 172, 252, 50); }""")
                        renameAction0 = QAction('Edit', self)
                        renameAction1 = QAction('New', self)
                        renameAction2 = QAction('Delete', self)
                        renameAction3 = QAction('Delete All', self)

                        fbtl = QLabel(tengame)
                        fbtl.setStyleSheet("""QLabel {
                                                                    background-color: rgb(8,51,91);
                                                                    color: rgb(255,255,255);

                                                                }""")
                        # fbtl.setSizePolicy(QSizePolicy.Expanding, QSizePolicy.Expanding)
                        fbtl.setAlignment(Qt.AlignCenter)
                        fbtlAction = QWidgetAction(fbtl)
                        fbtlAction.setDefaultWidget(fbtl)
                        self.menu.addAction(fbtlAction)

                        # Add rest of menu items
                        self.menu.addSeparator()
                        self.menu.addAction(renameAction0)
                        self.menu.addAction(renameAction1)
                        self.menu.addAction(renameAction2)
                        self.menu.addAction(renameAction3)

                        self.menu.popup(QCursor.pos())

                        selected_action = self.menu.exec_(event.globalPos())
                        if selected_action == renameAction0 and a > -1:
                            print("You have selected the edit")
                            print('id game', id)
                            #self.showform_edit(id)

                        if selected_action == renameAction1:
                            print("You have selected the New")
                            #self.new_game()
                        if selected_action == renameAction2 and a > -1:
                            print("You have selected the Delete")
                            #self.delete_game(id, tengame)
                        if selected_action == renameAction3:
                            print("You have selected the Delete all")
                            #self.delete_all_game(id, tengame)

                        # clear selecte table

        elif event.type() == QtCore.QEvent.HoverMove:
            if source is self.tableWidget.viewport():
                # self.showdata()
                # index = self.tableWidget.indexAt(event.pos())#self.indexAt(self.tableWidget.viewport().mapFromParent(event.pos()))
                # a = index.row()
                # if a > -1:
                #     self.setColortoRow_table(self.tableWidget, a)
                pass
        return super().eventFilter(source, event)
    def setColortoRow_table(self, table, rowIndex):
        for j in range(table.columnCount()):
            table.cellWidget(rowIndex, j).setStyleSheet("background: rgba(100,150,50,80);")

    ############################### Button Main ###############################################
    def restore_max(self):
        if self.isMaximized():
            self.showNormal()
            #self.BtnMax.setIcon(QtGui.QIcon(u"./icons/icons/black-shades.svg"))
        else:
            self.showMaximized()
            #self.BtnMax.setIcon(QtGui.QIcon(u"./icons/icons/black-shades.svg"))
    def closeapp(self):
        #os.system("taskkill /f /im streamlit.exe")
        self.hide()
        # self.close()
        # self.showMinimized()
        # self.setWindowFlag(QtCore.Qt.Tool)
    def minimumapp(self):
        self.showMinimized()
    def showapp_window(self):
        self.showNormal()
    # hàm open file get path
    def showbox_chonfile(self):
        # hàm chọn 1 file
        options = QFileDialog.Options()
        options |= QFileDialog.DontUseNativeDialog
        fileName, _ = QFileDialog.getOpenFileName(self, "Change Banner", "",
                                                  "All Files (*);;Python Files (*.py)", options=options)
        if fileName:
            print(fileName)

        # hàm chon nhiều files
        # options = QFileDialog.Options()
        # options |= QFileDialog.DontUseNativeDialog
        # files, _ = QFileDialog.getOpenFileNames(self, "QFileDialog.getOpenFileNames()", "",
        #                                         "All Files (*);;Python Files (*.py)", options=options)
        # if files:
        #     print(files)

    ################## Design # hàm open file get path ############################################
    def Getimage_banner(self):
        # hàm chọn 1 file
        # options = QFileDialog.Options()
        # options |= QFileDialog.DontUseNativeDialog
        # fileName, _ = QFileDialog.getOpenFileName(self, "Change Banner", "",
        #                                               "All Files (*);;Python Files (*.py)", options=options)
        fileName = QFileDialog.getOpenFileName(self, 'Select a File','',"Images (*.png *.jpg)")
        if fileName[0]:
            print(fileName)
            import os
            filepath = os.path.normpath(fileName[0])
            #url = QUrl.fromLocalFile(filepath)
            print(filepath)
            # from pathlib import Path
            #
            # filenamea = Path(filepath).name
            #print(filenamea)
            #filetemp = openfilea(fileName)
            with open(filepath, 'rb') as f:
                filetemp = f.read()

            args = (filetemp,local_ip)
            query ='UPDATE Design SET Banner=?, Serverip=?'
            #query = 'INSERT INTO Design VALUES(?,?)'
            # with con:
            #     cur.execute(query, args)
            #     con.commit()

            get_curSQL('datagame.db', query=query, args=args)
            pixmap = QPixmap()
            pixmap.loadFromData(filetemp)

            self.lbimage.setPixmap(pixmap.scaled(500,100, Qt.KeepAspectRatio, Qt.SmoothTransformation))
    def Getimage_backgroundClient(self):
        # hàm chọn 1 file
        # options = QFileDialog.Options()
        # options |= QFileDialog.DontUseNativeDialog
        # fileName, _ = QFileDialog.getOpenFileName(self, "Change Banner", "",
        #                                               "All Files (*);;Python Files (*.py)", options=options)
        fileName,_ = QFileDialog.getOpenFileName(self, 'Select a File', '', "Images (*.png *.jpg)")
        if fileName:
            #print(fileName)
            import os
            filepath = os.path.normpath(fileName)
            print(filepath)
            with open(filepath, 'rb') as f:
                filetemp = f.read()
            picture = Image.open(filepath)
            picture.save('./static/hinhnen/backgroundClient.jpg')
            pixmap = QPixmap()
            pixmap.loadFromData(filetemp)
            self.lbbackground.setPixmap(pixmap.scaled(500, 100, Qt.KeepAspectRatio, Qt.SmoothTransformation))
    def setBackgroundClient(self):
        # cur.execute(
        #     "SELECT * FROM Design")
        # getdesign = cur.fetchall()
        query = "SELECT * FROM Design"
        getdesign = get_curSQL('datagame.db', query=query)
        args = ('1')
        if getdesign[0]['BackgroundClient'] == '1':
            args = ('0')
            self.BtnStartBackgroundClient.setIcon(QtGui.QIcon('./icons/unchecked.png'))
        else:
            args = ('1')
            self.BtnStartBackgroundClient.setIcon(QtGui.QIcon('./icons/done.png'))
            threading.Thread(daemon=True, target=self.setBackgroundAllclient).start()
        query = 'UPDATE Design SET BackgroundClient=?'
        get_curSQL('datagame.db', query=query, args=args)
        # with con:
        #     cur.execute(query, args)
        #     con.commit()
    def setBackgroundAllclient(self):
        # conclient = sqlite3.connect('clientdata.db')  # (":memory:")
        # conclient.row_factory = dict_factory
        # curclient = conclient.cursor()
        # curclient.execute("SELECT * FROM listClient order by CAST(substr(IP, 10) AS NUMERIC)")  # DESC
        # getdata = curclient.fetchall()
        query = "SELECT * FROM listClient order by CAST(substr(IP, 10) AS NUMERIC)"
        getdata = get_curSQL('clientdata.db', query=query)

        # print(getdata)
        if getdata == [] or getdata == None:
            pass
        else:
            value = {'ID': 'setBackgroundClient',
                     'online': 'online', }
            r = None
            for i in range(len(getdata)):
                ipclient = getdata[i]['IP']
                print('set background',final[ipclient])
                response = final[ipclient]
                # response = check_port(ipclient, 8200)  # internet_on , isOpen
                try:
                    if response == 'OPEN':
                        # send link set background for client
                        r = requests.post(url='http://' + f"{getdata[i]['IP']}" + ':8200/recevie', data=js.dumps(value))
                except:
                    pass

    def save_design(self):
        shop = self.Shopname.text()
        Tite = self.TiteKM.text()
        contain = self.containKM.text()
        # print(Tite, contain)
        args = (shop, Tite, contain, local_ip)
        query = 'UPDATE Design SET tenphongmay=?, ADS=?, Contains=?, Serverip=?'
        # with con:
        #     cur.execute(query, args)
        #     con.commit()

        getdata = get_curSQL('datagame.db', query=query, args=args)
    def hide_soft(self):
        # with con:
        #     cur.execute(
        #         "SELECT * FROM Design")
        #     getsoft = cur.fetchall()
        query = "SELECT * FROM Design"
        getsoft = get_curSQL('datagame.db', query=query)
        hide = int(getsoft[0]['hidesoft'])
        print(hide)
        if hide == 0:
            hide = 1
            self.btnhide.setIcon(QtGui.QIcon('./icons/done.png'))
        else:
            hide = 0
            self.btnhide.setIcon(QtGui.QIcon('./icons/unchecked.png'))
        # with con:
        #     cur.execute(f'UPDATE Design SET hidesoft={hide}')
        #     con.commit()
        query = f'UPDATE Design SET hidesoft={hide}'
        get_curSQL('datagame.db', query=query)

    def getpath_tools(self):
        folder = str(QFileDialog.getExistingDirectory(self, "Select Directory"))
        if folder != '':
            self.txtpathtools.setText(folder)
            print(folder)
    def getpath_gameonline(self):
        folder = str(QFileDialog.getExistingDirectory(self, "Select Directory"))
        if folder != '':
            self.txtpathgameonline.setText(folder)
            print(folder)
    def getpath_gameoffline(self):
        folder = str(QFileDialog.getExistingDirectory(self, "Select Directory"))
        if folder != '':
            self.txtpathgameooffline.setText(folder)
            print(folder)
    ######################## Check service & open file service & check server-monitor ####################
    def getService(self,name):
        service = None
        try:
            service = psutil.win_service_get(name)
            service = service.as_dict()
            # print("service", service)
        except Exception as ex:
            print(str(ex))
        return service
    # service menu
    def startstop_service(self):
        service = self.getService('MenuServer')
        exe_name = os.path.abspath("Service-server/ServiceSV")
        if service:
            print("service found")
            self.btnstartservice.setText("Service Menu Game is stopping...")
        else:
            print("service not found")
            subprocess.call([exe_name, 'install'], shell=True)
            #time.sleep(1)
            #subprocess.call([exe_name, 'start'], shell=True)
            self.btnstartservice.setIcon(QtGui.QIcon('./icons/done.png'))
            self.btnstartservice.setText("Service Menu Game is Running...")

        if service and service['status'] == 'running':
            print("service is running")
        else:
            print("service is not running")
            subprocess.call([exe_name, 'start'], shell=True)
            self.btnstartservice.setText("Service Menu Game is stopping...")
            self.btnstartservice.setIcon(QtGui.QIcon('./icons/unchecked.png'))
    # service resilio
    def Refesh_resilio(self):
        service_name = "rslsyncsvckl"
        service = self.getService(service_name)
        if service and service['status'] == 'running':
            # os.system(f'''cmd /c "net stop {service_name} /y && net start {service_name}"''')
            subprocess.check_output(f'''net stop {service_name} /y && net start {service_name}''', shell=True)
        else:
            # os.system(f'''cmd /c "net start {service_name}"''') # ham nay khong hide cmd duoc
            subprocess.check_output(f'''net start {service_name}''', shell=True) # ham nay hide cmd
    # server-monitor
    def check_servermonitor(self):
        pass
    def Stop_resilio_service(self):
        service_name = "rslsyncsvckl"
        service = self.getService(service_name)
        if service and service['status'] == 'running':
            # os.system(f'''cmd /c "net stop {service_name} /y && net start {service_name}"''')
            subprocess.check_output(f'''net stop {service_name} /y && net start {service_name}''', shell=True)

    ########################## change Qlineedit ####################
    def setCPU(self):
        cpu = self.txtCpu.text()
        try:
            if isinstance(int(cpu), int):
                pass
                #print('oki')
        except:
            print('phải nhập số')
            QMessageBox.question(self, 'MessageBox', f'Please re-enter the CPU percentage !', QMessageBox.Ok)
            self.txtCpu.setText('100')
            return

        # with con:
        #     cur.execute(f"UPDATE Design SET setCPU='{cpu}'")
        #     con.commit()
        query = f"UPDATE Design SET setCPU='{cpu}'"
        get_curSQL('datagame.db', query=query)
        print(cpu)
        pass
    def setRam(self):
        ram = self.txtRam.text()
        try:
            if isinstance(int(ram), int):
                pass
                #print('oki')
        except:
            print('phải nhập số')
            QMessageBox.question(self, 'MessageBox', f'Please re-enter the Ram percentage !', QMessageBox.Ok)
            self.txtRam.setText('100')
            return

        # with con:
        #     cur.execute(f"UPDATE Design SET setRAM='{ram}'")
        #     con.commit()
        query = f"UPDATE Design SET setRAM='{ram}'"
        get_curSQL('datagame.db', query=query)
        print(ram)
        pass
    def setdown_resilio(self,speed):
        # print('kakak',speed)
        # cur, con = get_curSQL('datagame.db')
        # cur.execute(
        #     f"UPDATE Design SET SpeedDown='{speed}'")
        # con.commit()

        query = f"UPDATE Design SET SpeedDown='{speed}'"
        get_curSQL('datagame.db', query=query)
        self.thread[11] = ThreadClass(parent=None, index='IDC_GameOnline_setdownload', speeddown=speed)
        self.thread[11].start()
    def setPathGameOnline(self, Path):
        # cur, con = get_curSQL('datagame.db')
        # cur.execute(
        #     f"UPDATE Design SET PathGameOnline='{Path}'")
        # con.commit()
        query = f"UPDATE Design SET PathGameOnline='{Path}'"
        get_curSQL('datagame.db', query=query)
        pass
    def setPathGameOffline(self, Path):
        # cur, con = get_curSQL('datagame.db')
        # cur.execute(
        #     f"UPDATE Design SET PathGameOffline='{Path}'")
        # con.commit()

        query = f"UPDATE Design SET PathGameOffline='{Path}'"
        get_curSQL('datagame.db', query=query)
        pass
    def setPathTools(self,Path):
        # cur, con = get_curSQL('datagame.db')
        # cur.execute(
        #     f"UPDATE Design SET PathTools='{Path}'")
        # con.commit()

        query = f"UPDATE Design SET PathTools='{Path}'"
        get_curSQL('datagame.db', query=query)
        pass

##################### Hàm ping Client ####################################
final = {}
def internet_on(ip, port):
    # from urllib.request import urlopen
    try:
        sock = urlopen(f'http://{ip}:{port}/checknamepc', timeout=0.1)
        sock.close()
        final[ip] = "OPEN"
        # print('ip check',final)
    except URLError as e:
        final[ip] = "CLOSED"
        # if isinstance(e.reason, socket.timeout): # bat loi socket.timeout xu ly no
        #     # handle timeout...
        #
        #
        # raise e
    except socket.timeout as e:
        print(e)
        final[ip] = "CLOSED"
    except socket.error as e:
        print(e)
        final[ip] = "CLOSED"

############################# hàm xử lý system ########################
def boxlogin():
    dialog = InputDialog(lineedit=["License key"], titletemp="Register for the Menu-KL")
    if dialog.exec() == QDialog.Accepted:
        print('okbutton')
        keyServer = dialog.getInputs()[0]
        query = f"UPDATE Design SET KeyServer='{keyServer}'"
        get_curSQL('datagame.db', query=query)
        # print(dialog.getInputs())
        return dialog.getInputs()[0]
    else:
        print('button cancel')
def Box_alert(text, style = None):

    MB_ABORTRETRYIGNORE = 2
    MB_CANCELTRYCONTINUE = 6
    MB_HELP = 0x4000
    MB_OK = 0
    MB_OKCANCEL = 1
    MB_RETRYCANCEL = 5
    MB_YESNO = 4
    MB_YESNOCANCEL = 3

    MB_ICONEXCLAMATION = MB_ICONWARNING = 0x30
    MB_ICONINFORMATION = MB_ICONASTERISK = 0x40
    MB_ICONQUESTION = 0x20
    MB_ICONSTOP = MB_ICONERROR = MB_ICONHAND = 0x10

    MB_DEFBUTTON1 = 0
    MB_DEFBUTTON2 = 0x100
    MB_DEFBUTTON3 = 0x200
    MB_DEFBUTTON4 = 0x300

    MB_APPLMODAL = 0
    MB_SYSTEMMODAL = 0x1000
    MB_TASKMODAL = 0x2000

    MB_DEFAULT_DESKTOP_ONLY = 0x20000
    MB_RIGHT = 0x80000
    MB_RTLREADING = 0x100000

    MB_SETFOREGROUND = 0x00010000 #0x10000
    MB_TOPMOST = 0x40000
    MB_SERVICE_NOTIFICATION = 0x200000


    IDABORT = 3
    IDCANCEL = 2
    IDCONTINUE = 11
    IDIGNORE = 5
    IDNO = 7
    IDOK = 1
    IDRETRY = 4
    IDTRYAGAIN = 10
    IDYES = 6

    def MsgBox(text, style, title):
        return ctypes.windll.user32.MessageBoxW(None, text, title, style)
    if style == None:
        style = MB_ICONERROR
    elif style == 'ok':
        style = MB_ICONINFORMATION
    # print(MsgBox("Hello World!", MB_ICONERROR | MB_OK | MB_SYSTEMMODAL, "Hello!"))
    print(MsgBox(text, MB_DEFAULT_DESKTOP_ONLY | MB_SETFOREGROUND | MB_SERVICE_NOTIFICATION | MB_SYSTEMMODAL | MB_TOPMOST | style | 0x0, "Menu-KL Message Dialog!"))
def openfilea(file):
    with open(file, 'rb') as f:
        data = f.read()
        return data
    #return base64.b64encode(data).decode()
def find_files(filename, search_path):
    result = []
    # Wlaking top-down from the root
    for root, dir, files in os.walk(search_path):
        a = 0
        for filetemp in files:
            if root.count('\\') > 2:
                break
            if filetemp.find(filename):
                a += 1
                print(a)
                result.append(os.path.join(root, filetemp))
                import pathlib
                tengame= pathlib.PureWindowsPath(filetemp).stem
                print(root,filetemp, 'số \\',root.count('\\'), 'tengame', tengame)
                break
    print(result, 'số game tìm được', len(result))

    return result
def get_curSQL(database, args=None, query=None):
    try:
        con = sqlite3.connect(database, timeout=10)  # (":memory:")
        # con.text_factory = lambda b: b.decode(errors='ignore')
        con.row_factory = dict_factory
        cur = con.cursor()
        cur.execute(f"PRAGMA key={Pass_sqlite}")
        if query == None:
            return cur,con
        elif 'SELECT' in query:
            # query = (f"SELECT * FROM {table};")
            if args != None:
                cur.execute(query, args)
            else:
                cur.execute(query)
            getdata = cur.fetchall()
            return getdata
        elif 'UPDATE' in query:
            # arg = (1,)
            # query = f'''UPDATE {table} SET Crop_photo=?;'''
            if args != None:
                cur.execute(query, args)
            else:
                cur.execute(query)
        elif 'INSERT' in query:
            # args = (id, self.imagedata, Groupgame, tengame, theloai, pathgame, Argument, pathimage, 0)
            # query = f'INSERT INTO {table} VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?);'
            if args != None:
                cur.execute(query, args)
            else:
                cur.execute(query)
        elif 'DELETE' in query:
            # query = (f"DELETE FROM listClient Where IP='{idgame}';")
            if args != None:
                cur.execute(query, args)
            else:
                cur.execute(query)
        con.commit()
        con.close()
    except Exception as e:
        if 'UNIQUE' in str(e):
            Box_alert("Game đã tồn tại")
            return 'Game đã tồn tại'
        else:
            Box_alert(str(e))
            offmain()


def zipextract(path_to_zip_file, directory_to_extract_to):
    import zipfile
    with zipfile.ZipFile(path_to_zip_file, 'r') as zip_ref:
        zip_ref.extractall(directory_to_extract_to)
def humanbytes(B):
    """Return the given bytes as a human friendly KB, MB, GB, or TB string."""
    B = float(B)
    KB = float(1024)
    MB = float(KB ** 2) # 1,048,576
    GB = float(KB ** 3) # 1,073,741,824
    TB = float(KB ** 4) # 1,099,511,627,776

    if B < KB:
        return '{0} {1}'.format(B,'Bytes' if 0 == B > 1 else 'Byte')
    elif KB <= B < MB:
        return '{0:.2f} KB'.format(B / KB)
    elif MB <= B < GB:
        return '{0:.2f} MB'.format(B / MB)
    elif GB <= B < TB:
        return '{0:.2f} GB'.format(B / GB)
    elif TB <= B:
        return '{0:.2f} TB'.format(B / TB)
def Remove_ContentsFolder(folder):
    try:
        file_path =''
        for filename in os.listdir(folder):
            file_path = os.path.join(folder, filename)
            if os.path.isfile(file_path) or os.path.islink(file_path):
                # os.unlink(file_path)
                os.remove(file_path)
            elif os.path.isdir(file_path):
                shutil.rmtree(file_path)
        shutil.rmtree(folder)
    except Exception as e:
        print('Failed to delete %s. Reason: %s' % (file_path, e))
        Box_alert(str(e))
        # try:
        #     shutil.rmtree(folder)
        # except OSError as e:
        #     print("Error: %s - %s." % (e.filename, e.strerror))
def Reading_sqlite_to_df(database, table):
    try:
        con = sqlite3.connect(database)
        cur = con.cursor()
        cur.execute(f"PRAGMA key={Pass_sqlite}")
        df = pd.read_sql('select * from {}'.format(table), con)
        con.close()
        return df
    except:
        pass
def find_row_in_tableview(tableView, text):
    model = tableView.model()
    for row in range(model.rowCount()):
        index = model.index(row, 2)
        # We suppose data are strings
        if text == (str(model.data(index))):
            # print(row)
            return row
def Save_localip():
    query = f'UPDATE Design SET Serverip="{local_ip}"'
    get_curSQL('datagame.db',query=query)
def Create_key():
    key = ''
    section = ''
    check_digit_count = 0
    alphabet = 'abcdefghijklmnopqrstuvwxyz1234567890'
    while len(key) < 25:
        char = random.choice(alphabet)
        key += char
        section += char
        if len(section) == 4:
            key += "-"
            section = ''
    key = key[:-1].upper()
    print(key)

def isVisibleWidget(widget):
    # while True:
    if not widget.visibleRegion().isEmpty():
        print('widget show')
        return True
    else:
        print('widget hide')
        return False

# ======================= Hàm check game Downloading... ======================= #
def Begin_checkdown_game_loading():
    query = f"SELECT * FROM Gamelist"
    getgamelist = get_curSQL('gamelist.db', query=query)
    for item in getgamelist:
        # print(item['Status'])
        if item['Status']=='Downloading...':
            ID = item["ID"]
            query = f'DELETE FROM Listgame Where ID="{ID}";'
            get_curSQL('datagame.db', query=query)
            query = f"UPDATE Gamelist SET Status='Game Delete' WHERE ID='{ID}'"
            get_curSQL('gamelist.db', query=query)
# threading.Thread(daemon=True, target=Begin_checkdown_game_loading).start()

#============== convert image url to blod ================#
def url_to_blob(url):
    # url = 'https://drive.google.com/file/d/11FXJiKuNer3QkiJy41hX9hNKBV70v2a7/view?usp=drivesdk'
    url = url.split('/')
    url = 'https://lh3.googleusercontent.com/d/' + url[5]
    request = requests.get(url)
    # self.pixmap.loadFromData(request.content)
    image = request.content
    # print(image)
    return image

################## Resilio ###########################################
class ResilioSyncClient(object):
    def __init__(self, host, port, username, password):
        self.host, self.port = host, port
        self.api_url = f"http://{self.host}:{self.port}"
        self.username, self.password = username, password
        self.session = requests.Session()
        self.session.auth = (self.username, self.password)
        self.session.timeout = 1
        self.session.verify = False
        self.token = self.get_token()

        # json = self.get_generic({"action": "events"})
        # print(json)

    def format_timestamp(self):
        dt = datetime.utcnow() - datetime(1970, 1, 1)
        ms = (dt.days * 24 * 60 * 60 + dt.seconds) * 1000 + dt.microseconds / 1000.0
        return int(ms)

    def get_token(self):
        try:
            token_url = urllib.parse.urljoin(self.api_url, "gui/token.html")
            response = self.session.get(token_url, params={"t": self.format_timestamp()}, timeout=10)
            soup = bs4.BeautifulSoup(response.content, "lxml")
            token_divs = soup.select("#token")
            token = token_divs[0].decode_contents()
            return token
        except:
            if Server_Status != None:
                print("server api: ", Server_api.Status, Server_Status)
            else:
                print('Lỗi connect resilio')


    def get_generic(self, params):
        try:
            response = self.session.get(
                urllib.parse.urljoin(self.api_url, "gui/"),
                params={"token": self.token, **params, "t": self.format_timestamp()},
                timeout=5,
            )
            return response.json()
        except Exception as e:
            print('error func get_generic rsl')

    def post_generic(self, params):
        try:
            response = self.session.post(
                urllib.parse.urljoin(self.api_url, "gui/"),
                params={"token": self.token, **params, "t": self.format_timestamp()},
                timeout=5,
            )
            return response.json()
        except:
            print('error delete game in resilio')

    def get_ID_IP_mac(self):
        json = self.get_generic({"action": "getmfdevices"})
        id = json['value'][0]['id']
        mac = json['value'][0]['macaddress']
        ip = json['value'][0]['ipaddress']
        print(id, mac, ip)
        return id, mac, ip

    def get_folders(self):
        json = self.get_generic({"action": "getsyncfolders", "discovery": 1})
        # print(json)
        value = []
        for i in json["folders"]:
            self.get_generic({"action": "setfolderpref",
                              "id": i['folderid'],
                              "deletetotrash": "false",
                              "iswritable": "false",
                              "override": "true",
                              "paused": "false",
                              "relay": "true",
                              "searchlan": "true",
                              "selectivesync": "false",
                              "stopped": "false",
                              "usehosts": "true",
                              "usetracker": "true"})
            if True:
                folderid = i['folderid']
                id = i['id']
                GameName = i['name']
                Pathtemp = i['path']
                # userid = json["folders"][i]["users"][1]['id']
                # userName= json["folders"][i]["users"][1]['name']
                try:
                    Remote_index = i['remoteindexing']
                except:
                    Remote_index = False
                down_status = i['down_status']
                speed_down = i['down_speed']
                speed_down = humanbytes(speed_down)
                try:
                    errors = i['errors'][0]['data']['description']
                    if r"Share's identifying .sync/ID file is broken" in errors:
                        self.Service_files_missing(folderid, Pathtemp)
                        print('service broken nen xoa folder sync trong thu muc game')
                    if r"Share's identifying .sync/ID file is missing" in errors or "Service" in errors:
                        self.Service_files_missing(folderid, Pathtemp)
                        print('Service missing')
                    if r"Can't download file" in errors:
                        self.Service_files_missing(folderid, Pathtemp)
                        print('service broken nen xoa folder sync trong thu muc game')

                except:
                    errors = "N/A"
                current_downsize = i['local_size']
                current_downsize = humanbytes(current_downsize)
                Totalsize_Game = i['size']
                Totalsize_Game = humanbytes(Totalsize_Game)

                # print(current_downsize)
                # print(Totalsize_Game)
                # print(json["folders"])
                valuetemp = {
                    "GameName": GameName,
                    "FolderID": folderid,
                    "PathGame": Pathtemp,
                    "Status": down_status,
                    "Speed_Down": speed_down,
                    "Current_Down": f"{current_downsize}/{Totalsize_Game}",
                    "Errors": errors,
                    "Remoteindex": Remote_index,
                    # "UserName": userName,
                    # "UserID": userid,
                }
                value.append(valuetemp)
        return value


    def add_linkgame(self, ID, link, Pathgame):
        Folder_game = Pathgame
        isExist = os.path.exists(Folder_game)
        if isExist:
            Remove_ContentsFolder(Folder_game)

        self.get_generic({"action": "addlink",
                          "link": link,
                          # "https://link.resilio.com/#f=CrossFire&sz=1E10&t=2&s=L3GNKPN3PDTFOAQ2KYDG752YVFGDQST5C7UYUPC6QNBPS6KHNDSA&i=C2ALF73XLNRYMD2FQ2O6SVEICTROHCMM6&v=2.7&a=2",
                          "path": Folder_game,
                          "selectivesync": "false",
                          "force": "true",
                          })
        self.setfolder(ID, Folder_game, link)
        self.del_notify()

    def delete_game(self, folderid):
        Folder_game = self.get_FolderPath(folderid)
        # print(Folder_game)
        json = self.post_generic({"action": "removefolder", "folderid": folderid,
                                  "deletedirectory": 'true',
                                  "fromalldevices": "true",
                                  })
        Remove_ContentsFolder(Folder_game)
        self.del_notify()

    def pause_game(self, folderid):
        print(folderid)
        json = self.get_generic({"action": "setfolderpref", "id": folderid,
                                 "deletetotrash": 'false',
                                 "iswritable": "true",
                                 "paused": "true",
                                 "relay": "true",
                                 "searchlan": "true",
                                 "selectivesync": "false",
                                 "stopped": "false",
                                 "usehosts": "false",
                                 "usetracker": "true"})
        pass

    def speed_downgame(self, speed):
        json = self.get_generic({"action": "setsettings", "dlrate": speed})
        print(json)
        pass

    def setfolder(self,ID, Folder_game, link):
        print('setfolder: ',ID, Folder_game, link)
        json = self.get_generic({"action": "getsyncfolders", "discovery": 1})
        for i in json["folders"]:
            if Folder_game == i['path']:
                print('idfolder', i['folderid'])
                query = f"UPDATE Gamelist SET FolderID='{i['folderid']}', Status='Ready' WHERE (linkgame='{link}' AND ID='{ID}')"
                get_curSQL('gamelist.db', query=query)
                folderid = i['folderid']
                json = self.get_generic({"action": "setfolderpref",
                                         "id": folderid,
                                         "deletetotrash": "false",
                                         "iswritable": "false",
                                         "override": "true",
                                         "paused": "false",
                                         "relay": "true",
                                         "searchlan": "true",
                                         "selectivesync": "false",
                                         "stopped": "false",
                                         "usehosts": "true",
                                         "usetracker": "true"})
                json = self.get_generic({"action": "setknownhosts",
                                         "id": folderid,
                                         "hosts": "115.75.37.153:62651"})
                print(json)
                break

    def get_FolderPath(self, folderid):
        json = self.get_generic({"action": "getsyncfolders", "discovery": 1})
        for i in json["folders"]:  # range(len(json["folders"])):
            if folderid == i['folderid']:
                Pathtemp = i['path']
                return Pathtemp

    def del_notify(self):
        json = self.get_generic({"action": "getnotifications"})
        value = json['value']
        for i in value:
            print(i['id'])
            self.get_generic({"action": "deletenotification", "id": i['id']})


    def Service_files_missing(self, folderid, path):
        json = self.get_generic({"action": "getdir",
                                 "dir": path})
        json = self.get_generic({"action": "getattr",
                                 "path": path})
        json = self.get_generic({"action": "updatepath",
                                 "folderid": folderid,
                                 "newpath": path,
                                 "force": 'true'})

    def over_write(self):
        self.get_generic({
            "action": "setadvancedsettings",
            "overwrite_changes": "false",  # Cho phép "Ghi đè mọi tệp đã thay đổi" đối với chia sẻ Chỉ đọc theo mặc định
        })

    def del_link(self, folderid):
        json = self.post_generic({"action": "removefolder", "folderid": folderid,
                                  "deletedirectory": 'true',
                                  "fromalldevices": "true",
                                  })
def Resilio_login():
    host = 'localhost'
    port = '8888'
    username = 'admin'
    password = 'admin'
    api = ResilioSyncClient(
        host=host,
        port=port,
        username=username,
        password=password,
    )
    # api.get_ID_IP_mac()
    return api.get_ID_IP_mac()
def check_keyResilio():
    query = f"SELECT * FROM Design"
    app = get_curSQL('datagame.db', query=query)
    # print(app[0]['keyResilio'], keyServer)
    keyResilio = app[0]['keyResilio']
    # =========== Kích hoạt trên server =============== #
    if keyResilio == None or keyResilio == '':
        key, ip, mac = Resilio_login()
        query = f"UPDATE Design SET keyResilio='{key}'"
        get_curSQL('datagame.db', query=query)
        keyResilio = key
        print('key resilio',keyResilio, keyServer)
    return keyResilio
KeyResilio=''
# keyResilio = check_keyResilio()
''''''
######################### func check key Server & get info server google app script ######################
class connect_server(object):
    def __init__(self, url, port, keyServer, keyResilio):
        self.url, self.port = url, port
        self.api_url = f"http://{self.url}:{self.port}"
        self.keyServer, self.keyResilio = keyServer, keyResilio
        self.session = requests.Session()
        self.session.verify = False
        self.token, self.Status = self.login_App()
        print('token', self.token)
        threading.Thread(target=self.check_lisent).start()

    def login_App(self):
        global token #<== get biến token
        global Server_Status # <== get Status server
        print(self.keyServer, self.keyResilio)
        value = {'event_key': 'Login_App',
                 'Key': self.keyServer,
                 'Key_Resilio': self.keyResilio,
                 # 'HoTen': 'khaicafe',
                 # 'Email': 'khaicafe@gmail.com',
                 # 'Date_Create': datetime.now().strftime("%H:%M:%S, %d/%m/%Y"),
                 }
        r = self.session.get(url=url, params=value)
        print('login server status: ', r.status_code)
        value = r.json()
        print('login_server: ',value, '\n')
        if "rev_data" in value:
            Server_Status = value['rev_data']['Status']
            # print(Server_Status)
            if Server_Status == 'Ready':
                token = value['token']['accessToken']
                args = (value['rev_data']['Status'], value['rev_data']['Ngayhethan'])
                query = f"UPDATE Design SET Status=?, Ngayhethan=?"
                get_curSQL('datagame.db', query=query, args=args)
                service_name = "rslsyncsvckl"
                try:
                    subprocess.check_output(f'''net start {service_name}''', shell=True)
                except:
                    pass
                # Box_alert(f'Success', 'ok')
            else:
                token = ''
                # Qwidget_main = False  # biến ghi log đã khởi động xong
                if Server_Status == 'Hết hạn':
                    args = (value['rev_data']['Status'], value['rev_data']['Ngayhethan'])
                    query = f"UPDATE Design SET Status=?, Ngayhethan=?"
                    get_curSQL('datagame.db', query=query, args=args)
                    Box_alert(f'Key has expired ! Please renew the software on the web https:\\Menukl.com')
                elif Server_Status == 'ERROR-submit':
                    # args = (value['rev_data']['Status'],)
                    query = f"UPDATE Design SET Status='{value['rev_data']['Status']}'"
                    get_curSQL('datagame.db', query=query)
                    Box_alert(f'Key {Server_Status} ! Please renew the software on the web https:\\Menukl.com')

                # =========== stop service resilio ============#
                service_name = "rslsyncsvckl"
                try:
                    subprocess.check_output(f'''net stop {service_name} /y''', shell=True)
                    pass
                except:
                    print('stop service resilio error')
                # subprocess.check_output(f'''net stop {service_name} /y && net start {service_name}''', shell=True)
            return token, value['rev_data']

    def check_lisent(self):
        while True:
            time.sleep(60)
            global token  # <== get biến token
            global Server_Status  # <== get Status server
            value = {'event_key': 'Login_App',
                     'Key': self.keyServer,
                     'Key_Resilio': self.keyResilio,
                     # 'HoTen': 'khaicafe',
                     # 'Email': 'khaicafe@gmail.com',
                     # 'Date_Create': datetime.now().strftime("%H:%M:%S, %d/%m/%Y"),
                     }
            r = self.session.get(url=url, params=value)
            print('login server status: ',r.status_code)
            value = r.json()
            print('login_server: ',value, '\n')
            if "rev_data" in value:
                Server_Status = value['rev_data']['Status']
                self.Status = value['rev_data']
                if Server_Status == 'Ready':
                    token = value['token']['accessToken']
                    args = (value['rev_data']['Status'], value['rev_data']['Ngayhethan'])
                    query = f"UPDATE Design SET Status=?, Ngayhethan=?"
                    get_curSQL('datagame.db', query=query, args=args)
                    service_name = "rslsyncsvckl"
                    try:
                        subprocess.check_output(f'''net start {service_name}''', shell=True)
                    except:
                        pass
                    # Box_alert(f'Success', 'ok')
                else:
                    token = ''
                    # Qwidget_main = False  # biến ghi log đã khởi động xong
                    if Server_Status == 'Hết hạn':
                        args = (value['rev_data']['Status'], value['rev_data']['Ngayhethan'])
                        query = f"UPDATE Design SET Status=?, Ngayhethan=?"
                        get_curSQL('datagame.db', query=query, args=args)
                        # Box_alert(f'Key has expired ! Please renew the software on the web https:\\Menukl.com')
                    elif Server_Status == 'ERROR-submit':
                        # args = (value['rev_data']['Status'],)
                        query = f"UPDATE Design SET Status='{value['rev_data']['Status']}'"
                        get_curSQL('datagame.db', query=query)
                        # Box_alert(f'Key {Server_Status} ! Please renew the software on the web https:\\Menukl.com')

                    # =========== stop service resilio ============#
                    service_name = "rslsyncsvckl"
                    try:
                        subprocess.check_output(f'''net stop {service_name} /y''', shell=True)
                        pass
                    except:
                        print('stop service resilio error')
                    # subprocess.check_output(f'''net stop {service_name} /y && net start {service_name}''', shell=True)
            # return token, value['rev_data']
    #          {'status': 'Invalid Signature get App', 'value-error':
    # ======================== get list game to Server ===========================#
    def get_infoPM(self):
        value = {'event_key': 'GetinfoPM_App',
                 'token': self.token,
                 }
        r = self.session.get(url=self.url, params=value)
        value = r.json()
        return value

    def get_listgame(self):
        value = {'event_key': 'Getlistgame_App',
                 'token': self.token,
                 }
        # r = requests.get(url=url, data=js.dumps(value))
        r = self.session.get(url=self.url, params=value)
        value = r.json()
        # print(r, value)
        return value

    def sosanh_listgame(self,value):
        # self.cur.execute("SELECT * FROM Gamelist")
        # self.gamelist = self.cur.fetchall()
        query = f"SELECT * FROM Gamelist"
        gamelist = get_curSQL('gamelist.db', query=query)
        valuegame = []
        listresilio = []
        listsql = []

        list_idgame = []

        for i in gamelist:
            listsql.append(i['ID'])
        # print(listsql)

        for j in value:
            # listresilio.append(j['FolderID'])
            list_idgame.append(j['ID_Game'])
        # print(list_idgame)

        # s = ['a', 'b', 'c']
        s = list_idgame
        # f = ['a', 'b', 'd', 'c']
        f = listsql
        ss = set(s)
        fs = set(f)
        # =========== list game same ========= #
        # print (ss.intersection(fs))

        # =========== total 2 list game ========= #
        # print (ss.union(fs))

        # =========== total 2 list game đã loại ra những game giống nhau ========= #
        # print (ss.union(fs) - ss.intersection(fs))

        # =========== list game mới so vs list cũ =========#
        listnew = ss - ss.intersection(fs)
        # print (ss - ss.intersection(fs))
        # type(listnew)
        # print (list(listnew))

        for i in gamelist:
            for j in value:
                if j['ID_Game'] == i['ID']:
                    ID = j['ID_Game']
                    Photo = url_to_blob(j['Photo_Game'])
                    GroupGame = j['Group_Game']
                    NameGame = j['Name_Game']
                    Totalsize = j['Totalsize']
                    Category = j['Theloai']
                    filerun = j['FileRun']
                    linkgame = j['linkdown']
                    Status = 'update list'
                    Date_Create = j['Date_Create']
                    Price = j['Price']

                    args = (Photo, GroupGame, NameGame, Totalsize, Category, filerun, linkgame, Date_Create, Price, ID)
                    query = f"UPDATE Gamelist SET Photo=?, GroupGame=?, NameGame=?, Totalsize=?, Category=?, filerun=?, linkgame=?, Date_Create=?, Price=? WHERE ID=?"
                    get_curSQL('gamelist.db', query=query, args=args)

        for k in list(listnew):
            for j in value:
                if j['ID_Game'] == k:
                    ID = j['ID_Game']
                    Photo = url_to_blob(j['Photo_Game'])
                    FolderID = ''
                    GroupGame = j['Group_Game']
                    NameGame = j['Name_Game']
                    Totalsize = j['Totalsize']
                    Category = j['Theloai']
                    filerun = j['FileRun']
                    linkgame = j['linkdown']
                    Status = 'New Game'
                    Date_Create = j['Date_Create']
                    Price = j['Price']

                    values = (
                    ID, Photo, FolderID, GroupGame, NameGame, Totalsize, Category, filerun, linkgame, Status, Date_Create, Price,)
                    # curclient.execute(query, values)
                    query = f"INSERT INTO Gamelist VALUES(?,?,?,?,?,?,?,?,?,?,?,?)"
                    get_curSQL('gamelist.db', query=query, args=values)

    def get_checkupdate(self):
        value = {'event_key': 'Get_checkupdate_App',
                 'token': self.token,
                 }
        # r = requests.get(url=url, data=js.dumps(value))
        r = self.session.get(url=self.url, params=value)
        value = r.json()
        ##### set data check version update #####
        data = value['rev_data'][0]
        args = (data['linkdown'], data['Version'])
        query = f"UPDATE Design SET linkdown=?,new_version=?"
        get_curSQL('datagame.db', query=query, args=args)
        return value

    # ======================== Set info PM to Server ===========================#
    def set_infoPM(self,Logo, TenPhongMay, DiaChi, Soluongmay, Ngayhethan, Status):
        Logo = url_to_blob(Logo)
        args = (Logo, TenPhongMay, DiaChi, Soluongmay, Ngayhethan, Status)
        query = f"UPDATE Design SET Logo=?,tenphongmay=?, DiaChi=?, Soluongmay=?, Ngayhethan=?, Status=?"
        get_curSQL('datagame.db', query=query, args=args)
def loginserver_getToken(url, keyServer, keyResilio):
    count = 0
    # global Server_api
    while count <= 3:
        print('login server count: ', count, "\n", url, keyServer, keyResilio)
        try:
            api =  get_api_server(url, keyServer, keyResilio)
            global Server_api
            Server_api = api
            print('api ',api)
            count = 4
        except:
            count+=1
    if Server_api.token != "":    # Login thành công
        getinfo_setinfo(Server_api)
def get_api_server(url, keyServer, keyResilio):
    port = None
    api = connect_server(
        url=url,
        port=port,
        keyServer=keyServer,
        keyResilio=keyResilio,
    )
    return api
def getinfo_setinfo(api):
    data = api.get_infoPM()['rev_data']
    # print('infoPM ', data, '\n')

    api.set_infoPM(data['Logo'], data['TenPhongMay'], data['DiaChi'], data['Soluongmay'], data['Ngayhethan'],
               data['Status'])

    listgame = api.get_listgame()['rev_data']

    new_row = pd.DataFrame(listgame)
    print('listgame: ',new_row)

    api.sosanh_listgame(listgame)

    value_checkupdate = api.get_checkupdate()['rev_data']
    new_row = pd.DataFrame(value_checkupdate)
    print(new_row)

################### Class QprogressBar tròn ######################
class roundProgressBar(QtWidgets.QWidget):

    def __init__(self, parent=None):
        super(roundProgressBar, self).__init__(parent)

        self.positionX = 0
        self.positionY = 0
        self.posFactor = 0

        self.rpb_minimumSize = (0, 0)
        self.rpb_maximumSize = (0, 0)
        self.rpb_dynamicMin = True
        self.rpb_dynamicMax = True
        self.rpb_Size = 0
        self.sizeFactor = 0

        self.rpb_maximum = 100
        self.rpb_minimum = 0

        self.rpb_type = self.barStyleFlags.Donet
        self.startPosition = self.startPosFlags.North
        self.rpb_direction = self.rotationFlags.Clockwise

        self.rpb_textType = self.textFlags.Percentage
        self.rpb_textColor = (0, 159, 227)
        self.rpb_textWidth = self.rpb_Size / 8
        self.rpb_textFont = 'Segoe UI'
        self.rpb_textValue = '12%'
        self.rpb_textRatio = 8
        self.textFactorX = 0
        self.textFactorY = 0
        self.dynamicText = True
        self.rpb_textActive = True

        self.lineWidth = 5
        self.pathWidth = 5
        self.rpb_lineStyle = self.lineStyleFlags.SolidLine
        self.rpb_lineCap = self.lineCapFlags.SquareCap
        self.lineColor = (0, 159, 227)
        self.pathColor = (218, 218, 218)

        self.rpb_circleColor = (218, 218, 218)
        self.rpb_circleRatio = 0.8
        self.rpb_circlePosX = 0
        self.rpb_circlePosY = 0

        self.rpb_pieColor = (200, 200, 200)
        self.rpb_pieRatio = 1
        self.rpb_piePosX = 0
        self.rpb_piePosY = 0

        self.rpb_value = -45 * 16

        if self.rpb_dynamicMin:
            self.setMinimumSize(QSize(self.lineWidth * 6 + self.pathWidth * 6, self.lineWidth * 6 + self.pathWidth * 6))

    # ------------------------------------------------------CLASS ENUMERATORS
    class lineStyleFlags:
        SolidLine = Qt.SolidLine
        DotLine = Qt.DotLine
        DashLine = Qt.DashLine

    class lineCapFlags:
        SquareCap = Qt.SquareCap
        RoundCap = Qt.RoundCap

    class barStyleFlags:
        Donet = 0
        Line = 1
        Pie = 2
        Pizza = 3
        Hybrid1 = 4
        Hybrid2 = 5

    class rotationFlags:
        Clockwise = -1
        AntiClockwise = 1

    class textFlags:
        Value = 0
        Percentage = 1

    class startPosFlags:
        North = 90 * 16
        South = -90 * 16
        East = 0 * 16
        West = 180 * 16

    # ------------------------------------------------------METHODS FOR CHANGING THE PROPERTY OF THE ROUNDPROGRESSBAR :SOLTS

    def rpb_setMinimumSize(self, width, height):
        """
        Minimum Size of the Widget
        ...

        Parameters
        --------------

        width : int
            width of the Widget

        height : int
            height of the Widget

        Raises
        --------------
        Exception : Sorry Width/Height should be an int
        """

        if type(width) != type(5) or type(height) != type(5):
            raise Exception('Sorry Width/Height should be an int')
            return
        self.rpb_dynamicMin = False
        self.setMinimumSize(width, height)
        self.rpb_minimumSize = (width, height)
        self.update()

    def rpb_setMaximumSize(self, width, height):
        """
        Maximum Size of the Widget
        ...

        Parameters
        --------------

        width : int
            width of the Widget

        height : int
            height of the Widget

        Raises
        --------------
        Exception : Sorry Width/Height should be an int
        """

        if type(width) != type(5) or type(height) != type(5):
            raise Exception('Sorry Width/Height should be an int')
            return
        self.rpb_dynamicMax = False
        self.setMaximumSize(width, height)
        self.rpb_maximumSize = (width, height)
        self.update()

    def rpb_setMaximum(self, maximum):
        """
        Maximum Value of the Progressbar
        ...

        Parameters
        --------------

        maximum : int
            Maximum value of the round progress bar

        Raises
        --------------
        Exception : Maximum and Minimum cannot be the Same
        """

        if self.rpb_minimum == maximum:  # FOR AVOIDING DIVISION BY ZERO ERROR IN FUTURE
            raise Exception("Maximum and Minimum cannot be the Same")
            return
        if self.rpb_maximum != maximum:
            self.rpb_maximum = maximum
            self.update()

    def rpb_setMinimum(self, minimum):
        """
        Minimum Value of the Progressbar
        ...

        Parameters
        --------------

        minimum : int
            Minimum value of the round progress bar

        Raises
        --------------
        Exception : Maximum and Minimum cannot be the Same
        """

        if self.rpb_minimum == minimum:  # FOR AVOIDING DIVISION BY ZERO ERROR IN FUTURE
            raise Exception("Maximum and Minimum cannot be the Same")
            return
        if self.rpb_minimum != minimum:
            self.rpb_minimum = minimum
            self.update()

    def rpb_setRange(self, maximum, minimum):
        """
        Range include the maximum and the minimum in one go.
        ...

        Parameters
        --------------

        maximum : int
            Maximum value of the round progress bar

        minimum : int
            Minimum value for the round progress bar

        Raises
        --------------
        none
        """

        if minimum > maximum:
            maximum, minimum = minimum, maximum
        if self.rpb_maximum != maximum:
            self.rpb_maximum = maximum
        if self.rpb_minimum != minimum:
            self.rpb_minimum = minimum
        self.update()

    def rpb_setInitialPos(self, pos):
        """
        Starting position of the round progress bar
        ...

        Parameters
        --------------

        pos : String
            Position string: 'North', 'South', 'East' and 'West'

        Raises
        --------------
        ValueError : Maximum and Minimum cannot be the Same
        """

        if pos == 'North':
            self.startPosition = self.startPosFlags.North
        elif pos == 'South':
            self.startPosition = self.startPosFlags.South
        elif pos == 'East':
            self.startPosition = self.startPosFlags.East
        elif pos == 'West':
            self.startPosition = self.startPosFlags.West
        else:
            raise Exception("Initial Position String can be: 'South', 'North'")
            return

    def rpb_setValue(self, value):
        """
        Set progress value
        ...

        Parameters
        --------------

        value : int
            The value of the progress bar in int. The value should be: min<=value<=max

        Raises
        --------------
        none
        """

        if self.rpb_value != value:
            if value >= self.rpb_maximum:
                roundProgressBar.convertInputValue(self, self.rpb_maximum)
            elif value < self.rpb_minimum:
                roundProgressBar.convertInputValue(self, self.rpb_minimum)
            else:
                roundProgressBar.convertInputValue(self, value)
            self.update()

    def rpb_reset(self):
        """
        Reset the progress bar to 0%
        ...

        Parameters
        --------------
        none

        Raises
        --------------
        none
        """

        roundProgressBar.convertInputValue(self, self.rpb_minimum)
        self.update()

    def rpb_setGeometry(self, posX, posY):
        """
        Set the X and Y position of the round progress bar.
        ...

        Parameters
        --------------

        posX : int
            The position of the round progress bar in int for X axis.

        posY : int
            The position of the round progress bar in int for Y axis.

        Raises
        --------------
        none
        """

        if self.positionX != posX:
            self.positionX = posX
        if self.positionY != posY:
            self.positionY = posY
        self.update()

    def rpb_setLineWidth(self, width):
        """
        Line Width of the line in round progress bar.
        ...

        Parameters
        --------------

        width: int
            Line width corresponding to the width in px.

        Raises
        --------------
        Exception: Line Width should be in int
        """

        if type(width) != type(5):
            raise Exception('Line Width should be in int')
            return
        if self.lineWidth != width:
            self.lineWidth = width
            self.update()

    def rpb_setLineColor(self, rgb):
        """
        Line Color of the progress bar.
        ...

        Parameters
        --------------

        rgb: tuple: (R, G, B)
            Color is passed as a tuple of values for red, blue and green in the order: (R, G, B)

        Raises
        --------------
        Exception: Line Color accepts a tuple: (R, G, B).
        """

        if type(rgb) != type(()):
            raise Exception("Line Color accepts a tuple: (R, G, B).")
            return
        if self.lineColor != rgb:
            self.lineColor = rgb
            self.update()

    def rpb_setPathColor(self, rgb):
        """
        Path Color settings.
        ...

        Parameters
        --------------

        rgb: tuple: (R, G, B)
            Color is passed as a tuple of values for red, blue and green in the order: (R, G, B)

        Raises
        --------------
        Exception: Path Color accepts a tuple: (R, G, B).
        """

        if type(rgb) != type(()):
            raise Exception("Path Color accepts a tuple: (R, G, B).")
            return
        if self.pathColor != rgb:
            self.pathColor = rgb
            self.update()

    def rpb_setPathWidth(self, width):
        """
        Path width settings.
        ...

        Parameters
        --------------

        width: int
            Width of the path in px

        Raises
        --------------
        Exception: Line Width should be in int
        """

        if type(width) != type(5):
            raise Exception('Path Width should be in int')
            return
        if self.pathWidth != width:
            self.pathWidth = width
            self.update()

    def rpb_setDirection(self, direction):
        """
        Direction of rotation of the progress bar.
        ...

        Parameters
        --------------

        direction: string
            string can be: 'AntiClockwise' or 'Clockwise'. Default: 'Clockwise'.

        Raises
        --------------
        Exception: Direction can only be: 'Clockwise' and 'AntiClockwise'
        """

        if direction == 'Clockwise' or direction == -1:
            self.rpb_direction = self.rotationFlags.Clockwise
        elif direction == 'AntiClockwise' or direction == 1:
            self.rpb_direction = self.rotationFlags.AntiClockwise
        else:
            raise Exception("Direction can only be: 'Clockwise' and 'AntiClockwise' and Not: " + str(direction))
            return
        self.update()

    def rpb_setBarStyle(self, style):
        """
        Bar Style of the progress bar.
        ...

        Parameters
        --------------

        style: String
            String of the styles of the progress bar: 'Donet', 'Pie', 'line', 'Hybrid1', 'Hybrid2', 'Pizza'

        Raises
        --------------
        Exception: Round Progress Bar has only the following styles: 'Line', 'Donet', 'Hybrid1', 'Pizza', 'Pie' and 'Hybrid2'
        """

        if style == 'Donet':
            self.rpb_type = self.barStyleFlags.Donet
        elif style == 'Line':
            self.rpb_type = self.barStyleFlags.Line
        elif style == 'Pie':
            self.rpb_type = self.barStyleFlags.Pie
        elif style == 'Pizza':
            self.rpb_type = self.barStyleFlags.Pizza
        elif style == 'Hybrid1':
            self.rpb_type = self.barStyleFlags.Hybrid1
        elif style == 'Hybrid2':
            self.rpb_type = self.barStyleFlags.Hybrid2
        else:
            raise Exception(
                "Round Progress Bar has only the following styles: 'Line', 'Donet', 'Hybrid1', 'Pizza', 'Pie' and 'Hybrid2'")
            return
        self.update()

    def rpb_setLineStyle(self, style):
        """
        Line Style setting.
        ...

        Parameters
        --------------

        style: String
            Line style: 'DotLine', 'DashLine', 'SolidLine', passed as a string.

        Raises
        --------------
        none
        """

        if style == 'SolidLine':
            self.rpb_lineStyle = self.lineStyleFlags.SolidLine
        elif style == 'DotLine':
            self.rpb_lineStyle = self.lineStyleFlags.DotLine
        elif style == 'DashLine':
            self.rpb_lineStyle = self.lineStyleFlags.DashLine
        else:
            self.rpb_lineStyle = self.lineStyleFlags.SolidLine

    def rpb_setLineCap(self, cap):
        """
        Line Cap setting.
        ...

        Parameters
        --------------

        cap: String
            Cap is the end point of a stroke. It can be: 'RoundCap' or 'SquareCap'

        Raises
        --------------
        none
        """

        if cap == 'SquareCap':
            self.rpb_lineCap = self.lineCapFlags.SquareCap
        elif cap == 'RoundCap':
            self.rpb_lineCap = self.lineCapFlags.RoundCap

    def rpb_setTextColor(self, rgb):
        """
        Text color of the text inside the progress bar
        ...

        Parameters
        --------------

        rgb: tuple
            Color of the text in the format: (R, G, B)

        Raises
        --------------
        none
        """

        if self.rpb_textColor != rgb:
            self.rpb_textColor = rgb
            self.update()

    def rpb_setTextFont(self, font):
        """
        Font of the text inside the round progress bar
        ...

        Parameters
        --------------

        font: str
            Name of the font in string

        Raises
        --------------
        none
        """

        if self.rpb_textFont != font:
            self.rpb_textFont = font
            self.update()

    def rpb_setTextFormat(self, textTyp):
        """
        Text formatter i.e. the value or the percentage.
        ...

        Parameters
        --------------

        textTyp: str
            'value', 'percentage'

        Raises
        --------------
        none
        """

        if textTyp == 'Value':
            self.rpb_textType = self.textFlags.Value
        elif textTyp == 'Percentage':
            self.rpb_textType = self.textFlags.Percentage
        else:
            self.rpb_textType = self.textFlags.Percentage

    def rpb_setTextRatio(self, ratio):
        """
        Text ratio with respect to the size of the progress bar.
        ...

        Parameters
        --------------

        ratio: int
            In number from 3 to 50 corresponding to 1/3 or 1/50 the size of the roundprogressbar.

        Raises
        --------------
        none
        """

        if self.rpb_textRatio != ratio:
            if ratio < 3:
                ratio = 3
            elif ratio > 50:
                ratio = 50
            self.rpb_textRatio = ratio
            self.update()

    def rpb_setTextWidth(self, width):
        """
        Text Width.
        ...

        Parameters
        --------------

        font: int
            Text constant width. Will not change during the widget resize.

        Raises
        --------------
        none
        """

        self.dynamicText = False
        if width > 0:
            self.rpb_textWidth = width
            self.update()

    def rpb_setCircleColor(self, rgb):
        """
        Circle color fill inside the circle.
        ...

        Parameters
        --------------

        font: tuple
            The color of the circle in the tuple corresponding to the (R, G, B).

        Raises
        --------------
        none
        """

        if self.rpb_circleColor != rgb:
            self.rpb_circleColor = rgb
            self.update()

    def rpb_setCircleRatio(self, ratio):
        """
        Circle ration corresponding to the round progress bar.
        ...

        Parameters
        --------------

        font: int
            Integer corresponding to the size of the progress bar to that of the round progress bar.

        Raises
        --------------
        none
        """

        if self.rpb_circleRatio != ratio:
            self.rpb_circleRatio = ratio
            self.update()

    def rpb_setPieColor(self, rgb):
        """
        Pie color inside the fill.
        ...

        Parameters
        --------------

        font: tuple
            Tuple consist in format (R, G, B). Same as color setting to Line.

        Raises
        --------------
        none
        """

        if self.rpb_pieColor != rgb:
            self.rpb_pieColor = rgb
            self.update()

    def rpb_setPieRatio(self, ratio):
        """
        Pie Ratio
        ...

        Parameters
        --------------

        font: int
            Ratio corresponding to the size between the roundprogressbar and the pie size.

        Raises
        --------------
        none
        """

        if self.rpb_pieRatio != ratio:
            self.rpb_pieRatio = ratio
            self.update()

    def rpb_enableText(self, enable):
        """
        Makes the Text visible/Hidden
        ...

        Parameters
        --------------

        font: bool
            True: Text visible, False: Text invisible.

        Raises
        --------------
        none
        """

        if enable:
            self.rpb_textActive = enable
        else:
            self.rpb_textActive = enable
        self.update()

    # ------------------------------------------------------METHODS FOR GETTING THE PROPERTY OF ROUNDPROGRESSBAR SLOTS

    def rpb_getSize(self):
        """
        Get the present size of the progress bar.
        ...

        Returns
        --------------
        Return the size of the round progress bar in int.
        """

        return self.rpb_Size

    def rpb_getValue(self):
        """
        Present value of the progress bar.
        ...

        Returns
        --------------
        int corresponding to the present progress bar value.
        """

        return self.rpb_value / 16

    def rpb_getRange(self):
        """
        Progress bar range.
        ...

        Returns
        --------------
        tuple consisting of minimu and maximum as elements.
        """

        return (self.rpb_minimum, self.rpb_maximum)

    def rpb_getTextWidth(self):
        """
        Text width of the present text in the central of the widget.
        ...

        Returns
        --------------
        int corresponding to the width of the text
        """

        return self.rpb_textWidth

    # ------------------------------------------------------ENGINE: WHERE ALL THE REAL STUFF TAKE PLACE: WORKING OF THE ROUNDPROGRESSBA

    def rpb_MinimumSize(self, dynamicMax, minimum, maximum):
        """
        Minimum size calculating code: Takes consideration of the width of the line/path/circle/pie and the user defined
        width and also the size of the frame/window of the application.

        """

        rpb_Height = self.height()
        rpb_Width = self.width()
        if dynamicMax:
            if rpb_Width >= rpb_Height and rpb_Height >= minimum[1]:
                self.rpb_Size = rpb_Height
            elif rpb_Width < rpb_Height and rpb_Width >= minimum[0]:
                self.rpb_Size = rpb_Width
        else:
            if rpb_Width >= rpb_Height and rpb_Height <= maximum[1]:
                self.rpb_Size = rpb_Height
            elif rpb_Width < rpb_Height and rpb_Width <= maximum[0]:
                self.rpb_Size = rpb_Width

    def convertInputValue(self, value):
        """
        CONVERTS ANY INPUT VALUE TO THE 0*16-360*16 DEGREE REFERENCE OF THE QPainter.drawArc NEEDED.

        """

        self.rpb_value = ((value - self.rpb_minimum) / (self.rpb_maximum - self.rpb_minimum)) * 360 * 16
        self.rpb_value = self.rpb_direction * self.rpb_value
        if self.rpb_textType == roundProgressBar.textFlags.Percentage:
            self.rpb_textValue = str(
                round(((value - self.rpb_minimum) / (self.rpb_maximum - self.rpb_minimum)) * 100)) + "%"
        else:
            self.rpb_textValue = str(value)

    # SINCE THE THICKNESS OF THE LINE OR THE PATH CAUSES THE WIDGET TO WRONGLY FIT INSIDE THE SIZE OF THE WIDGET DESIGNED IN THE
    # QTDESIGNER, THE CORRECTION FACTOR IS NECESSERY CALLED THE GEOMETRYFACTOR, WHICH CALCULATE THE TWO FACTORS CALLED THE
    # self.posFactor AND THE self.sizeFactor, CALCULATION THIS IS NECESSERY AS THE
    def geometryFactor(self):
        if self.lineWidth > self.pathWidth:
            self.posFactor = self.lineWidth / 2 + 1
            self.sizeFactor = self.lineWidth + 1
        else:
            self.posFactor = self.pathWidth / 2 + 1
            self.sizeFactor = self.pathWidth + 1

    def rpb_textFactor(self):
        if self.dynamicText:
            self.rpb_textWidth = self.rpb_Size / self.rpb_textRatio
        self.textFactorX = self.posFactor + (self.rpb_Size - self.sizeFactor) / 2 - self.rpb_textWidth * 0.75 * (
                    len(self.rpb_textValue) / 2)
        self.textFactorY = self.rpb_textWidth / 2 + self.rpb_Size / 2

    def rpb_circleFactor(self):
        self.rpb_circlePosX = self.positionX + self.posFactor + ((self.rpb_Size) * (1 - self.rpb_circleRatio)) / 2
        self.rpb_circlePosY = self.positionY + self.posFactor + ((self.rpb_Size) * (1 - self.rpb_circleRatio)) / 2

    def rpb_pieFactor(self):
        self.rpb_piePosX = self.positionX + self.posFactor + ((self.rpb_Size) * (1 - self.rpb_pieRatio)) / 2
        self.rpb_piePosY = self.positionY + self.posFactor + ((self.rpb_Size) * (1 - self.rpb_pieRatio)) / 2

    def paintEvent(self, event: QPaintEvent):

        # THIS BELOW CODE AMKE SURE THAT THE SIZE OF THE ROUNDPROGRESSBAR DOESNOT REDUCES TO ZERO WHEN THE USER RESIZES THE WINDOW
        if self.rpb_dynamicMin:
            self.setMinimumSize(QSize(self.lineWidth * 6 + self.pathWidth * 6, self.lineWidth * 6 + self.pathWidth * 6))

        roundProgressBar.rpb_MinimumSize(self, self.rpb_dynamicMax, self.rpb_minimumSize, self.rpb_maximumSize)
        roundProgressBar.geometryFactor(self)
        roundProgressBar.rpb_textFactor(self)
        roundProgressBar.rpb_circleFactor(self)
        roundProgressBar.rpb_pieFactor(self)

        if self.rpb_type == 0:  # DONET TYPE
            roundProgressBar.pathComponent(self)
            roundProgressBar.lineComponent(self)
            roundProgressBar.textComponent(self)
        elif self.rpb_type == 1:  # LINE TYPE
            roundProgressBar.lineComponent(self)
            roundProgressBar.textComponent(self)
        elif self.rpb_type == 2:  # Pie
            roundProgressBar.pieComponent(self)
            roundProgressBar.textComponent(self)
        elif self.rpb_type == 3:  # PIZZA
            roundProgressBar.circleComponent(self)
            roundProgressBar.lineComponent(self)
            roundProgressBar.textComponent(self)
        elif self.rpb_type == 4:  # HYBRID1
            roundProgressBar.circleComponent(self)
            roundProgressBar.pathComponent(self)
            roundProgressBar.lineComponent(self)
            roundProgressBar.textComponent(self)
        elif self.rpb_type == 5:  # HYBRID2
            roundProgressBar.pieComponent(self)
            roundProgressBar.lineComponent(self)
            roundProgressBar.textComponent(self)

    def lineComponent(self):
        linePainter = QPainter(self)
        linePainter.setRenderHint(QPainter.Antialiasing)
        penLine = QPen()
        penLine.setStyle(self.rpb_lineStyle)
        penLine.setWidth(self.lineWidth)
        penLine.setBrush(QColor(self.lineColor[0], self.lineColor[1], self.lineColor[2]))
        penLine.setCapStyle(self.rpb_lineCap)
        penLine.setJoinStyle(Qt.RoundJoin)
        linePainter.setPen(penLine)
        linePainter.drawArc(self.positionX + self.posFactor, self.positionY + self.posFactor,
                            self.rpb_Size - self.sizeFactor, self.rpb_Size - self.sizeFactor, self.startPosition,
                            self.rpb_value)
        linePainter.end()

    def pathComponent(self):
        pathPainter = QPainter(self)
        pathPainter.setRenderHint(QPainter.Antialiasing)
        penPath = QPen()
        penPath.setStyle(Qt.SolidLine)
        penPath.setWidth(self.pathWidth)
        penPath.setBrush(QColor(self.pathColor[0], self.pathColor[1], self.pathColor[2]))
        penPath.setCapStyle(Qt.RoundCap)
        penPath.setJoinStyle(Qt.RoundJoin)
        pathPainter.setPen(penPath)
        pathPainter.drawArc(self.positionX + self.posFactor, self.positionY + self.posFactor,
                            self.rpb_Size - self.sizeFactor, self.rpb_Size - self.sizeFactor, 0, 360 * 16)
        pathPainter.end()

    def textComponent(self):
        if self.rpb_textActive:
            textPainter = QPainter(self)
            penText = QPen()
            penText.setColor(QColor(self.rpb_textColor[0], self.rpb_textColor[1], self.rpb_textColor[2]))
            textPainter.setPen(penText)
            fontText = QFont()
            fontText.setFamily(self.rpb_textFont)
            fontText.setPointSize(self.rpb_textWidth)
            textPainter.setFont(fontText)
            textPainter.drawText(self.positionX + self.textFactorX, self.positionY + self.textFactorY,
                                 self.rpb_textValue)
            textPainter.end()

    def circleComponent(self):
        circlePainter = QPainter(self)
        penCircle = QPen()
        penCircle.setWidth(0)
        penCircle.setColor(QColor(self.rpb_circleColor[0], self.rpb_circleColor[1], self.rpb_circleColor[2]))
        circlePainter.setRenderHint(QPainter.Antialiasing)
        circlePainter.setPen(penCircle)
        circlePainter.setBrush(QColor(self.rpb_circleColor[0], self.rpb_circleColor[1], self.rpb_circleColor[2]))
        circlePainter.drawEllipse(self.rpb_circlePosX, self.rpb_circlePosY,
                                  (self.rpb_Size - self.sizeFactor) * self.rpb_circleRatio,
                                  (self.rpb_Size - self.sizeFactor) * self.rpb_circleRatio)

    def pieComponent(self):
        piePainter = QPainter(self)
        penPie = QPen()
        penPie.setWidth(0)
        penPie.setColor(QColor(self.rpb_pieColor[0], self.rpb_pieColor[1], self.rpb_pieColor[2]))
        piePainter.setRenderHint(QPainter.Antialiasing)
        piePainter.setPen(penPie)
        piePainter.setBrush(QColor(self.rpb_pieColor[0], self.rpb_pieColor[1], self.rpb_pieColor[2]))
        piePainter.drawPie(self.rpb_piePosX, self.rpb_piePosY, (self.rpb_Size - self.sizeFactor) * self.rpb_pieRatio,
                           (self.rpb_Size - self.sizeFactor) * self.rpb_pieRatio, self.startPosition, self.rpb_value)

########################## Tray icon ##############################
import wx.adv
TRAY_TOOLTIP = 'System Tray MenuKL'
TRAY_ICON = 'logo.png'
def create_menu_item(menu, label, func):
    item = wx.MenuItem(menu, -1, label)
    menu.Bind(wx.EVT_MENU, func, id=item.GetId())
    menu.Append(item)
    return item
class TaskBarIcon(wx.adv.TaskBarIcon):
    def __init__(self, frame):
        self.frame = frame

        super(TaskBarIcon, self).__init__()
        icon = wx.Icon(wx.Bitmap(TRAY_ICON, wx.BITMAP_TYPE_ANY))

        self.SetIcon(icon,TRAY_TOOLTIP)
        self.Bind(wx.adv.EVT_TASKBAR_LEFT_DOWN, self.on_left_down)

    def CreatePopupMenu(self):
        menu = wx.Menu()
        create_menu_item(menu, 'Show Menu_KL', self.on_hello)
        menu.AppendSeparator()
        create_menu_item(menu, 'Exit', self.on_exit)
        return menu

    def set_icon(self, path):
        icon = wx.Icon(wx.Bitmap(path))
        self.SetIcon(icon, TRAY_TOOLTIP)

    def on_left_down(self, event):
        print ('Tray icon was left-clicked.')
        # widget.show()
        global widget
        widget.showNormal()
        # widget.setWindowFlags(widget._flags)# _flags la bien trang thai truoc khi hide(minimize)

    def on_hello(self, event):
        print ('Hello, world!')
        widget.show()

    def on_exit(self, event):
        self.RemoveIcon()
        wx.CallAfter(self.Destroy)
        self.frame.Close()
        offmain()
class App(wx.App):
    def OnInit(self):
        frame=wx.Frame(None)
        self.SetTopWindow(frame)
        TaskBarIcon(frame)
        return True
def main_trayicon():
    app = App(False)
    app.MainLoop()

########################### shutdown main ########################
def offmain():
    try:
        # sys.exit(app.exec_())
        sys.exit()
    except:
        print('exit')
        p = psutil.Process(state)
        p.terminate()  # or p.kill()

########################### HotKey ###############################
class KeyBoardManager(QObject):
    F1Signal = pyqtSignal()
    def start(self):
        keyboard.add_hotkey("ctrl+shift+k+l", self.F1Signal.emit, suppress=True)

############################ func begin app ######################
if __name__ == "__main__":
    # os.popen('config.ini')
    app = QtWidgets.QApplication([sys.argv])  # (sys.argv)
    #app.setStyleSheet(GLOBAL_STYLE)
    function = Func_loading()
    function.loading()
    # widget = Dashboard()
    # widget.show()
    main_trayicon()
    try:
        sys.exit(app.exec_())
    except:
        print('exit')
        p = psutil.Process(state)
        p.terminate()  # or p.kill()
