#import các thư viện cần thiết
import datetime
import os
import subprocess
import time
import smtplib

import win32com.client

scheduler = win32com.client.gencache.EnsureDispatch('Schedule.Service')

def PrintAction(action):
    ty = action.Type

    if ty == win32com.client.constants.TASK_ACTION_COM_HANDLER: #=5
        print("COM Handler Action")
        coma = win32com.client.CastTo(action,"IComHandlerAction")
        print(coma.ClassId,coma.Data)
    elif ty == win32com.client.constants.TASK_ACTION_EXEC: #=0
        print("Exec Action")
        execa = win32com.client.CastTo(action,"IExecAction")
        print(execa.Path,execa.Arguments)
    elif ty == win32com.client.constants.TASK_ACTION_SEND_EMAIL: #=6 This might not work
        print("Send Email Action")
        maila = win32com.client.CastTo(action,"IEmailAction")
        print(maila.Subject,maila.To)
    elif ty == win32com.client.constants.TASK_ACTION_SHOW_MESSAGE: #=7
        print("Show Message Action")
        showa = win32com.client.CastTo(action,"IShowMessageAction")
        print(showa.Title,showa.MessageBody)
    else:
        print("Unknown Action Type!") #Don't expect this




scheduler.Connect()
folders = [scheduler.GetFolder('\\')]
while folders:
    folder = folders.pop(0)
    folders += list(folder.GetFolders(0))
    # for task in folder.GetTasks(0):
    #     print('Name       : %s' % task.Name)
    #     print('Path       : %s' % task.Path)
    #     print('Last Run   : %s' % task.LastRunTime)
    #     print('Last Result: %s' % task.LastTaskResult)
    #     defn = task.Definition
    #     actions = defn.Actions
    #     for action in actions:
    #         PrintAction(action)
    #         print()

import win32com.client

TASK_ENUM_HIDDEN = 1
TASK_STATE = {0: 'Unknown',
              1: 'Disabled',
              2: 'Queued',
              3: 'Ready',
              4: 'Running'}

scheduler = win32com.client.Dispatch('Schedule.Service')
scheduler.Connect()

n = 0
folders = [scheduler.GetFolder('\\')]
while folders:
    folder = folders.pop(0)
    folders += list(folder.GetFolders(0))
    tasks = list(folder.GetTasks(TASK_ENUM_HIDDEN))
    n += len(tasks)
#     for task in tasks:
#         settings = task.Definition.Settings
#         print('Path       : %s' % task.Path)
#         print('Hidden     : %s' % settings.Hidden)
#         print('State      : %s' % TASK_STATE[task.State])
#         print('Last Run   : %s' % task.LastRunTime)
#         print('Last Result: %s\n' % task.LastTaskResult)
# print('Listed %d tasks.' % n)


# Uses the COM Task Scheduler Interface to create a task
# scheduled to execute when the current user logs on.

import win32com.client
import os

computer_name = "" #leave all blank for current computer, current user
computer_username = ""
computer_userdomain = ""
computer_password = ""
action_id = "Test Task" #arbitrary action ID
action_path = r"c:\windows\system32\calc.exe" #executable path (could be python.exe)
action_arguments = r'' #arguments (could be something.py)
action_workdir = r"c:\windows\system32" #working directory for action executable
author = "Someone" #so that end users know who you are
description = "Run calc.exe when the current user logs on"
task_id = "Test Task"
task_hidden = False #set this to True to hide the task in the interface
username = ""
password = ""

#define constants
TASK_TRIGGER_LOGON = 9
TASK_CREATE_OR_UPDATE = 6
TASK_ACTION_EXEC = 0
TASK_LOGON_INTERACTIVE_TOKEN = 3

# define constants
TASK_TRIGGER_DAILY = 2
TASK_TRIGGER_MONTHLY = 3
TASK_CREATE = 2
TASK_TRIGGER_TIME = 1
# Create trigger
start_time = datetime.datetime.now() + datetime.timedelta(minutes=5)

#connect to the scheduler (Vista/Server 2008 and above only)
scheduler = win32com.client.Dispatch("Schedule.Service")
scheduler.Connect(computer_name or None, computer_username or None, computer_userdomain or None, computer_password or None)
rootFolder = scheduler.GetFolder("\\")

#(re)define the task
taskDef = scheduler.NewTask(0)
colTriggers = taskDef.Triggers

# trigger = colTriggers.Create(TASK_TRIGGER_TIME)
# # trigger.DaysInterval = 100
# import datetime as dt
# set_time=dt.datetime(2022,10,6,2,5,58,500000)
# trigger.StartBoundary = start_time.isoformat()
# trigger.Id = "LogonTriggerId"
# # trigger.UserId = os.environ.get('USERNAME') # current user account
# #trigger.Enabled = False
#
# # trigger.DaysOfWeek = [2, 3, 4, 5 ,6 ,7, 8] # Tuesday, Wednesday, Thursday
# trigger.WeeksOfMonth = [1, 2, 3, 4]
# trigger.Months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
#
# colActions = taskDef.Actions
# action = colActions.Create(TASK_ACTION_EXEC)
# action.ID = action_id
# action.Path = action_path
# action.WorkingDirectory = action_workdir
# action.Arguments = action_arguments
#
# info = taskDef.RegistrationInfo
# info.Author = author
# info.Description = description
#
# settings = taskDef.Settings
# #settings.Enabled = False
# settings.Hidden = task_hidden
# #settings.StartWhenAvailable = True

