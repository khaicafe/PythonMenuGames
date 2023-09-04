import logging
import os
import pathlib
import shutil
import socket
import struct
import threading
import time
import json as js
import configparser

import numpy as np
import psutil
import pythoncom
import requests
import uvicorn
import wmi
import clr #package pythonnet, not clr
from GPUtil import GPUtil
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi_cprofile.profiler import CProfileMiddleware
from pydantic import BaseModel
from ctypes import *
import ctypes
import pandas as pd
import subprocess, sys
import datetime
import netifaces
ctypes.windll.shell32.IsUserAnAdmin()
# if not ctypes.windll.shell32.IsUserAnAdmin():
#     print('Not enough priviledge, restarting...')
#     import sys
#
#     ctypes.windll.shell32.ShellExecuteW(None, "runas", sys.executable, " ".join(sys.argv), None, 1)
#     try:
#         ctypes.windll.shell32.IsUserAnAdmin()
#
#     except:
#         pass
# else:
#     print('Elevated privilege acquired')

uvicorn_error = logging.getLogger("uvicorn.error")
uvicorn_error.disabled = True
uvicorn_access = logging.getLogger("uvicorn.access")
uvicorn_access.disabled = True

start_time = time.time()
################### Read file ini get IP server #############################

config = configparser.ConfigParser()
config.read_file(open(r'config.ini'))
ipserver = config.get('server-ip', 'server')
print('serverip:',ipserver)

############################# Fastapi server - dành cho client ####################

hostname = socket.gethostname()
local_ip_client = socket.gethostbyname(hostname)
app = FastAPI()

class Item(BaseModel):
    ID: str
    online: str
@app.post("/recevie")
async def submit(item: Item):
    # print(item)
    if item.ID == 'setBackgroundClient':
        print('background')
        setbackground()
    else:
        Tenmay, Ip, Hdh,main, Cpuname, Ram, Vga, CpuUsed, RamUsed, Ram_percent, fans, Cputemp, GPUtemp, HDDtemp, lanspeed = info_PC()
        # Tính thời gian tại thời điểm kết thúc thuật toán
        end_time = time.time()
        # tính thời gian online của thuật toán Python
        elapsed_time = end_time - start_time
        value = {'online-time': f"{elapsed_time}",
                'tenmay': f'{str(Tenmay)}',
                 'ip': f'{str(Ip)}',
                 'hdh': f'{str(Hdh)}',
                 'Main': f'{str(main)}',
                 'cpuname': f'{str(Cpuname)}',
                 'ram': f'{str(Ram)} GB',
                 'vga': f'{str(Vga)}',
                 'cpuused': f'{str(CpuUsed)}',
                 'rampercent': f'{str(Ram_percent)}',
                 'ramused': f'{str(RamUsed)}',
                 'fans': f'{str(fans)}',
                 'cputemp': f'{str(Cputemp)}',
                 'vgatemp': f'{str(GPUtemp)}',
                 'hddtemp': f'{str(HDDtemp)}',
                 'lanspeed': f'{str(lanspeed)}',
                 }
        return value  # send value client
@app.get("/checknamepc")## hàm check online offline client
async def read_root(request: Request):
    client_host = request.client.host
    return client_host
@app.get("/gateway")
async def get_gateway():
    # gateways = netifaces.gateways()
    # default_gateway = gateways['default'][netifaces.AF_INET][0]
    # print('gateway: ',default_gateway)
    # return str(default_gateway)
    import wmi
    wmi_obj = wmi.WMI()
    wmi_sql = "select IPAddress,DefaultIPGateway from Win32_NetworkAdapterConfiguration where IPEnabled=TRUE"
    wmi_out = wmi_obj.query(wmi_sql)

    for dev in wmi_out:
        print("IPv4Address:", dev.IPAddress[0], "DefaultIPGateway:", dev.DefaultIPGateway[0])
        return str(dev.DefaultIPGateway[0])


origins = [
    'http://localhost:800',
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=['*'],
    allow_headers=['*'],
)
# app.add_middleware(
#    CProfileMiddleware,
#    enable=True,
#    print_each_request=True,
#    strip_dirs=False,
#    sort_by="cumtime"
# )
########################### Fastapi send data for server game #################

