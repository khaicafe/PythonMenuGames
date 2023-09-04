import base64
import json as js
import os
import pathlib
import shutil
import sqlite3
import subprocess
import time


import pandas as pd
# import datetime

import requests


import urllib.parse
from datetime import datetime
import bs4
from pathlib import Path

from PyQt5 import QtWidgets, QtCore, QtGui
from PyQt5.QtCore import *
from PyQt5.QtGui import *
from PyQt5.QtWidgets import QMenu, QAction, QTableWidgetItem, QMenuBar, QDialog, QLabel, QSizeGrip, QFileDialog, \
    QSizePolicy, QWidgetAction, QMessageBox, QAbstractItemView, QHeaderView, QTableView, QVBoxLayout, QLineEdit, \
    QDialogButtonBox, QFormLayout, QProgressBar, QGraphicsDropShadowEffect
from PyQt5.uic import loadUi

requests.packages.urllib3.disable_warnings()

# ECLLQNDVF7E4PJE4J57VMVP4WWOFXDLT
#'id': 'PPCGRJR3K5KF2TUFT53RRSWT2KELMWMOJOY665NNATJFJ6R4UYZQ' id chính xác
session = requests.Session()
token=''
url = 'https://script.google.com/macros/s/AKfycbyvhJU56RfOvbePo45F6aQQrF-ECdTkUY-K-ewmeBYPq9_6o6i8tLTDpv0IzipMCvptwQ/exec'
keyResilio =''
keyServer = '5888-8392-3360-3788'
Pass_sqlite = 'khaicafe'
def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d
def get_curSQL(database, args=None, query=None):
    con = sqlite3.connect(database)  # (":memory:")
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

