import asyncio
import base64
import ctypes
import glob
import logging
import os
import socket
import subprocess
import sys
import time

from shutil import rmtree

import json
# import numpy as np
import pandas as pd
import psutil
# import streamlit.cli as stcli
import datetime
from datetime import timedelta
# Path maker
# import stcli as stcli
from fastapi.middleware.cors import CORSMiddleware
# from starlette.websockets import WebSocket

if getattr(sys, 'frozen', False) and hasattr(sys, '_MEIPASS'):
    path = sys._MEIPASS + '/'

else:
    path = ''
PathService = "C:\\Windows\\System32\\System"
Pass_sqlite = 'khaicafe'
#-------------------------------------------- fastapi ---------------------------------------------#
import sqlite3
import threading
import uvicorn
from pydantic import BaseModel
from fastapi.responses import HTMLResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi import FastAPI, Request, Form, requests, UploadFile
from fastapi.templating import Jinja2Templates
from starlette.testclient import TestClient
from sse_starlette.sse import EventSourceResponse


counter_lock = asyncio.Lock()
counter = 0

from pathlib import Path
# uvicorn_error = logging.getLogger("uvicorn.error")
# uvicorn_error.disabled = True
uvicorn_access = logging.getLogger("uvicorn.access")
uvicorn_access.disabled = True

def deleteOldPyinstallerFolders(time_threshold = 50): # Default setting: Remove after 1 hour, time_threshold in seconds
    try:
        base_path = sys._MEIPASS
    except Exception:
        return  # Not being ran as OneFile Folder -> Return

    temp_path = os.path.abspath(os.path.join(base_path, '..')) # Go to parent folder of MEIPASS

    # Search all MEIPASS folders...
    mei_folders = glob.glob(os.path.join(temp_path, '_MEI*'))
    for item in mei_folders:
        if (time.time()-os.path.getctime(item)) > time_threshold:
            rmtree(item)

    temp_path = os.path.abspath(os.path.join(temp_path, '..'))
    print("cach1",temp_path)
    temp_path = os.path.abspath(os.path.join(temp_path, os.pardir))
    print(temp_path)
    tmp_folders = glob.glob(os.path.join(temp_path, 'tmp*'))
    for item in tmp_folders:
        if (time.time()-os.path.getctime(item)) > time_threshold:
            rmtree(item)
try:
    deleteOldPyinstallerFolders()
except:
    pass
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
    cur.execute(f"PRAGMA foreign_keys = ON")
    cur.execute(f"PRAGMA journal_mode=WAL")
    cur.execute(f"PRAGMA synchronous=normal")
    cur.execute(f"PRAGMA temp_store=memory")
    cur.execute(f"PRAGMA mmap_size=30000000000")
    cur.execute(f"PRAGMA optimize")
    cur.execute(f"PRAGMA temp_store = 2")
    # if choice == None:
    #     return cur,con
    if 'SELECT' in query:
        # query = (f"SELECT * FROM {table};")
        if args != None:
            cur.execute(query, args)
        else:
            cur.execute(query)
        getdata = cur.fetchall()
        # print(getdata)
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
    # con.close()
    return cur

class Sqlite(object):
    def __init__(self, database, args=None, query=None):
        Pass_sqlite = 'khaicafe'
        self.con = sqlite3.connect(database, check_same_thread=False)  # (":memory:")
        # con.text_factory = lambda b: b.decode(errors='ignore')
        self.con.row_factory = dict_factory
        self.cur = self.con.cursor()
        self.cur.execute(f"PRAGMA key={Pass_sqlite}")
        self.cur.execute(f"PRAGMA foreign_keys = ON")
        self.cur.execute(f"PRAGMA journal_mode=WAL")
        self.cur.execute(f"PRAGMA synchronous=normal")
        self.cur.execute(f"PRAGMA temp_store=memory")
        self.cur.execute(f"PRAGMA mmap_size=30000000000")
        self.cur.execute(f"PRAGMA optimize")
        self.cur.execute(f"PRAGMA temp_store = 2")

    def get_curSQL(self, database, args=None, query=None):
        if 'SELECT' in query:
            # query = (f"SELECT * FROM {table};")
            if args != None:
                self.cur.execute(query, args)
            else:
                self.cur.execute(query)
            getdata = self.cur.fetchall()
            return getdata
        elif 'UPDATE' in query:
            # arg = (1,)
            # query = f'''UPDATE {table} SET Crop_photo=?;'''
            if args != None:
                self.cur.execute(query, args)
            else:
                self.cur.execute(query)
        elif 'INSERT' in query:
            # args = (id, self.imagedata, Groupgame, tengame, theloai, pathgame, Argument, pathimage, 0)
            # query = f'INSERT INTO {table} VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?);'
            if args != None:
                self.cur.execute(query, args)
            else:
                self.cur.execute(query)
        elif 'DELETE' in query:
            # query = (f"DELETE FROM listClient Where IP='{idgame}';")
            if args != None:
                self.cur.execute(query, args)
            else:
                self.cur.execute(query)
        self.con.commit()
# import classsend
classsend = Sqlite(database='manager-order.db')
con = sqlite3.connect('datagame.db',check_same_thread=False)  # (":memory:")
#con.text_factory = lambda b: b.decode(errors = 'ignore')
con.row_factory = dict_factory
cur = con.cursor()
cur.execute(f"PRAGMA key={Pass_sqlite}")
cur.execute(f"PRAGMA foreign_keys = ON")
cur.execute(f"PRAGMA journal_mode=WAL")
cur.execute(f"PRAGMA synchronous=normal")
cur.execute(f"PRAGMA temp_store=memory")
cur.execute(f"PRAGMA mmap_size=30000000000")
cur.execute(f"PRAGMA optimize")
cur.execute(f"PRAGMA temp_store = 2")

hostname = socket.gethostname()
local_ip = socket.gethostbyname(hostname)
app_api = FastAPI()

templates = Jinja2Templates(directory="./templates/")
templates.env.autoescape = False


app_api.mount(
    "/static",
    StaticFiles(directory="./static"),#Path(__file__).parent.parent.absolute() / "static"),
    name="static",
)
app_api.mount(
    "/templates",
    StaticFiles(directory="./templates"),#Path(__file__).parent.parent.absolute() / "static"),
    name="templates",
)
app_api.mount(
    "/assets",
    StaticFiles(directory="./templates/assets"),#Path(__file__).parent.parent.absolute() / "static"),
    name="assets",
)
app_api.mount(
    "/images",
    StaticFiles(directory="./templates/images"),#Path(__file__).parent.parent.absolute() / "static"),
    name="image",
)
app_api.mount(
    "/images_order",
    StaticFiles(directory="./templates/images_order"),#Path(__file__).parent.parent.absolute() / "static"),
    name="images_order",
)
# origins = ['*'] #### "NetworkError when attempting to fetch
# app_api.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=['*'],
#     allow_headers=['*'],
# )

# add CORS so our web page can connect to our api
app_api.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Item(BaseModel):
    ID: object
    call: str
    #print(name, price)
    # is_offer: Optional[bool] = None
class listAppNew(BaseModel):
    DisplayName: str
    InstallLocation: str
    SideIndicator: str
    fileinfo: list
class infopc(BaseModel):
    tenmay: str
    ip: str
    Main: str
    cpuname: str
    ram: str
    vga: str
class Page(BaseModel):
    call: str

def Writing_df_to_sqlite(df,database, table):
    try:
        con = sqlite3.connect(database)
        cur = con.cursor()
        cur.execute(f"PRAGMA key={Pass_sqlite}")
        df.to_sql(table, con, if_exists='replace', index=False)  # writes to file
        con.close()  # good practice: close connection
    except:
        pass
def Reading_sqlite_to_df(database, table):
    try:
        con = sqlite3.connect(database)
        cur = con.cursor()
        cur.execute(f"PRAGMA key={Pass_sqlite}")
        df = pd.read_sql('select * from {}'.format(table), con)
        con.close()
        return df
    except:
        pass
def print_table(table):
    columns = table[0].keys()
    df = pd.DataFrame(table, columns=columns)
    print(df)

# event send body html and json
@app_api.post("/data")
async def submit(item: Item, request: Request):
    print(item)
    if item.call == "luotplay":
        with con:
            cur.execute(
                f"SELECT * FROM Listgame Where ID='{str(item.ID)}'")
            getdata = cur.fetchall()
        try:
            luotplay = int(getdata[0].get('Luotplay')) + 1
            cur.execute(f"UPDATE Listgame SET Luotplay={luotplay} WHERE ID='{str(item.ID)}'")
            con.commit()
            return {'oki': f"{item}"}  # send value client
        except:
            pass
    elif item.call == "listgame":
        print(item.ID)
        with con:
            cur.execute(
                f"SELECT * FROM Listgame Where ID='{str(item.ID)}'")
            getdata = cur.fetchall()
        try:
            print(getdata[0].get('Pathgame'))
            return {'pathgame': f"{getdata[0].get('Pathgame')}"}  # send value client
        except:
            pass
    elif item.call == 'hidensoft':
        cona = sqlite3.connect('clientdata.db')
        cona.row_factory = dict_factory
        cura = cona.cursor()
        cura.execute(f"PRAGMA key={Pass_sqlite}")
        cura.execute(
            "SELECT * FROM minimizesoft")
        getsoft = cura.fetchall()

        try:
            getsofttemp = []
            for i in range(len(getsoft)):
                getsofttemp.append(getsoft[i]['AppDesktop'])
            print(getsofttemp)
            return getsofttemp#{'danhsach': f"{getsofttemp}"}  # send value client
        except:
            pass
        pass
    elif item.call == 'BackgroundClient':
        with con:
            cur.execute(
                "SELECT * FROM Design")
            getdesign = cur.fetchall()
            value = getdesign[0]['BackgroundClient']
            print('callbackgroundClient', value)
            return value
        pass
    elif item.call == 'listappNew':
        # print('nhan tu client',item.ID)
        values = item.ID
        print('client send: ',len(values), values)

        IPclient = request.client.host
        cona = sqlite3.connect('clientdata.db')
        cura = cona.cursor()
        cura.execute(f"PRAGMA key={Pass_sqlite}")
        cura.execute(
            f"SELECT * FROM listClient Where IP='{IPclient}'")
        getIP = cura.fetchall()
        # print("serversend   ", getIP[0][0])
        search = 0
        new_df = Reading_sqlite_to_df('clientdata.db', 'AppNew')
        print('lay lai giatri: ', new_df)
        for value in values:
            # print(value)
            value = {'IP': str(IPclient), **value}
            value = {'PC': str(getIP[0][0]), **value}

            # value['PC'] = str(getIP[0][0])
            # value['IP'] = str(IPclient)

            value['ProductName'] = ''
            try:
                for item in value['Fileinfo']:
                    value['ProductName'] = value['ProductName'] + ',' + (item['ProductName'])
            except:
                continue

            value['Status'] = 'None'

            dflistappNew = pd.DataFrame([value])
            dflistappNew = dflistappNew.drop(['Fileinfo', 'SideIndicator'], axis=1)

            search = new_df.loc[new_df['DisplayName'] == value['DisplayName']]
            print('tim thay ',search)
            # df_diff = pd.concat([dflistappNew,dfgoc]).drop_duplicates(keep=False)
            if len(search) > 0:
                print('khong co appNew')
                pass
            else:
                new_df = new_df.append(dflistappNew, ignore_index=True)
                new_df_result = new_df.to_dict('records')
                app_api.state.new_df = new_df_result
            continue
        # listappBlock = block_listappNew()
        # print('listblock: ',listappBlock)
        # return listappBlock
    elif item.call == 'SendNamePC':
        if True:
            IPclient = request.client.host
            cona = sqlite3.connect('clientdata.db')
            cura = cona.cursor()
            cura.execute(f"PRAGMA key={Pass_sqlite}")
            cura.execute(
                f"SELECT * FROM listClient Where IP='{IPclient}'")
            getIP = cura.fetchall()
            print("serversend   ", getIP[0][0])
            return str(getIP[0][0])#{'danhsach': f"{getsofttemp}"}  # send value client
        # except:
        #     pass
    elif item.call == 'SendName':
        # print('vao', item.ID)
        result = item.ID
        siderbar = f"""
                       <table cellspacing="0" cellpadding="0" border="0" >
                            <tr>
                            <td>
                               <div style="width:100%; height:230px;">
                                 <table cellspacing="0" cellpadding="0" border="0" width=100% >
                                   <tr>
                                     <td>new item</td>
                                     <td>new item</td>
                                   </tr>
                                 </table>  
                               </div>
                            </td>
                          </tr>
                            
                            <tr>
                                <td>
                                    <div class="menuitem" style="width:100%;height:calc(100vh - 300px);overflow:auto;">
                                       <table cellspacing="0" cellpadding="0" border="0" width=100%  >
                                         <tr style="background-color:transparent;">
                                            <td>{setpage(result, request)}</td>
                                         </tr>
                                       </table>
                                    </div>
                                </td>
                            </tr>
                       </table>
               """
        return siderbar
@app_api.post("/infopc")
async def info_pc(item: infopc):
    #print(item)#nhận value client
    conclient = sqlite3.connect('clientdata.db')  # (":memory:")
    # con.text_factory = lambda b: b.decode(errors = 'ignore')
    conclient.row_factory = dict_factory
    cur = conclient.cursor()
    cur.execute(f"PRAGMA key={Pass_sqlite}")
    if True:
        try:
            with conclient:
                cur.execute(
                        "SELECT * FROM listClient ")
                getdata = cur.fetchall()
            ip = ''
            for i in range(len(getdata)):
                if item.ip == getdata[i].get('IP'):
                    ip ='co ip'
                    # print(ip, item.ip, len(getdata))
                    break
            if len(getdata) == 0 or ip =='':
                args = (item.tenmay, item.ip,item.Main, item.cpuname, item.ram, item.vga,'')
                query = 'INSERT INTO listClient VALUES(?, ?, ?, ?, ?, ?, ?)'
                with conclient:
                    cur.execute(query, args)
                    conclient.commit()
                # print('INSERT', item)
        except:
            # print('lỗi không ghi dc data client infopc')
            pass
# from fastapi.responses import ORJSONResponse
@app_api.get("/checknamepc")
async def read_root(request: Request):
    client_host = request.client.host
    return client_host
# event download
@app_api.get('/downloadfile/{file_name}', tags=['getSkynetDL'])
async def get_the_file(file_name: str):
    # print('aaaaaaaaa')
    # the_file object is raw bytes
    file_name = f"static\\hinhnen\\{file_name}"
    # DEPENDS ON WHERE YOUR FILE LOCATES
    file_path = os.getcwd() + "/" + file_name
    return FileResponse(path=file_path, media_type='application/octet-stream', filename=file_name)



from fastapi import File, UploadFile
import shutil
@app_api.post("/upload")
def upload(file: UploadFile = File(...)):
    try:
        with open(f"E:\\test\\giainen\\server\\{file.filename}", 'wb') as f:
            shutil.copyfileobj(file.file, f)
    except Exception:
        return {"message": "There was an error uploading the file"}
    finally:
        file.file.close()
    return {"message": f"Successfully uploaded {file.filename}"}

@app_api.get('/download/{file_name}', tags=['getSkynetDL'])
async def get_the_file(file_name: str):
    # print('aaaaaaaaa')
    # the_file object is raw bytes
    file_pathname = f"E:\\test\\giainen\\server\\{file_name}"
    # DEPENDS ON WHERE YOUR FILE LOCATES
    # file_path = os.getcwd() + "/" + file_name
    file_path = file_pathname
    return FileResponse(path=file_path, media_type='application/octet-stream', filename=file_name)




def openfilea(file):
    with open(file, 'rb') as f:
        data = f.read()
    # return data
    return base64.b64encode(data).decode()

