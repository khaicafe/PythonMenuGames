import json
import os
import re
import socket
import struct
import sys
import threading
import time
import psutil
# import pythoncom
import requests
import subprocess
import configparser

# pip install --upgrade pip install pywin32
# import win32api
import win32con
import win32event
import win32gui
import win32ui
import wmi
from PyQt5 import QtCore, QtGui, QtWidgets
import json as js
from PyQt5.QtCore import *
from PyQt5.QtGui import QIcon
from PyQt5.QtWidgets import *
from PyQt5.QtWebEngineWidgets import *
from past.builtins import raw_input
import psutil
import pygetwindow as gw

######################## Mở duy nhất 1 lần đồng thời ###############################
from win32event import CreateMutex
from win32api import CloseHandle, GetLastError
from winerror import ERROR_ALREADY_EXISTS
class singleinstance:
    """ Limits application to single instance """

    def __init__(self):
        self.mutexname = "testmutex_{D0E858DF-985E-4907-B7FB-8D732C3FC3B9}"
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
# check is another instance of same program running
if myapp.alreadyrunning():
    print ("Another instance of this program is already running")
    sys.exit(1)


# Path maker
if getattr(sys, 'frozen', False) and hasattr(sys, '_MEIPASS'):
    path = sys._MEIPASS + '/'
else:
    path = '.'
PathService = "C:\\Windows\\System32\\System"
######################## Check service & open file service ####################
def getService(name):
    service = None
    try:
        service = psutil.win_service_get(name)
        service = service.as_dict()
    except Exception as ex:
        print(str(ex))
    return service

service = getService('MenuGames')
# print(service)
exe_name = os.path.abspath("SVClient/sv")
if service:
    print("service found")
else:
    print("service not found")
    subprocess.call([exe_name, 'install'], shell=True)
    time.sleep(1)
    subprocess.call([exe_name, 'start'], shell=True)
if service and service['status'] == 'running':
    print("service is running")
else:
    print("service is not running")
    subprocess.call([exe_name, 'start'], shell=True)


################ Path ###############################################
if getattr(sys, 'frozen', False) and hasattr(sys, '_MEIPASS'):
    print('running in a PyInstaller bundle')
    path = sys._MEIPASS + '/'
else:
    print('running in a normal Python process')
    path = '.'
# mã pid trong taskmanager
state = os.getpid()

#################### Check file config IP server and ping IP server #################

def showinputDialog():
    app = QApplication(sys.argv)
    class Example(QWidget):
        def __init__(self):
            super().__init__()
            self.setWindowIcon(QtGui.QIcon('logo.png'))

            self.showDialog()

        def showDialog(self):
            text, ok = QInputDialog.getText(self, 'Input IP Server', 'Please enter server ip !!!')
            if ok:
                print(text)
                config = configparser.ConfigParser()
                config.read(r'config.ini')
                config.set('server-ip', 'server', text)
                # Writing our configuration file to 'example.ini'
                with open('config.ini', 'w') as configfile:
                    config.write(configfile)
            else:
                p = psutil.Process(state)
                p.terminate()  # or p.kill()
    input= Example()

config = configparser.ConfigParser()
config.read_file(open(r'config.ini'))
ipserver = config.get('server-ip', 'server')
print('serverip:',ipserver)
if ipserver == None or ipserver == '':
    showinputDialog()
    config.read_file(open(r'config.ini'))
    ipserver = config.get('server-ip', 'server')
    print('serverip:', ipserver)

################################# Class bắt event http #############################

