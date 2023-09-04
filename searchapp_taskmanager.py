import os
import sqlite3
import subprocess, sys
import array
from ctypes import *
import ctypes
import pathlib
import pandas as pd
ctypes.windll.shell32.IsUserAnAdmin()
# create file new of info app pc
import numpy as np
PathService = "C:\\Windows\\System32\\System"


# hàm công cụ
def find_files(filename, search_path):
    result = []
    # Wlaking top-down from the root
    # for root, dirs, files in os.walk("/mydir"):
    for root, dir, files in os.walk(search_path):
        a = 0
        for filetemp in files:
            if filetemp.endswith(".exe"):
                productname = (get_version_string(os.path.join(root, filetemp), "Productname"))
                a += 1
                tenfile = pathlib.PureWindowsPath(filetemp).stem
                # print(tenfile, filename)
                if productname in filename:
                    result.append({'FileName': tenfile, 'ProductName': productname})
                    break
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
    $app32 = Get-ChildItem HKLM:\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\
    $app64 = Get-ChildItem HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\
    $appAll = $app32 + $app64
    $appAll | 
    ForEach-Object {{Get-ItemProperty $_.pspath}} |
    Select-Object DisplayName,InstallLocation |
    Sort-Object DisplayName |
    Export-Csv {PathService}\\{file}
    """
    # print(command)
    p = subprocess.Popen(["powershell","& {" + command+ "}"], stdout=sys.stdout)
    p_out1, p_err = p.communicate()
    print(p_out1)
# get_listapp_Begin("begin.csv")
def get_listapp_other():
    get_listapp_Begin("new.csv")
    # find file new and other of info app pc
    command = f"""
    $CurrentList = Import-csv {PathService}\\begin.csv
    $ApprovedList = Import-csv {PathService}\\new.csv
    $Outdated = Compare-Object -ReferenceObject $CurrentList -DifferenceObject $ApprovedList -Property DisplayName, DisplayVersion -PassThru | Where-Object Sideindicator -eq '=>'
    $Outdated = foreach($oldversion in $Outdated)
    {{
        $oldversion
    }}
    $Outdated | Export-Csv {PathService}\\result.csv -NoTypeInformation
    Write-Host $Outdated"""
    p = subprocess.Popen(["powershell","& {" + command+ "}"], stdout=sys.stdout)
    p_out, p_err = p.communicate()
    df = None
    try:
        df = pd.read_csv(PathService+'\\result.csv')
        print('df ',df)
        dict_result = df.to_dict('records')
        print('xuatfile1', dict_result)
        return dict_result
    except:
        print("khong phat hien new app")
        return
def get_listapp_Finish():
    dict_result = get_listapp_other()
    print(dict_result)
    if dict_result:
        for item in dict_result:
            path = item['InstallLocation']
            displayname = item['DisplayName']
            print("path app: ", path)
            fileinfo = find_files(displayname, path)
            print('fileinfo: ', fileinfo)
            item['fileinfo'] = fileinfo
        print('app new: ',dict_result)
        dict_listFinish = dict_result
        return dict_listFinish
    else:
        return False

def kill_app():
    dict_listFinish = get_listapp_Finish()
    if dict_listFinish:
        for item in dict_listFinish:
            fileinfo = item['fileinfo']
            import psutil
            for p in psutil.process_iter():
                try:
                    path_process = str(p.exe())
                    # print('pathprocess: ', path_process)
                    productname_process = (get_version_string(path_process, "Productname"))
                    # print("productname_process: ", productname_process)
                    if fileinfo[0]['ProductName'] == productname_process:
                        print('tim thay file dang chay: ', p.name(), p.pid)
                        # p.terminate()  # or p.kill()
                        break
                except:
                    continue
kill_app()



