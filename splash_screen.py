
import time

from PyQt5.QtCore import QRect, QMetaObject, QCoreApplication, Qt
from PyQt5.QtGui import QMovie, QPixmap
from PyQt5.QtWidgets import QHBoxLayout, QLabel, QApplication, QWidget


class Ui_Form(QWidget):

    def __init__(self, parent=None):
        super(Ui_Form, self).__init__(parent)
        self.setObjectName("self")
        self.resize(400, 400)
        self.label = QLabel(self)
        self.label.setText("This is main application")
        self.label.setObjectName("label")

def showStartScreen():
    start = time.time()

    # PNG image
    img_path = f".../splash_image.PNG"
    image = QPixmap(img_path)

    # set layout in order to put GIF in above (on top) a word that are in splash image
    layout = QHBoxLayout()
    image_container = QLabel()
    image_container.setAttribute(Qt.WA_DeleteOnClose) // <--
    image_container.setWindowFlag(Qt.SplashScreen, Qt.FramelessWindowHint)
    image_container.setLayout(layout)
    image_container.setPixmap(image)

    # ...

    layout.addWidget(label_2, 0, Qt.AlignRight | Qt.AlignBottom)
    movie.start()
    image_container.show()

    return image_container


if __name__ == "__main__":
    import sys

    app = QApplication(sys.argv)
    ui = Ui_Form()
    splash_screen = showStartScreen()
    QTimer.singleShot(5 * 1000, splash_screen.close)
    QTimer.singleShot(5000, ui.show)
    sys.exit(app.exec_())