#------------------------------- phần chính ------------------------------------#
@app_api.get("/{num}", response_class=HTMLResponse)
async def form_begin(request: Request, num: str):
    result = str(num)
    # print(result)
    if result =='login-order':
        pass
        # return FileResponse('login-order.html')
        return templates.TemplateResponse("login-order.html", {"request": request, "id": id})
    elif result == 'manager-order':
        pass
        return templates.TemplateResponse("manager-order.html", {"request": request, "id": id})
    elif result == 'menu-game':
        pass
        print('menu game')
        return templates.TemplateResponse("menu-game.html", {"request": request, "id": id})
    elif result=='menu-old':
        getdesign = classsend.getdesing()
        LOGO_IMAGE = base64.b64encode(getdesign[0].get('Banner')).decode()
        LOGO_KL = openfilea('logo.png')
        contenchinh = f"""<div class="header-logo">
                                    <img class='hinh  body-pd' src="data:image/png;base64,{LOGO_IMAGE}" id="banner"></img>
                                    <h2 class='neon' id='test'  ></h2>
                        </div>"""
        siderbar = f""" <div class="l-navbar expander" id="navbar">
                <nav class="nav">
                    <img class='hinh-kl1' src="data:image/png;base64,{LOGO_KL}"></img>
                    <div>
                        <div class="nav__brand">
                            <ion-icon name="menu-outline" class="nav__toggle" id="nav-toggle"></ion-icon>
                            <a href="#" class="nav__logo">{getdesign[0].get('tenphongmay')}</a>
                        </div>

                        <div class="nav__list">
                            <a href="#" class="nav__link" onclick=sumitt('order')>
                                <ion-icon name="fast-food-outline" class="nav__icon"></ion-icon>
                                <span class="nav__name">MENU DỊCH VỤ</span>
                            </a>

                            <div class="nav__link collapse">
                                <ion-icon name="game-controller-outline" class="nav__icon"></ion-icon>
                                <span class="nav__name">MENU GAME</span>
                                <ion-icon name="chevron-down-outline" class="collapse__link"></ion-icon>
                                <ul class="collapse__menu">
                                    <a href="#" class="collapse__sublink" onclick=sumitt('gameall')>.ALL_GAMES</a>
                                    <a href="#" class="collapse__sublink" onclick=sumitt('gameonline')>.GAMES_ONLINE</a>
                                    <a href="#" class="collapse__sublink" onclick=sumitt('gameoffline')>.GAMES_OFFLINE</a>
                                </ul>
                            </div>

                            <div class="nav__link collapse">
                                <ion-icon name="folder-outline" class="nav__icon"></ion-icon>
                                <span class="nav__name">TOOLS & OFFICE</span>
                                <ion-icon name="chevron-down-outline" class="collapse__link"></ion-icon>
                                <ul class="collapse__menu">
                                    <a href="#" class="collapse__sublink">.TOOLS_GAME</a>
                                    <a href="#" class="collapse__sublink">.OFFICE</a>
                                    <a href="#" class="collapse__sublink" onclick=sumitt('changeline')>.CHANGE_LINE_INTERNET</a>
                                </ul>
                            </div>

                            <a href="#" class="nav__link">
                                <ion-icon name="chatbubbles-outline" class="nav__icon"></ion-icon>
                                <span class="nav__name">GÓP Ý & YÊU CẦU</span>
                            </a>
                        </div>
                    </div>
                    <div class="ADSdensang" id="densang"><span class='densang'>{getdesign[0].get('ADS')}</span></div>
                    <div class="contentdensang" id="densang"><span class='densang'>{getdesign[0].get('Contains')}</span></div>
                    <div><br></div><div class='slider' id="slider"></div>
                    <div><h6></h6></div>
                    <form method="post" style="text-align: center; padding: 8px;font-size: 10px; border-radius: 5px;" id="searchgame">
                        <input type="Text" name="num" value="Search Games" style="border-radius: 5px;" id="searchtext"/>
                    </form>
                    <div class="version"><h>KLteam2022 Version 1.0</h></div>
                </nav>
        </div>
        <div class="main body-pd" id="containmenu">
             {contenchinh}
            <div id="noidung">
            </div>
        </div>
        <div  class="containerpopup">
            <div class="popup" id="popup" tabindex="-1" role="dialog" aria-hidden="true" data-bs-keyboard="false" data-bs-backdrop="static">
                <img src="static/image/tick.png">
                <h2>Thank You!</h2>
                <p>Your details has been successfully submitted. Thanks!</p>
                <button type="button" onclick="closePopup()">OK</button>
            </div>
        </div>


    """

        result = siderbar
        return templates.TemplateResponse('form.html', context={'request': request, 'result': result})

# --------------------------------- jwt ---------------------------------------#
from fastapi import FastAPI, HTTPException, Depends, Request, Response, WebSocket, Query, WebSocketDisconnect,Body
from fastapi.responses import JSONResponse, PlainTextResponse
from fastapi_jwt_auth import AuthJWT
from fastapi_jwt_auth.exceptions import AuthJWTException, InvalidHeaderError
from pydantic import BaseModel
from typing import Any, Dict, AnyStr, List, Union


class User(BaseModel):
    username: str
    password: str
class Cashier(BaseModel):
    id: str
    date: str
    custom: str
    mathang: str
    action: str

    nv_order: str
class Order(BaseModel):
    date: str
    custom: str
    mathang: str
    sl: str
    ghichu: str
    action: str
    nv_order: str
class Settings(BaseModel):
    authjwt_secret_key: str = "secret"
    # Configure algorithms which is permit
    authjwt_decode_algorithms: set = {"HS384","HS512"}
    # Configure application to store and get JWT from cookies
    authjwt_token_location: set = {"cookies"}
    # Only allow JWT cookies to be sent over https
    authjwt_cookie_secure: bool = True
    # Enable csrf double submit protection. default is True
    authjwt_cookie_csrf_protect: bool = False
    # Change to 'lax' in production to make your website more secure from CSRF Attacks, default is None
    authjwt_cookie_samesite: str = 'lax'
    # set denylist enabled to True
    # you can set to check access or refresh token or even both of them
    authjwt_denylist_enabled: bool = True
    authjwt_denylist_token_checks: set = {"access","refresh"}
    # access_expires: int = timedelta(minutes=15)
    # refresh_expires: int = timedelta(days=30)
class Nguyenlieu(BaseModel):
    id: str
    name: str
    mota: str
    donvi: str
    sl: str
    action: str
class Danhmuc(BaseModel):
    id: str
    name: str
    color: str
    mota: str
    DMcha: str
    DTkhac: str
    showDM: str
    mobanDM: str
    action: str
class Mathang(BaseModel):
    stt: str
#-------- action get data ---------#
class Action(BaseModel):
    action: str




# A storage engine to save revoked tokens. in production,
# you can use Redis for storage system
denylist = set()
blacklist = []
# For this example, we are just checking if the tokens jti
# (unique identifier) is in the denylist set. This could
# be made more complex, for example storing the token in Redis
# with the value true if revoked and false if not revoked
@AuthJWT.token_in_denylist_loader
def check_if_token_in_denylist(decrypted_token):
    jti = decrypted_token['jti']
    return jti in denylist


@AuthJWT.load_config
def get_config():
    return Settings()

@app_api.exception_handler(AuthJWTException)
def authjwt_exception_handler(request: Request, exc: AuthJWTException):
    print("check", request.client.host,exc.message, exc.status_code)

    return JSONResponse(status_code=exc.status_code, content={"detail": exc.message})
    # return PlainTextResponse(str(exc), status_code=400)

@app_api.post('/user')
async def create_ca(request: Request, Authorize: AuthJWT = Depends()):
    create = await request.json()
    print(create)
    if create['action'] == 'new_user':
        query = "INSERT INTO account(date_create, name, pass, photo) VALUES(?, ?, ?, ?)"
        args = (create['date_create'], create['name'], create['pass'], create['photo'])
        cur = get_curSQL('account.db', query=query, args=args)
        task_id = cur.lastrowid
        # print(task_id)
        return {'username': create['name']}
    elif create['action'] == 'get_user':
        query = f"SELECT * FROM 'account';"
        result_data = get_curSQL('account.db', query=query)
        return  result_data

@app_api.post('/login')
def login(user: User, response: Response, Authorize: AuthJWT = Depends()):
    query = f"SELECT * FROM account WHERE name='{user.username}' AND pass='{user.password}';"
    # classsend = Sqlite(database='account.db')
    result_data = get_curSQL('account.db', query=query)
    list_connect = manager.showlist_connect()
    print(list_connect)

    for users in list_connect:
        if users == user.username:
            print('đa dang nhap')
            # jti = Authorize.get_raw_jwt(token)['jti']
            # denylist.add(jti)
            # print('denylist', denylist)
            global blacklist
            blacklist.append(users)
            raise HTTPException(status_code=401,detail="User da dang nhap")

    if len(result_data) < 1:
        raise HTTPException(status_code=401,detail="Bad username or password")


    expires = timedelta(seconds=60*60)

    # You can define different algorithm when create a token
    access_token = Authorize.create_access_token(subject=user.username,algorithm="HS384", expires_time=expires)
    refresh_token = Authorize.create_refresh_token(subject=user.username,algorithm="HS512")
    # Authorize.set_access_cookies(access_token)
    # Authorize.set_refresh_cookies(refresh_token)


    response.set_cookie(key='refresh_token_cookie', value=refresh_token, max_age=60*60*24, expires=60*60*24)
    response.set_cookie(key='access_token_cookie', value=access_token, max_age=60*60*24, expires=60*60*24)
    # return {"username": len(result_data), "id_Ca": }
    return result_data

@app_api.post('/create_ca')
async def create_ca(request: Request, Authorize: AuthJWT = Depends()):
    create = await request.json()
    print(create)
    query = "INSERT INTO Ca_Staff(date_begin, name) VALUES(?, ?)"
    args = (create['date_begin'], create['name'])
    cur = get_curSQL('manager-order.db', query=query, args=args)
    task_id = cur.lastrowid
    print(task_id)
    return {'username': create['name'], 'id_ca': task_id}

# In protected route, automatically check incoming JWT
# have algorithm in your `authjwt_decode_algorithms` or not
@app_api.post('/refresh')
def refresh(response: Response, Authorize: AuthJWT = Depends()):
    Authorize.jwt_refresh_token_required()

    expires = timedelta(seconds=60*60)
    current_user = Authorize.get_jwt_subject()
    global blacklist
    for users in blacklist:
        if users == current_user:
            print('black list', blacklist)
            blacklist.remove(current_user)
            Authorize.unset_jwt_cookies()
            return {"msg":"Successfully logout"}
            # raise HTTPException(status_code=401, detail="User đang đăng nhap")

    new_access_token = Authorize.create_access_token(subject=current_user,algorithm="HS384", expires_time=expires)
    new_refresh_token = Authorize.create_refresh_token(subject=current_user, algorithm="HS512")
    # Set the JWT and CSRF double submit cookies in the response
    # Authorize.set_access_cookies(new_access_token)
    # Authorize.set_refresh_cookies(new_refresh_token)

    response.set_cookie(key='refresh_token_cookie', value=new_refresh_token, max_age=60 * 60 * 24, expires=60 * 60 * 24)
    response.set_cookie(key='access_token_cookie', value=new_access_token, max_age=60*60*24, expires=60*60*24)
    # print('refresh token')



    return {"msg":"The token has been refresh", "token": new_access_token}

@app_api.delete('/logout')
def logout(Authorize: AuthJWT = Depends()):
    """
    Because the JWT are stored in an httponly cookie now, we cannot
    log the user out by simply deleting the cookie in the frontend.
    We need the backend to send us a response to delete the cookies.
    """
    Authorize.jwt_required()

    Authorize.unset_jwt_cookies()
    return {"msg":"Successfully logout"}