class WebEnginePage(QWebEnginePage):
    def __init__(self, *args, **kwargs):
        super(WebEnginePage, self).__init__(*args, **kwargs)
        self.loadFinished.connect(self.onLoadFinished)

    @QtCore.pyqtSlot(bool)
    def onLoadFinished(self, ok):
        if ok:
            pass
            # self.load_qwebchannel()
            # self.load_objects()

    def javaScriptConsoleMessage(self, level, message, lineNumber, sourceID):
        print('thong bao js: ',message, type(message), json.dumps(message, ensure_ascii=False))

        import webbrowser, os
        if message.find('filerun') > -1:
            idgame = message.split('filerun')[1].split(' ')[0]#re.findall(r"\d+", message)
            # print('id game',idgame,'messs', message)
            ID = idgame
            # print('thong bao', idgame, ID)
            threading.Thread(daemon=True, target=lambda: file_run(getlistgame(ID, 'listgame'))).start()
            threading.Thread(daemon=True, target=lambda: luotplay_fastapi(ID, 'luotplay')).start()
            threading.Thread(daemon=True, target=mini_soft).start()

            # def enumHandler(hwnd, lParam):
            #     if 'Menu Game' in win32gui.GetWindowText(hwnd):
            #         win32gui.ShowWindow(hwnd, win32con.SW_MINIMIZE)
            # win32gui.EnumWindows(enumHandler, None)

            # mini chinh no
            mini_soft2('Menu Game')
        elif message.find('openfolder') > -1:
            # idgame = re.findall(r"\d+", message)
            idgame = message.split('openfolder')[1].split(' ')[0]  # re.findall(r"\d+", message)

            ID = idgame
            # print('thong bao', idgame, ID)
            filepath = getlistgame(ID, 'listgame')

            # print('openfolder')
            filesplit = os.path.basename(filepath)# tách file
            pathsplit = os.path.dirname(filepath)# tách folder
            webbrowser.open(os.path.realpath(pathsplit))
        elif message.find('changegateway') > -1:
            gateway = message.split(' ')[1]
            DNS1 = message.split(' ')[2]
            DNS2 = message.split(' ')[3]
            # print(gateway,DNS1, DNS2)
            changeline(gateway,DNS1, DNS2)
        elif message=='add_may_in':
            listprint = list_printers()
            for item in listprint:
                self.runJavaScript(f"""
                let print_tmp = document.querySelectorAll('.noidung_dropdown')
                print_tmp.forEach(element => {{
                    var html = `<button class="nhan_don" style="text-align: left; font-size: 16px;">{item}</button>`
                    element.insertAdjacentHTML("afterbegin",html)
                }});
                """)
            # print(listprint)
        elif message =="print_bill":
            print_bill()
        try:
            print('test dict')
            tmp_print = eval(message)
            # tmp_print = json.loads(message)
            print(tmp_print['may in'])
        except:
            pass


def file_run(filepath):
    try:
        p = subprocess.run(filepath,shell=True)#, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    except:
        pass

############################# Fastapi client send #################################

def luotplay_fastapi(ID, call):
    value = {'ID': ID,
             'call': call
             }
    try:
        r = requests.post(url='http://' + f"{ipserver}" + ':8100/data', data=js.dumps(value))
        # print(f'nhận value: {r.json()}')
    except:
        pass
def getlistgame(ID, call):
    value = {'ID': ID,
             'call': call
             }
    try:
        r = requests.post(url='http://' + f"{ipserver}" + ':8100/data', data=js.dumps(value))
        filepath = r.json()['pathgame']
        # print(r.json())
        return filepath
        #file_run(filepath)
    except:
        pass
def getdanhsachminisoft(ID, call):
    value = {'ID': ID,
             'call': call
             }
    try:
        r = requests.post(url='http://' + f"{ipserver}" + ':8100/data', data=js.dumps(value))
        danhsach = r.json()#['danhsach']
        # print('danh sach ',danhsach)
        return danhsach
        # file_run(filepath)
    except:
        showDialog()
def changeline(gateway, DNS1, DNS2):
    # IP address, subnetmask and gateway values should be unicode objects
    ip = u'192.168.1.220'
    subnetmask = u'255.255.255.0'
    gateway = u''+ str(gateway)
    DNS1 = DNS1
    DNS2 = DNS2

    # Obtain network adaptors configurations
    nic_configs = wmi.WMI().Win32_NetworkAdapterConfiguration(IPEnabled=True)

    for i in range(len(nic_configs)):
        # First network adaptor
        nic = nic_configs[i]
        # Set IP address, subnetmask and default gateway
        # Note: EnableStatic() and SetGateways() methods require *lists* of values to be passed
        # nic.EnableStatic(IPAddress=[ip], SubnetMask=[subnetmask])
        nic.SetGateways(DefaultIPGateway=[gateway])
        nic.SetDNSServerSearchOrder([DNS1,DNS2])
    print('oki')

################################ From client #####################################