data = []
openhardwaremonitor_hwtypes = ['Mainboard','SuperIO','CPU','RAM','GpuNvidia','GpuAti','TBalancer','Heatmaster','HDD']
cputhermometer_hwtypes = ['Mainboard','SuperIO','CPU','GpuNvidia','GpuAti','TBalancer','Heatmaster','HDD']
openhardwaremonitor_sensortypes = ['Voltage','Clock','Temperature','Load','Fan','Flow','Control','Level','Factor','Power','Data','SmallData']
cputhermometer_sensortypes = ['Voltage','Clock','Temperature','Load','Fan','Flow','Control','Level']

def initialize_openhardwaremonitor():
    file = 'OpenHardwareMonitorLib'
    clr.AddReference(file)

    from OpenHardwareMonitor import Hardware

    handle = Hardware.Computer()
    handle.MainboardEnabled = True
    handle.CPUEnabled = True
    handle.RAMEnabled = True
    handle.GPUEnabled = True
    handle.HDDEnabled = True
    handle.Open()
    return handle
def fetch_stats(handle):
    for i in handle.Hardware:
        i.Update()
        for sensor in i.Sensors:
            parse_sensor(sensor)
        for j in i.SubHardware:
            j.Update()
            for subsensor in j.Sensors:
                parse_sensor(subsensor)
def parse_sensor(sensor):
        if sensor.Value is not None:
            if type(sensor).__module__ == 'OpenHardwareMonitor.Hardware':
                sensortypes = openhardwaremonitor_sensortypes
                hardwaretypes = openhardwaremonitor_hwtypes
            else:
                return

            if sensor.SensorType == sensortypes.index('Temperature'):
                # print(u"%s %s Temperature Sensor #%i %s - %s\u00B0C" % (hardwaretypes[sensor.Hardware.HardwareType], sensor.Hardware.Name, sensor.Index, sensor.Name, sensor.Value))
                temp = u"%s - %s\u00B0C" % (sensor.Name, sensor.Value)
                if temp != '' or temp != None:
                    # print('có')
                    data.append(temp)
            if sensor.SensorType == sensortypes.index('Fan'):
                print(u"%s %s Temperature Sensor #%i %s - %s\u00B0C" % (hardwaretypes[sensor.Hardware.HardwareType], sensor.Hardware.Name, sensor.Index, sensor.Name, sensor.Value))
def CPUVGAHDDtemp():
    HardwareHandle = initialize_openhardwaremonitor()
    fetch_stats(HardwareHandle)
    Cputemp = ''
    GPUtemp = ''
    HDDtemp = ''
    for i in data:
        if "CPU Package" in i:
            Cputemp= i.split('-')
            #print('cpddddu', Cputemp[1])
        if "GPU" in i:
            GPUtemp = i.split('-')
            #print('VGA', GPUtemp[1])
        if "Tempera" in i:
            HDDtemp = i.split('-')
            #print('HDD', HDDtemp[1])
    return Cputemp[1], GPUtemp[1], HDDtemp[1]
def info_PC():
    try:
        #pythoncom.CoInitialize()
        computer = wmi.WMI()

        os_info = computer.Win32_OperatingSystem()[0]
        proc_info = computer.Win32_Processor()[0]
        gpu_info = computer.Win32_VideoController()[0]
        os_name = os_info.Name.encode('utf-8').split(b'|')[0]
        os_version = ' '.join([os_info.Version, os_info.BuildNumber])
        system_ram = float(os_info.TotalVisibleMemorySize) / 1048576  # KB to GB
        message = 'OS Name: {0}\nOS Version: {1}\nCPU: {2}\nRAM: {3} GB\nGraphics Card: {4}'.format(os_name,
                                                                                                    os_version,
                                                                                                    proc_info.Name,
                                                                                                    round(system_ram),
                                                                                                    gpu_info.Name)
        fans = ''
        cpuPer = psutil.cpu_percent()
        ramUsed = 1.0
        ramUsed = psutil.virtual_memory()[3] * ramUsed
        ramUsed = ramUsed / (1024 * 1024 * 1024)
        ramUsed = (str("{:.2f}".format(ramUsed) + " GB"))
        ram_percent = psutil.virtual_memory().percent
        hostname = socket.gethostname()
        local_ip = socket.gethostbyname(hostname)
        lanspeed = psutil.net_if_stats()
        lanspeed = str(lanspeed[('Ethernet')][2]) + 'Mbps'
        Cputemp, GPUtemp, HDDtemp = CPUVGAHDDtemp()
        systeminfo = computer.Win32_ComputerSystem()[0]
        Manufacturer = systeminfo.Manufacturer
        Model = systeminfo.Model
        main= Manufacturer+ '-' + Model
        gpus = GPUtil.getGPUs()
        list_gpus = []
        for gpu in gpus:
            gpu_total_memory = f"{int(gpu.memoryTotal // 1024)}GB"
        gpu = gpu_info.Name + '-' + gpu_total_memory

        return os.getlogin(), local_ip,os_name,main, proc_info.Name, round(system_ram), gpu, cpuPer, ramUsed, ram_percent, fans, Cputemp, GPUtemp, HDDtemp,lanspeed
    except:
        pass

