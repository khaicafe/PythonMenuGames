import sqlite3
import sys
import time
from io import BytesIO
from PIL import Image

from PyQt5 import QtWidgets, QtCore, QtGui
from PyQt5.QtCore import *
from PyQt5.QtGui import *
from PyQt5.QtNetwork import QNetworkRequest, QNetworkReply, QNetworkAccessManager
from PyQt5.QtWidgets import QMenu, QAction, QTableWidgetItem, QMenuBar, QDialog, QLabel, QSizeGrip, QFileDialog, \
    QWidget, QMessageBox
from PyQt5.uic import loadUi
if getattr(sys, 'frozen', False) and hasattr(sys, '_MEIPASS'):
    print('running in a PyInstaller bundle')
    path = sys._MEIPASS + '/'
else:
    print('running in a normal Python process')
    path = ''
Pass_sqlite = 'khaicafe'
# convert sqlite to dict
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
    # if choice == None:
    #     return cur,con
    if 'SELECT' in query:
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
# con = sqlite3.connect('datagame.db')  # (":memory:")
# con.text_factory = lambda b: b.decode(errors = 'ignore')
# con.row_factory = dict_factory
# cur = con.cursor()

class formchild(QtWidgets.QMainWindow):
    def __init__(self, parent=None):
        super(formchild, self).__init__(parent)
        loadUi(path+"input2.ui", self)
        #self.parent = parent


        # khai báo biến truyền về form cha
        self.id = None
        self.imagedata = None
        self.idgame = None

        # set click chỉ hoat dong tren child form
        self.setWindowModality(QtCore.Qt.ApplicationModal)
        # show top trên window
        #self.setWindowFlags(Qt.WindowStaysOnTopHint)
        # tắt header của form
        self.setWindowFlag(Qt.FramelessWindowHint)


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

        ######################### Add item Combobox ############################################
        for text, url in zip(("Game Online", "Game Offline"),("Game Online","Game Offline",),):
            self.comboBox_2.addItem(text, url)
        for text, url in zip(("Hành động, Phiêu lưu","Hành động", "Chiến thuật", "Nhập Vai", "Phiêu lưu", "Mô phỏng", "Thế giới mỏ", "Sinh tồn", "Trí tuệ"), ("Hành động, Phiêu lưu","Hành động", "Chiến thuật", "Nhập Vai", "Phiêu lưu", "Mô phỏng", "Thế giới mỏ", "Sinh tồn", "Trí tuệ"), ):
            self.comboBox.addItem(text, url)

        self.comboBox_2.currentIndexChanged.connect(self.comboxpath_group)
        self.comboBox.currentIndexChanged.connect(self.comboxpath_theloai)
        self.pathimage.textChanged.connect(self.display)

        self.manager = QNetworkAccessManager()
        self.manager.finished.connect(self.on_finished)
        # self.Btn_pathimage.clicked.connect(self.display)

        self.Btnpathgame.clicked.connect(self.Getpath_game)
        self.Btn_pathimage.clicked.connect(self.Getpath_photo_image)
        self.BtnClose.clicked.connect(self.closeapp)
        self.Btncropphoto.clicked.connect(self.crop)

        self.Btn_newgame.clicked.connect(self.new_game)
        self.Btn_savegame.clicked.connect(self.save_game)

        def moveWindow(e):
            if self.isMaximized() == False:
                if e.buttons() == Qt.LeftButton:
                    self.move(self.pos() + e.globalPos() - self.clickPosition)
                    self.clickPosition = e.globalPos()
                    e.accept()
        self.frame_Top.mouseMoveEvent = moveWindow

        # cur.execute(
        #     "SELECT * FROM Design")
        # getdesign = cur.fetchall()
        query = "SELECT * FROM Design"
        getdesign = get_curSQL('datagame.db', query=query)
        if getdesign[0]['Crop_photo'] == '1':
            self.Btncropphoto.setIcon(QtGui.QIcon('./icons/done.png'))
        else:
            self.Btncropphoto.setIcon(QtGui.QIcon('./icons/unchecked.png'))


    ##############show image link ref fast###################################

    #@pyqtSlot(int)
    def display(self):
        url = self.pathimage.text()
        #url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk1rf2MUu2M6qpcFLG-l7fs4UUltahNgcKKOOyq3hMMP5Na1xaK0LdASOCzSECH6Y9sxQ&usqp=CAU"
        self.start_request(url)

    def start_request(self, url):
        request = QNetworkRequest(QUrl(url))
        self.manager.get(request)

    @pyqtSlot(QNetworkReply)
    def on_finished(self, reply):
        target = reply.attribute(QNetworkRequest.RedirectionTargetAttribute)
        if reply.error():
            print("error load image to linkweb: {}".format(reply.errorString()))
            try:
                pathimage = self.pathimage.text()
                # Resize image
                self.imagedata =self.resize_image(pathimage)
                # print(pathgame)
                # with open('resized_image.jpg', 'rb') as f:
                #     self.imagedata = f.read()
                pixmap = QPixmap()
                pixmap.loadFromData(self.imagedata)
                self.label_image.setPixmap(pixmap.scaled(120, 200))  # .scaledToHeight(380))
            except:
                pass
            return
        elif target:
            newUrl = reply.url().resolved(target)
            self.start_request(newUrl)
            return
        self.imagedata = reply.readAll()
        # Resize image
        self.imagedata= self.resize_image_BytesIO(self.imagedata)
        pixmap = QPixmap()
        pixmap.loadFromData(self.imagedata)
        self.label_image.setPixmap(pixmap.scaled(120,200))#.scaledToHeight(380))
    #################################################################################

    @pyqtSlot(int)
    def comboxpath_group(self, ix):
        url = self.comboBox_2.itemData(ix)
        self.Groupgame.setText(url)
        print(url)

    @pyqtSlot(int)
    def comboxpath_theloai(self, ix):
        url = self.comboBox.itemData(ix)
        self.theloai.setText(url)
        print(url)

    def mousePressEvent(self, event):
        if event.button() == QtCore.Qt.LeftButton:
            #self.startPos = event.pos()
            self.clickPosition = event.globalPos()

    ##################################################################################
    # hàm open file get path
    def Getpath_game(self):
        # hàm chọn 1 file
        # options = QFileDialog.Options()
        # options |= QFileDialog.DontUseNativeDialog
        # fileName, _ = QFileDialog.getOpenFileName(self, "QFileDialog.getOpenFileName()", "",
        #                                               "All Files (*);;Python Files (*.py)", options=options)
        fileName, _ = QFileDialog.getOpenFileName(self, 'Select a File', '', "EXE (*.exe)")
        if fileName:
            #print(fileName)
            import os
            filepath = os.path.normpath(fileName)
            url = QUrl.fromLocalFile(filepath)
            #print(url)
            from pathlib import Path
            filenamea = Path(fileName).name
            print(fileName)
            self.pathgame.setText(fileName)
            return fileName
            #print("now playing {}".format(filenamea))


            # hàm chon nhiều files
            # options = QFileDialog.Options()
            # options |= QFileDialog.DontUseNativeDialog
            # files, _ = QFileDialog.getOpenFileNames(self, "QFileDialog.getOpenFileNames()", "",
            #                                         "All Files (*);;Python Files (*.py)", options=options)
            # if files:
            #     print(files)

    def Getpath_photo_image(self):
        # hàm chọn 1 file
        # options = QFileDialog.Options()
        # options |= QFileDialog.DontUseNativeDialog
        # fileName, _ = QFileDialog.getOpenFileName(self, 'Open File', "",
        #                                           "image Files (*.jpg *.png *.bmp)", options=options)# "All Files (*);;image Files (*.jpg *.png *.bmp)"
        fileName, _ = QFileDialog.getOpenFileName(self, 'Select a File', '', "Images (*.png *.jpg)")
        if fileName:
            # print(fileName)
            import os
            filepath = os.path.normpath(fileName)
            url = QUrl.fromLocalFile(filepath)
            # print(url)
            from pathlib import Path
            # self.pathimage.setText('')
            filenamea = Path(fileName).name
            print(fileName)
            self.pathimage.setText(fileName)
            return fileName

    ###################################################################################
    def nhanvalue_main(self, value):
        # print('form child nhận value tư form cha', value)
        self.idgame = str(value)
        # with con:
        #     cur.execute(
        #         f'SELECT * FROM Listgame WHERE ID="{self.idgame}"')
        #     getdata = cur.fetchall()
        query = f'SELECT * FROM Listgame WHERE ID="{self.idgame}"'
        getdata = get_curSQL('datagame.db', query=query)
        print('form child nhận value tư form cha')
        self.tengame.setText(getdata[0].get('Tengame'))
        self.Groupgame.setText(getdata[0].get('Groupgame'))
        self.theloai.setText(getdata[0].get('Category'))
        self.pathgame.setText(getdata[0].get('Pathgame'))
        self.Argument.setText(getdata[0].get('Argument'))
        self.pathimage.setText(getdata[0].get('Pathimage'))
        if getdata[0].get('Pathimage') == None or getdata[0].get('Pathimage') == '':
            self.pathimage.setText('IDC_image')

        if getdata[0].get('imagedata') != '':
            self.imagedata = getdata[0].get('imagedata')
        else:
            self.setimagenull()

        # print(self.imagedata)
        pixmap = QPixmap()
        try:
            pixmap.loadFromData(self.imagedata)
        except:
            pixmap.loadFromData(eval(self.imagedata))
        self.label_image.setPixmap(pixmap.scaled(120, 200))  # .scaledToHeight(380))
        self.repaint()

        # nhận value từ form cha
        # print(value)

    def closeapp(self):
        # send biến đến hàm của form cha
        self.id.show_menu("oki nha")
        self.parent().show_menu("oki nha")
        self.parent().show_menu("close form con")
        self.close()

    def new_game(self):
        tengame = self.tengame.text().upper()
        Groupgame = self.Groupgame.text()
        theloai = self.theloai.text()
        pathgame = self.pathgame.text()
        Argument = self.Argument.text()
        pathimage =self.pathimage.text()
        if tengame == '':
            ret = QMessageBox.question(self, 'MessageBox', f'Please input Name Game  !!!',
                                       QMessageBox.Ok, QMessageBox.Ok)
            if ret == QMessageBox.Ok:
                return
        elif Groupgame == '':
            ret = QMessageBox.question(self, 'MessageBox', f'Please input Group Game !!!',
                                       QMessageBox.Ok, QMessageBox.Ok)
            if ret == QMessageBox.Ok:
                return
        elif pathgame == '':
            ret = QMessageBox.question(self, 'MessageBox', f'Please input Path game !!!',
                                       QMessageBox.Ok, QMessageBox.Ok)
            if ret == QMessageBox.Ok:
                return
        elif pathimage == '':
            ret = QMessageBox.question(self, 'MessageBox', f'Please input Path image !!!',
                                       QMessageBox.Ok, QMessageBox.Cancel)
            if ret == QMessageBox.Ok:
                return
            else:
                self.pathimage.setText('Image_Default')
                self.setimagenull()
                # print(self.imagedata)
                pixmap = QPixmap()
                try:
                    pixmap.loadFromData(self.imagedata)
                except:
                    pixmap.loadFromData(eval(self.imagedata))
                self.label_image.setPixmap(pixmap.scaled(120, 200))  # .scaledToHeight(380))
                self.repaint()
        elif self.imagedata == None:
            ret = QMessageBox.question(self, 'MessageBox', f'Please find another photo !!!',
                                       QMessageBox.Ok, QMessageBox.Ok)
            if ret == QMessageBox.Ok:
                return
        #print(tengame, Groupgame, theloai, pathgame, Argument, pathimage)
        # with con:
        #     cur.execute(
        #         f'SELECT * FROM Listgame Where ID order by CAST(ID AS INTEGER)')
        #     getdata = cur.fetchall()
        query = f'SELECT * FROM Listgame Where ID order by CAST(ID AS INTEGER)'
        getdata = get_curSQL('datagame.db', query=query)
            #print(len(getdata))#, getdata[-1:][0].get('ID'))
        # xử lý không phải là số
        id = 0
        if len(getdata) == 0:
            id = 1
        else:
            print(int(getdata[-1:][0].get('ID')))
            id = int(getdata[-1:][0].get('ID')) + 1
            print('id ke tiep',id)
            self.idgame = id
        args = (id, self.imagedata, Groupgame, tengame, theloai, pathgame, Argument, pathimage, 0)
        query = 'INSERT INTO Listgame VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)'
        # with con:
        #     cur.execute(query, args)
        #     con.commit()

        get_curSQL('datagame.db', query=query, args= args)
        # self.parent().show_menu("Refesh Tablewidget")
        print('success')
        self.tengame.setText('')
        self.Groupgame.setText('')
        self.theloai.setText('')
        self.pathgame.setText('')
        self.Argument.setText('')
        self.pathimage.setText('')

    def save_game(self, value):
        tengame = self.tengame.text().upper()
        Groupgame = self.Groupgame.text()
        theloai = self.theloai.text()
        pathgame = self.pathgame.text()
        Argument = self.Argument.text()
        pathimage =self.pathimage.text()
        id = self.idgame
        if tengame == '':
            ret = QMessageBox.question(self, 'MessageBox', f'Please input Name Game  !!!',
                                       QMessageBox.Ok, QMessageBox.Ok)
            if ret == QMessageBox.Ok:
                return
        elif Groupgame == '':
            ret = QMessageBox.question(self, 'MessageBox', f'Please input Group Game !!!',
                                       QMessageBox.Ok, QMessageBox.Ok)
            if ret == QMessageBox.Ok:
                return
        elif pathgame == '':
            ret = QMessageBox.question(self, 'MessageBox', f'Please input Path game !!!',
                                       QMessageBox.Ok, QMessageBox.Ok)
            if ret == QMessageBox.Ok:
                return
        elif pathimage == '':
            ret = QMessageBox.question(self, 'MessageBox', f'Please input Path image !!!',
                                       QMessageBox.Ok, QMessageBox.Cancel)
            if ret == QMessageBox.Ok:
                return
            else:
                self.pathimage.setText('Image_Default')
                self.setimagenull()
                # print(self.imagedata)
                pixmap = QPixmap()
                try:
                    pixmap.loadFromData(self.imagedata)
                except:
                    pixmap.loadFromData(eval(self.imagedata))
                self.label_image.setPixmap(pixmap.scaled(120, 200))  # .scaledToHeight(380))
                self.repaint()
                if self.idgame == None:
                    self.new_game()
                    return
        elif self.imagedata == None:
            ret = QMessageBox.question(self, 'MessageBox', f'Please find another photo !!!',
                                       QMessageBox.Ok, QMessageBox.Ok)
            if ret == QMessageBox.Ok:
                return
        # chuyên về hàm new nếu không có idgame
        elif self.idgame == None:
            self.new_game()
            return
        print(id, tengame, Groupgame, theloai, pathgame, Argument, pathimage)
        args = (tengame, Groupgame, theloai, pathgame, Argument, pathimage, self.imagedata, 0, id)
        query = f'''UPDATE Listgame SET Tengame=? , Groupgame=?, Category==?, Pathgame=?, Argument=?, Pathimage=?,imagedata==?, Luotplay=? WHERE ID=?'''
        get_curSQL('datagame.db', query=query, args=args)

        #query = 'INSERT INTO Listgame VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)'
        # with con:
        #     cur.execute(query, args)
        #     #cur.execute(f'UPDATE Listgame SET Tengame="{tengame}" , Groupgame="{Groupgame}", Theloai="{theloai}", Pathgame="{pathgame}", Argument="{Argument}", Pathimage="{pathimage}",imagedata="{self.imagedata}", Luotplay=0 WHERE ID={id}')
        #     con.commit()
        # self.parent().show_menu("Refesh Tablewidget")


        print('success')
        self.close()

    ############################## Set image if image null ####################
    def setimagenull(self):
        # with con:
        #     cur.execute(
        #         f'SELECT * FROM Design;')
        #     getimage_default = cur.fetchall()
        query = f'SELECT * FROM Design;'
        getimage_default = get_curSQL('clientdata.db', query=query)
        self.imagedata = getimage_default[0]['Photo_default']
    def set_image_default(self):
        with open('default.gif', 'rb') as f:
            self.imagedata = f.read()
        args = (self.imagedata,)
        query = f'''UPDATE Design SET Photo_default=?;'''
        get_curSQL('clientdata.db', query=query, args=args)
        # query = 'INSERT INTO Listgame VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)'
        # with con:
        #     cur.execute(query, args)
        #     # cur.execute(f'UPDATE Listgame SET Tengame="{tengame}" , Groupgame="{Groupgame}", Theloai="{theloai}", Pathgame="{pathgame}", Argument="{Argument}", Pathimage="{pathimage}",imagedata="{self.imagedata}", Luotplay=0 WHERE ID={id}')
        #     con.commit()
    def resize_image(self, file):
        # cur.execute(
        #     "SELECT * FROM Design")
        # getdesign = cur.fetchall()
        query = "SELECT * FROM Design"
        getdesign = get_curSQL('datagame.db', query=query)
        basewidth = 150  # px
        with BytesIO() as output:
            with Image.open(file) as img:
                width, height = img.size  # Get dimensions
                if width > height and getdesign[0]['Crop_photo'] == '1':
                    print('crop')
                    h2 = width / 2
                    h4 = h2 / 2
                    border = (h4, 0, h4 * 3, height)
                    img = img.crop(border)
                wpercent = (basewidth / float(img.size[0]))
                hsize = int((float(img.size[1]) * float(wpercent)))
                img = img.resize((basewidth, hsize), Image.ANTIALIAS)
                img.save(output, format='JPEG', optimize=True, subsampling=0, quality=100)# PNG, BMP
            data = output.getvalue()
        return data
    def resize_image_BytesIO(self, BytesIaO):
        # cur.execute(
        #     "SELECT * FROM Design")
        # getdesign = cur.fetchall()
        query = "SELECT * FROM Design"
        getdesign = get_curSQL('datagame.db', query=query)
        basewidth = 150  # px
        img=Image.open(BytesIO(BytesIaO)).convert('RGB')
        width, height = img.size  # Get dimensions
        if width > height  and getdesign[0]['Crop_photo'] == '1':
            h2 = width / 2
            h4 = h2 / 2
            border = (h4, 0, h4 * 3, height)
            img = img.crop(border)
        wpercent = (basewidth / float(img.size[0]))
        hsize = int((float(img.size[1]) * float(wpercent)))
        img = img.resize((basewidth, hsize), Image.ANTIALIAS)
        output = BytesIO()
        img.save(output, format="JPEG", optimize=True, subsampling=0, quality=100)#, quality=Quality
        data = output.getvalue()
        return data
    def crop(self):
        # cur.execute(
        #     "SELECT * FROM Design")
        # getdesign = cur.fetchall()
        query = "SELECT * FROM Design"
        getdesign = get_curSQL('datagame.db', query=query)
        if getdesign[0]['Crop_photo'] == '0':
            self.Btncropphoto.setIcon(QtGui.QIcon('./icons/done.png'))
            args = (1,)
            query = f'''UPDATE Design SET Crop_photo=?'''

            get_curSQL('datagame.db', query=query,args=args)
        else:
            self.Btncropphoto.setIcon(QtGui.QIcon('./icons/unchecked.png'))
            args = (0,)
            query = f'''UPDATE Design SET Crop_photo=?'''

            get_curSQL('datagame.db', query=query, args=args)


'''if __name__ == "__main__":
    app = QtWidgets.QApplication(sys.argv)  # (sys.argv)
    #app.setStyleSheet(GLOBAL_STYLE)
    widget = formchild()
    widget.show()
    sys.exit(app.exec_())'''