class MyWebBrowser(QtWidgets.QWidget):#(QMainWindow):
    def __init__(self):
        super(MyWebBrowser, self).__init__()
        #self.window = QWidget()
        #self.widow.setWindowTitle("Menu Game")
        self.setWindowIcon(QtGui.QIcon('logo.png'))
        self.setWindowTitle("Menu Game")

        self.layout = QVBoxLayout()
        self.layout.setSpacing(0)
        self.layout.setContentsMargins(0, 0, 0, 0)
        # self.layout.addStretch(0)

        self.horizontal = QHBoxLayout()
        self.horizontal.addStretch(1)
        self.frame = QFrame()#QtWidgets.QFrame()
        # self.frame.setMaximumHeight(0)

        self.Min_btn = QPushButton("go")
        self.Min_btn.setMinimumHeight(30)
        self.Min_btn.setMaximumWidth(40)
        self.Min_btn.setStyleSheet("QPushButton {\n"
                                       "    border: none;\n"
                                       "    background-color: rgb(13, 9, 36);\n"
                                        "   border-radius: 10;\n"
                                       "}\n"
                                       "\n"
                                       "QPushButton:hover {\n"
                                       "    background-color: rgb(124, 124, 124);\n"
                                       "}\n"
                                       "\n"
                                       "QPushButton:pressed {\n"
                                       "    background-color: rgb(0, 0, 0);\n"
                                       "}")
        self.Min_btn.setText("")
        icon = QtGui.QIcon()
        icon.addPixmap(QtGui.QPixmap(path+"/icons/minus.svg"), QtGui.QIcon.Normal, QtGui.QIcon.Off)
        self.Min_btn.setIcon(icon)
        self.Min_btn.setIconSize(QtCore.QSize(30, 30))

        # self.Min_btn.move(0,0)

        self.max_btn = QPushButton("max_btn")
        self.max_btn.setMinimumHeight(30)
        self.max_btn.setMaximumWidth(40)
        self.max_btn.setStyleSheet("QPushButton {\n"
                                       "    border: none;\n"
                                       "    background-color: rgb(13, 9, 36);\n"
                                       "    border-radius: 10;\n"
                                       "}\n"
                                       "\n"
                                       "QPushButton:hover {\n"
                                       "    background-color: rgb(124, 124, 124);\n"
                                       "}\n"
                                       "\n"
                                       "QPushButton:pressed {\n"
                                       "    background-color: rgb(0, 0, 0);\n"
                                       "}")
        self.max_btn.setText("")
        icon = QtGui.QIcon()
        icon.addPixmap(QtGui.QPixmap(path+"/icons/maximize.svg"), QtGui.QIcon.Normal, QtGui.QIcon.Off)
        self.max_btn.setIcon(icon)
        self.max_btn.setIconSize(QtCore.QSize(30, 30))

        self.close_btn = QPushButton("close_btn")
        self.close_btn.setMinimumHeight(30)
        self.close_btn.setMaximumWidth(40)
        self.close_btn.setStyleSheet("QPushButton {\n"
                                                "    border: none;\n"
                                                "    background-color: rgb(13, 9, 36);\n"
                                                "    border-radius: 10;\n"
                                                "}\n"
                                                "\n"
                                                "QPushButton:hover {\n"
                                                "    background-color: rgb(255, 0, 0) ;\n"
                                                "}\n"
                                                "\n"
                                                "QPushButton:pressed {\n"
                                                "    background-color: rgb(255, 0, 0) ;\n"
                                                "}")
        self.close_btn.setText("")
        icon = QtGui.QIcon()
        icon.addPixmap(QtGui.QPixmap(path+"/icons/power.svg"), QtGui.QIcon.Normal, QtGui.QIcon.Off)
        self.close_btn.setIcon(icon)
        self.close_btn.setIconSize(QtCore.QSize(30, 30))

        # self.horizontal.addWidget(self.frame)
        self.horizontal.addWidget(self.Min_btn)
        self.horizontal.addWidget(self.max_btn)
        self.horizontal.addWidget(self.close_btn)


        self.browser = QWebEngineView()

        # settings = QWebEngineSettings.globalSettings()
        self.browser.settings().setAttribute(QWebEngineSettings.PluginsEnabled, True)
        self.browser.settings().setAttribute(QWebEngineSettings.JavascriptEnabled, True)
        self.browser.settings().setAttribute(QWebEngineSettings.FullScreenSupportEnabled, True)

        self.profile = QWebEngineProfile.defaultProfile()
        self.profile.cookieStore().deleteAllCookies()  # 初次运行软件时删除所有cookies
        # self.profile.cookieStore().cookieAdded.connect(self.onCookieAdd)  # cookies增加时触发


        # settings = self.browser.settings()
        # settings.setAttribute(QWebEngineSettings.JavascriptEnabled, True)

        self.browser.setPage(WebEnginePage(self.browser))
        self.browser.setContextMenuPolicy(Qt.NoContextMenu)

        self.layout.addLayout(self.horizontal)
        # self.horizontal.addWidget(self.browser)
        self.layout.addWidget(self.browser)
        # self.browser.move(0, 0)
        # self.layout.insertWidget(0, self.browser)
        # self.layout.insertLayout(0, self.horizontal)


        self.browser.setUrl(QUrl(f"http://{ipserver}:8100/KLMENU/login-order"))#{ipserver}
        # self.browser.load(QtCore.QUrl(r'D:/github/test/login-order.html'))
        self.browser.loadFinished.connect(self._on_load_finished)
        #self.window.setLayout(self.layout)
        self.setLayout(self.layout)
        # self.setLayout(self.browser)



        # self.setStyleSheet('''
        #             background-color: rgb(255,255,0);
        #             margin: 0;
        #             padding: 0;
        #             border-radius: 30px;
        #         ''')
        self.setStyleSheet('border:none; background-color:black;border-radius: 30px;')
        self.setAttribute(Qt.WA_StyledBackground)

        self.close_btn.clicked.connect(self.closeEvent)
        self.max_btn.clicked.connect((self.max_restore))
        self.Min_btn.clicked.connect(self.min)

        # this will hide the title bar
        # self.window.setWindowFlag(Qt.FramelessWindowHint)
        # self.window.setAttribute(Qt.WA_TranslucentBackground)
        # self.window.setMouseTracking(True)
        # self.window.installEventFilter(self)
        # self.window.resize(1545, 1050)
        # self.window.show()

        self.setWindowFlag(Qt.FramelessWindowHint)
        # self.setAttribute(Qt.WA_TranslucentBackground)
        self.setMouseTracking(True)
        self.installEventFilter(self)
        self.setFixedSize(1780, 1030)
        # self.resize(1780, 1030)
        # self.setFixedSize(self.width(), self.height())  # 禁止调整窗口大小
        ################# form center ##################################
        screen = QtGui.QGuiApplication.screenAt(QtGui.QCursor().pos())
        qr = self.frameGeometry()
        cp = screen.availableGeometry().center()
        qr.moveCenter(cp)
        self.move(qr.topLeft())

    # on load finished web
    def _on_load_finished(self):
        print("Finished Loading")
        self.browser.page().toHtml(self.Callable)
    def Callable(self, html_str):
        self.html = html_str
        # print(self.html)
        self.browser.page().runJavaScript("document.getElementById('username').value = 'test1'")
        self.browser.page().runJavaScript("document.getElementById('password').value = 'test'")
        self.browser.page().runJavaScript("document.getElementById('_login').click()")

    def closeEvent(self, event):
        #self.window.close()
        self.close()
    def max_restore(self):
        if self.isMaximized():
            self.showNormal()
            #self.BtnMax.setIcon(QtGui.QIcon(u"./icons/icons/black-shades.svg"))
        else:
            self.showMaximized()
            #self.BtnMax.setIcon(QtGui.QIcon(u"./icons/icons/black-shades.svg"))
    def min(self):
        #self.window.showMinimized()
        self.showMinimized()

    def eventFilter(self, source, event):
        if event.type() == QtCore.QEvent.MouseMove:
            if event.buttons() == QtCore.Qt.NoButton:
                pass
                #print("Simple mouse motion")
            elif event.buttons() == QtCore.Qt.LeftButton:
                #print("Left click drag",self.pos())
                if self.isMaximized() == False:
                    self.move(self.pos()+ (event.pos() -self.startPos))
            elif event.buttons() == QtCore.Qt.RightButton:
                pass
                #print("Right click drag",event.buttons())
        elif event.type() == QtCore.QEvent.MouseButtonPress:
            if event.button() == QtCore.Qt.LeftButton:
                self.startPos = event.pos()
                #print("Press!")
        return super(MyWebBrowser, self).eventFilter(source, event)