@app_api.get('/protected')
def protected(Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()
    current_user = Authorize.get_jwt_subject()
    return {"user": current_user}


# ---------------------------------------------------- manager-order --------------------------------------------------#
''''''
# yyyy-MM-dd HH:mm:ss định dạng date trong sqlite
# query = f"""SELECT * FROM Listorder ORDER BY datetime(Date) DESC;"""
# truy vấn bảng con có luôn thông tin từ bảng cha
# query = f"""SELECT * FROM nhomMH JOIN nhom ON nhomMH.id_nhom = nhom.id_nhom;"""
# === truy van phân cấp (1 cấp) ==== #
# query = f"""SELECT child.id AS child_id,
#      child.name AS child_first_name,
#      parent.name AS parent_first_name,
#      parent.id AS parent_id
# FROM DanhMuc child
# JOIN DanhMuc parent
#   ON child.parent_id = parent.id
# WHERE child.id = '4';"""
# # === truy van phân cấp (multi cấp) ==== #
query=f"""WITH RECURSIVE tree_view AS (
    SELECT id,
         parent_id,
         name,
         0 AS level,
         CAST(name AS TEXT) AS order_sequence
    FROM Danhmuc
    WHERE parent_id IS NULL

UNION ALL

    SELECT
		 parent.id,
         parent.parent_id,
         parent.name,
         level + 1 AS level,
         CAST(order_sequence || '_' || CAST(parent.name AS TEXT ) AS TEXT) AS order_sequence
    FROM Danhmuc parent
    JOIN tree_view tv
      ON parent.parent_id = tv.id
)

SELECT
   *
FROM tree_view
ORDER BY order_sequence;"""
# query = f"""SELECT NhomMH.id_nhomMH, MatHang.id
#                                                       FROM NhomMH
#                                                       inner join MatHang on MatHang.id = NhomMH.id_MH
#                                                       inner join KhuyenmaiMH on NhomMH.id_nhom = KhuyenmaiMH.id_nhom
#                                                       WHERE MatHang.id = '76'"""
# sub_data = classsend.get_curSQL('manager-order.db', query=query)
# print(sub_data)
''''''
# --------------- Tồng bill -------#
query=f"""SELECT Id, Name, Total FROM Listorder, (select Date, max(Id) as transaction_id, SUM(ThanhToan)AS Total
                     from Listorder WHERE Huy_Don='0'
                     group by Date) max_date
                  where Listorder.Date=max_date.Date
                  and Listorder.Id=max_date.transaction_id
				  and Listorder.Id = '220';"""
# query = f"""SELECT a.*, (SELECT color FROM DanhMuc WHERE DanhMuc.name = a.Danhmuc) AS color FROM Listorder a ORDER BY datetime(Date) DESC;"""
# max_row = get_curSQL('manager-order.db', query=query)
# df = pd.DataFrame(max_row)
# print(df)
# print(max_row)
#----------- Action get data all ------------#
@app_api.post('/all-order')
async def get_allorder(request: Request, Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()
    current_user = Authorize.get_jwt_subject()
    # classsend = Sqlite(database='manager-order.db')
    action = await request.json()

    if action['action'] == 'list-order':
        query = f"""SELECT COUNT(*) as TotalRow
                          FROM Listorder;
                          """
        max_row = get_curSQL('manager-order.db', query=query)
        # query = f"SELECT a.*, (SELECT color FROM DanhMuc WHERE DanhMuc.name = a.Danhmuc) AS color FROM Listorder a ORDER BY 'Date' DESC;"
        # phân trang trong table dùng query
        # query = f"SELECT a.*, (SELECT color FROM DanhMuc WHERE DanhMuc.name = a.Danhmuc) AS color FROM Listorder a where rowid in (select rowid from Listorder ORDER BY 'Date' DESC limit {action['pagesize']} OFFSET {action['page']*action['pagesize']});"
        # cách này lấy từ cuối danh sách
        # query = f"SELECT a.*, (SELECT color FROM DanhMuc WHERE DanhMuc.name = a.Danhmuc) AS color FROM Listorder a where rowid in (select rowid from Listorder ORDER BY datetime(Date) DESC limit {action['pagesize']} OFFSET {max_row[0]['TotalRow']-action['pagesize']-(action['page']*action['pagesize'])});"
        # cách này lấy từ đầu danh sách
        # query = f"SELECT a.*, (SELECT color FROM DanhMuc WHERE DanhMuc.name = a.Danhmuc) AS color, (SELECT SUM(ThanhToan)AS Total FROM Listorder WHERE Huy_Don='0' AND Date=a.Date GROUP BY Date) AS Total_Bill FROM Listorder a ORDER BY datetime(Date) DESC limit {action['pagesize']} OFFSET {action['page']*action['pagesize']};"""
        #
        query = f"""SELECT a.*, (SELECT color FROM DanhMuc WHERE DanhMuc.id = a.id_DM) AS color, (SELECT SUM(ThanhToan)AS Total FROM Listorder WHERE Huy_Don='0' AND date_new=a.date_new GROUP BY date_new) AS Total_Bill FROM Listorder a ORDER BY datetime(date_new) DESC limit {action['pagesize']} OFFSET {action['page']*action['pagesize']};"""
        result_data = classsend.get_curSQL('manager-order.db', query=query)

        for i in range(len(result_data)):
            query = f"""SELECT Topping.NameTopping, Topping.SL, MatHang.price Topping_DG, MatHang.id
                                                       FROM ListorderTopping Topping
                                                       inner join MatHang on MatHang.name = Topping.NameTopping
                                                       WHERE Topping.id_list_order = '{result_data[i]['Id']}'"""
            sub_data = classsend.get_curSQL('manager-order.db', query=query)
            result_data[i]['Topping'] = sub_data


        # query = f"""SELECT Id, date_new, Name, SUM(ThanhToan)AS Total FROM Listorder WHERE Huy_Don='0' GROUP BY date_new AND Id='220';"""
        # Total_TT_MatHang = classsend.get_curSQL('manager-order.db', query=query)
        # # print(Total_TT_MatHang)

        return {'listtable': result_data, 'TotalRow':max_row[0]['TotalRow']}

    elif action['action'] == 'getMH':
        # print(action)
        query = f"SELECT * FROM 'MatHang';"
        result_data = get_curSQL('manager-order.db', query=query)
        for i in range(len(result_data)):
            query = f"""SELECT a.nameNL, a.Soluong
                        FROM NguyenLieuMH a
                        WHERE a.MatHang_ID = '{result_data[i]['id']}'"""
            sub_data = get_curSQL('manager-order.db', query=query)

            # print(sub_data, result_data[i]['id'], len(result_data), i)
            result_data[i]['NguyenLieu'] = sub_data

        for i in range(len(result_data)):
            # query = f"""SELECT a.nameTopping, a.Topping_SL, a.Topping_DG
            #                    FROM ToppingMH a
            #                    WHERE a.MatHang_ID = '{result_data[i]['id']}'"""
            query = f"""SELECT a.nameTopping, a.Topping_SL, (SELECT price FROM MatHang 
                                                                 WHERE MatHang.name = a.nameTopping
                                                               ) AS Topping_DG
                                           FROM ToppingMH a
                                           WHERE a.MatHang_ID = '{result_data[i]['id']}'"""

            sub_data = get_curSQL('manager-order.db', query=query)
            result_data[i]['Topping'] = sub_data
        # print(result_data, 'xong')
        return result_data
    elif action['action'] == 'getNV':
        # print(action)
        query = f"SELECT UserName FROM 'Account' WHERE Role='NV';"
        result_data = get_curSQL('datagame.db', query=query)
        return result_data
    elif action['action'] == 'getNL':
        # print(action)
        query = f"SELECT * FROM;"
        result_data = classsend.get_curSQL('manager-order.db', query=query)
        return result_data
    elif action['action'] == 'getLog_action':
        # print(action)
        query = f"SELECT * FROM Log_action;"
        result_data = classsend.get_curSQL('manager-order.db', query=query)
        return result_data
# ------------------------------- cashier ------------------------------------#
@app_api.post('/cashier')
async def post_cashier(request: Request, Authorize: AuthJWT = Depends()):#cashier: Cashier,
    Authorize.jwt_required()
    current_user = Authorize.get_jwt_subject()
    cashier = await request.json()
    token = request.cookies['refresh_token_cookie']
    classsend = Sqlite(database='manager-order.db')
    # print('token: ', cashier)
    # current_user = Authorize.get_jwt_subject()

    if (cashier['action']=='IN'):
        query = f'''UPDATE Listorder SET Print='{cashier['thaotac']}' WHERE Id='{cashier['id']}';'''
        classsend.get_curSQL('manager-order.db', query=query)
        await manager.broadcast(cashier, token, current_user)
        return {"msg":"Successfully Print"}
    elif cashier['action'] == 'Search_Trangthai':
        query = f"""SELECT COUNT(*) as TotalRow
                                 FROM Listorder
                                 WHERE Action='{cashier['Thaotac']}';
                                 """
        max_row = get_curSQL('manager-order.db', query=query)
        # query = f"SELECT a.*, (SELECT color FROM DanhMuc WHERE DanhMuc.name = a.Danhmuc) AS color FROM Listorder a ORDER BY 'Date' DESC;"
        # phân trang trong table dùng query
        # query = f"SELECT a.*, (SELECT color FROM DanhMuc WHERE DanhMuc.name = a.Danhmuc) AS color FROM Listorder a where rowid in (select rowid from Listorder ORDER BY 'Date' DESC limit {action['pagesize']} OFFSET {action['page']*action['pagesize']});"
        # cách này lấy từ cuối danh sách
        # query = f"SELECT a.*, (SELECT color FROM DanhMuc WHERE DanhMuc.name = a.Danhmuc) AS color FROM Listorder a where rowid in (select rowid from Listorder ORDER BY datetime(Date) DESC limit {action['pagesize']} OFFSET {max_row[0]['TotalRow']-action['pagesize']-(action['page']*action['pagesize'])});"
        # cách này lấy từ đầu danh sách
        # query = f"SELECT a.*, (SELECT color FROM DanhMuc WHERE DanhMuc.name = a.Danhmuc) AS color, (SELECT SUM(ThanhToan)AS Total FROM Listorder WHERE Huy_Don='0' AND Date=a.Date GROUP BY Date) AS Total_Bill FROM Listorder a ORDER BY datetime(Date) DESC limit {action['pagesize']} OFFSET {action['page']*action['pagesize']};"""
        #
        query = f"""SELECT a.*, (SELECT color FROM DanhMuc WHERE DanhMuc.id = a.id_DM) AS color, (SELECT SUM(ThanhToan)AS Total FROM Listorder WHERE Huy_Don='0' AND date_new=a.date_new GROUP BY date_new) AS Total_Bill FROM Listorder a WHERE Action='{cashier['Thaotac']}' ORDER BY datetime(date_new) DESC limit {cashier['pagesize']} OFFSET {cashier['page'] * cashier['pagesize']};"""
        result_data = classsend.get_curSQL('manager-order.db', query=query)

        for i in range(len(result_data)):
            query = f"""SELECT Topping.NameTopping, Topping.SL, MatHang.price Topping_DG, MatHang.id
                                                              FROM ListorderTopping Topping
                                                              inner join MatHang on MatHang.name = Topping.NameTopping
                                                              WHERE Topping.id_list_order = '{result_data[i]['Id']}'"""
            sub_data = classsend.get_curSQL('manager-order.db', query=query)
            result_data[i]['Topping'] = sub_data
        return {'listtable': result_data, 'TotalRow': max_row[0]['TotalRow']}
    elif cashier['action'] == 'Search_Danhmuc':
        query = f"""SELECT COUNT(*) as TotalRow
                                        FROM Listorder
                                        WHERE id_DM='{cashier['id_DM']}';
                                        """
        max_row = get_curSQL('manager-order.db', query=query)
        # query = f"SELECT a.*, (SELECT color FROM DanhMuc WHERE DanhMuc.name = a.Danhmuc) AS color FROM Listorder a ORDER BY 'Date' DESC;"
        # phân trang trong table dùng query
        # query = f"SELECT a.*, (SELECT color FROM DanhMuc WHERE DanhMuc.name = a.Danhmuc) AS color FROM Listorder a where rowid in (select rowid from Listorder ORDER BY 'Date' DESC limit {action['pagesize']} OFFSET {action['page']*action['pagesize']});"
        # cách này lấy từ cuối danh sách
        # query = f"SELECT a.*, (SELECT color FROM DanhMuc WHERE DanhMuc.name = a.Danhmuc) AS color FROM Listorder a where rowid in (select rowid from Listorder ORDER BY datetime(Date) DESC limit {action['pagesize']} OFFSET {max_row[0]['TotalRow']-action['pagesize']-(action['page']*action['pagesize'])});"
        # cách này lấy từ đầu danh sách
        # query = f"SELECT a.*, (SELECT color FROM DanhMuc WHERE DanhMuc.name = a.Danhmuc) AS color, (SELECT SUM(ThanhToan)AS Total FROM Listorder WHERE Huy_Don='0' AND Date=a.Date GROUP BY Date) AS Total_Bill FROM Listorder a ORDER BY datetime(Date) DESC limit {action['pagesize']} OFFSET {action['page']*action['pagesize']};"""
        #
        query = f"""SELECT a.*, (SELECT color FROM DanhMuc WHERE DanhMuc.id = a.id_DM) AS color, (SELECT SUM(ThanhToan)AS Total FROM Listorder WHERE Huy_Don='0' AND date_new=a.date_new GROUP BY date_new) AS Total_Bill FROM Listorder a WHERE id_DM='{cashier['id_DM']}' ORDER BY datetime(date_new) DESC limit {cashier['pagesize']} OFFSET {cashier['page'] * cashier['pagesize']};"""
        result_data = classsend.get_curSQL('manager-order.db', query=query)

        for i in range(len(result_data)):
            query = f"""SELECT Topping.NameTopping, Topping.SL, MatHang.price Topping_DG, MatHang.id
                                                                     FROM ListorderTopping Topping
                                                                     inner join MatHang on MatHang.name = Topping.NameTopping
                                                                     WHERE Topping.id_list_order = '{result_data[i]['Id']}'"""
            sub_data = classsend.get_curSQL('manager-order.db', query=query)
            result_data[i]['Topping'] = sub_data
        return {'listtable': result_data, 'TotalRow': max_row[0]['TotalRow']}
    elif cashier['action'] == 'Search_Mathang':
        query = f"""SELECT COUNT(*) as TotalRow
                                                FROM Listorder
                                                WHERE id_MatHang='{cashier['id_MatHang']}';
                                                """
        max_row = get_curSQL('manager-order.db', query=query)
        # query = f"SELECT a.*, (SELECT color FROM DanhMuc WHERE DanhMuc.name = a.Danhmuc) AS color FROM Listorder a ORDER BY 'Date' DESC;"
        # phân trang trong table dùng query
        # query = f"SELECT a.*, (SELECT color FROM DanhMuc WHERE DanhMuc.name = a.Danhmuc) AS color FROM Listorder a where rowid in (select rowid from Listorder ORDER BY 'Date' DESC limit {action['pagesize']} OFFSET {action['page']*action['pagesize']});"
        # cách này lấy từ cuối danh sách
        # query = f"SELECT a.*, (SELECT color FROM DanhMuc WHERE DanhMuc.name = a.Danhmuc) AS color FROM Listorder a where rowid in (select rowid from Listorder ORDER BY datetime(Date) DESC limit {action['pagesize']} OFFSET {max_row[0]['TotalRow']-action['pagesize']-(action['page']*action['pagesize'])});"
        # cách này lấy từ đầu danh sách
        # query = f"SELECT a.*, (SELECT color FROM DanhMuc WHERE DanhMuc.name = a.Danhmuc) AS color, (SELECT SUM(ThanhToan)AS Total FROM Listorder WHERE Huy_Don='0' AND Date=a.Date GROUP BY Date) AS Total_Bill FROM Listorder a ORDER BY datetime(Date) DESC limit {action['pagesize']} OFFSET {action['page']*action['pagesize']};"""
        #
        query = f"""SELECT a.*, (SELECT color FROM DanhMuc WHERE DanhMuc.id = a.id_DM) AS color, (SELECT SUM(ThanhToan)AS Total FROM Listorder WHERE Huy_Don='0' AND date_new=a.date_new GROUP BY date_new) AS Total_Bill FROM Listorder a WHERE id_MatHang='{cashier['id_MatHang']}' ORDER BY datetime(date_new) DESC limit {cashier['pagesize']} OFFSET {cashier['page'] * cashier['pagesize']};"""
        result_data = classsend.get_curSQL('manager-order.db', query=query)

        for i in range(len(result_data)):
            query = f"""SELECT Topping.NameTopping, Topping.SL, MatHang.price Topping_DG, MatHang.id
                                                                             FROM ListorderTopping Topping
                                                                             inner join MatHang on MatHang.name = Topping.NameTopping
                                                                             WHERE Topping.id_list_order = '{result_data[i]['Id']}'"""
            sub_data = classsend.get_curSQL('manager-order.db', query=query)
            result_data[i]['Topping'] = sub_data
        return {'listtable': result_data, 'TotalRow': max_row[0]['TotalRow']}
    elif cashier['action'] == 'Search_NhomMathang':
        query = f"""SELECT COUNT(*) as TotalRow
                           FROM Listorder
                           WHERE id_MatHang in (SELECT id_MH FROM 'NhomMH' WHERE id_nhom= '{cashier['id_nhom']}')"""
        max_row = get_curSQL('manager-order.db', query=query)
        # print(max_row)
        query = f"""SELECT a.*, (SELECT color FROM DanhMuc WHERE DanhMuc.id = a.id_DM) AS color, (SELECT SUM(ThanhToan)AS Total FROM Listorder WHERE Huy_Don='0' AND date_new=a.date_new GROUP BY date_new) AS Total_Bill FROM Listorder a WHERE id_MatHang in (SELECT id_MH FROM 'NhomMH' WHERE id_nhom= '{cashier['id_nhom']}') ORDER BY datetime(date_new) DESC limit {cashier['pagesize']} OFFSET {cashier['page'] * cashier['pagesize']};"""
        result_data = classsend.get_curSQL('manager-order.db', query=query)

        for i in range(len(result_data)):
            query = f"""SELECT Topping.NameTopping, Topping.SL, MatHang.price Topping_DG, MatHang.id
                                                                                    FROM ListorderTopping Topping
                                                                                    inner join MatHang on MatHang.name = Topping.NameTopping
                                                                                    WHERE Topping.id_list_order = '{result_data[i]['Id']}'"""
            sub_data = classsend.get_curSQL('manager-order.db', query=query)
            result_data[i]['Topping'] = sub_data
        return {'listtable': result_data, 'TotalRow': max_row[0]['TotalRow']}
        pass
    elif cashier['action'] == 'dropbox_search':
        result_data = {}
        query = f"SELECT * FROM 'DanhMuc' ORDER BY name COLLATE NOCASE;"
        danhmuc = classsend.get_curSQL('manager-order.db', query=query)
        # print(danhmuc)
        result_data['danhmuc'] = danhmuc
        query = f"SELECT * FROM 'Nhom' ORDER BY name COLLATE NOCASE;"
        Nhom = classsend.get_curSQL('manager-order.db', query=query)
        # print(result_data)
        result_data['nhom'] = Nhom
        query = f"SELECT * FROM 'MatHang' WHERE Danhmuc='Topping' ORDER BY 'name' COLLATE NOCASE;"
        MatHang = classsend.get_curSQL('manager-order.db', query=query)
        result_data['mathang'] = MatHang
        # print(result_data)
        return result_data
    elif cashier['action'] =='info-DoanhThu':
        query = f"SELECT * FROM Ca_Staff WHERE ifnull(length(date_end), 0) = 0"
        result_data = classsend.get_curSQL('manager-order.db', query=query)
        # print(result_data)
        return result_data
    elif cashier['action'] == 'HUY':
        query = f'''UPDATE Listorder SET Thaotac='{cashier['Thaotac']}', Action='{cashier['action']}', NvOrder='{cashier['nv_order']}', id_ca='{cashier['id_ca']}', Huy_Don='{cashier['Huy_Don']}' WHERE Id='{cashier['id']}';'''
        classsend.get_curSQL('manager-order.db', query=query)

        # query=f"""SELECT Id, date_new, Name, SUM(ThanhToan)AS Total FROM Listorder WHERE Huy_Don='0' GROUP BY date_new ;"""
        # Total_TT_MatHang = classsend.get_curSQL('manager-order.db', query=query)

        await manager.broadcast(cashier, token, current_user)
        show_DT = get_doanhthu(cashier['id_ca'])
        # print(show_DT)
        return {"msg": "Successfully post", "DT": show_DT}
    elif cashier['action'] == 'HOANTHANH':
        query = f'''UPDATE Listorder SET Thaotac='{cashier['Thaotac']}', Action='{cashier['action']}', NvOrder='{cashier['nv_order']}', id_ca='{cashier['id_ca']}' WHERE Id='{cashier['id']}';'''
        classsend.get_curSQL('manager-order.db', query=query)
        # print(cashier)
        # get value gio hàng
        query =f"""SELECT * FROM Listorder
                            WHERE Id='{cashier['id']}';"""
        result = classsend.get_curSQL('manager-order.db', query=query)
        result = result[0]


        #------------- Công vào doanh thu dang sư dung trigger -----------#
        # query = f"""UPDATE Ca_Staff SET DT_dichvu = DT_dichvu + {result['ThanhToan']}
        #                                WHERE id_ca = '{result['id_ca']}';"""
        # classsend.get_curSQL('manager-order.db', query=query)

        #------------- Trừ nguyên liệu --------------#
        # get NguyenMH
        query=f"""SELECT * FROM NguyenLieuMH
                            WHERE MatHang_ID='{result['id_MatHang']}';"""
        Nguyenlieu = classsend.get_curSQL('manager-order.db', query=query)
        for item in range(len(Nguyenlieu)):
            value = Nguyenlieu[item]
            # value = item[0]
            query=f"""UPDATE NguyenLieu SET Tonkho = Tonkho - {value['Soluong']}
                                WHERE id = '{value['NguyenLieu_ID']}';"""
            classsend.get_curSQL('manager-order.db', query=query)

        show_DT = get_doanhthu(result['id_ca'])
        print(show_DT, cashier)
        await manager.broadcast(cashier, token, current_user)
        return {"msg": "Successfully post", "DT": show_DT}
    elif cashier['action'] == 'THUTIEN' or cashier['action'] == 'CHAPNHAN':
        query =f'''UPDATE Listorder SET Thaotac='{cashier['Thaotac']}', Action='{cashier['action']}', NvOrder='{cashier['nv_order']}', id_ca='{cashier['id_ca']}' WHERE Id='{cashier['id']}';'''
        classsend.get_curSQL('manager-order.db', query=query)

        # query = f"""SELECT Id, date_new, Name, SUM(ThanhToan)AS Total FROM Listorder WHERE Huy_Don='0' GROUP BY date_new ;"""
        # Total_TT_MatHang = classsend.get_curSQL('manager-order.db', query=query)
        # print(Total_TT_MatHang)

        await manager.broadcast(cashier, token, current_user)

        # show_DT = get_doanhthu()
        # print(show_DT)
        return {"msg":"Successfully post", "DT": 'show_DT'}
def get_doanhthu(id_ca):
    # trả row nhân viên đang nhận ca
    # query = f"SELECT * FROM Ca_Staff WHERE ifnull(length(date_end), 0) = 0"
    query = f"""SELECT * FROM Ca_Staff WHERE id_ca = '{id_ca}';"""
    result_data = classsend.get_curSQL('manager-order.db', query=query)
    # print(result_data)
    return result_data
# ------------------------------- Order khach hang ------------------------------------#
@app_api.post('/Order')
async def post_order(request: Request, Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()
    current_user = Authorize.get_jwt_subject()
    token = request.cookies['refresh_token_cookie']
    order = await request.json()
    if order['action']== 'get_MH':
        try:
            query = f"SELECT * FROM 'MatHang' WHERE id= '{Mathang['id']}';"
            result_data = classsend.get_curSQL('manager-order.db', query=query)
            for i in range(len(result_data)):
                query = f"""SELECT name
                                          FROM DanhMuc a
                                          WHERE a.id = '{result_data[i]['id_DM']}'"""
                sub_data = classsend.get_curSQL('manager-order.db', query=query)
                if sub_data:
                    result_data[i]['Danhmuc'] = sub_data[0]['name']
                else:
                    result_data[i]['Danhmuc'] = '<b style="color: red";>Đã Xoá</b>'
                    result_data[i]['id_DM'] = 0

                query = f"""SELECT a.*, (SELECT Tonkho FROM NguyenLieu 
                                                                     WHERE NguyenLieu.id = a.NguyenLieu_ID
                                                                   ) AS Tonkho
                                                FROM NguyenLieuMH a
                                                WHERE a.MatHang_ID = '{result_data[i]['id']}'"""
                sub_data = classsend.get_curSQL('manager-order.db', query=query)
                # print(result_data[i]['id'])
                result_data[i]['NguyenLieu'] = sub_data

                # ----------------------- get Khuyen mai ---------------------------#
                query = f"""SELECT Nhom.id_nhom, Nhom.name, KhuyenmaiMH.name_KM, KhuyenmaiMH.id_loaiKM, KhuyenmaiMH.loaigiamgia, KhuyenmaiMH.phantramKM, KhuyenmaiMH.date_begin, KhuyenmaiMH.date_end
                                                              FROM NhomMH
                                                              inner join MatHang on MatHang.id = NhomMH.id_MH
                                                              inner join KhuyenmaiMH on NhomMH.id_nhom = KhuyenmaiMH.id_nhom
        													  inner join Nhom on Nhom.id_nhom = NhomMH.id_nhom
                                                              WHERE NhomMH.id_MH = '{result_data[i]['id']}';"""
                sub_data = classsend.get_curSQL('manager-order.db', query=query)
                # print(sub_data)
                result_data[i]['KhuyenMai'] = sub_data

                # ----------------------- get timer ---------------------------#
                query = f"""SELECT HengioMH.gioban, HengioMH.id, HengioMH.giongung
                                                                             FROM HengioMH
                                                                             inner join MatHang on MatHang.id = HengioMH.id_MH
                                                                             WHERE HengioMH.id_MH = '{result_data[i]['id']}'"""
                sub_data = classsend.get_curSQL('manager-order.db', query=query)
                # print(sub_data)
                result_data[i]['timer'] = sub_data

                # ----------------------- get Topping ----------------------------#
                # for i in range(len(result_data)):
                query = f"""SELECT ToppingMH.nameTopping, ToppingMH.Topping_SL, MatHang.price Topping_DG, MatHang.id
                                                                               FROM ToppingMH
                                                                               inner join MatHang on MatHang.name = ToppingMH.nameTopping
                                                                               WHERE ToppingMH.MatHang_ID = '{result_data[i]['id']}'"""
                sub_data = classsend.get_curSQL('manager-order.db', query=query)
                # sub_data = classsend.get_curSQL(query=query)
                result_data[i]['Topping'] = sub_data
                # print('chưa lấy nguyenlieu',sub_data)
                # print('\n')
                for j in range(len(result_data[i]['Topping'])):
                    query = f"""SELECT a.*, (SELECT Tonkho FROM NguyenLieu
                                                                                                         WHERE NguyenLieu.id = a.NguyenLieu_ID
                                                                                                       ) AS Tonkho
                                                    FROM NguyenLieuMH a
                                                    WHERE a.MatHang_ID = '{result_data[i]['Topping'][j]['id']}'"""
                    sub_nguyenlieu_topping = classsend.get_curSQL('manager-order.db', query=query)
                    # print('lay roi',sub_nguyenlieu_topping )
                    result_data[i]['Topping'][j]['NguyenLieu_Topping'] = sub_nguyenlieu_topping
                # print(result_data[i]['Topping'])
            # print('\n')
            # print('xong',)
            return result_data
        except:
            pass
    elif order['action']=='dathang':
        args = (order['date'],'', order['mathang'], order['sl'], order['ghichu'], 'CHAPNHAN', 'CHẤP NHẬN', order['custom'], order['nv_order'],'')
        query = '''INSERT INTO 'List-order'(date_new, Name, SL, Ghichu, Action, Thaotac, Custom, NvOrder) VALUES(?, ?, ?, ?, ?, ?, ?);'''
        get_curSQL('manager-order.db', query=query, args=args)
        # token = request.cookies['refresh_token_cookie']
        await manager.broadcast(order,token, current_user)

# ------------------------------- nhap kho ------------------------------------#
@app_api.post('/inventory')
async def post_nguyenlieu(request: Request, Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()
    current_user = Authorize.get_jwt_subject()
    NL = await request.json()
    token = request.cookies['refresh_token_cookie']
    # -------------------------- Nguyên Liệu -------------------------------#
    if (NL['action']=='newNL'):
        args = (NL['name'], NL['mota'], NL['donvi'], NL['sl'])
        query = f"""INSERT INTO NguyenLieu(name, mota, donvi, Tonkho)  VALUES(?, ?, ?, ?)"""
        classsend.get_curSQL('manager-order.db', query=query, args=args)
        # await manager.broadcast(nguyenlieu, token, current_user)
        return {"msg": "success", "content": f"Tạo Khuyến Mãi <b>{NL['name']} thành công</b>`"}
    elif (NL['action']=='update'):
        query = f'''UPDATE 'NguyenLieu' SET name='{NL['name']}', mota='{NL['mota']}',donvi='{NL['donvi']}' WHERE id='{NL['id']}';'''
        # query = f"UPDATE * FROM 'List-order';"
        classsend.get_curSQL('manager-order.db', query=query)
        # await manager.broadcast(cashier, token, current_user)
        return {"msg": "Successfully kho"}
    elif (NL['action']=='nhapkho'):
        query = f'''UPDATE 'NguyenLieu' SET Tonkho='{NL['sl']}' WHERE id='{NL['id']}';'''
        classsend.get_curSQL('manager-order.db', query=query)
        args = (NL['date'], NL['mota'], NL['staff'], NL['nameNL'], NL['thaotac'],NL['sl_new'], NL['sl_old'], NL['total_sl'], NL['price'], NL['total_newnhap'])
        query = f"""INSERT INTO Log_Kho(date_new, mota, Person, NameNL, action, SL, Tonkho_before, Tonkho_after, Price_import,Total)  VALUES(?, ?, ?, ?,?, ?, ?, ?, ?, ?)"""
        classsend.get_curSQL('manager-order.db', query=query, args=args)
        # await manager.broadcast(cashier, token, current_user)
        return {"msg": "Successfully kho"}
    elif (NL['action']=='delkho'):
        try:
            query = f'''DELETE FROM `NguyenLieu` WHERE id='{NL['id']}' ;'''
            classsend.get_curSQL('manager-order.db', query=query)
            return {"msg": "success",
                    "content": f"Xoá Nguyên Liệu <b>{NL['name']} thành công!</b>`"}
        except:
            return {"msg": "error",
                    "content": f"Xoá Nguyên Liệu <b>{NL['name']} không thành công! Vui lòng xoá những mục liên quan đến nhóm trước.</b>`"}

        # await manager.broadcast(cashier, token, current_user)
    elif (NL['action'] =='getNL'):
        query = f"SELECT * FROM 'NguyenLieu';"
        result_data = classsend.get_curSQL('manager-order.db', query=query)
        # print(result_data)
        return result_data
    elif (NL['action'] =='getNL_MH'):
        query = f"SELECT * FROM 'NguyenLieuMH';"
        result_data = classsend.get_curSQL('manager-order.db', query=query)
        # print(result_data)
        return result_data
    elif (NL['action'] =='getLog_kho'):
        print('test bug ')
        query = f"SELECT * FROM 'Log_Kho';"
        result_data = classsend.get_curSQL('manager-order.db', query=query)
        # print('test bug ',result_data)
        return result_data
    elif (NL['action'] =='getLog_action'):
        print('test bug ')
        query = f"SELECT * FROM 'Log_action';"
        result_data = classsend.get_curSQL('manager-order.db', query=query)
        print('test bug ',result_data)
        return result_data
#--------------------------------- Danh mục -----------------------------------#
@app_api.post('/danhmuc')
async def post_danhmuc(request: Request, Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()
    current_user = Authorize.get_jwt_subject()
    token = request.cookies['refresh_token_cookie']
    danhmuc = await request.json()
    if (danhmuc['action'] == 'newDM'):
        args = (danhmuc['name'], danhmuc['color'], danhmuc['mota'], danhmuc['DMcha'], danhmuc['DTkhac'], danhmuc['mobanDM'],)
        query = "INSERT INTO DanhMuc(name, color, mota, DMcha, DTkhac, mobanDM) VALUES(?, ?, ?, ?, ?, ?)"
        get_curSQL('manager-order.db', query=query, args=args)
        # await manager.broadcast(danhmuc, token, current_user)
        return {"msg": "success", "content": f"Tạo Danh mục <b>{danhmuc['name']} thành công</b>`"}
    elif (danhmuc['action'] == 'update'):
        query = f'''UPDATE 'DanhMuc' SET name='{danhmuc['name']}', color='{danhmuc['color']}', mota='{danhmuc['mota']}',DMcha='{danhmuc['DMcha']}', DTkhac='{danhmuc['DTkhac']}', mobanDM='{danhmuc['mobanDM']}' WHERE id='{danhmuc['id']}';'''
        classsend.get_curSQL('manager-order.db', query=query)
        # await manager.broadcast(cashier, token, current_user)
        return {"msg": "Successfully kho"}
    elif (danhmuc['action'] == 'delDM'):
        try:
            query = f'''DELETE FROM `DanhMuc` WHERE id='{danhmuc['id']}' ;'''
            classsend.get_curSQL('manager-order.db', query=query)
            return {"msg": "success",
                    "content": f"Xoá Danh Mục <b>{danhmuc['name']} thành công!</b>`"}
        except:
            return {"msg": "error",
                    "content": f"Xoá Danh Mục <b>{danhmuc['name']} không thành công! Vui lòng xoá những mục liên quan đến nhóm trước.</b>`"}
        # await manager.broadcast(cashier, token, current_user)
    elif (danhmuc['action'] =='getDM'):
        query = f"SELECT * FROM 'DanhMuc';"
        result_data = classsend.get_curSQL('manager-order.db', query=query)
        return result_data
    elif (danhmuc['action'] =='mobanDM'):
        query = f'''UPDATE DanhMuc SET mobanDM='{danhmuc['mobanDM']}' WHERE id='{danhmuc['id']}';'''
        classsend.get_curSQL('manager-order.db', query=query)
        # await manager.broadcast(cashier, token, current_user)
        return {"msg": "Successfully kho"}
    elif (danhmuc['action']=='color'):
        query = f"SELECT * FROM 'Color';"
        result_data = classsend.get_curSQL('manager-order.db', query=query)
        return result_data
    elif (danhmuc['action'] == 'show_DM_web'):
        query = f"""WITH tree_view AS (
                    SELECT id,
                         parent_id,
                         name,
                         0 AS level,
                         CAST(id AS TEXT) AS order_sequence
                    FROM Danhmuc
                    WHERE parent_id IS NULL
                     
                UNION ALL
                 
                    SELECT 
                         parent.id,
                         parent.parent_id,
                         parent.name,
                         level + 1 AS level,
                         CAST(order_sequence || '-' || CAST(parent.id AS TEXT ) AS TEXT) AS order_sequence
                         
                    FROM Danhmuc parent
                    JOIN tree_view tv
                      ON parent.parent_id = tv.id
                )
                 
                SELECT
                   *
                FROM tree_view
                ORDER BY order_sequence;"""
        result_data = classsend.get_curSQL('manager-order.db', query=query)
        return result_data
#--------------------------------- Nhom MH -----------------------------------#
@app_api.post('/nhomMH')
async def post_nhomMH(request: Request, Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()
    current_user = Authorize.get_jwt_subject()
    token = request.cookies['refresh_token_cookie']
    nhomMH = await request.json()
    print(nhomMH)
    if (nhomMH['action'] == 'newNhom'):
        args = (nhomMH['name'], nhomMH['mota'], nhomMH['show'], nhomMH['label'], nhomMH['name_label'], nhomMH['color_nhom'])
        query = "INSERT INTO Nhom(name, mota, show, label, name_label, color_nhom) VALUES(?, ?, ?, ?, ?, ?)"
        classsend.get_curSQL('manager-order.db', query=query, args=args)
        #await manager.broadcast(danhmuc, token, current_user)
        return {"msg": "success", "content": f"Tạo Nhóm <b>{nhomMH['name']} thành công</b>`"}
    elif (nhomMH['action'] == 'update_nhom'):
        query = f'''UPDATE Nhom SET name='{nhomMH['name']}', mota='{nhomMH['mota']}',show='{nhomMH['show']}', label='{nhomMH['label']}', name_label='{nhomMH['name_label']}', color_nhom='{nhomMH['color_nhom']}' WHERE id_nhom='{nhomMH['id_nhom']}';'''
        classsend.get_curSQL('manager-order.db', query=query)
        # await manager.broadcast(cashier, token, current_user)
        return {"msg": "Successfully kho"}
    elif (nhomMH['action'] == 'delnhom'):
        try:
            query = f"DELETE FROM Nhom WHERE id_nhom= '{nhomMH['id_nhom']}';"
            classsend.get_curSQL('manager-order.db', query=query)
            return {"msg": "success",
                    "content": f"Xoá Nhóm Mặt Hàng <b>{nhomMH['name']} thành công!</b>`"}
        except:
            return {"msg": "error", "content": f"Xoá Nhóm Mặt Hàng <b>{nhomMH['name']} không thành công! Vui lòng xoá những mục liên quan đến nhóm trước.</b>`"}
    elif (nhomMH['action'] =='get_nhom'):
        try:
            if (nhomMH['id_nhom']):
                query = f"SELECT * FROM 'Nhom' WHERE id_nhom = '{nhomMH['id_nhom']}';"
                result_data = classsend.get_curSQL('manager-order.db', query=query)
                return result_data
        except:
            query = f"SELECT * FROM 'Nhom';"
            result_data = classsend.get_curSQL('manager-order.db', query=query)
            print(result_data)
            return result_data
    elif nhomMH['action'] == 'getMH':
        # print(action)
        list_nhom ={}
        query = f"SELECT * FROM 'MatHang';"
        result_data = classsend.get_curSQL('manager-order.db', query=query)
        list_nhom['list_MH'] = result_data
        query = f"SELECT * FROM 'NhomMH' WHERE id_nhom = '{nhomMH['id_nhom']}' ;"
        result_data = classsend.get_curSQL('manager-order.db', query=query)
        list_nhom['MH_of_nhom']= result_data
        return list_nhom
    elif nhomMH['action'] == 'import_MH_to_nhom':
        args = (
        nhomMH['id_MH'], nhomMH['id_nhom'], nhomMH['nameMatHang'])
        query = "INSERT INTO NhomMH(id_MH, id_nhom, nameMatHang) VALUES(?, ?, ?)"
        cur = get_curSQL('manager-order.db', query=query, args=args)
        task_id = cur.lastrowid
        return {'id_nhomMH': task_id}
    elif nhomMH['action'] == 'del_MH_form_nhom':
        query = f"DELETE FROM NhomMH WHERE id_nhomMH= '{nhomMH['id_nhomMH']}';"
        get_curSQL('manager-order.db', query=query)
    # elif nhomMH['action'] == 'del_MH_to_nhom':
    #     query = f"DELETE FROM NhomMH WHERE id_nhomMH= '{nhomMH['id_nhomMH']}';"
    #     classsend.get_curSQL('manager-order.db', query=query)
    #     pass
#--------------------------------- KHUYEN MAI -----------------------------------#
@app_api.post('/khuyenmai')
async def post_khuyenmai(request: Request, Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()
    current_user = Authorize.get_jwt_subject()
    # print(kho.stt)
    token = request.cookies['refresh_token_cookie']
    khuyenmai = await request.json()
    # print(khuyenmai)
    if (khuyenmai['action'] == 'newKM'):
        args = (khuyenmai['name_KM'], khuyenmai['ten_nhom'], khuyenmai['id_nhom'], khuyenmai['id_loaiKM'], khuyenmai['loaiKM'],khuyenmai['phantram'],khuyenmai['date_begin'],khuyenmai['date_end'])
        query = "INSERT INTO khuyenmaiMH(name_KM, name_nhomMH, id_nhom, id_loaiKM, loaigiamgia, phantramKM, date_begin, date_end) VALUES(?, ?, ?, ?, ?, ?, ?, ?)"
        cur = get_curSQL('manager-order.db', query=query, args=args)
        task_id = cur.lastrowid
        # if khuyenmai['loaiKM']=='Nhập Mã':
        #     args = (task_id, khuyenmai['name_KM'], khuyenmai['phantram'])
        #     query = "INSERT INTO magiamgia(id_KM, nameKM, phantramKM) VALUES(?, ?, ?)"
        #     classsend.get_curSQL('manager-order.db', query=query, args=args)
        #await manager.broadcast(danhmuc, token, current_user)
        return {"msg": "success", "content": f"Tạo Khuyến Mãi <b>{khuyenmai['name_KM']} thành công</b>`", 'id_KM': task_id}
    elif (khuyenmai['action'] == 'update_KM'):
        # print(khuyenmai)
        query = f'''UPDATE 'khuyenmaiMH' SET name_KM='{khuyenmai['name_KM']}', id_nhom='{khuyenmai['id_nhom']}',id_loaiKM='{khuyenmai['id_loaiKM']}', loaigiamgia='{khuyenmai['loaiKM']}', phantramKM='{khuyenmai['phantram']}', date_begin='{khuyenmai['date_begin']}', date_end='{khuyenmai['date_end']}' WHERE id_khuyenmai='{khuyenmai['id_khuyenmai']}';'''
        # query = f"UPDATE * FROM 'List-order';"
        classsend.get_curSQL('manager-order.db', query=query)
        # await manager.broadcast(cashier, token, current_user)
        return {"msg": "Successfully kho"}
    elif (khuyenmai['action'] == 'del_KM'):
        try:
            query = f'''DELETE FROM `KhuyenmaiMH` WHERE id_khuyenmai='{khuyenmai['id_khuyenmai']}' ;'''
            classsend.get_curSQL('manager-order.db', query=query)
            return {"msg": "success",
                    "content": f"Xoá Nhóm Mặt Hàng <b>{khuyenmai['name']} thành công!</b>`"}
        except:
            return {"msg": "error",
                    "content": f"Xoá Nhóm Mặt Hàng <b>{khuyenmai['name']} không thành công! Vui lòng xoá những mục liên quan đến nhóm trước.</b>`"}
    elif (khuyenmai['action'] =='get_KM'):
        try:
            query = f"""SELECT *, Nhom.name
                            FROM 'khuyenmaiMH' 
                            inner join Nhom on Nhom.id_nhom = khuyenmaiMH.id_nhom
                            WHERE id_khuyenmai='{khuyenmai['id_khuyenmai']}';"""
            result_data = classsend.get_curSQL('manager-order.db', query=query)
            # print(result_data)
            return result_data
        except:
            query = f"""SELECT *, Nhom.name
                            FROM 'khuyenmaiMH' 
                            inner join Nhom on Nhom.id_nhom = khuyenmaiMH.id_nhom ;"""
            result_data = classsend.get_curSQL('manager-order.db', query=query)
            # print(result_data)
            return result_data
    elif (khuyenmai['action'] == 'getKM'):# show dropbox
        query = f"""SELECT * FROM 'khuyenmai';"""
        result_data = classsend.get_curSQL('manager-order.db', query=query)
        # print(result_data)
        return result_data
# ------------------------------- magiamgia ------------------------------------#
@app_api.post('/magiamgia')
async def post_magiamgia(request: Request, Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()
    current_user = Authorize.get_jwt_subject()
    # print(kho.stt)
    token = request.cookies['refresh_token_cookie']
    magiam = await request.json()
    if (magiam['action'] == 'newMagiam'):
        args = (magiam['id_KM'], magiam['nameKM'], magiam['phantramKM'], magiam['maKM'], magiam['solansudung'], magiam['solantkdung'], 0)
        query = "INSERT INTO magiamgia(id_khuyenmai, nameKM, phantramKM, maKM, solansudung, solantkdung, dasudung) VALUES(?, ?, ?, ?, ?, ?, ?)"
        cur = classsend.get_curSQL('manager-order.db', query=query, args=args)
        # task_id = cur.lastrowid
        # if khuyenmai['loaiKM']=='Nhập Mã':
        #     args = (task_id, khuyenmai['name_KM'], khuyenmai['phantram'])
        #     query = "INSERT INTO magiamgia(id_KM, nameKM, phantramKM) VALUES(?, ?, ?)"
        #     classsend.get_curSQL('manager-order.db', query=query, args=args)
        #await manager.broadcast(danhmuc, token, current_user)
        pass
        return {"msg": "success", "content": f"Tạo Mã <b>{magiam['nameKM']} thành công</b>`"}
    elif (magiam['action'] == 'update_Magiam'):
        query = f'''UPDATE 'magiamgia' SET maKM='{magiam['maKM']}', solansudung='{magiam['solansudung']}',solantkdung='{magiam['solantkdung']}' WHERE id_khuyenmai='{magiam['id_KM']}' AND id_magiam='{magiam['id_magiam']}';'''
        # query = f"UPDATE * FROM 'List-order';"
        classsend.get_curSQL('manager-order.db', query=query)
        # await manager.broadcast(cashier, token, current_user)
        return {"msg": "success", "content": f"Tạo Mã <b>{magiam['maKM']} thành công</b>`"}
    elif (magiam['action'] == 'del_Magiam'):
        # query = f'''DELETE FROM `DanhMuc` WHERE stt='{danhmuc.stt}' ;'''
        # # query = f"UPDATE * FROM 'List-order';"
        # classsend.get_curSQL('manager-order.db', query=query)
        # # await manager.broadcast(cashier, token, current_user)
        return {"msg": "Successfully kho"}
    elif (magiam['action'] =='get_Magiam'):
        try:
            query = f"SELECT * FROM magiamgia WHERE id_khuyenmai='{magiam['id_KM']}' AND id_magiam='{magiam['id_magiam']}';"
            result_data = classsend.get_curSQL('manager-order.db', query=query)
            print(result_data)
            return result_data
        except:
            query = f"SELECT * FROM magiamgia WHERE id_khuyenmai='{magiam['id_KM']}';"
            result_data = classsend.get_curSQL('manager-order.db', query=query)
            print(result_data)
            return result_data
# ------------------------------- Mặt Hàng ------------------------------------#
''''''
# JSONObject = Dict[AnyStr, Any]
# JSONArray = List[Any]
# JSONStructure = Union[JSONArray, JSONObject]
@app_api.post('/mathang')
# async def post_mathang(payload: dict = Body(...), Authorize: AuthJWT = Depends()):
async def post_mathang(request: Request, Authorize: AuthJWT = Depends()):
# async def post_mathang(arbitrary_json: JSONObject = None, Authorize: AuthJWT = Depends()):
#     Authorize.jwt_required()
#     current_user = Authorize.get_jwt_subject()
    Authorize.jwt_required()
    current_user = Authorize.get_jwt_subject()
    token = request.cookies['refresh_token_cookie']
    Mathang = await request.json()
    #------ func check sql injection ---------#
    # check = check_dict_sqlinjection(Mathang)
    # if check!= True:
    #     return check

    # classsend = Sqlite(database='manager-order.db')
    # print(Mathang)
    # token = request.cookies['refresh_token_cookie']

    # tuples= ("Sting", "cam ép")
    con = sqlite3.connect('manager-order.db')  # (":memory:")
    # con.text_factory = lambda b: b.decode(errors = 'ignore')
    con.row_factory = dict_factory
    cur = con.cursor()
    cur.execute(f"PRAGMA key={Pass_sqlite}")
    cur.execute(f"PRAGMA journal_mode=WAL")
    cur.execute(f"PRAGMA synchronous=normal")
    cur.execute(f"PRAGMA foreign_keys = ON")
    cur.execute(f"PRAGMA temp_store=memory")
    cur.execute(f"PRAGMA mmap_size=30000000000")
    cur.execute(f"PRAGMA optimize")
    cur.execute(f"PRAGMA temp_store = 2")


    if (Mathang['action'] == 'newMH'):
        if Mathang['danhmuc_MH']=='Chọn làm Topping':
            Mathang['danhmuc_MH']= 'Topping'
        cur.execute("INSERT INTO MatHang(name, price, photo, id_DM, Danhmuc, muctoithieu, chontoida) VALUES(?, ?, ?, ?, ?,?,?)",
                    (Mathang['ten_MH'], Mathang['price_MH'], Mathang['photo'], Mathang['id_DM'], Mathang['danhmuc_MH'], Mathang['muctoithieu'], Mathang['chontoida']))
        con.commit()
        # query = f"""INSERT INTO MatHang(name, price, photo, id_DM, Danhmuc) VALUES(?, ?, ?, ?, ?)"""
        # args = (Mathang['ten_MH'], Mathang['price_MH'], Mathang['photo'], Mathang['id_DM'], Mathang['danhmuc_MH'])
        # cur = get_curSQL('manager-order.db', query=query, args=args)
        task_id = cur.lastrowid

        # -------- insert nguyenlieu ------------#
        data_array_nguyenlieu = []
        nguyenlieu= Mathang['nguyenlieu_MH']
        if nguyenlieu:
            for item in nguyenlieu:
                tuple=(task_id, item['v'], Mathang['ten_MH'], Mathang['danhmuc_MH'], item['k'])
                data_array_nguyenlieu.append(tuple)

        cur.executemany(f"""INSERT INTO NguyenLieuMH(MatHang_ID, NguyenLieu_ID, nameNL, Soluong, NameMH, Danhmuc)
                            SELECT ?, id, name, ?, ?, ?
                             FROM NguyenLieu
                             WHERE name = ?""", data_array_nguyenlieu)
        con.commit()
        # ---------------- insert Topping -------------- #
        Topping_MH = Mathang['Topping_MH']
        print('topping', Topping_MH, task_id)
        if Topping_MH != None:
            for item in Topping_MH:
                tuple = (task_id, item['k'],  item['v'], item['DG'])
                cur.execute(f"""INSERT INTO ToppingMH(MatHang_ID, nameTopping, Topping_SL, Topping_DG)
                                             VALUES {tuple};""")
                con.commit()
        con.close()
        return {"msg": "success", "content": f"<i class='ti-check' style='font-weight: bold;'> </i>Tạo Mặt Hàng <b>{Mathang['ten_MH']} thành công</b>`"}
    elif Mathang['action'] == 'update_MH':
        # phần này sử dụng ở edit MH
        # Before del all Nguyen Lieu and Topping of MH
        query = f"DELETE FROM 'NguyenLieuMH' WHERE MatHang_ID='{Mathang['id_MH']}';"
        classsend.get_curSQL('manager-order.db', query=query)
        query = f"DELETE FROM 'ToppingMH' WHERE MatHang_ID='{Mathang['id_MH']}';"
        classsend.get_curSQL('manager-order.db', query=query)

        # phần này edit lại MH
        query = f'''UPDATE 'MatHang' SET name='{Mathang['ten_MH']}', price='{Mathang['price_MH']}',photo='{Mathang['photo']}', id_DM= '{Mathang['id_DM']}', Danhmuc='{Mathang['danhmuc_MH']}', muctoithieu='{Mathang['muctoithieu']}', chontoida='{Mathang['chontoida']}'  WHERE id='{Mathang['id_MH']}';'''
        classsend.get_curSQL('manager-order.db', query=query)

        # add lại NguyenLieuMH
        # -------- insert nguyenlieu ------------#
        task_id = Mathang['id_MH']
        data_array_nguyenlieu = []
        nguyenlieu = Mathang['nguyenlieu_MH']
        if nguyenlieu:
            for item in nguyenlieu:
                tuple = (task_id, item['v'], Mathang['ten_MH'], Mathang['danhmuc_MH'], item['k'])
                data_array_nguyenlieu.append(tuple)
            cur.executemany(f"""INSERT INTO NguyenLieuMH(MatHang_ID, NguyenLieu_ID, nameNL, Soluong, NameMH, Danhmuc)
                                        SELECT ?, id, name, ?, ?, ?
                                         FROM NguyenLieu
                                         WHERE name = ?""", data_array_nguyenlieu)
            con.commit()

        # ---------------- insert Topping -------------- #
        Topping_MH = Mathang['Topping_MH']
        # print('topping', Topping_MH, task_id)
        if Topping_MH != None:
            for item in Topping_MH:
                # tuple = (task_id, item['k'], item['v'], item['DG'])
                tuple = (task_id, item['k'], item['DG'])
                print(tuple,'tuple', item)
                # cur.execute(f"""INSERT INTO ToppingMH(MatHang_ID, nameTopping, Topping_SL, Topping_DG)
                #                                     VALUES {tuple};""")
                cur.execute(f"""INSERT INTO ToppingMH(MatHang_ID, nameTopping, Topping_DG)
                                                                    VALUES {tuple};""")
                con.commit()
        con.close()

        return {"msg": "success",
                "content": f"<i class='ti-check' style='font-weight: bold;'> </i>Tạo Mặt Hàng <b>{Mathang['ten_MH']} thành công</b>`"}
    elif Mathang['action'] == 'getMH':
        try:
            query = f"SELECT * FROM 'MatHang' WHERE id= '{Mathang['id']}';"
            result_data = classsend.get_curSQL('manager-order.db', query=query)
            for i in range(len(result_data)):
                query = f"""SELECT name
                                  FROM DanhMuc a
                                  WHERE a.id = '{result_data[i]['id_DM']}'"""
                sub_data = classsend.get_curSQL('manager-order.db', query=query)
                if sub_data:
                    result_data[i]['Danhmuc'] = sub_data[0]['name']
                else:
                    result_data[i]['Danhmuc'] = '<b style="color: red";>Đã Xoá</b>'
                    result_data[i]['id_DM'] = 0

                query = f"""SELECT a.*, (SELECT Tonkho FROM NguyenLieu 
                                                             WHERE NguyenLieu.id = a.NguyenLieu_ID
                                                           ) AS Tonkho
                                        FROM NguyenLieuMH a
                                        WHERE a.MatHang_ID = '{result_data[i]['id']}'"""
                sub_data = classsend.get_curSQL('manager-order.db', query=query)
                # print(result_data[i]['id'])
                result_data[i]['NguyenLieu'] = sub_data

                # ----------------------- get Khuyen mai ---------------------------#
                query = f"""SELECT Nhom.id_nhom, Nhom.name, KhuyenmaiMH.name_KM, KhuyenmaiMH.id_loaiKM, KhuyenmaiMH.loaigiamgia, KhuyenmaiMH.phantramKM, KhuyenmaiMH.date_begin, KhuyenmaiMH.date_end
                                                      FROM NhomMH
                                                      inner join MatHang on MatHang.id = NhomMH.id_MH
                                                      inner join KhuyenmaiMH on NhomMH.id_nhom = KhuyenmaiMH.id_nhom
													  inner join Nhom on Nhom.id_nhom = NhomMH.id_nhom
                                                      WHERE NhomMH.id_MH = '{result_data[i]['id']}';"""
                sub_data = classsend.get_curSQL('manager-order.db', query=query)
                # print(sub_data)
                result_data[i]['KhuyenMai'] = sub_data

                # ----------------------- get timer ---------------------------#
                query = f"""SELECT HengioMH.gioban, HengioMH.id, HengioMH.giongung
                                                                     FROM HengioMH
                                                                     inner join MatHang on MatHang.id = HengioMH.id_MH
                                                                     WHERE HengioMH.id_MH = '{result_data[i]['id']}'"""
                sub_data = classsend.get_curSQL('manager-order.db', query=query)
                # print(sub_data)
                result_data[i]['timer'] = sub_data

                # ----------------------- get Topping ----------------------------#
                # for i in range(len(result_data)):
                query = f"""SELECT ToppingMH.nameTopping, ToppingMH.Topping_SL, MatHang.price Topping_DG, MatHang.id
                                                                       FROM ToppingMH
                                                                       inner join MatHang on MatHang.name = ToppingMH.nameTopping
                                                                       WHERE ToppingMH.MatHang_ID = '{result_data[i]['id']}'"""
                sub_data = classsend.get_curSQL('manager-order.db', query=query)
                # sub_data = classsend.get_curSQL(query=query)
                result_data[i]['Topping'] = sub_data
                # print('chưa lấy nguyenlieu',sub_data)
                # print('\n')
                for j in range(len(result_data[i]['Topping'])):
                    query = f"""SELECT a.*, (SELECT Tonkho FROM NguyenLieu
                                                                                                 WHERE NguyenLieu.id = a.NguyenLieu_ID
                                                                                               ) AS Tonkho
                                            FROM NguyenLieuMH a
                                            WHERE a.MatHang_ID = '{result_data[i]['Topping'][j]['id']}'"""
                    sub_nguyenlieu_topping = classsend.get_curSQL('manager-order.db', query=query)
                    # print('lay roi',sub_nguyenlieu_topping )
                    result_data[i]['Topping'][j]['NguyenLieu_Topping'] = sub_nguyenlieu_topping
                # print(result_data[i]['Topping'])
            # print('\n')
            # print('xong',)
            return result_data
        except:
            # query = f"""SELECT MatHang.*
            #                         FROM 'MatHang'
            #                         ;"""
            ''''''
            query =f"""WITH tree_view AS (
                            SELECT id,
                                 parent_id,
                                 name,
                                 0 AS level,
                                 CAST(id AS TEXT) AS order_sequence
                            FROM Danhmuc
                            WHERE parent_id IS NULL

                        UNION ALL
                            SELECT
                                 parent.id,
                                 parent.parent_id,
                                 parent.name,
                                 level + 1 AS level,
                                 CAST(order_sequence || '_' || CAST(parent.id AS TEXT ) AS TEXT) AS order_sequence
                            FROM Danhmuc parent
                            JOIN tree_view tv
                              ON parent.parent_id = tv.id
                        )

                        SELECT
                           order_sequence As tree_DM, MatHang .*
                        FROM tree_view
                        inner join MatHang on MatHang.id_DM = tree_view.id
                        ORDER BY order_sequence;"""
            result_data = classsend.get_curSQL('manager-order.db', query=query)
            print(len(result_data))
            for i in range(len(result_data)):
                query = f"""SELECT name
                                           FROM DanhMuc a
                                           WHERE a.id = '{result_data[i]['id_DM']}'"""
                sub_data = classsend.get_curSQL('manager-order.db', query=query)
                if sub_data:
                    result_data[i]['Danhmuc'] = sub_data[0]['name']
                else:
                    result_data[i]['Danhmuc']= '<b style="color: red";>Đã Xoá</b>'
                    result_data[i]['id_DM'] = 0
                print(sub_data)
                query = f"""SELECT a.*, (SELECT Tonkho FROM NguyenLieu 
                                                     WHERE NguyenLieu.id = a.NguyenLieu_ID
                                                   ) AS Tonkho
                            FROM NguyenLieuMH a
                            WHERE a.MatHang_ID = '{result_data[i]['id']}'"""
                sub_data = classsend.get_curSQL('manager-order.db', query=query)
                result_data[i]['NguyenLieu'] = sub_data

                # ----------------------- get Khuyen mai ---------------------------#
                query = f"""SELECT Nhom.id_nhom, Nhom.name, KhuyenmaiMH.name_KM, KhuyenmaiMH.id_loaiKM, KhuyenmaiMH.loaigiamgia, KhuyenmaiMH.phantramKM, KhuyenmaiMH.date_begin, KhuyenmaiMH.date_end
                                                                      FROM NhomMH
                                                                      inner join MatHang on MatHang.id = NhomMH.id_MH
                                                                      inner join KhuyenmaiMH on NhomMH.id_nhom = KhuyenmaiMH.id_nhom
                													  inner join Nhom on Nhom.id_nhom = NhomMH.id_nhom
                                                                      WHERE NhomMH.id_MH = '{result_data[i]['id']}';"""
                sub_data = classsend.get_curSQL('manager-order.db', query=query)
                result_data[i]['KhuyenMai'] = sub_data

                # ----------------------- get timer ---------------------------#
                query = f"""SELECT HengioMH.gioban, HengioMH.id, HengioMH.giongung
                                                      FROM HengioMH
                                                      inner join MatHang on MatHang.id = HengioMH.id_MH
                                                      WHERE HengioMH.id_MH = '{result_data[i]['id']}'"""
                sub_data = classsend.get_curSQL('manager-order.db', query=query)
                result_data[i]['timer'] = sub_data

                #----------------------- get Topping ----------------------------#
                query = f"""SELECT ToppingMH.nameTopping, ToppingMH.Topping_SL, MatHang.price Topping_DG, MatHang.id
                                                           FROM ToppingMH
                                                           inner join MatHang on MatHang.name = ToppingMH.nameTopping
                                                           WHERE ToppingMH.MatHang_ID = '{result_data[i]['id']}'"""
                sub_data = classsend.get_curSQL('manager-order.db', query=query)
                result_data[i]['Topping'] = sub_data
                for j in range(len(result_data[i]['Topping'])):
                    query = f"""SELECT a.nameNL, a.Soluong, (SELECT Tonkho FROM NguyenLieu
                                                                                     WHERE NguyenLieu.id = a.NguyenLieu_ID
                                                                                   ) AS Tonkho
                                FROM NguyenLieuMH a
                                WHERE a.MatHang_ID = '{result_data[i]['Topping'][j]['id']}'"""
                    sub_nguyenlieu_topping = classsend.get_curSQL('manager-order.db', query=query)
                    result_data[i]['Topping'][j]['NguyenLieu_Topping'] = sub_nguyenlieu_topping
            return result_data
    elif Mathang['action'] == 'del_MH':
        try:
            query = f"DELETE FROM MatHang WHERE id= '{Mathang['id_MH']}';"
            classsend.get_curSQL('manager-order.db', query=query)
            return {"msg": "success",
                    "content": f"Xoá Nhóm Mặt Hàng <b>{Mathang['name']} thành công!</b>`"}
        except:
            return {"msg": "error",
                    "content": f"Xoá Nhóm Mặt Hàng <b>{Mathang['name']} không thành công! Vui lòng xoá những mục liên quan đến mặt hàng trước.</b>`"}

    elif Mathang['action'] == 'getDanhmuc':
        query = f"SELECT * FROM 'DanhMuc';"
        result_data = classsend.get_curSQL('manager-order.db', query=query)
        return result_data
    elif Mathang['action'] == 'Order':
        # check lai giá trước khi add
        Mathang = Mathang['data']
        for Mathang in Mathang:
            # print(Mathang)
            thanhtoan = int(Mathang['price'])* int(Mathang['sl'])
            query = "INSERT INTO Listorder(date_new, Name, Price, SL, ThanhToan, Ghichu, Action, Thaotac, id_DM, Custom) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?,?)"
            args = (Mathang['date'], Mathang['name'], Mathang['price'], Mathang['sl'], thanhtoan,  Mathang['Ghichu'], 'CHAPNHAN', 'CHẤP NHẬN', Mathang['id_DM'], Mathang['Custom'])
            cur = get_curSQL('manager-order.db', query=query, args=args)
            task_id = cur.lastrowid
            # print(task_id)
            Topping_List_order = Mathang['Topping']
            Total_topping = 0
            if Topping_List_order != None:
                for item in Topping_List_order:
                    args = (Mathang['date'], task_id, item['nameTopping'], item['Topping_SL'])
                    query = "INSERT INTO ListorderTopping(date_new, id_list_order, NameTopping, SL) VALUES (?,?,?,?)"
                    get_curSQL('manager-order.db', query=query, args=args)
                    # print(item)
            await manager.broadcast(Mathang, token, current_user)
    elif Mathang['action'] =='popup-mathang':
        result_data = {}
        query = f"SELECT * FROM 'DanhMuc' ORDER BY name COLLATE NOCASE;"
        danhmuc = classsend.get_curSQL('manager-order.db', query=query)
        # print(danhmuc)
        result_data['danhmuc'] = danhmuc
        query = f"SELECT * FROM 'Nguyenlieu' ORDER BY name COLLATE NOCASE;"
        Nguyenlieu = classsend.get_curSQL('manager-order.db', query=query)
        # print(result_data)
        result_data['nguyenlieu'] = Nguyenlieu
        query = f"SELECT * FROM 'MatHang' WHERE Danhmuc='Topping' ORDER BY 'name' COLLATE NOCASE;"
        MatHang = classsend.get_curSQL('manager-order.db', query=query)
        result_data['mathang'] = MatHang
        # print(result_data)
        return result_data
    elif Mathang['action'] =='mobanMH':
        query = f'''UPDATE MatHang SET moban='{Mathang['mobanMH']}' WHERE id='{Mathang['id']}';'''
        classsend.get_curSQL('manager-order.db', query=query)
        # await manager.broadcast(cashier, token, current_user)
        return {"msg": "Successfully kho"}
    elif Mathang['action'] == 'lock_MH':
        query = f'''UPDATE MatHang SET lock='{Mathang['lock']}', moban='{Mathang['moban']}' WHERE id='{Mathang['id']}';'''
        classsend.get_curSQL('manager-order.db', query=query)
        # await manager.broadcast(cashier, token, current_user)
        return {"msg": "Successfully kho"}
    elif Mathang['action'] == 'new_timer':
        query = f"""INSERT INTO HengioMH(id_MH, gioban, giongung) VALUES(?, ?, ?)"""
        args = (Mathang['id_MH'], Mathang['gioban'], Mathang['giongung'])
        cur = get_curSQL('manager-order.db', query=query, args=args)
        task_id = cur.lastrowid
        return task_id
    elif Mathang['action'] == 'get_timer':
        query = f"SELECT * FROM 'HengioMH' WHERE id_MH='{Mathang['id_MH']}';"
        result_data = classsend.get_curSQL('manager-order.db', query=query)
        return result_data
    elif Mathang['action'] == 'del_timer':
        query = f"DELETE FROM 'HengioMH' WHERE id='{Mathang['id_timer']}';"
        result_data = classsend.get_curSQL('manager-order.db', query=query)
        return result_data
    elif Mathang['action'] == 'on_off_timer':
        query = f'''UPDATE 'MatHang' SET OpenHengio='{Mathang['OpenHengio']}'  WHERE id='{Mathang['id_MH']}';'''
        classsend.get_curSQL('manager-order.db', query=query)

# ------------------------------------------------ manager bi-a ----------------------------------------------------#
@app_api.post('/Bi-a')
# async def post_mathang(payload: dict = Body(...), Authorize: AuthJWT = Depends()):
async def manager_Bia(request: Request, Authorize: AuthJWT = Depends()):
# async def post_mathang(arbitrary_json: JSONObject = None, Authorize: AuthJWT = Depends()):
#     Authorize.jwt_required()
#     current_user = Authorize.get_jwt_subject()
    Authorize.jwt_required()
    current_user = Authorize.get_jwt_subject()
    token = request.cookies['refresh_token_cookie']

    Bia = await request.json()

    #------ func check sql injection ---------#
    # check = check_dict_sqlinjection(Mathang)
    # if check!= True:
    #     return check

    # classsend = Sqlite(database='manager-order.db')
    # print(Mathang)
    # token = request.cookies['refresh_token_cookie']

    # tuples= ("Sting", "cam ép")


    if (Bia['action'] == 'newMH'):
        pass
        # if Mathang['danhmuc_MH']=='Chọn làm Topping':
        #     Mathang['danhmuc_MH']= 'Topping'
        # cur.execute("INSERT INTO MatHang(name, price, photo, Danhmuc) VALUES(?, ?, ?, ?)",
        #             (Mathang['ten_MH'], Mathang['price_MH'], Mathang['photo'], Mathang['danhmuc_MH']))
        # task_id = cur.lastrowid
        #
        # data_array_nguyenlieu = []
        # nguyenlieu= Mathang['nguyenlieu_MH']
        # for item in nguyenlieu:
        #     tuple=(task_id, item['v'], Mathang['ten_MH'], Mathang['danhmuc_MH'], item['k'])
        #     data_array_nguyenlieu.append(tuple)
        # # print(data_array_nguyenlieu)
        #
        # data_array_topping = []
        # Topping_MH = Mathang['Topping_MH']
        # if Topping_MH != None:
        #     for item in Topping_MH:
        #         tuple = (task_id, item['k'],  item['v'], item['DG'])
        #         cur.execute(f"""INSERT INTO ToppingMH(MatHang_ID, nameTopping, Topping_SL, Topping_DG)
        #                                      VALUES {tuple};""")
        #
        # #-------- insert nguyenlieu ------------#
        # cur.executemany(f"""INSERT INTO NguyenLieuMH(MatHang_ID, NguyenLieu_ID, nameNL, Soluong, NameMH, Danhmuc)
        #                  SELECT ?, id, name, ?, ?, ?
        #                   FROM NguyenLieu
        #                   WHERE name = ?""", data_array_nguyenlieu)
        # con.commit()
        # return {"msg": "success", "content": f"<i class='ti-check' style='font-weight: bold;'> </i>Tạo Mặt Hàng <b>{Mathang['ten_MH']} thành công</b>`"}
    elif Bia['action'] == 'getBia':
        pass
        query = f"SELECT * FROM 'table_bia';"
        result_data = get_curSQL('manager-bia.db', query=query)
        # print(result_data)
        for i in range(len(result_data)):
            query = f"""SELECT * FROM Listorder WHERE Custom= '{result_data[i]['name']}';"""
            list_order = classsend.get_curSQL('manager-order.db', query=query)
            result_data[i]['list_order'] = list_order

            for j in range(len(list_order)):
                query = f"""SELECT Topping.NameTopping, Topping.SL, MatHang.price Topping_DG, MatHang.id
                                                                  FROM ListorderTopping Topping
                                                                  inner join MatHang on MatHang.name = Topping.NameTopping
                                                                  WHERE Topping.id_list_order = '{list_order[j]['Id']}'"""
                sub_data = classsend.get_curSQL('manager-order.db', query=query)
                # print(sub_data)
                result_data[i]['list_order'][j]['Topping'] = sub_data
            df = pd.DataFrame(result_data[i]['list_order'])
            print(df)
        # print(result_data)
        return result_data
    elif Bia['action'] == 'getBia_dangsudung':
        pass
        query = f"SELECT name, group_bia, id_table, date_begin FROM 'table_bia' WHERE trangthai='TÍNH TIỀN';"
        result_data = get_curSQL('manager-bia.db', query=query)
        # print(result_data)

        return result_data

# ------------------------------- Sort list ------------------------------------#
@app_api.post('/sortlist')
async def post_sortlist(request: Request, Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()
    current_user = Authorize.get_jwt_subject()
    # print(kho.stt)
    token = request.cookies['refresh_token_cookie']
    sortlist = await request.json()
    # print(khuyenmai)
    if (sortlist['action'] == 'new_sort'):
        args = (sortlist['name'], str(sortlist['sort']))
        query = "INSERT INTO Sort_list(name, sort) VALUES(?, ?)"
        cur = get_curSQL('manager-order.db', query=query, args=args)
        # task_id = cur.lastrowid
        # if khuyenmai['loaiKM']=='Nhập Mã':
        #     args = (task_id, khuyenmai['name_KM'], khuyenmai['phantram'])
        #     query = "INSERT INTO magiamgia(id_KM, nameKM, phantramKM) VALUES(?, ?, ?)"
        #     classsend.get_curSQL('manager-order.db', query=query, args=args)
        #await manager.broadcast(danhmuc, token, current_user)
        return {"msg": "success", "content": f"Tạo Khuyến Mãi <b>{sortlist['name']} thành công</b>`"}
    elif (sortlist['action'] == 'update_sort'):
        print(sortlist)
        query = f'''UPDATE 'Sort_list' SET sort= '{str(sortlist['sort'])}' WHERE id_sort = '{sortlist['id']}';'''#{str(sortlist['id'])}
        classsend.get_curSQL('manager-order.db', query=query)
        # await manager.broadcast(cashier, token, current_user)
        return {"msg": "Successfully kho"}
    elif (sortlist['action'] =='get_sort'):
        try:
            query = f"""SELECT *
                            FROM 'Sort_list'
                            WHERE id_sort='{sortlist['id']}';"""
            result_data = classsend.get_curSQL('manager-order.db', query=query)
            # print(result_data)
            return result_data
        except:
            query = f"""SELECT *, Nhom.name
                            FROM 'khuyenmaiMH' 
                            inner join Nhom on Nhom.id_nhom = khuyenmaiMH.id_nhom ;"""
            result_data = classsend.get_curSQL('manager-order.db', query=query)
            # print(result_data)
            return result_data
# ------------------------------- Sort list ------------------------------------#
@app_api.post('/tuychinh')
async def post_tuychinh(request: Request, Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()
    current_user = Authorize.get_jwt_subject()
    # print(kho.stt)
    token = request.cookies['refresh_token_cookie']
    tuychinh = await request.json()
    print(tuychinh)

    if (tuychinh['action'] == 'hienthitonkho'):
        # print(sortlist)
        query = f"""UPDATE 'Tuychinh' SET hienthitonkho= '{tuychinh['checked']}'"""
        classsend.get_curSQL('manager-order.db', query=query)
        # await manager.broadcast(cashier, token, current_user)
        return {"msg": "Successfully kho"}
    elif (tuychinh['action'] == 'hienthimenu_dichvu'):
        # print(sortlist)
        query = f"""UPDATE 'Tuychinh' SET hienthimenu_dichvu= '{tuychinh['checked']}'"""
        classsend.get_curSQL('manager-order.db', query=query)
        # await manager.broadcast(cashier, token, current_user)
        return {"msg": "Successfully kho"}
    elif (tuychinh['action'] == 'hienthi_menugame'):
        # print(sortlist)
        query = f"""UPDATE 'Tuychinh' SET hienthi_menugame= '{tuychinh['checked']}'"""
        classsend.get_curSQL('manager-order.db', query=query)
        # await manager.broadcast(cashier, token, current_user)
        return {"msg": "Successfully kho"}
    elif (tuychinh['action'] == 'default_menu'):
        # print(sortlist)
        query = f"""UPDATE 'Tuychinh' SET default_menu= '{tuychinh['checked']}'"""
        classsend.get_curSQL('manager-order.db', query=query)
        # await manager.broadcast(cashier, token, current_user)
        return {"msg": "Successfully kho"}
    elif (tuychinh['action'] =='get_tuychinh'):
        query = f"""SELECT *
                        FROM 'Tuychinh'"""
        result_data = classsend.get_curSQL('manager-order.db', query=query)
        # print(result_data)
        return result_data



# --------------------- ftp server ------------------------#
from pyftpdlib.authorizers import DummyAuthorizer
from pyftpdlib.handlers import FTPHandler
from pyftpdlib.servers import FTPServer
#First .py module
class ftp_server:
   def __init__(self):
       self.authorizer = DummyAuthorizer()
       self.authorizer.add_user('admin', 'password', '.', perm='elradfmwM')

   def run(self):
       self.handler = FTPHandler
       self.handler.authorizer = self.authorizer
       self.address = ('localhost', 21)
       self.server = FTPServer(self.address, self.handler)
       logging.basicConfig(filename='pyftpd.log', level=logging.INFO)
       self.server.serve_forever()

   def add_user(self,user,passwd,loc,privi):
       self.authorizer.add_user(str(user), str(passwd), str(loc), perm=str(privi))
def ftp():
    # Instantiate a dummy authorizer for managing 'virtual' users
    authorizer = DummyAuthorizer()

    # Define a new user having full r/w permissions and a read-only
    # anonymous user
    authorizer.add_user('user', '12345', '.', perm='elradfmwMT')
    authorizer.add_anonymous(os.getcwd())

    # Instantiate FTP handler class
    handler = FTPHandler
    handler.authorizer = authorizer

    # Define a customized banner (string returned when client connects)
    handler.banner = "pyftpdlib based ftpd ready."

    # Specify a masquerade address and the range of ports to use for
    # passive connections.  Decomment in case you're behind a NAT.
    #handler.masquerade_address = '151.25.42.11'
    #handler.passive_ports = range(60000, 65535)

    # Instantiate FTP server class and listen on 0.0.0.0:2121
    address = ('127.0.0.1', 21)
    server = FTPServer(address, handler)

    # set a limit for connections
    server.max_cons = 256
    server.max_cons_per_ip = 5

    # start ftp server
    server.serve_forever()
#Second .py module
# import thread
# import create_ftp_server

# this_ftp = ftp_server()

# threading.Thread(daemon=True, target=ftp).start()
# threading.Thread.start_new_thread(this_ftp.run,())
# threading.Thread.start_new_thread(this_ftp.add_user,('user','password',".",'elradfmwM'))
''''''
# import os
#
# # dictionary = {}
# dictionary = []
# path = "D:/"
#
#
# def is_dictionary(path):
#     try:
#         os.chdir(path)
#         return True
#
#     except:
#         return False
#
#
# def RecursiveFuncs(data, path):
#     f = os.listdir(path)
#     if f != {}:
#         for i in f:
#             if is_dictionary(f"{path}/{i}"):
#                 if os.listdir(f"{path}/{i}") != []:
#                     data[i] = {}
#                     RecursiveFunc(data[i], f"{path}/{i}")
#
#                 else:
#                     data[i] = 'Empty'
#
#
# def RecursiveFunc(data, path):
#     f = os.listdir(path)
#     index = 0
#     for i in f:
#
#         if is_dictionary(f"{path}/{i}"):
#             if os.listdir(f"{path}/{i}") == []:
#                 data.append(str(i))
#
#
#             else:
#
#                 data.append({i: []})
#                 RecursiveFunc(data[index][i], f"{path}/{i}")
#
#             index += 1
# RecursiveFunc(dictionary, path)
#
# print(str(dictionary))

# ---------------------------- stream same socket ----------------------------#
''''''
# import pathlib
# desktop = pathlib.Path("D:/")
# desktop.iterdir()
# list(desktop.iterdir())
# for item in desktop.iterdir():
#     print(f"{item} - {'dir' if item.is_dir() else 'file'}")

# desktop.rglob("*")
# list(desktop.rglob("*"))
# print(list(desktop.rglob("*")))




# from __future__ import annotations
from collections import defaultdict
clients = defaultdict(list)
COUNTER = 0
STREAM_DELAY = 1  # second
RETRY_TIMEOUT = 15000  # milisecond

MESSAGE_STREAM_DELAY = 1  # second
MESSAGE_STREAM_RETRY_TIMEOUT = 15000  # milisecond
@app_api.get('/KLMenu/stream')
async def message_stream(request: Request):
    def new_messages():
        # Check if data in table
        query = f"""SELECT COUNT(*) as total FROM Listorder;"""
        task_id = get_curSQL('manager-order.db', query=query)
        global COUNTER
        # print(task_id[0]['total'], COUNTER)
        if task_id[0]['total'] == COUNTER:
            return None
        else:
            COUNTER = task_id[0]['total']
            return True
    # get đúng value của data cần rồi send nó khác cách dùng socket
    async def event_generator():
        while True:
            # print('test callback')
            # If client was closed the connection
            if await request.is_disconnected():
                break
            # Checks for new messages and return them to client if any
            if new_messages():
                # print('send order')
                yield {
                    "event": "new_message",
                    "id": "message_id",
                    "retry": MESSAGE_STREAM_RETRY_TIMEOUT,
                    "data": COUNTER,
                }
            await asyncio.sleep(STREAM_DELAY)

    return EventSourceResponse(event_generator())



# class EmitEventModel(BaseModel):
#     event_name: str
#     event_data: Optional[str] = "No Event Data"
#     event_id: Optional[int] = None
#     recipient_id: str


# async def retrieve_events(recipient_id: str) -> NoReturn:
#     yield dict(data="Connection established")
#     while True:
#         if recipient_id in clients and len(clients[recipient_id]) > 0:
#             yield clients[recipient_id].pop()
#         await asyncio.sleep(1)
#         print(clients)

#
# @app.get("/subscribe/{recipient_id}")
# async def loopBackStream(req: Request, recipient_id: str):
#     return EventSourceResponse(retrieve_events(recipient_id))
#
#
# @app.post("/emit")
# async def emitEvent(event: EmitEventModel):
#     clients[event.recipient_id].append(event)
''''''
# ---------------------------- socket_order ----------------------------------#
from typing import List, Dict
# Khởi tạo danh sách các socket đã kết nối
class ConnectionManagers:
    def __init__(self):
        self.active_connections: Dict[str, WebSocket] = {}

    async def connect(self, websocket: WebSocket, ws_token: str, curent_user: str):
        await websocket.accept()
        temp_socket = {
            'token' : ws_token,
            'socket': websocket
        }
        # await websocket.send_text("Successfully Login!")
        # await websocket.send_text('{"date": "12:44:30, 6/2/2023", "custom": "Order_Tại_Quầy", "mathang": "Amazing Pizza1", "action": "THU TIỀN", "nv_order": "Nv Thiên Thần"}')
        # await websocket.send_json({"date": "12:44:30, 6/2/2023", "custom": "Order_Tại_Quầy", "mathang": "Amazing Pizza1", "action": "THU TIỀN", "nv_order": "Nv Thiên Thần"})
        self.active_connections[str(curent_user)] = temp_socket
        print(self.active_connections[str(curent_user)]['token'])
    def disconnect(self, ws_token: str, curent_user: str):
        # self.active_connections[ws_token].close()
        self.active_connections.pop(curent_user)
    async def send_message(self, data: str, ws_token: str, curent_user: str):
        socket = self.active_connections.get(curent_user) # { đây là lâấy giá trị của key trong dict }
        # self.active_connections[ws_token]= socket { day la set value cho key trong dict }
        print(f"ws_token: {curent_user} data {data} sockets {socket} \n")
        if socket:
            if isinstance(data, dict):
                data = json.dumps(data)
                await socket.send_json(data)
            elif isinstance(data, str):
                data = data
                await socket.send_text(data)
            else:
                data = json.dumps(json.loads(data.json()), ensure_ascii=False)
                await socket.send_json(data)
    async def broadcast(self, data: str, ws_token: str, curent_user: str):
        # print(type (data), type(json.dumps(data, indent = 4 )))
        try:
            value = json.dumps(json.loads(data.json()), ensure_ascii=False)
        except:
            value = json.dumps(data, ensure_ascii=False)
        # print(type(json.loads(data.json())), data)
        for user in self.active_connections:
            # socket = self.active_connections.get(str(connection))
            socket = self.active_connections[user]['socket']
            token = self.active_connections[str(curent_user)]['token']
            # await socket.send_json(json.loads(data.json()))
            # print(curent_user, "\n", user)
            if curent_user != user:# and socket:
                await socket.send_text(value)

    def showlist_connect(self):
        # print(self.active_connections)
        return self.active_connections
manager = ConnectionManagers()

@app_api.websocket('/ws')
async def websocket(websocket: WebSocket, token: str = Query(...), Authorize: AuthJWT = Depends()):
    try:
        decoded_token = Authorize.get_raw_jwt(token)
    except Exception as err:
        raise InvalidHeaderError(status_code=422, message=str(err))
    curent_user = decoded_token['sub']
    await manager.connect(websocket, token, curent_user)
    try:
        # Authorize.jwt_required("websocket",token=token)
        # Authorize.jwt_optional("websocket",token=token)
        Authorize.jwt_refresh_token_required("websocket",token=token)
        # Authorize.fresh_jwt_required("websocket",token=token)
        while websocket.client_state.CONNECTED:
            data = await websocket.receive_text()
            # data = await self.active_connections[str(ws_token)].receive_text()
            # await websocket.send_json(resp)

    except AuthJWTException as err:
        # await websocket.send_text(err.message)
        # await websocket.close()
        manager.disconnect(token, curent_user)

    except WebSocketDisconnect as err:
        # await websocket.close()
        manager.disconnect(token, curent_user)




#------------------------ anti sql inject protection --------------------------#

def prevent_sql_injection(user_input):
    # Kiểm tra xem user_input có chứa các ký tự đặc biệt không
    special_characters = ['*', '+', '-', '<', '>', '=', ';', ':', '"', '\'', '\\', '/', '%', '$', '@', '#', '^', '&', '.']
    for character in special_characters:
        if character in user_input:
            return False
    # Nếu không có ký tự đặc biệt, trả về True
    return True
def sqlite_injection_protection(query):
    # Kiểm tra xem câu truy vấn có chứa các từ khóa nhạy cảm như 'drop', 'update', 'delete', 'insert' hay không
    keywords = ['drop', 'update', 'delete', 'insert']
    for keyword in keywords:
        if type(query) != bool:
            if keyword in query.lower():
                return {"msg": "error", "content": f"<i class='ti-alert' style='font-weight: bold;'> </i> <b>Không được dùng kí tự {keyword} </b>`"}
    # Kiểm tra xem câu truy vấn có chứa các ký tự đặc biệt như ';', '--', '/*' hay không
    special_characters = [';', '--', '/*', '"="', "'='"]
    for char in special_characters:
        if type(query) != bool:
            if char in query:
                return {"msg": "error",
                        "content": f"<i class='ti-alert' style='font-weight: bold;'> </i> <b>Không được dùng kí tự {char} </b>`"}

    # Nếu câu truy vấn không chứa các từ khóa nhạy cảm và các ký tự đặc biệt, trả về True
    return True
def check_dict_sqlinjection(dict):
    if (dict!=None):
        for key in dict:
            # print(key, dict[key])
            if type(dict[key]) == list:
                for key_child in dict[key]:
                    value = sqlite_injection_protection(dict[key][key_child])
                    return value
            else:
                value = sqlite_injection_protection(dict[key])
                return value
    else:
        return True



#------------------------------- set page old ----------------------------------#
def setpage(pagetemp, iprequest):
    print(iprequest)
    if pagetemp == 'gameonline':
        gameonlinea = gameonline('')
        return gameonlinea
    elif pagetemp == 'gameoffline':
        gameofflinea = gameoffline('')
        return gameofflinea
    elif pagetemp == "changeline":
        return menuchangeline(iprequest)
    else:
        games = searchgame(pagetemp)
        gamesa="""<h style="color: white;">Không tìm được game</h>"""
        return games
def gameonline(contentphu):
    # video = openfilea('particles.mp4')
    # cur.execute("SELECT * FROM Listgame WHERE Groupgame = 'Game Online' order by CAST(ID AS INTEGER)")
    # getdata = cur.fetchall()
    getdata = classsend.gameonline(contentphu)
    for i in range(len(getdata)):
        tengame = str(getdata[i].get('Tengame'))
        if len(tengame) > 35:
            tengame = str(getdata[i].get('Tengame'))[:35] + "..."
        blob = getdata[i].get('imagedata')
        hinh = ''
        try:
            hinh = base64.b64encode(eval(blob)).decode()
        except:
            hinh = base64.b64encode(blob).decode()
        content1 = f"""
        
            <div class="box">
                <div class="box-img">
                    <img src="data:image/png;base64,{hinh}" onerror="this.src='https://i.imgur.com/NhGzwjO.gif';this.onerror='';"/>
                </div>
                <div class="tengame">
                    <span>{getdata[i].get('Groupgame')}</span>
                    <h3 class="name">{tengame}</h3>
                    <h3 class="theloai">{getdata[i].get('Category')}</h3>
                    <h3 class="luotchoi" >&#9734; {getdata[i].get('Luotplay')}</h3>
                </div>
                <div class="content">
                    <h3>{tengame}</h3>
                    <p>{getdata[i].get('Category')}</p>
                </div>
                <div class="button" >
                    <li><button class="b1" onClick="call('filerun{getdata[i].get('ID')}')">Play Game</button></li>
                    <li><button class="b1" onClick="call('openfolder{getdata[i].get('ID')}')")>Open Folder</button></li>
                </div>
            </div>
        """
        contentphu += str(content1)
    return contentphu
def gameoffline(contentphu):
    # cur.execute("SELECT * FROM Listgame WHERE Groupgame = 'Game Offline' order by CAST(ID AS INTEGER)")
    # getdata = cur.fetchall()
    getdata = classsend.gameoffline(contentphu)
    for i in range(len(getdata)):
        tengame = str(getdata[i].get('Tengame'))
        if len(tengame) > 40:
            tengame = str(getdata[i].get('Tengame'))[:40] + "..."

        blob = getdata[i].get('imagedata')
        hinh = ''
        try:
            hinh = base64.b64encode(eval(blob)).decode()
        except:
            hinh = base64.b64encode(blob).decode()
        content1 = f"""         <div class="box">
                                   <div class="box-img">
                                       <img src="data:image/png;base64,{hinh}" onerror="this.src='https://i.imgur.com/NhGzwjO.gif';this.onerror='';">
                                   </div>
                                   <div class="tengame_off">
                                       <span>{getdata[i].get('Groupgame')}</span>
                                        <h3 class="name">{tengame}</h3>
                                        <h3 class="theloai">{getdata[i].get('Category')}</h3>
                                        <h3 class="luotchoi" >&#9734; {getdata[i].get('Luotplay')}</h3>
                                    </div>
                                    <div class="content">
                                        <h3>{tengame}</h3>
                                        <p>{getdata[i].get('Category')}</p>
                                    </div>
                                    <div class="button" >
                                        <li><button class="b1" onClick="call('filerun{getdata[i].get('ID')}')">Play Game</button></li>
                                        <li><button class="b1" onClick="call('openfolder{getdata[i].get('ID')}')")>Open Folder</button></li>
                                    </div>
                                </div>"""
        contentphu += str(content1)
    return contentphu
def searchgame(contentphu):
    getdata = classsend.searchgame(contentphu)
    contentphu = ''
    for i in range(len(getdata)):
        tengame = str(getdata[i].get('Tengame'))
        if len(tengame) > 35:
            tengame = str(getdata[i].get('Tengame'))[:35] + "..."
        Group = 'tengame'
        if getdata[i].get('Groupgame') == 'Game Offline':
            Group = 'tengame_off'
        blob = getdata[i].get('imagedata')
        hinh = ''
        try:
            hinh = base64.b64encode(eval(blob)).decode()
        except:
            hinh = base64.b64encode(blob).decode()
            #<div class="{Group}">
        content1 = f"""         
                        <div class="box">
                           <div class="box-img">
                               <img src="data:image/png;base64,{hinh}" onerror="this.src='https://i.imgur.com/NhGzwjO.gif';this.onerror='';">
                           </div>
                           <div class="{Group}">
                               <span>{getdata[i].get('Groupgame')}</span>
                                <h3 class="name">{tengame}</h3>
                                <h3 class="theloai">{getdata[i].get('Category')}</h3>
                                <h3 class="luotchoi" >&#9734; {getdata[i].get('Luotplay')}</h3>
                            </div>
                            <div class="content">
                                <h3>{tengame}</h3>
                                <p>{getdata[i].get('Category')}</p>
                            </div>
                            <div class="button" >
                                <li><button class="b1" onClick="call('filerun{getdata[i].get('ID')}')">Play Game</button></li>
                                <li><button class="b1" onClick="call('openfolder{getdata[i].get('ID')}')")>Open Folder</button></li>
                            </div>
                        </div>"""
        contentphu += str(content1)
    return contentphu
def menuchangeline(iprequest):
    import requests
    ipclient = iprequest.client.host
    # response = requests.get(url='http://' + f"{ipclient}" + ':8200/gateway')
    # gateway = str(response.json())
    gateway = ipclient
    print(iprequest)

    getdata = classsend.changline()
    contentphu =''
    for i in range(len(getdata)):
        Gateway = str(getdata[i].get('GateWay'))
        Network = str(getdata[i].get('Network'))
        DNS1 = str(getdata[i].get('DNS1'))
        DNS2= str(getdata[i].get('DNS2'))
        Speed= str(getdata[i].get('Speed'))
        note= str(getdata[i].get('Note'))
        id = 'checkbox'+str(i)
        check = ''
        if gateway == Gateway and i ==0:
            print('gateway', gateway)
            check = "checked"
        content1 = f"""
        		<label class="option_item">
        			<input id="{id}" type="checkbox" class="checkbox" {check} onclick="openPopup('{id}', '{Gateway}','{DNS1}','{DNS2}')">
        			<div class="option_inner facebook">
        				<div class="tickmark"></div>
        				<div class="boxchangeline">
        					<div class="icon">{Network}</div>
        					<div class="contentchangline facebook">
        						<h3>Speed: {Speed}</h3>
        						<p>Gateway: {Gateway}</p>
        						<p>DNS1: {DNS1}</p>
        						<p>DNS2: {DNS2}</p>
        						<h3>Fast internet for {note}</h3>
        					</div>
        				</div>
        			</div>
        		</label>"""
        contentphu += str(content1)
    divcontain = f"""<div class="container" id="cardinternet">{contentphu}</div>"""
    print('send xong gateway')
    return divcontain


# # hàm nhận nôi bô
new_df = Reading_sqlite_to_df('clientdata.db', 'AppNew')
len_begin = len(new_df)
new_df = new_df.to_dict('records')
app_api.state.new_df = new_df
@app_api.get("/get-dataframe/")
async def get_dataframe(request: Request):
    # print('get_dataframe', request.app.state.new_df)
    return request.app.state.new_df
@app_api.get("/set-dataframe/")
async def set_dataframe(request: Request):
    print('set_dataframe')
    new_df = Reading_sqlite_to_df('clientdata.db', 'AppNew')
    new_df = new_df.to_dict('records')
    app_api.state.new_df = new_df
    pass
def write_datasql():
    global len_begin
    import requests
    try:
        pass
        r = requests.get(url="http://" + f"{local_ip}" + ":8100/get-dataframe/")
        # print('out ',r.status_code, r.json())
        if r.status_code == 200:
            dfgoc = Reading_sqlite_to_df('clientdata.db', 'AppNew')
            # print(dfgoc)
            dict = r.json()
            new_df = pd.DataFrame(dict)

            if len(dfgoc) < len_begin:
                requests.get(url="http://" + f"{local_ip}" + ":8100/set-dataframe/")
                len_begin = len(new_df)
                print('xoa record')
            else:
                df_diff = pd.concat([new_df, dfgoc]).drop_duplicates(keep=False)
                if not df_diff.empty:
                    new_df.Status = dfgoc.Status
                    # print(new_df.Status)
                    Writing_df_to_sqlite(new_df, 'clientdata.db', 'AppNew')
                    print(new_df)
                    # set data cho fastapi
                    requests.get(url="http://" + f"{local_ip}" + ":8100/set-dataframe/")
                    len_begin = len(new_df)
                    # print('khac nhau')
                else:
                    # print('giong nhau')
                    pass
    except:
        pass

def start_web_app():
    uvicorn.run("Server-monitor:app_api", host=f"0.0.0.0", port=8100, reload=True, debug= False)#  reload=True, "Server-monitor:app_api" ,workers=1 , reload=True, log_level="info"
    # uvicorn.run(app_api, host="127.0.0.1", port=8100)
#-------------------------------------- Refesh service Resilio -------------------------------------#
def getService(name):
    service = None
    try:
        service = psutil.win_service_get(name)
        service = service.as_dict()
        # print("service", service)
    except Exception as ex:
        print(str(ex))
    return service
def Refesh_resilio():
    start = datetime.datetime.now()
    last = start
    last1 = start
    service_name = "rslsyncsvc"
    while True:
        now = datetime.datetime.now()
        if now - last > datetime.timedelta(seconds=60*60):
            last = now
            service = getService(service_name)
            if service and service['status'] == 'running':
                os.system(f'''net stop {service_name} /y && net start {service_name}''')
            else:
                os.system(f'''net start {service_name}''')
                print('Elapsed: ' + str(now - start))
        if now - last1 > datetime.timedelta(seconds=10):
            last1 = now
            write_datasql()
        time.sleep(5)


#--------------------------------------- send to server --------------------------------------------#
class connect_server(object):
    def __init__(self, url, port, keyServer, keyResilio):
        import requests
        requests.packages.urllib3.disable_warnings()
        self.url, self.port = url, port
        self.api_url = f"http://{self.url}:{self.port}"
        self.keyServer, self.keyResilio = keyServer, keyResilio
        self.session = requests.Session()
        self.session.verify = False
        # self.token, self.Status = self.check_lisent()
        # print('token', self.token)
        self.check_lisent()
        # threading.Thread(target=self.check_lisent).start()

    def login_App(self):
        global token #<== get biến token
        global Server_Status # <== get Status server
        print(self.keyServer, self.keyResilio)
        value = {'event_key': 'Login_App',
                 'Key': self.keyServer,
                 'Key_Resilio': self.keyResilio,
                 # 'HoTen': 'khaicafe',
                 # 'Email': 'khaicafe@gmail.com',
                 # 'Date_Create': datetime.now().strftime("%H:%M:%S, %d/%m/%Y"),
                 }
        r = self.session.get(url=self.url, params=value)
        print('login server status: ', r.status_code)
        value = r.json()
        print('login_server: ',value, '\n')
        if "rev_data" in value:
            Server_Status = value['rev_data']['Status']
            # print(Server_Status)
            if Server_Status == 'Ready':
                token = value['token']['accessToken']
                args = (value['rev_data']['Status'], value['rev_data']['Ngayhethan'])
                query = f"UPDATE Design SET Status=?, Ngayhethan=?"
                get_curSQL('datagame.db', query=query, args=args)
                service_name = "rslsyncsvckl"
                try:
                    pass
                    # subprocess.check_output(f'''net start {service_name}''', shell=True)
                except:
                    pass
                # Box_alert(f'Success', 'ok')
            else:
                token = ''
                # Qwidget_main = False  # biến ghi log đã khởi động xong
                if Server_Status == 'Hết hạn':
                    args = (value['rev_data']['Status'], value['rev_data']['Ngayhethan'])
                    query = f"UPDATE Design SET Status=?, Ngayhethan=?"
                    get_curSQL('datagame.db', query=query, args=args)
                    # Box_alert(f'Key has expired ! Please renew the software on the web https:\\Menukl.com')
                elif Server_Status == 'ERROR-submit':
                    # args = (value['rev_data']['Status'],)
                    query = f"UPDATE Design SET Status='{value['rev_data']['Status']}'"
                    get_curSQL('datagame.db', query=query)
                    # Box_alert(f'Key {Server_Status} ! Please renew the software on the web https:\\Menukl.com')

                # =========== stop service resilio ============#
                service_name = "rslsyncsvckl"
                try:
                    # subprocess.check_output(f'''net stop {service_name} /y''', shell=True)
                    pass
                except:
                    print('stop service resilio error')
                # subprocess.check_output(f'''net stop {service_name} /y && net start {service_name}''', shell=True)
            return token, value['rev_data']

    def check_lisent(self):
        while True:

            global token  # <== get biến token
            global Server_Status  # <== get Status server
            value = {'event_key': 'Login_App',
                     'Key': self.keyServer,
                     'Key_Resilio': self.keyResilio,
                     # 'HoTen': 'khaicafe',
                     # 'Email': 'khaicafe@gmail.com',
                     # 'Date_Create': datetime.now().strftime("%H:%M:%S, %d/%m/%Y"),
                     }
            r = self.session.get(url=self.url, params=value)
            print('login server status: ',r.status_code)
            value = r.json()
            # print('login_server: ',value, '\n')
            if "rev_data" in value:
                Server_Status = value['rev_data']['Status']
                self.Status = value['rev_data']
                if Server_Status == 'Ready':
                    self.token = value['token']['accessToken']
                    # args = (value['rev_data']['Status'], value['rev_data']['Ngayhethan'])
                    # query = f"UPDATE Design SET Status=?, Ngayhethan=?"
                    # get_curSQL('datagame.db', query=query, args=args)
                    # service_name = "rslsyncsvckl"
                    query = "SELECT * FROM listClient order by CAST(substr(IP, 10) AS NUMERIC)"
                    getdata = get_curSQL('clientdata.db', query=query)
                    # print('Ready', getdata)
                    getdata = json.dumps(getdata)
                    self.Set_infoPM(getdata)
                    # dfgoc = Reading_sqlite_to_df('clientdata.db', 'listClient')
                    # print(dfgoc)
                    try:
                        pass
                        # subprocess.check_output(f'''net start {service_name}''', shell=True)
                    except:
                        pass
                    # Box_alert(f'Success', 'ok')
                else:
                    token = ''
                    # Qwidget_main = False  # biến ghi log đã khởi động xong
                    if Server_Status == 'Hết hạn':
                        # args = (value['rev_data']['Status'], value['rev_data']['Ngayhethan'])
                        # query = f"UPDATE Design SET Status=?, Ngayhethan=?"
                        # get_curSQL('datagame.db', query=query, args=args)
                        print('het han')
                        # Box_alert(f'Key has expired ! Please renew the software on the web https:\\Menukl.com')
                    elif Server_Status == 'ERROR-submit':
                        # args = (value['rev_data']['Status'],)
                        # query = f"UPDATE Design SET Status='{value['rev_data']['Status']}'"
                        # get_curSQL('datagame.db', query=query)
                        # Box_alert(f'Key {Server_Status} ! Please renew the software on the web https:\\Menukl.com')
                        print('Error')
                    # =========== stop service resilio ============#
                    service_name = "rslsyncsvckl"
                    try:
                        # subprocess.check_output(f'''net stop {service_name} /y''', shell=True)
                        pass
                    except:
                        print('stop service resilio error')
                    # subprocess.check_output(f'''net stop {service_name} /y && net start {service_name}''', shell=True)
            time.sleep(60)
            # return token, value['rev_data']
    #          {'status': 'Invalid Signature get App', 'value-error':
    # ======================== get list game to Server ===========================#
    def Set_infoPM(self, listPC):
        value = {'event_key': 'Set_hardware_infoPC_App',
                 'token': self.token,
                 'listPC': listPC
                 }
        r = self.session.get(url=self.url, params=value)
        value = r.json()
        print("set_listpc ", value)
        # return value


    def get_infoPM(self):
        value = {'event_key': 'GetinfoPM_App',
                 'token': self.token,
                 }
        r = self.session.get(url=self.url, params=value)
        value = r.json()
        return value

    def get_listgame(self):
        value = {'event_key': 'Getlistgame_App',
                 'token': self.token,
                 }
        # r = requests.get(url=url, data=js.dumps(value))
        r = self.session.get(url=self.url, params=value)
        value = r.json()
        # print(r, value)
        return value

    def get_checkupdate(self):
        value = {'event_key': 'Get_checkupdate_App',
                 'token': self.token,
                 }
        # r = requests.get(url=url, data=js.dumps(value))
        r = self.session.get(url=self.url, params=value)
        value = r.json()
        ##### set data check version update #####
        data = value['rev_data'][0]
        args = (data['linkdown'], data['Version'])
        query = f"UPDATE Design SET linkdown=?,new_version=?"
        get_curSQL('datagame.db', query=query, args=args)
        return value

# test
# for item in os.listdir(r'E://tivi'):
#     if not os.path.isfile(os.path.join(path, item)):
#         print("Folder: ",item)
#     else:
#         # print("File: ",item)
#         pass
# # print(os.listdir(r'C:\python project\ServerMenu'))
# for disk in psutil.disk_partitions():
#     if disk.fstype:
#         print(disk.device)
# import psutil
# for disk in psutil.disk_partitions():
#     if disk.fstype:
#         print(disk.device, psutil.disk_usage(disk.mountpoint))

@app_api.post("/list_folder")
async def list_folder(request: Request):
    folder_name = await request.json()
    folder_name = folder_name['folder']
    # print(folder_name)
    folder= []
    if(folder_name==''):
        for disk in psutil.disk_partitions():
            if disk.fstype:
                # folder = disk.device
                folder.append(disk.device)
    else:
        try:
            for item in os.listdir(f'{folder_name}'):
                if not os.path.isfile(os.path.join(f'{folder_name}', item)):
                    print("Folder: ", item)
                    folder.append(item)
                else:
                    # print("File: ",item)
                    pass
        except:
            pass
    return folder





def loginserver_getToken():
    count = 0
    query = "SELECT * FROM Design"
    getdesign = get_curSQL('datagame.db', query=query)
    keyServer = getdesign[0]['KeyServer']
    keyResilio = getdesign[0]['keyResilio']
    url = 'https://script.google.com/macros/s/AKfycbyvhJU56RfOvbePo45F6aQQrF-ECdTkUY-K-ewmeBYPq9_6o6i8tLTDpv0IzipMCvptwQ/exec'
    get_api_server(url, keyServer, keyResilio)
    # while count <= 3:
    #     print('login server count: ', count, "\n")
    #     try:
    #         api =  get_api_server(url, keyServer, keyResilio)
    #         global Server_api
    #         Server_api = api
    #         # print('api ',api)
    #         count = 4
    #     except:
    #         count+=1
def get_api_server(url, keyServer, keyResilio):
    port = None
    api = connect_server(
        url=url,
        port=port,
        keyServer=keyServer,
        keyResilio=keyResilio,
    )
    return api


#sample_string = LOGO_KL.decode()
#print(LOGO_KL)
if __name__ == '__main__':
    # threading.Thread(daemon=True, target=loginserver_getToken).start()
    threading.Thread(daemon=True, target=Refesh_resilio).start()
    start_web_app()
    # hosttemp = path + "SV-host.py"
    # sys.argv = ["streamlit", "run", f"{hosttemp}", "--server.headless=true", "--global.developmentMode=false", "--server.port=8000"]
    # sys.exit(stcli.main())
    pass