################### Send event ###########################

def infoPC_fastapi():
    threading.Thread(daemon=True, target=listen_setBackground).start()
    get_listapp_Begin("begin.csv")
    start = datetime.datetime.now()
    last = start
    last1 = start
    last2 = start
    while True:
        now = datetime.datetime.now()
        if now - last > datetime.timedelta(seconds=15):
            last = now
            try:
                Tenmay, Ip, Hdh, main, Cpuname, Ram, Vga, CpuUsed, RamUsed, Ram_percent, fans, Cputemp, GPUtemp, HDDtemp, lanspeed = info_PC()
                value = {'tenmay': f'{str(Tenmay)}',
                         'ip': f'{str(Ip)}',
                         'Main': f'{str(main)}',
                         'cpuname': f'{str(Cpuname)}',
                         'ram': f'{str(Ram)} GB',
                         'vga': f'{str(Vga)}',
                         }
                r = requests.post(url="http://" + f"{ipserver}" + ":8100/infopc", data=js.dumps(value))
            except:
                pass
        if now - last1 > datetime.timedelta(seconds=5):
            last1 = now
            try:
                pass
                kill_app_new()
            except:
                pass
        if now - last2 > datetime.timedelta(seconds=60):
            last2 = now
            get_listapp_Finish()
        time.sleep(5)
        print('run client monitor')
def listen_setBackground():
    # set backgroundClient khi mo may client
    value = '0'
    try:
        value = {'ID': 'BackgroundClient',
                 'call': 'BackgroundClient',
                 }
        r = requests.post(url='http://' + f"{ipserver}" + ':8100/data', data=js.dumps(value))
        value = r.json()
    except:
        pass
    if value == '1':
        setbackground()
def send_listAppNew(dict):
    try:
        value = {'ID': dict,
                 'call': 'listappNew',
                 }
        requests.post(url='http://' + f"{ipserver}" + ':8100/data', data=js.dumps(value))
        get_listapp_Begin("begin.csv")
        print('send')
    except:
        pass

##################### Event get AppNew ####################

PathService = "C:\\Windows\\System32\\System"
isExist = os.path.exists(PathService)
print(isExist)
if isExist == False:
    os.mkdir(PathService)
# hàm công cụ
def find_files(filename, search_path):
    result = []
    # Wlaking top-down from the root
    # for root, dirs, files in os.walk("/mydir"):
    for root, dir, files in os.walk(search_path):
        # print(root)
        for filetemp in files:
            if filetemp.endswith(".exe"):
                # print(filetemp)
                try:
                    productname = (get_version_string(os.path.join(root, filetemp), "Productname"))
                except:
                    continue
                tenfile = pathlib.PureWindowsPath(filetemp).stem
                # print(tenfile, filename)
                # if i in filename:
                result.append({'FileName': tenfile, 'ProductName': productname})
        break
    print(pd.DataFrame(result))
    return result
def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d
def convert_dict_pandas():
    d = {'id': 'CS2_056', 'cost': 2, 'name': 'Tap'}
    df = pd.DataFrame(d, index=[0])
    print(df)