#register the task (create or update, just keep the task name the same)
# result = rootFolder.RegisterTaskDefinition(task_id, taskDef, TASK_CREATE_OR_UPDATE, "", "", TASK_LOGON_INTERACTIVE_TOKEN)

'''
# run the task once
task = rootFolder.GetTask(task_id)
task.Enabled = True
runningTask = task.Run("")
task.Enabled = False
'''
import subprocess
#  -DeleteExpiredTaskAfter (New-TimeSpan -Seconds 2)
# $trigger.EndBoundary = (Get-Date).AddSeconds(10).ToString("s")
# Use triple quotes string literal to span PowerShell command multiline
STR_CMD = """
$action = New-ScheduledTaskAction -Execute "powershell.exe" -Argument "C:\\path\\to\\file.ps1"
$description = "Using PowerShell's Scheduled Tasks in Python"
$second = New-TimeSpan -Seconds 2
$DurationTimeSpan = New-TimeSpan -Seconds 2
$DurationTimeSpanIndefinite = ([TimeSpan]::MaxValue)
$settings = New-ScheduledTaskSettingsSet
$taskName = "Test Script"
$trigger = New-ScheduledTaskTrigger -Once -At (Get-Date).AddSeconds(5) -RepetitionInterval $DurationTimeSpan -RepetitionDuration $DurationTempTest

Register-ScheduledTask -TaskName $taskName -Description $description -Action $action -Settings $settings -Trigger $trigger | Out-Null
"""

STR_CMD1 = """

$action = New-ScheduledTaskAction -Execute "powershell.exe" -Argument "notepad.exe"
$now = Get-Date
$User= "NT AUTHORITY\SYSTEM"
$interval = New-TimeSpan -Seconds 60
$forever = [System.TimeSpan]::MaxValue
$trigger = New-ScheduledTaskTrigger -Once -At $now -RepetitionInterval $interval
$settings = New-ScheduledTaskSettingsSet -ExecutionTimeLimit 0
$task = New-ScheduledTask -Action $action -Trigger $trigger -Settings $settings
Register-ScheduledTask -TaskName 'TESTa' -InputObject $task
"""
STR_CMD = """
$interval = New-TimeSpan -Seconds 60
$now = Get-Date
$trigger = New-ScheduledTaskTrigger -Once -At $now -RepetitionInterval $interval
$settings = New-ScheduledTaskSettingsSet -ExecutionTimeLimit 0
$User= "NT AUTHORITY\SYSTEM"
$Action = New-ScheduledTaskAction -Execute "PowerShell.exe" -Argument "notepad.exe"

Register-ScheduledTask -TaskName "cript1" -Trigger $trigger -Settings $settings -User $User -Action $Action -RunLevel Highest –Force
"""
# Use a list to make it easier to pass argument to subprocess
listProcess = [
    "powershell.exe",
    "-NoExit",
    "-NoProfile",
    "-Command",
    STR_CMD
]

# Enjoy the magic
subprocess.run(listProcess, check=True)

import win32com.client

# Create an instance of the TaskScheduler
TaskScheduler = win32com.client.Dispatch('Schedule.Service')

# Connect to the local machine
TaskScheduler.Connect()

# Get the list of all tasks
tasks = TaskScheduler.GetFolder('\\').GetTasks(1)
print(tasks)
# Check if the task name exists
def check_task_name_exist(task_name):
    for task in tasks:
        if task.Name == task_name:
            return True
    return False

# Test
task_name = 'cript1'
if check_task_name_exist(task_name):
    print('Task name exists')
else:
    print('Task name does not exist')




#khai báo biến
app_name = "C:\\Users\\khaicafe\\AppData\\Local\\Programs\\Zalo\\Zalo.exe"
app_path = "C:\\Users\\khaicafe\\AppData\\Local\\Programs\\Zalo"
# os.system("start /b C:\\Users\\khaicafe\\AppData\\Local\\Programs\\Zalo\\Zalo.exe")
#khởi động app
# os.system("cd "+app_path+" && ./start.sh")
import psutil
def is_running(name):
    '''
    Check if there is any running process that contains the given name process.
    '''
    #Iterate over the all the running process
    for proc in psutil.process_iter():
        try:
            # Check if process name contains the given name string.
            if name.lower() in proc.name().lower():
                return True
        except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
            pass
    return False
#kiểm tra trạng thái của app
# while True:
#     #lấy trạng thái của app
#     # status = os.system("ps -ef | grep "+app_name+" | grep -v grep")
#     # print('status',status)
#     #nếu app bị crash
#     # if status != 0:
#     # Check if any chrome process was running or not.
#     if is_running('Zalo'):
#         print('dang chay')
#         #gửi email thông báo
#         # server = smtplib.SMTP('smtp.gmail.com', 587)
#         # server.starttls()
#         # server.login("your_email_address", "your_password")
#         # msg = "App "+app_name+" crashed!"
#         # server.sendmail("sender_email_address", "receiver_email_address", msg)
#         # server.quit()
#     else:
#         print("khong chay")
#         #khởi động lại app
#         subprocess.Popen(app_name)
#         # os.system("start /b "+app_name)
#     #chờ 5 giây
#     time.sleep(1)