def showDialog():
    app = QApplication(sys.argv)
    app.setWindowIcon(QtGui.QIcon('logo.png'))
    msgBox = QMessageBox()
    msgBox.setIcon(QMessageBox.Information)
    msgBox.setText(f"Please start the server {ipserver} !!!")
    msgBox.setWindowTitle("Warning")
    msgBox.setStandardButtons(QMessageBox.Ok)
    msgBox.buttonClicked.connect(msgButtonClick)

    returnValue = msgBox.exec()
    if returnValue == QMessageBox.Ok:
        print('OK clicked')
        tatapp()
def msgButtonClick(i):
   print("Button clicked is:",i.text())


# -------------------  func print logo and text ------------------#

HORZRES = 8
VERTRES = 10
LOGPIXELSX = 88
LOGPIXELSY = 90
PHYSICALWIDTH = 110
PHYSICALHEIGHT = 111

from PIL import ImageWin
import win32gui, win32ui, win32print, win32con, win32api

scale_factor = 20

pr_dict = dict()

paper_sizes = {
    "letter": 1,
    "lettersmall": 2,
    "tabloid": 3,
    "ledger": 4,
    "legal": 5,
    "statement": 6,
    "executive": 7,
    "a3": 8,
    "a4": 9,
    "envelope9": 19,
    "envelope10": 20,
    "envelope11": 21,
    "envelope12": 22,
    "envelope14": 23,
    "fanfold": 39,
}

