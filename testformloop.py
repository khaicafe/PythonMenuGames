# """
# This sample shows how to separate QApplication event loop from main thread.
# This method works only on Linux. On Windows, you will see this app's window freezing.
# """
# import logging
# import threading
# import sys
# import time
# from PyQt5.QtCore import QRect
# from PyQt5.QtWidgets import (QApplication, QWidget)
#
# #logging settings
# logger = logging.getLogger(__name__); logger.setLevel(logging.DEBUG)	#output DEBUG or higher level messages
# handler = logging.StreamHandler(); handler.setLevel(logging.DEBUG)
# handler.setFormatter(logging.Formatter('%(asctime)s - %(name)s - %(threadName)s - %(levelname)s: %(message)s'))
# logger.addHandler(handler)
#
# class MainWindow(QWidget):
#     """main window class"""
#     def __init__(self):
#         super().__init__()
#         self.setWindowTitle('Main Window')
#         self.setGeometry(QRect(300,300, 200,150))
#
# def ui_thread(app):
#     """a thread for QApplication event loop"""
#     logger.debug("I'm UI thread.")
#     app[0] = QApplication(sys.argv)
#     app[0].exec_()
#
# if __name__ == '__main__':
#     logger.debug("I'm main thread.")
#
#     #Qreate QApplication instance and start event loop.
#     app = [None]
#     ui_th = threading.Thread(target=ui_thread, args=(app,))
#     ui_th.start()
#     time.sleep(0.05)	#Wait for a short time to ensure QApplication instance created.
#
#     #From now, you can do anything you like!
#     w = MainWindow()
#     w.show()
#
#     time.sleep(1.5)
#     w.setGeometry(QRect(300,300, 400,300))
#     w.setWindowTitle("Size changed!")
#
#     time.sleep(1.5)
#     w.setWindowTitle("Title changed!!!!!!!!!!!!!!!!!!!!!!!!!!!")
#
#     time.sleep(2)
#     app[0].quit()	#end UI thread
#     quit()	#end main thread
import sqlite3
def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d
Pass_sqlite = 'khaicafe'
def get_curSQL(database, args=None, query=None):
    # try:
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
    # except Exception as e:
    #     if 'UNIQUE' in str(e):
    #         # Box_alert("Game đã tồn tại")
    #         return 'Game đã tồn tại'
    #     else:
    #         return (str(e))
    #         # Box_alert(str(e))
    #         # offmain()
# chi sử dụng dấu nháy đơn trong query
query =f'''UPDATE 'List-order' SET Print='Print' WHERE (Date='20:28, 28/12/2022');'''
# get_curSQL('manager-order.db', query=query)

# query = f'''INSERT INTO 'List-order' VALUES ('20:27, 28/12/2022','', 'Nước Cam', '20000', 1, 'ít đá', 'CHẤP NHẬN','','','','','M-004','' );'''
get_curSQL('manager-order.db', query=query)