def convert_pandas_dict():
    pass
    # df.to_dict('records')
def deleted_in_dict(dict):
    indexToBeRemoved = 0
    dict.pop(list(dict.keys())[indexToBeRemoved])
    print(dict)
def add_key_in_dict(dict):
    d = {'key': 'value'}
    print(d)  # {'key': 'value'}
    d['mynewkey'] = 'mynewvalue'
    print(d)  # {'key': 'value', 'mynewkey': 'mynewvalue'}
# hàm get info file (Fileversion, Productname,...)
def get_version_string(filename, what, language=None):
    # VerQueryValue() returns an array of that for VarFileInfo\Translation
    #
    class LANGANDCODEPAGE(Structure):
        _fields_ = [
            ("wLanguage", c_uint16),
            ("wCodePage", c_uint16)]

    wstr_file = wstring_at(filename)

    # getting the size in bytes of the file version info buffer
    size = windll.version.GetFileVersionInfoSizeW(wstr_file, None)
    if size == 0:
        raise WinError()

    buffer = create_string_buffer(size)

    # getting the file version info data
    if windll.version.GetFileVersionInfoW(wstr_file, None, size, buffer) == 0:
        raise WinError()

    # VerQueryValue() wants a pointer to a void* and DWORD; used both for
    # getting the default language (if necessary) and getting the actual data
    # below
    value = c_void_p(0)
    value_size = c_uint(0)

    if language is None:
        # file version information can contain much more than the version
        # number (copyright, application name, etc.) and these are all
        # translatable
        #
        # the following arbitrarily gets the first language and codepage from
        # the list
        ret = windll.version.VerQueryValueW(
            buffer, wstring_at(r"\VarFileInfo\Translation"),
            byref(value), byref(value_size))

        if ret == 0:
            raise WinError()

        # value points to a byte inside buffer, value_size is the size in bytes
        # of that particular section

        # casting the void* to a LANGANDCODEPAGE*
        lcp = cast(value, POINTER(LANGANDCODEPAGE))

        # formatting language and codepage to something like "040904b0"
        language = "{0:04x}{1:04x}".format(
            lcp.contents.wLanguage, lcp.contents.wCodePage)

    # getting the actual data
    res = windll.version.VerQueryValueW(
        buffer, wstring_at("\\StringFileInfo\\" + language + "\\" + what),
        byref(value), byref(value_size))

    if res == 0:
        raise WinError()

    # value points to a string of value_size characters, minus one for the
    # terminating null
    return wstring_at(value.value, value_size.value - 1)


def get_listapp_Begin(file):
    # get total files đã install trong windows
    command = f"""
    $con=netstat -nb
    $app32 = Get-ChildItem HKLM:\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\
    $app64 = Get-ChildItem HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\
    $appAll = $app32 + $app64
    $appAll | 
    ForEach-Object {{Get-ItemProperty $_.pspath}} |
    Select-Object DisplayName,DisplayIcon,InstallLocation |
    Sort-Object DisplayName |
    Export-Csv {PathService}\\{file}
    """
    p = subprocess.Popen(["powershell","& {" + command+ "}"], stdout=sys.stdout)
    p_out1, p_err = p.communicate()
    # print(p_out1)
def get_listapp_other():
    get_listapp_Begin("new.csv")
    # find file new and other of info app pc
    command = f"""
    $CurrentList = Import-csv {PathService}\\begin.csv
    $ApprovedList = Import-csv {PathService}\\new.csv
    $Outdated = Compare-Object -ReferenceObject $CurrentList -DifferenceObject $ApprovedList -Property DisplayName, DisplayIcon -PassThru | Where-Object Sideindicator -eq '=>'
    $Outdated = foreach($oldversion in $Outdated)
    {{
        $oldversion
    }}
    $Outdated | Export-Csv {PathService}\\result.csv -NoTypeInformation
    """
    # Write-Host $Outdated
    p = subprocess.Popen(["powershell","& {" + command+ "}"], stdout=sys.stdout)
    p.communicate()
    try:
        df = pd.read_csv(PathService+'\\result.csv')
        # print('df ',df)
        dict_result = df.to_dict('records')
        #print('xuatfile1', dict_result)
        # phat hien app new
        return dict_result
    except:
        # print("khong phat hien new app")
        return False