orientations = {
    "portrait": 1,
    "landscape": 2,
}

duplexes = {
    "normal": 1,
    "none": 1,
    "long": 2,
    "short": 3,
}


class Document:

    def __init__(self, printer=None, paper_size=None, orientation=None, duplex=None):
        self.dc = None
        self.font = None
        self.printer = printer
        self.paper_size = paper_size
        self.orientation = orientation
        self.page = 0
        self.duplex = duplex
        self.pen = None
        self.hdc = None
        self.h_printer = None

    def scale_pos(self, pos):
        rc, _ = list(), self
        for i in range(len(pos)):
            p = pos[i]
            if i % 2:
                p *= -1
            rc.append(int(p * scale_factor))
        return tuple(rc)

    def begin_document(self, name="DMallPOS print job"):
        # open the printer
        if self.printer is None:
            self.printer = win32print.GetDefaultPrinter()
        self.h_printer = win32print.OpenPrinter(self.printer)

        # load default settings
        dev_mode = win32print.GetPrinter(self.h_printer, 8)["pDevMode"]

        # change paper size and orientation
        if self.paper_size is not None:
            if type(self.paper_size) is int:
                dev_mode.PaperSize = self.paper_size
            else:
                dev_mode.PaperSize = paper_sizes[self.paper_size]
        if self.orientation is not None:
            dev_mode.Orientation = orientations[self.orientation]
        if self.duplex is not None:
            dev_mode.Duplex = duplexes[self.duplex]
        # print(dev_mode.PaperSize, dev_mode.Orientation, dev_mode.Duplex)

        # create dc using new settings
        self.hdc = win32gui.CreateDC("WINSPOOL", self.printer, dev_mode)
        self.dc = win32ui.CreateDCFromHandle(self.hdc)

        # self.dc = win32ui.CreateDC()
        # if self.printer is not None:
        #     self.dc.CreatePrinterDC(self.printer)
        # else:
        #     self.dc.CreatePrinterDC()

        self.dc.SetMapMode(win32con.MM_TWIPS)  # hundredths of inches
        self.dc.StartDoc(name)
        self.dc.SetBkMode(win32con.TRANSPARENT)
        self.pen = win32ui.CreatePen(0, int(scale_factor), 0)
        self.dc.SelectObject(self.pen)
        win32gui.SetBkMode(self.hdc, 1)  # transparent
        self.page = 1

    def end_document(self):
        if self.page == 0:
            return  # document was never started
        self.dc.EndDoc()
        del self.dc

    def end_page(self):
        if self.page == 0:
            return  # nothing on the page
        # end page gets stupid if the page is completely blank
        self.text((1, 1), " ")
        self.dc.EndPage()
        self.page += 1

    def getsize(self):
        if not self.page:
            self.begin_document()
        # returns printable (width, height) in points
        width = float(self.dc.GetDeviceCaps(HORZRES)) * (72.0 / self.dc.GetDeviceCaps(LOGPIXELSX))
        height = float(self.dc.GetDeviceCaps(VERTRES)) * (72.0 / self.dc.GetDeviceCaps(LOGPIXELSY))
        return width, height

    def line(self, from_, to):
        if not self.page:
            self.begin_document()
        self.dc.MoveTo(self.scale_pos(from_))
        self.dc.LineTo(self.scale_pos(to))

    def rectangle(self, box):
        if not self.page:
            self.begin_document()
        self.dc.MoveTo(self.scale_pos((box[0], box[1])))
        self.dc.LineTo(self.scale_pos((box[2], box[1])))
        self.dc.LineTo(self.scale_pos((box[2], box[3])))
        self.dc.LineTo(self.scale_pos((box[0], box[3])))
        self.dc.LineTo(self.scale_pos((box[0], box[1])))

    def text(self, position, text):
        if self.page == 0:
            self.begin_document()
        self.dc.TextOut(int(scale_factor * position[0]),
                        int(-1 * scale_factor * position[1]), text)

    def set_font(self, name, size, bold=None, italic=None):
        if not self.page:
            self.begin_document()
        wt = 400
        if bold:
            wt = 700
        if italic:
            italic = 1
        else:
            italic = 0
        self.font = get_font(name, size, wt, italic)
        self.dc.SelectObject(self.font)

    def image(self, position, image, size):
        """print PIL image at position with given size"""
        if ImageWin is None:
            raise Exception()
        if self.page == 0:
            self.begin_document()
        dib = ImageWin.Dib(image)
        end_pos = (position[0] + size[0], position[1] + size[1])
        dst = (position[0] * scale_factor, -1 * position[1] * scale_factor,
               end_pos[0] * scale_factor, -1 * end_pos[1] * scale_factor)
        dib.draw(self.hdc, dst)

    def set_ink(self, ink):
        win32gui.SetTextColor(self.hdc, win32api.RGB(*ink))

    def set_fill(self, on_off):
        pass


