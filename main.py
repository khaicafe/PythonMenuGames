import os
import sys
import time

import psutil
from PyQt5 import QtWidgets, QtCore
from PyQt5.QtCore import pyqtSlot, Qt
from PyQt5.QtWidgets import QProgressBar, QLabel, QMessageBox
from PyQt5.uic import loadUi
from tqdm import tqdm
import requests
######################## Path maker
if getattr(sys, 'frozen', False) and hasattr(sys, '_MEIPASS'):
    path = sys._MEIPASS + '/'
else:
    path = ''
state = os.getpid()# mã pid trong taskmanager

class Dashboard(QtWidgets.QMainWindow):  # (QWidget):
    def __init__(self):
        super(Dashboard, self).__init__()
        loadUi(path+ "update.ui", self)
        self.statusbar = self.statusBar()
        #self.progressBar.setValue(0)

        self.pool = QtCore.QThreadPool.globalInstance()#.globalInstance
        self.pool.setMaxThreadCount(1)

        self.BtnStart2.clicked.connect(self.stardownload2)

    ###################### v2 ###################

    def stardownload2(self):
        import requests
        version = 1.0
        response = requests.get(
            "https://raw.githubusercontent.com/khaicafe/update/main/update.txt")  # https://github.com/khaicafe/update/blob/main/update.txt
        data = response.text
        if float(data) > float(version):
            ret = QMessageBox.question(self, 'MessageBox', f'there is new version ? {data}',
                                       QMessageBox.Yes | QMessageBox.No)
            if ret == QMessageBox.Yes:
                print('oki down', data)
                self.statusbar.showMessage('')
                self.BtnStart2.setEnabled(False)
                for i in range(1):
                    ProgressBar = QProgressBar()
                    ProgressBar.setGeometry(200, 100, 200, 30)
                    # setting the value
                    # ProgressBar.setValue(30)
                    # setting alignment to center
                    ProgressBar.setAlignment(Qt.AlignCenter)
                    # setting background to invisible
                    ProgressBar.setStyleSheet("QProgressBar"
                                              "{"
                                              "background-color : rgba(0, 0, 0, 0);"
                                              "border : 1px"
                                              "}")
                    self.label = QLabel()
                    self.layout.addWidget(ProgressBar)
                    self.layout.addWidget(self.label)

                    self.worker = Worker(i, ProgressBar, self.label)  # add biến vào hàm
                    self.worker.signals.progress.connect(self.setProgress)
                    self.worker.signals.finished.connect(self.downloadFinished)
                    self.pool.start(self.worker)
        else:
            pass


    def setProgress(self, l):
        bar,label, num, message = l
        self.statusbar.showMessage(message)
        # self.numage
        # self.progressBar_1.setValue(num)
        #label.setText(message)
        bar.setValue(num)

    def downloadFinished(self):
        # Restore the button.
        self.BtnStart2.setEnabled(True)
        # Delete the thread when no longer needed.
        #del self.worker
        self.statusbar.showMessage('The file has been downloaded!')
        for i in reversed(range(self.layout.count())):
            self.layout.itemAt(i).widget().deleteLater()


class WorkerSignals(QtCore.QObject):
    finished = QtCore.pyqtSignal()

    error = QtCore.pyqtSignal(tuple)
    result = QtCore.pyqtSignal(object)
    progress = QtCore.pyqtSignal(list)

class Worker(QtCore.QRunnable):
    def __init__(self, num, bar,label):
        super(Worker, self).__init__()
        self.num = num
        self.bar = bar
        self.label = label
        self.signals = WorkerSignals()

    @pyqtSlot()
    def run(self):
        url = "http://localhost:8501/media/b217879d4881b4774ea867ac4be529a9501a1f44bee951122646ef74.bin?title=testfirebase%20%C2%B7%20Streamlit"  # big file test
        filename = url.split('/')[-1]
        # Streaming, so we can iterate over the response.
        response = requests.get(url, stream=True)
        total_size_in_bytes = int(response.headers.get('content-length', 0))
        block_size = 5120  # 1 Kibibyte
        progress_bar = tqdm(total=total_size_in_bytes, unit='iB', unit_scale=True)
        with open('update.zip', 'wb') as file:
            for data in response.iter_content(block_size):
                progress_bar.update(len(data))
                file.write(data)

                progress_dict = progress_bar.format_dict
                percentage = progress_dict['n'] / progress_dict['total'] * 100

                progress = str(progress_bar)
                Total = progress.split('|')[-1].split('/')[1].split('[')[0]
                curentspeed = progress.split('|')[-1].split('/')[0]#.split('[')[0]
                # print(curentspeed)
                time_val = progress.split('[')[-1].split(',')[0]
                elapsed = time_val.split('<')[0]
                remaining = time_val.split('<')[-1]
                message = f"Processing Total: {Total} at the rate of {curentspeed} Elapsed Time: {elapsed} Remaining Time {remaining}"

                self.signals.progress.emit([self.bar,self.label, percentage, message])
        progress_bar.close()
        self.signals.finished.emit()
        if total_size_in_bytes != 0 and progress_bar.n != total_size_in_bytes:
            print("ERROR, something went wrong")


if __name__ == "__main__":
    app = QtWidgets.QApplication(sys.argv)  # (sys.argv)
    #app.setStyleSheet(GLOBAL_STYLE)
    widget = Dashboard()
    widget.show()
    try:
        sys.exit(app.exec_())
    except:
        print('exit')
        p = psutil.Process(state)
        p.terminate()  # or p.kill()