def keyPressEvent(self, e):
    if e.key() == QtCore.Qt.Key_Escape:
        self.close()
    if e.key() == QtCore.Qt.Key_F11:
        if self.isMaximized():
            self.showNormal()
        else:
            self.showMaximized()