def build_dict():
    global pr_dict
    lst = win32print.EnumPrinters(
        win32print.PRINTER_ENUM_CONNECTIONS
        + win32print.PRINTER_ENUM_LOCAL)
    pr_dict = {}
    for flags, description, name, comment in lst:
        pr_dict[name] = {}
        pr_dict[name]["flags"] = flags
        pr_dict[name]["description"] = description
        pr_dict[name]["comment"] = comment


def list_printers():
    dft = win32print.GetDefaultPrinter()
    if pr_dict is None:
        build_dict()
    keys = pr_dict.keys()
    # keys.sort()
    rc = [dft]
    for k in keys:
        if k != dft:
            rc.append(k)
    return rc


def desc(name):
    not pr_dict and list_printers()
    return pr_dict[name]


def get_font(name, size, weight=400, italic=0):
    if italic:
        return win32ui.CreateFont({"name": name, "height": scale_factor * size, "weight": weight, "italic": italic, })
    else:
        return win32ui.CreateFont({"name": name, "height": scale_factor * size, "weight": weight, })


def auto_line_break(text, max_width, doc):
    lines = []
    count_line = 0
    for line in text.splitlines():
        count_line+=1
        line_width = len(line)
        if text.find('HÓA ĐƠN') != -1:
            if (count_line ==2 or count_line ==3):
                line_width += 40

        # Nếu chiều rộng không cho phép, xuống dòng
        if line_width > max_width and line.find('------') == -1:

            # Biến đổi chuỗi thành một danh sách các từ
            words = line.split(' ')
            # print(words)

            # Biến đổi chuỗi thành một danh sách các dòng
            # lines = []
            current_line = ''

            # Duyệt qua từng từ
            for word in words:

                # Nếu từ hiện tại + từ tiếp theo vượt quá chiều rộng cho phép
                if len(current_line) + len(word) > max_width:
                    # print(len(current_line) + len(word),"\n", current_line, word)

                    # Thêm dòng hiện tại vào danh sách các dòng
                    lines.append(current_line)

                    # Reset dòng hiện tại
                    current_line = ''


                # Thêm từ hiện tại vào dòng hiện tại
                current_line += word + ' '
                print(current_line)
            if text.find('HÓA ĐƠN') != -1:
                if (count_line == 2 or count_line == 3):
                    current_line = '        ' + current_line

            # Thêm dòng cuối cùng vào danh sách các dòng
            lines.append(current_line)
        else:
            lines.append(line)

    # Trả về danh sách các dòng
    return lines


