import sys
import os

import pywinauto as pywinauto
from pywinauto import Application

app = Application(backend="win32").start(r'npp.6.8.3.Installer.exe')

Wizard = app['Installer Language']

Wizard.minimize()
Wizard.NextButton.click()

Wizard = app['Notepad++ v6.8.3 Setup']

Wizard.wait('visible')
Wizard.minimize()

Wizard['Welcome to the Notepad++ v6.8.3 Setup'].wait('ready')
Wizard.NextButton.click()

Wizard.minimize()
Wizard['License Agreement'].wait('ready')
Wizard['I &Agree'].click()

Wizard.minimize()
Wizard['Choose Install Location'].wait('ready')
Wizard.Button2.click()

Wizard.minimize()
Wizard['Choose Components'].wait('ready')
Wizard.Button2.click()

Wizard.minimize()
checkbox = Wizard['Create Shortcut on Desktop'].wait('enabled')
if checkbox.get_check_state() != pywinauto.win32defines.BST_CHECKED:
    checkbox.click()
Wizard.Install.click()

Wizard['Completing the Notepad++ v6.8.3 Setup'].wait('ready', timeout=30)
Wizard.minimize()
Wizard['CheckBox'].wait('enabled').click()
Wizard.Finish.click()
Wizard.wait_not('visible')