###################### check key Resilio in database #############

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

    def format_timestamp(self):
        dt = datetime.utcnow() - datetime(1970, 1, 1)
        ms = (dt.days * 24 * 60 * 60 + dt.seconds) * 1000 + dt.microseconds / 1000.0
        return int(ms)

    def normalize_path(self, path):
        return Path(path).absolute().resolve()

    def get_token(self):
        token_url = urllib.parse.urljoin(self.api_url, "gui/token.html")
        response = self.session.get(token_url, params={"t": self.format_timestamp()}, timeout=5)

        soup = bs4.BeautifulSoup(response.content, "lxml")
        token_divs = soup.select("#token")
        token = token_divs[0].decode_contents()
        return token

    def get_generic(self, params):
        response = self.session.get(
            urllib.parse.urljoin(self.api_url, "gui/"),
            params={"token": self.token, **params, "t": self.format_timestamp()},
            timeout=5,
        )
        #http://localhost:8888/gui/images/disconnect.svg
        # testcode = self.session.get(
        #     urllib.parse.urljoin("http://localhost:8888/gui/images/disconnect.svg")
        # print('testcode ',testcode)
        return response.json()

    def get_folders(self):
        json = self.get_generic({"action": "getpendingrequests"})
        print(json)
        #getsysteminfo
        #getusername
        #settings
        #setsettings
        #getpeersstat


        #generatelicenselink
        #getappinfo
        #checknewversion
        # folderid = json["folders"][0]['folderid']
        # id = json["folders"][0]['id']
        # # id': '3041572280668926896'
        # print(id,'\n', json["folders"])
        # print('folderid: ', json["folders"][0]['folderid'])
        #&action=getmfdevices&t=
        # json = self.get_generic({"action": "getmfdevices"})
        # #getstatuses
        # json = self.get_generic({"action": "getstatuses"})
        # #setfolderpref Pause
        # #action=setfolderpref&id=11934475632055144808&deletetotrash=true&iswritable=true&paused=true&relay=true&searchlan=true&selectivesync=true&stopped=false&usehosts=false&usetracker=true&t=1659503726686
        # json = self.get_generic({"action": "setfolderpref", "id": folderid,
        #                          "deletetotrash": 'false',
        #                          "iswritable": "true",
        #                          "paused": "true",
        #                          "relay": "true",
        #                          "searchlan": "true",
        #                          "selectivesync": "true",
        #                          "stopped": "false",
        #                          "usehosts": "false",
        #                          "usetracker": "true"})
        # # resume
        # json = self.get_generic({"action": "setfolderpref", "id": folderid,
        #                          "deletetotrash": 'false',
        #                          "iswritable": "true",
        #                          "paused": "false",
        #                          "relay": "true",
        #                          "searchlan": "true",
        #                          "selectivesync": "false",
        #                          "stopped": "false",
        #                          "usehosts": "false",
        #                          "usetracker": "true"})
        # disconect and remove
        # json = self.get_generic({"action": "removefolder", "id": folderid,
        #                          "deletedirectory": 'false',
        #                          "fromalldevices": "false",
        #                          })
        # remove
        # json = self.get_generic({"action": "removefolder", "id": folderid,
        #                          "deletedirectory": 'true',
        #                          "fromalldevices": "true",
        #                          })

        # connect
        #action=adddisconnectedfolder&folderid=11934475632055144808&selectivesync=false&path=C:\Users\khaicafe\Resilio Sync\test (1)
        # json = self.get_generic({"action": "adddisconnectedfolder", "id": folderid,
        #                          "deletetotrash": 'false',
        #                          "iswritable": "true",
        #                          "selectivesync": "false",
        #                          "path": r"C:\Users\khaicafe\ResilioSync\test",
        #                          })
        # synjod
        # json = self.get_generic({"action": "synjod"})
        # # proxysetting
        # json = self.get_generic({"action": "proxysettings"})

        # add new
        #https://link.resilio.com/#f=CrossFire&sz=1E10&t=2&s=L3GNKPN3PDTFOAQ2KYDG752YVFGDQST5C7UYUPC6QNBPS6KHNDSA&i=C2ALF73XLNRYMD2FQ2O6SVEICTROHCMM6&v=2.7&a=2
        #&path=E:\test&selectivesync=fals
        # json = self.get_generic({"action": "addlink",
        #                          "link": "https://link.resilio.com/#f=CrossFire&sz=1E10&t=2&s=L3GNKPN3PDTFOAQ2KYDG752YVFGDQST5C7UYUPC6QNBPS6KHNDSA&i=C2ALF73XLNRYMD2FQ2O6SVEICTROHCMM6&v=2.7&a=2",
        #                          "path": r'E:\test',
        #                          "selectivesync": "false",
        #                          })
        #action=deletenotification&id=7909284494729561044&t=1659509482033

        # set proxy host or clear proxy
        # action=setknownhosts&id=3041572280668926896&hosts=192.168.1.2:8000,192.168.1.1:111&isfolder=true
        # json = self.get_generic({"action": "setknownhosts",
        #                          "id": "3041572280668926896",
        #                          "hosts": '',
        #                          "isfolder": "true",
        #                          })
        # disable or enable proxy
        # action=setfolderpref&id=3041572280668926896&deletetotrash=true&iswritable=false&override=false&paused=false&relay=true&searchlan=true&selectivesync=false&stopped=false&usehosts=true&usetracker=true&status=200


        # action=parselink&link=https://link.resilio.com/#f=CrossFire&sz=1E10&t=2&s=L3GNKPN3PDTFOAQ2KYDG752YVFGDQST5C7UYUPC6QNBPS6KHNDSA&i=C2ALF73XLNRYMD2FQ2O6SVEICTROHCMM6&v=2.7&a=2
        # print(json["folders"])
        # assert json["status"] == 200
        # return [ResilioSyncFolder(obj) for obj in json["folders"]]
    def get_ID_IP_mac(self):
        json = self.get_generic({"action": "getmfdevices"})
        id = json['value'][0]['id']
        mac = json['value'][0]['macaddress']
        ip = json['value'][0]['ipaddress']
        print(id, mac, ip)
        return id, mac, ip

    def get_folder_by_path(self, rel_path):
        abs_path = self.normalize_path(rel_path)
        folders = self.get_folders()
        containing_folders = []
        for folder in folders:
            if not folder.selected:
                continue
            if folder.path == abs_path or folder.path in abs_path.parents:
                containing_folders.append(folder)

        assert len(containing_folders) <= 1
        if not containing_folders:
            raise ValueError("Path is not contained in a synced folder.")

        return containing_folders[0]

    def file_exists(self, folder, path):
        assert folder.selected
        path = Path(path)
        if not path.is_absolute():
            path = folder.path / path

        abs_path = self.normalize_path(path)
        base_path = Path(".")

        while True:
            path_str = str(base_path)
            if base_path == Path("."):
                path_str = ""

            result = self.get_generic(
                {
                    "action": "getfileslist",
                    "folderid": folder.folderid,
                    "path": path_str,
                }
            )

            assert result["status"] == 200
            files = result["value"]["files"]
            for f in files:
                test_path = folder.path / base_path / f["name"]
                if test_path == abs_path:
                    return True

                if test_path in abs_path.parents:
                    base_path /= f["name"]
                    break
            else:
                return False

    def set_sync_status(self, rel_path, sync=True):
        # First, track down the parent folder, if it exists
        abs_path = self.normalize_path(rel_path)
        folder = self.get_folder_by_path(abs_path)
        child_rel_path = abs_path.relative_to(folder.path)

        # Now, check if the folder has our file
        if not self.file_exists(folder, child_rel_path):
            raise ValueError("Path does not exist in the folder!")

        self.get_generic(
            {
                "action": "setfilemode",
                "folderid": folder.folderid,
                "path": child_rel_path,
                "selected": "true" if sync else "false",
                "removefromall": "false",
            }
        )

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
    if keyResilio==None or keyResilio=='':
        key, ip, mac = Resilio_login()
        query = f"UPDATE Design SET keyResilio='{key}', KeyServer='{keyServer}'"
        get_curSQL('datagame.db', query=query)
        keyResilio = key
        # print(keyResilio, keyServer)
    return keyResilio

############################### get info user ###############################

# def get_infoPM(token):
#     value = {'event_key': 'GetinfoPM_App',
#              # 'Key': keyServer,
#              # 'Key_Resilio': keyResilio,
#              'token': token,
#              }
#     # r = requests.get(url=url, data=js.dumps(value))
#     r = session.get(url=url, params=value)
#     value = r.json()
#     # print(r, value)
#     return value

#======================== get list game to Server ===========================#