def print_bill():
    content1 = """      
        Cyber Game Thiên Thần
Đ/C: Bình Dương 1

    HÓA ĐƠN BÁN HÀNG

Ngày 05/04/2020
NV: Nguyễn Thị Nhị
KH: Nguyễn Thị Lan
VT: M-001

CHI TIẾT
----------------------------------------
Sting
1 x 15.000 = 15.000d
----------------------------------------
Cơm Gà
    1 x 25000d
=> Cơm thêm
    1 x 5.000d
1 x 30.000d = 30.000d
----------------------------------------
Tổng Món: 2
Tổng: 45.000d"""
    content2 = """
Bàn: M-001
Ngày 12:05:24 05/04/2020
NV: Nguyễn Thị Nhị
KH: Nguyễn Thị Lan

Cơm Gà sường gà buffe sườn chả.
=> 1 x Cơm thêm
=> 1 x Trứng Ốp la

Tổng: 945.000d     4/4"""

    listprint = list_printers()
    # print(listprint)
    content = content1
    doc = Document(orientation="portrait")
    doc.begin_document()
    # Chiều rộng cho phép
    max_width = 25
    # Gọi hàm
    lines = auto_line_break(content, max_width, doc)
    x = 0
    y = 0
    count_line = 0
    if content.find('HÓA ĐƠN') != -1:
        for line in lines:
            x = 0
            count_line += 1
            ythem = 0
            doc.set_font("Consolas", 10, bold=True)
            if (count_line == 1):
                continue
            elif line == '':
                doc.set_font("Consolas", 13, bold=True)
                ythem = -6
            elif line.find('HÓA ĐƠN') > -1:
                doc.set_font("Consolas", 13, bold=True)
                ythem = 22
            elif line.find('Tổng') > -1 or line.find('CHI TIẾT') > -1:
                doc.set_font("Consolas", 13, bold=True)
                ythem = 3
            elif y < 31:
                doc.set_font("Consolas", 12, bold=True)
                x = 3
            doc.text((x, y + ythem), line)
            y += 9 + ythem
        from PIL import Image
        img = Image.open("logo.ico", )
        print(img.size)
        # doc.image((0, 100), img, img.size)
        doc.image((0, 0), img, (50, 50))
    else:
        for line in lines:
            count_line += 1
            ythem = 0
            # Courier New, Arial, Consolas
            # doc.set_font("Consolas", 10, bold=True)
            if (count_line == 1):
                continue
            elif line.find('.') > -1:
                doc.set_font("Consolas", 13, bold=True)
                ythem = 4
            elif line == '':
                doc.set_font("Consolas", 13, bold=True)
                ythem = -6
            doc.text((x, y), line)
            if line != '':
                doc.set_font("Consolas", 10, bold=True)
            y += 9 + ythem
            print(line, line.find('.'), y, line)
    doc.end_document()



################################ MiniMize soft ###################################
def mini_soft2(appname):
    # minimize app
    z1 = gw.getWindowsWithTitle(appname)[0]
    z1.minimize()
def tatapp():
    p = psutil.Process(state)
    p.terminate()  # or p.kill()
def mini_soft():
    myWindowsa = minisoft()
    temp = myWindowsa.myWindows
    myWindowsa.run_mini(temp)
    print('oki mini')

getsoft = getdanhsachminisoft('fulldanhsach', 'hidensoft')

class minisoft():
    def enumWindowFunc(hwnd, windowList):
        global getsoft

        """ win32gui.EnumWindows() callback """
        text = win32gui.GetWindowText(hwnd)
        className = win32gui.GetClassName(hwnd)
        for item in getsoft:
            if item in text and item!=None and item!='':
                windowList.append((hwnd, text, className))
                # print(text, className)

    myWindows = []
    try:
        win32gui.EnumWindows(enumWindowFunc, myWindows)
        # print(myWindows)
    except Exception as e:
        print('Lỗi', e)
    #print(myWindows)

    def run_mini(self, myWindows):
        for hwnd, text, className in myWindows:
            win32gui.ShowWindow(hwnd, win32con.SW_MINIMIZE)


if __name__ == "__main__":
    try:
        sys.argv.append("--disable-web-security")
        app = QApplication(sys.argv)
        QApplication.setApplicationName("Menu Game")
        window = MyWebBrowser()
        window.show()
        sys.exit(app.exec_())
    except Exception:
        import traceback
        traceback.print_exc()
        raw_input("Program crashed; press Enter to exit")