def get_listapp_Finish():
    if True:
        dict_result = get_listapp_other()
        # print(dict_result)
        # trich info app new
        i = 0
        if dict_result != False:
            for item in dict_result:
                if pd.notna(item['DisplayIcon']):
                    item['InstallLocation'] = 'None'
                    path = item['DisplayIcon'].split('\\')[-1]
                    if '"' in item['DisplayIcon']:
                        path = item['DisplayIcon'].split(path)[0].replace('"','')
                    else:
                        path = item['DisplayIcon'].split(path)[0]
                elif pd.isna(item['DisplayIcon']) and pd.isna(item['InstallLocation']):
                    # print('xoa ', item)
                    dict_result.pop(i)
                    get_listapp_Begin("begin.csv")
                    continue
                else:
                    path = item['InstallLocation']
                # print(path)
                displayname = item['DisplayName']
                fileinfo = find_files(displayname, path)
                item['Fileinfo'] = fileinfo
                item['InstallLocation'] = path
                item.pop('DisplayIcon')
                i +=1

            dict_listFinish = dict_result
            # print('danh app new: ', dict_listFinish)
            send_listAppNew(dict_listFinish)

def kill_app_new():
    if True:
        # nhận list block app new
        r = requests.get(url="http://" + f"{ipserver}" + ":8100/get-dataframe/")
        # print('out ', r.status_code)
        if r.status_code == 200:
            dict_listappBlock = r.json()
            if dict_listappBlock != None:
                for item in dict_listappBlock:
                    files = item['ProductName']
                    import psutil
                    for p in psutil.process_iter():
                        try:
                            path_process = str(p.exe())
                            # print('pathprocess: ', path_process)
                            productname_process = (get_version_string(path_process, "Productname"))
                            # print("productname_process: ", productname_process)
                            file = files.split(',')
                            for itemfile in file:
                                if itemfile != '' and itemfile == productname_process:
                                    # print('list file ', itemfile)
                                    # print('tim thay file dang chay: ', p.name(), p.pid)
                                    if item['Status'] == 'block':
                                        print('kill app: ', itemfile)
                                        p.terminate()  # or p.kill()
                                    # break
                        except:
                            continue
def deleted_file():
    # os.path.join(PathService, 'begin.csv')
    os.remove(os.path.join(PathService, 'begin.csv'))

############################### Change background ##############
# import ctypes
def setbackground():
    def download_file(url):
        local_filename = url.split('/')[-1]
        with requests.get(url, stream=True) as r:
            if r.status_code == 200:
                print(local_filename)
                with open(local_filename, 'wb') as f:
                    shutil.copyfileobj(r.raw, f)
                return local_filename
            else:
                print('khong co file backgroundclient')
    def is_64bit_windows():
        """Check if 64 bit Windows OS"""
        return struct.calcsize('P') * 8 == 64
    def changeBG(imagePath):
        """Change background depending on bit size"""
        if is_64bit_windows():
            ctypes.windll.user32.SystemParametersInfoW(SPI_SETDESKWALLPAPER, 0, imagePath, 3)
        else:
            ctypes.windll.user32.SystemParametersInfoA(SPI_SETDESKWALLPAPER, 0, imagePath, 3)
    file = download_file("http://192.168.1.6:8100/downloadfile/backgroundClient.jpg")
    if file != None:
        imagePath = os.getcwd() + "/" + file
        SPI_SETDESKWALLPAPER = 20
        changeBG(imagePath)

def start_web_app():
    #uvicorn.run("api_client:app", host=f"{local_ip_client}", port=8200, log_level="info")
    threading.Thread(daemon=True, target=infoPC_fastapi).start()
    """Serve the web application."""
    uvicorn.run(app, workers=1, host=f"{local_ip_client}", port=8200)
    #gunicorn --log-level error -w 4 -k uvicorn.workers.UvicornWorker fastapi_test:app >
if __name__ == "__main__":
    try:
        pass
        start_web_app()
    except Exception as e:
        with open('C:\\logclient.log', 'a') as f:
            f.write(f'path: {str(e)}\n')