# def get_listgame(token):
#     value = {'event_key': 'Getlistgame_App',
#              'token': token,
#              }
#     # r = requests.get(url=url, data=js.dumps(value))
#     r = session.get(url=url, params=value)
#     value = r.json()
#     # print(r, value)
#     return value
#
# def sosanh_listgame(value):
#     # self.cur.execute("SELECT * FROM Gamelist")
#     # self.gamelist = self.cur.fetchall()
#     query = f"SELECT * FROM Gamelist"
#     gamelist = get_curSQL('gamelist.db', query=query)
#     valuegame = []
#     listresilio = []
#     listsql = []
#
#     list_idgame = []
#
#     for i in gamelist:
#         listsql.append(i['ID'])
#     # print(listsql)
#
#     for j in value:
#         # listresilio.append(j['FolderID'])
#         list_idgame.append(j['ID_Game'])
#     # print(list_idgame)
#
#
#     # s = ['a', 'b', 'c']
#     s = list_idgame
#     # f = ['a', 'b', 'd', 'c']
#     f = listsql
#     ss = set(s)
#     fs = set(f)
#     # =========== list game same ========= #
#     print (ss.intersection(fs))
#
#     # =========== total 2 list game ========= #
#     print (ss.union(fs))
#
#     # =========== total 2 list game đã loại ra những game giống nhau ========= #
#     print (ss.union(fs) - ss.intersection(fs))
#
#     #=========== list game mới so vs list cũ =========#
#     listnew = ss - ss.intersection(fs)
#     print (ss - ss.intersection(fs))
#     # type(listnew)
#     print (list(listnew))
#
#     for i in gamelist:
#         for j in value:
#             if j['ID_Game'] == i['ID']:
#                 ID = j['ID_Game']
#                 Photo = url_to_blob(j['Photo_Game'])
#                 GroupGame = j['Group_Game']
#                 NameGame = j['Name_Game']
#                 Category = j['Theloai']
#                 filerun = j['FileRun']
#                 linkgame = j['linkdown']
#                 Status = 'update list'
#                 Date_Create = j['Date_Create']
#                 Price = j['Price']
#
#
#                 args = (Photo, GroupGame, NameGame, Category, filerun, linkgame, Date_Create, Price, ID)
#                 query = f"UPDATE Gamelist SET Photo=?, GroupGame=?, NameGame=?, Category=?, filerun=?, linkgame=?, Date_Create=?, Price=? WHERE ID=?"
#                 get_curSQL('gamelist.db', query=query, args=args)
#
#     for k in list(listnew):
#         for j in value:
#             if j['ID_Game'] == k:
#                 ID = j['ID_Game']
#                 Photo = url_to_blob(j['Photo_Game'])
#                 FolderID = ''
#                 GroupGame = j['Group_Game']
#                 NameGame = j['Name_Game']
#                 Category = j['Theloai']
#                 filerun = j['FileRun']
#                 linkgame = j['linkdown']
#                 Status = 'New Game'
#                 Date_Create = j['Date_Create']
#                 Price = j['Price']
#
#                 values = (ID,Photo, FolderID, GroupGame, NameGame, Category, filerun, linkgame, Status, Date_Create, Price,)
#                 # curclient.execute(query, values)
#                 query = f"INSERT INTO Gamelist VALUES(?,?,?,?,?,?,?,?,?,?,?)"
#                 get_curSQL('gamelist.db', query=query, args=values)
#
# def get_checkupdate(token):
#     value = {'event_key': 'Get_checkupdate_App',
#              'token': token,
#              }
#     # r = requests.get(url=url, data=js.dumps(value))
#     r = session.get(url=url, params=value)
#     value = r.json()
#     # print(r, value)
#     return value
#
# #======================== Set info PM to Server ===========================#
#
# def set_infoPM(Logo, TenPhongMay, DiaChi, Soluongmay, Ngayhethan, Status):
#     Logo = url_to_blob(Logo)
#     args = (Logo, TenPhongMay, DiaChi, Soluongmay, Ngayhethan, Status)
#     query = f"UPDATE Design SET Logo=?,tenphongmay=?, DiaChi=?, Soluongmay=?, Ngayhethan=?, Status=?"
#     get_curSQL('datagame.db', query=query, args=args)

###################### Get key or userID Resilio #######################

# keyResilio = check_keyResilio()

# ###################### kich hoat or Login get token server ##############################
class InputDialog(QDialog):
    def __init__(self, parent=None, lineedit=[], titletemp='', textedit=''):
        super().__init__(parent)
        self.lineedit = lineedit
        self.title = titletemp
        self.textedit = textedit
        self.frame_Top = QtWidgets.QFrame()
        self.label = QtWidgets.QLabel(self.title)
        self.label.setAlignment(Qt.AlignCenter)
        # self.frame_Top.setLayout(label)

        self.setWindowFlag(Qt.FramelessWindowHint)

        buttonBox = QDialogButtonBox(QDialogButtonBox.Ok| QDialogButtonBox.Cancel, self) #
        layout = QFormLayout(self)
        # layout is a defined VBox or HBox
        # layout.setContentsMargins(left, top, right, bottom)
        layout.setContentsMargins(10, 0, 10, 0)
        self.label.setStyleSheet("font: 30pt; padding: 0px 0px 0px 0px; font-weight: bold;")#font: 30pt Comic Sans MS
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
    }
    QPushButton{
        font-size:12px;
        text-align: center;
        color: rgb(255, 255, 255);
        bottom: 5px;
        background:transparent;
    }
    QPushButton:hover{
        background-color: rgba(0, 172, 252, 50);
    }
    QPushButton:pressed{  
        background-color: rgba(0, 120, 252, 150);
        border-style: inset;
        border-width: 2px;

    }
    """)

        # initial_texts=["hello", "world"]
        self.editors = []
        for i, text in enumerate(self.lineedit, start=1):
            editor = QtWidgets.QLineEdit()#(text=text)

            try:
                editor.setText(str(self.textedit[i-1]))
            except:
                pass
            # layout.addRow("First text", self.first)
            layout.addRow(text, editor)
            self.editors.append(editor)

        layout.addWidget(buttonBox)

        buttonBox.accepted.connect(self.accept)
        buttonBox.rejected.connect(self.reject)

        # event click trái di chuyển form đi chung với hàm mousePressEvent
        def moveWindow(e):
            # print('hàm movewindow')
            if self.isMaximized() == False:
                if e.buttons() == Qt.LeftButton:
                    self.move(self.pos() + e.globalPos() - self.clickPosition)
                    self.clickPosition = e.globalPos()
                    e.accept()
        self.label.mouseMoveEvent = moveWindow
        print(self.size())
        self.setFixedSize(self.width() - 200, self.height() - 200)
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

        #########################################################################
        # self.label_1.width(), self.label_1.height())

    def getInputs(self):
        return [editor.text() for editor in self.editors]
    # hàm này get postion mouse for event di chuyển form moveWindow() nằm trong init của widget
    def mousePressEvent(self, event):
        if event.button() == QtCore.Qt.LeftButton:
            #self.startPos = event.pos()
            self.clickPosition = event.globalPos()
            # print('mouse event ',self.clickPosition)


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

# ======================== Event request login ==================== #

# def login_App():
#     print('kkkk',keyResilio,keyServer)
#     value = {'event_key': 'Login_App',
#              'Key': str(keyServer),
#              'Key_Resilio': keyResilio,
#              # 'HoTen': 'khaicafe',
#              # 'Email': 'khaicafe@gmail.com',
#              # 'Date_Create': datetime.now().strftime("%H:%M:%S, %d/%m/%Y"),
#              }
#     r = session.get(url=url, params=value)
#     value = r.json()
#     print(value, '\n')
#
#
#     #============== phần response =====================#
#     # if value['rev_data']== 'ERROR-submit':
#     #     pass
#     if value['rev_data']== 'Login Thành công':
#         token = value['token']['accessToken']
#         # print(token, '\n')
#
#         data = get_infoPM(str(token))['rev_data']
#         print('infoPM ',data, '\n')
#
#         set_infoPM(data['Logo'], data['TenPhongMay'], data['DiaChi'], data['Soluongmay'], data['Ngayhethan'], data['Status'])
#
#         listgame = get_listgame(str(token))['rev_data']
#
#         new_row = pd.DataFrame(listgame)
#         print(new_row)
#
#         sosanh_listgame(listgame)
#
#         value_checkupdate = get_checkupdate(str(token))['rev_data']
#         new_row = pd.DataFrame(value_checkupdate)
#         print(new_row)
#     else:
#         print(value['rev_data'])
#         args = (value['rev_data']['Status'],value['rev_data']['Ngayhethan'])
#         query = f"UPDATE Design SET Status=?, Ngayhethan=?"
#         get_curSQL('datagame.db', query=query, args=args)
#         return False




# dialog = InputDialog(lineedit=["GateWay", "NetWork", "DNS1", "DNS2", 'Speed', 'Note'], titletemp="Input GateWay")
# if dialog.exec():
#     pass


# login_App()

# print(len('5888-8392-3360-3788'))

import ctypes  # An included library with Python install.
def Mbox(title, text, style):
    ##  Styles:
    ##  0 : OK
    ##  1 : OK | Cancel
    ##  2 : Abort | Retry | Ignore
    ##  3 : Yes | No | Cancel
    ##  4 : Yes | No
    ##  5 : Retry | Cancel
    ##  6 : Cancel | Try Again | Continue
    # MessageBoxA
    # hwnd = ctypes.windll.user32.GetActiveWindow()
    # MBW = ctypes.windll.user32.MessageBoxW(hwnd, "Salvare le modifiche?", "Salva", 3)
    MB_SYSTEMMODAL = 0x1000
    return ctypes.windll.user32.MessageBoxW(0, text, title, MB_SYSTEMMODAL)
# result = Mbox('Message Dialog', 'Your text', 0)
# print(result)# == IDOK

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

MB_SETFOREGROUND = 0x10000
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
# print(MsgBox("Hello World!", MB_ICONERROR | MB_OK | MB_SYSTEMMODAL, "Hello!"))
# print(MsgBox("Success menukl djljljljlsf!", 0x40 | 0x0, "Hello!"))


# 0x40 | 0x0
# print('kkkk ',token)
# token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.U2FsdGVkX18AxAeSDTrIFDZajmBZNwa0iSy9HdBghULPs9lqhFCJJD+8ez56oY8jONsuiJyHI7w/hC2UQpEUtLsLopWbSsibaH0AVOngJP0FP64Ctfc3cVjK4U1VgoPFZwMKZ0l9S6Y1Mmastft59giV3mJnGUQlcjkQA/XRS2aTIud0f4tnfNun9NXC140goEhWaXjWlnZbZtoczTI6x1r8Y40oNekH0efD5glEmHc=.R9ts3T5FN61u6Uve9fNQ6i_k0jZHsw05LM3QqNaGaxw'
# get_infoPM(token)



# url='https://drive.google.com/file/d/11FXJiKuNer3QkiJy41hX9hNKBV70v2a7/view?usp=drivesdk'
# url_to_blob(url)


#================================ show loading screen =========================#
from PyQt5.QtCore import *
from PyQt5.QtGui import *
from PyQt5.QtWidgets import *
import sys
import random

import sys
from PyQt5.QtCore import pyqtSignal, Qt, QThread
from PyQt5.QtGui import QMovie
from PyQt5.QtWidgets import QApplication, QSplashScreen, QMainWindow

class Window(QMainWindow):
    def __init__(self):
        super().__init__()

class Worker(QThread):
    progressChanged = pyqtSignal(int)

    def run(self):
        for count in range(6):
            self.progressChanged.emit(count)
            self.sleep(1)
            # print(count)
        self.progressChanged.emit(-1)


class SplashScreen(QSplashScreen):
    def __init__(self, filepath, flags=0):
        super().__init__(flags=Qt.WindowFlags(flags))
        self.movie = QMovie(filepath, parent=self)
        self.movie.frameChanged.connect(self.handleFrameChange)
        self.movie.start()

    def updateProgress(self, count=0):
        if count == 0:
            message = 'Starting...'

        elif count > 0:
            message = f'Processing... {count}'
        else:
            message = 'Finished!'
        # self.showMessage(
        #     message, Qt.AlignHCenter | Qt.AlignBottom, Qt.yellow)
        print(message)

    def handleFrameChange(self):
        pixmap = self.movie.currentPixmap()
        self.setPixmap(pixmap)
        self.setMask(pixmap.mask())
    def stopmovie(self):
        self.movie.stop()
        self.close()



class LoadingScreen(QWidget):
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
        # self.setGeometry(50, 50, 100, 100)
        # self.setMinimumSize(10, 10)

        # timer = QTimer(self)
        self.startAnimation()
        # timer.singleShot(15000, self.stopAnimation)
        # threading.Thread(daemon=True, target=self.movie.start).start()
        self.show()

    # def resizeEvent(self, event):
    #     rect = self.geometry()
    #     size = QtCore.QSize(min(rect.width(), rect.height()), min(rect.width(), rect.height()))
    #     print(size)
    #     movie = self.label_animation.movie()
    #     movie.setScaledSize(size)

    def startAnimation(self):
        self.movie.start()
        # self.show()

    def stopAnimation(self):
        self.movie.stop()
        self.close()

# if __name__ == "__main__":
    # app = QApplication(sys.argv)
    # window = Window()
    # splash = SplashScreen('loading2.gif', Qt.WindowStaysOnTopHint)
    # worker = Worker()
    # worker.progressChanged.connect(splash.updateProgress)
    # worker.finished.connect(
    #     lambda: (splash.finish(window)))
    # splash.show()
    # worker.start()
    # window.show()
    # app.exec_()
''''''
#=============================== remote down load url nhanh ======================================#
from PyQt5.QtCore import QUrl
from PyQt5.QtNetwork import QNetworkAccessManager, QNetworkRequest

class MainWindow(QWidget):
    def __init__(self):
        super().__init__()
        super(MainWindow, self).__init__()

        # BUTTON
        self.button = QPushButton("Push me", self)
        self.button.setFixedSize(100, 50)
        self.button.clicked.connect(lambda: self.change_gif())

        # DEFAULT GIF
        self.gif_file = QMovie("loading.gif")  # This is the "wrong" gif
        self.gif_file.start()
        self.gif_label = QLabel(self)
        self.gif_label.setMovie(self.gif_file)
        self.gif_label.move(self.button.width(), 0)
        self.gif_label.hide()

        # LOADER
        self.loader_file = QMovie("loading1.gif")
        self.loader_file.start()
        self.loader_label = QLabel(self)
        self.loader_label.setMovie(self.loader_file)
        self.loader_label.move(self.button.width(), 0)
        self.loader_label.hide()

        # WINDOW SETTINGS
        self.setFixedSize(500, 500)
        self.show()

        self.downloader = QNetworkAccessManager()



    def change_gif(self):
        self.gif_label.clear()
        self.loader_label.show()
        url = QUrl('http://csepregi-gaz.hu/wp-content/uploads/2020/10/feltoltesalatt.gif')
        self.device = self.downloader.get(QNetworkRequest(url))
        self.device.finished.connect(self.applyNewGif)

    def applyNewGif(self):
        self.loader_label.hide()
        self.newGif = QMovie()
        self.newGif.setDevice(self.device)
        self.gif_label.setMovie(self.newGif)
        self.newGif.start()
        self.gif_label.show()
# if __name__ == "__main__":
#     app = QApplication(sys.argv)
#     windows = MainWindow()
#     windows.show()
#     app.exec_()
''''''
#=============================== test class input ======================================#
from PyQt5.QtWidgets import *


class ModelessDialog(QDialog):
    def __init__(self, part, threshold, parent=None):
        super().__init__(parent)
        self.setWindowTitle("Baseline")
        self.setGeometry(800, 275, 300, 200)
        self.part = part
        self.threshold = threshold
        self.threshNew = 4.4

        label = QLabel("Part            : {}\nThreshold   : {}".format(
            self.part, self.threshold))
        self.label2 = QLabel("ThreshNew : {:,.2f}".format(self.threshNew))

        self.spinBox = QDoubleSpinBox()
        self.spinBox.setMinimum(-2.3)
        self.spinBox.setMaximum(99)
        self.spinBox.setValue(self.threshNew)
        self.spinBox.setSingleStep(0.02)
        self.spinBox.valueChanged.connect(self.valueChang)

        buttonBox = QDialogButtonBox(
            QDialogButtonBox.Ok
            | QDialogButtonBox.Cancel
            | QDialogButtonBox.Apply)

        layout = QVBoxLayout()
        layout.addWidget(label)
        layout.addWidget(self.label2)
        layout.addWidget(self.spinBox)
        layout.addWidget(buttonBox)
        self.resize(300, 200)
        self.setLayout(layout)

        okBtn = buttonBox.button(QDialogButtonBox.Ok)
        okBtn.clicked.connect(self._okBtn)

        cancelBtn = buttonBox.button(QDialogButtonBox.Cancel)
        cancelBtn.clicked.connect(self.reject)

        applyBtn = buttonBox.button(QDialogButtonBox.Apply)  # +++
        applyBtn.clicked.connect(self._apply)  # +++

    def _apply(self):  # +++
        print('Hello Apply')

    def _okBtn(self):
        print("""
            Part      : {}
            Threshold : {}
            ThreshNew : {:,.2f}""".format(
            self.part, self.threshold, self.spinBox.value()))

    def valueChang(self):
        self.label2.setText("ThreshNew : {:,.2f}".format(self.spinBox.value()))


class Window(QWidget):
    def __init__(self):
        super().__init__()
        label = QLabel('Hello Dialog', self)
        button = QPushButton('Open Dialog', self)
        button.clicked.connect(self.showDialog)

        layout = QVBoxLayout()
        layout.addWidget(label)
        layout.addWidget(button)
        self.setLayout(layout)

    def showDialog(self):
        self.dialog = ModelessDialog(2, 55.77, self)
        self.dialog.show()


# if __name__ == '__main__':
#     import sys
#
#     app = QApplication(sys.argv)
#     win = Window()
#     win.resize(300, 200)
#     win.show()
#     sys.exit(app.exec_())

#=============================== class thuộc tính code ======================================#

# Write Python3 code here

class car():

    # init method or constructor
    def __init__(self, model, color):
        self.model = model
        self.color = color

    def show(self):
        print("Model is", self.model)
        print("color is", self.color)


# both objects have different self which
# contain their attributes
audi = car("audi a4", "blue")
ferrari = car("ferrari 488", "green")

# audi.show()  # same output as car.show(audi)
# ferrari.show()  # same output as car.show(ferrari)
#
# # note:we can also do like this
# print("Model for audi is ", audi.model)
# print("Colour for ferrari is ", ferrari.color)

# path = pathlib.Path(r'E:/test/Games Offline/Banca').decode('ascii'))
# path=r'E:/test/Games Offline/Banca'
# path =  r'E:\test\Games Offline\Liên Minh Huyền Thoại\abc.txt'
# pathfile = path.split('\\')[-1]
# path = path.replace(pathfile,'')
# print(path)
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
        # try:
        #     shutil.rmtree(folder)
        # except OSError as e:
        #     print("Error: %s - %s." % (e.filename, e.strerror))
# Remove_ContentsFolder(path)

def remove(path):
    """ param <path> could either be relative or absolute. """
    if os.path.isfile(path) or os.path.islink(path):
        os.remove(path)  # remove the file
    elif os.path.isdir(path):
        shutil.rmtree(path)  # remove dir and all contains
    else:
        raise ValueError("file {} is not a file or dir.".format(path))
# remove(path)

#==================== code theard tham khảo =======================#
import sys
import time



# class Example(QWidget):
#     def __init__(self):
#         super().__init__()
#         self.initUI()
#         self.active_workers = 0
#         self.threadpool = QThreadPool()
#         self.btn.clicked.connect(self.start)
#
#     @Slot()
#     def start(self):
#
#         t1 = Worker(loginserver_getToken)
#         t1.signaller.started.connect(self.on_started)
#         t1.signaller.finished.connect(self.on_finished)
#
#         t2 = Worker(th2)
#         t2.signaller.started.connect(self.on_started)
#         t2.signaller.finished.connect(self.on_finished)
#
#         self.btn.setEnabled(False)
#
#         self.threadpool.start(t1)
#         self.threadpool.start(t2)
#
#     def initUI(self):
#         self.btn = QPushButton("Start", self)
#         self.btn.resize(self.btn.sizeHint())
#         self.btn.move(50, 50)
#         self.setGeometry(300, 300, 300, 200)
#         self.setWindowTitle("HELP")
#         self.show()
#
#     @Slot()
#     def on_started(self):
#         self.active_workers += 1
#
#     @Slot()
#     def on_finished(self):
#         self.active_workers -= 1
#         self.btn.setEnabled(self.active_workers == 0)
#
#
# class Signaller(QObject):
#     started = Signal()
#     finished = Signal()
#

# class Worker(QRunnable):
#     def __init__(self, fn):
#         super(Worker, self).__init__()
#         self.signaller = Signaller()
#         self.fn = fn
#
#     def run(self):
#         self.signaller.started.emit()
#         self.fn()
#         self.signaller.finished.emit()


def th1():
    time.sleep(15)
    print("th1")


def th2():
    time.sleep(10)
    print("th2")
######################### func check key Server & get info server ######################
session = requests.Session()
class connect_server(object):
    def __init__(self, url, port, keyServer, keyResilio):
        self.url, self.port = url, port
        self.api_url = f"http://{self.url}:{self.port}"
        self.keyServer, self.keyResilio = '5888-8392-3360-3788', 'ECLLQNDVF7E4PJE4J57VMVP4WWOFXDLT'
        self.session = requests.Session()
        self.session.verify = False
        self.token = self.login_App(self.keyServer)

    def login_App(self, keyServer):
        # print('login ', keyResilio, keyServer)
        token=''
        api_serverkl =''
        if True:
            value = {'event_key': 'Login_App',
                     'Key': self.keyServer,
                     'Key_Resilio': self.keyResilio,
                     # 'HoTen': 'khaicafe',
                     # 'Email': 'khaicafe@gmail.com',
                     # 'Date_Create': datetime.now().strftime("%H:%M:%S, %d/%m/%Y"),
                     }
            r = session.get(url=url, params=value)
            value = r.json()
            print('dsfadf',value, '\n')
            Qwidget_main=''
            if value['rev_data']['Status'] == 'Login Thành công':
                token = value['token']['accessToken']
                print(value['rev_data'])
                Qwidget_main = False  # biến ghi log đã khởi động xong
                return token
            else:
                token = ''
                # print(value['rev_data'])
                Qwidget_main = False  # biến ghi log đã khởi động xong
                print(value['rev_data'])
                api_serverkl = value['rev_data']['Status']
                if api_serverkl == 'Hết hạn':
                    args = (value['rev_data']['Status'], value['rev_data']['Ngayhethan'])
                    query = f"UPDATE Design SET Status=?, Ngayhethan=?"
                    get_curSQL('datagame.db', query=query, args=args)
                    Box_alert(f'Software has expired ! Please renew the software on the web https:\\Menukl.com')
                elif api_serverkl == 'ERROR-submit':
                    # args = (value['rev_data']['Status'],)
                    query = f"UPDATE Design SET Status='{value['rev_data']['Status']}'"
                    get_curSQL('datagame.db', query=query)
                    Box_alert(f'Sai key ! Please renew the software on the web https:\\Menukl.com')
                    time.sleep(3)

                # return token

    # ======================== get list game to Server ===========================#
    def get_infoPM(self):
        value = {'event_key': 'GetinfoPM_App',
                 'token': self.token,
                 }
        r =session.get(url=self.url, params=value)
        value = r.json()
        print(value)
        return value

    def get_listgame(self):
        value = {'event_key': 'Getlistgame_App',
                 'token': self.token,
                 }
        # r = requests.get(url=url, data=js.dumps(value))
        r = session.get(url=self.url, params=value)
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
        r = session.get(url=self.url, params=value)
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

def get_api_server():
    port = None
    api = connect_server(
        url='https://script.google.com/macros/s/AKfycbyvhJU56RfOvbePo45F6aQQrF-ECdTkUY-K-ewmeBYPq9_6o6i8tLTDpv0IzipMCvptwQ/exec',
        port=port,
        keyServer='5888-8392-3360-3788',
        keyResilio='ECLLQNDVF7E4PJE4J57VMVP4WWOFXDLT',
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

def loginserver_getToken():
    while True:
        api = get_api_server()
        getinfo_setinfo(api)
        time.sleep(5)

def Box_alert(text):
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

    # print(MsgBox("Hello World!", MB_ICONERROR | MB_OK | MB_SYSTEMMODAL, "Hello!"))
    print(MsgBox(text, MB_DEFAULT_DESKTOP_ONLY | MB_SETFOREGROUND | MB_SERVICE_NOTIFICATION | MB_SYSTEMMODAL | MB_TOPMOST | MB_ICONSTOP | 0x0, "Menu-KL Message Dialog!"))

# app = QApplication(sys.argv)
# ex = Example()
# sys.exit(app.exec_())
# loginserver_getToken()
# ================================ class popup ==============================#
import sys
from PyQt5.QtWidgets import QApplication, QWidget, QDialog, QProgressBar, QLabel, QFrame, QMainWindow, QVBoxLayout, QPushButton
from PyQt5.QtCore import Qt
import time

class Thread(QThread):
    progressChanged = pyqtSignal(int)

    def run(self):
        for i in range(100):
            QThread.msleep(100)
            self.progressChanged.emit(i)
class SplashScreen1(QDialog):
    def __init__(self):
        super().__init__()
        self.setWindowTitle('Spash Screen Example')
        self.setFixedSize(1100, 500)
        self.setWindowFlag(Qt.FramelessWindowHint)
        self.setAttribute(Qt.WA_TranslucentBackground)
        self.setWindowFlag(Qt.WindowStaysOnTopHint)
        self.initUI()

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
        self.close()
        global myapp
        myapp.show()
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
        self.show()

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
        self.close()
        global myapp
        myapp.show()

class Function:
    def loading(self):
        self.screen = SplashScreen()
        self.screen.show()
        self.thread = Thread()
        # self.thread.progressChanged.connect(
        #     self.screen.progressBar.setValue)
        self.thread.finished.connect(self.screen.closes)
        self.thread.start()

class Window(QWidget):
    def __init__(self):
        super().__init__()
        layout_window = QVBoxLayout()
        self.setLayout(layout_window)
        self.button = QPushButton("Open", self)
        layout_window.addWidget(self.button)
        self.button.clicked.connect(self.open)

    def open(self):
        self.function = Function()
        self.function.loading()


class MyApp(QMainWindow):
    def __init__(self):
        super().__init__()
        self.open()
        self.window_width, self.window_height = 1200, 800
        self.setMinimumSize(self.window_width, self.window_height)

        layout = QVBoxLayout()
        self.setLayout(layout)
        self.button = QPushButton("Open", self)
        layout.addWidget(self.button)
        self.button.clicked.connect(self.open)

    def open(self):
        # self.window = Window()
        # self.window.show()
        self.function = Function()
        self.function.loading()
        # self.show()



# if __name__ == '__main__':
    # app = QApplication(sys.argv)
    # myapp = MyApp()
    # # myapp.open()
    # # myapp.show()
    # try:
    #     sys.exit(app.exec_())
    # except SystemExit:
    #     print('Closing Window...')
# ===========================================#
import sys
import time
from PyQt6.QtWidgets import QApplication, QMainWindow, QPushButton, QGridLayout, QWidget, QProgressBar, QListWidget
from PyQt6.QtCore import QRunnable, QObject, QThreadPool, pyqtSignal as Signal, pyqtSlot as Slot


class Signals(QObject):
    started = Signal(int)
    completed = Signal(int)


class Worker(QRunnable):
    def __init__(self, n):
        super().__init__()
        self.n = n
        self.signals = Signals()

    @Slot()
    def run(self):
        # self.n()
        self.signals.started.emit(self.n)
        time.sleep(self.n*1.1)
        self.signals.completed.emit(self.n)


class MainWindow(QMainWindow):
    def __init__(self, parent=None):
        super().__init__(parent)

        self.setWindowTitle('QThreadPool Demo')

        self.job_count = 10
        self.comleted_jobs = []

        widget = QWidget()
        widget.setLayout(QGridLayout())
        self.setCentralWidget(widget)

        self.btn_start = QPushButton('Start', clicked=self.start_jobs)
        self.progress_bar = QProgressBar(minimum=0, maximum=self.job_count)
        self.list = QListWidget()

        widget.layout().addWidget(self.list, 0, 0, 1, 2)
        widget.layout().addWidget(self.progress_bar, 1, 0)
        widget.layout().addWidget(self.btn_start, 1, 1)

        self.show()

    def start_jobs(self):
        self.restart()
        pool = QThreadPool.globalInstance()
        for i in range(1, self.job_count+1):
            worker = Worker(i)
            worker.signals.completed.connect(self.complete)
            worker.signals.started.connect(self.start)
            pool.start(worker)
        # worker = Worker(self.testcode)
        # worker.signals.completed.connect(self.complete)
        # worker.signals.started.connect(self.start)
        # pool.start(worker)

    def restart(self):
        self.progress_bar.setValue(0)
        self.comleted_jobs = []
        self.btn_start.setEnabled(False)

    def start(self, n):
        self.list.addItem(f'Job #{n} started...')

    def complete(self, n):
        self.list.addItem(f'Job #{n} completed.')
        self.comleted_jobs.append(n)
        self.progress_bar.setValue(len(self.comleted_jobs))

        if len(self.comleted_jobs) == self.job_count:
            self.btn_start.setEnabled(True)
    def testcode(self):
        for i in range(1, self.job_count+1):
            print(i)


# if __name__ == '__main__':
    # app = QApplication([sys.argv])
    # window = MainWindow()
    # sys.exit(app.exec())


def complete(self, n):
    self.list.addItem(f'Job #{n} completed.')
    self.comleted_jobs.append(n)
    self.progress_bar.setValue(len(self.comleted_jobs))

    if len(self.comleted_jobs) == self.job_count:
        self.btn_start.setEnabled(True)

#=================================================#

class WorkerSignalss(QObject):
    # finished = pyqtSignal()
    error = pyqtSignal(tuple)
    result = pyqtSignal(object)
    progress = pyqtSignal(int)
import traceback2 as traceback
class Workers(QThread):
    # Pass data into the exicution function
    def __init__(self, fn, *args, **kwargs):
        super(Workers, self).__init__()
        self.fn = fn
        self.args = args
        self.kwargs = kwargs
        self.signals = WorkerSignalss()

    @pyqtSlot()
    def run(self):
        try:
            # self.fn(*self.args, **self.kwargs)
            self.fn()
        except:
            traceback.print_exc()
            exctype, value = sys.exc_info()[:2]
            self.signals.error.emit((exctype, value, traceback.format_exc()))
        else:
            pass
            # self.signals.result.emit(result)
# Start thread:
# self.ThreadTrain = Worker(self.doTrain)
# self.ThreadTrain.start()
# Terminate thread:
# self.ThreadTrain.terminate()

#================================================#
service_name = "rslsyncsvckl"
subprocess.check_output(f'''net stop {service_name} /y''', shell=True)
#&& net start {service_name}