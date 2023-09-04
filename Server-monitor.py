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
from pathlib import Path
from shutil import rmtree

import json
# import numpy as np
import pandas as pd
import psutil
# import streamlit.cli as stcli
import datetime
from datetime import timedelta, datetime
# from datetime import datetime
import pytz
# Path maker
# import stcli as stcli
from fastapi.middleware.cors import CORSMiddleware
# from starlette.websockets import WebSocket

# color terminal
import colorama
colorama.init()

if getattr(sys, 'frozen', False) and hasattr(sys, '_MEIPASS'):
    path = sys._MEIPASS + '/'

else:
    path = ''
# PathService = "C:\\Windows\\System32\\System"
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
# from starlette.testclient import TestClient
from sse_starlette.sse import EventSourceResponse
from fastapi.middleware.gzip import GZipMiddleware

counter_lock = asyncio.Lock()
counter = 0



# uvicorn_error = logging.getLogger("uvicorn.error")
# uvicorn_error.disabled = True
# uvicorn_access = logging.getLogger("uvicorn.access")
# uvicorn_access.disabled = True


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
class Sqlite(object):
    def __init__(self, database=None, args=None, query=None):
        Pass_sqlite = 'khaicafe'
        self.db ={
            "account.db":"account.db",
             "manager-bia.db":"manager-bia.db",
             "./Database_app/history.db":"./Database_app/history.db",
             "manager-order.db":"manager-order.db",
             "datagame.db":"datagame.db",
            "clientdata.db": "clientdata.db"
             }
        self.conn = {}
        self.curs = {}
        for item in self.db:
            # print(item)
            self.conn[item] = sqlite3.connect(self.db[item], check_same_thread=False)  # (":memory:"), check_same_thread=False
            # self.conn[item].text_factory = lambda b: b.decode(errors='ignore')
            self.conn[item].row_factory = dict_factory
            self.curs[item] = self.conn[item].cursor()
            self.curs[item].execute(f"PRAGMA key={Pass_sqlite}")
            self.curs[item].execute(f"PRAGMA busy_timeout = 15000")
            self.curs[item].execute(f"PRAGMA foreign_keys = ON")
            self.curs[item].execute(f"PRAGMA journal_mode=WAL")
            self.curs[item].execute(f"PRAGMA synchronous=normal")
            self.curs[item].execute(f"PRAGMA temp_store=memory")
            self.curs[item].execute(f"PRAGMA mmap_size=30000000000")
            self.curs[item].execute(f"PRAGMA optimize")
            self.curs[item].execute(f"PRAGMA temp_store = 2")
    def get_curSQL(self, database, args=None, query=None):
        if 'SELECT' in query:
            # query = (f"SELECT * FROM {table};")
            if args != None:
                self.curs[database].execute(query, args)
            else:
                self.curs[database].execute(query)
            getdata = self.curs[database].fetchall()
            return getdata
        elif 'UPDATE' in query:
            # arg = (1,)
            # query = f'''UPDATE {table} SET Crop_photo=?;'''
            if args != None:
                self.curs[database].execute(query, args)
            else:
                self.curs[database].execute(query)
        elif 'INSERT' in query:
            # args = (id, self.imagedata, Groupgame, tengame, theloai, pathgame, Argument, pathimage, 0)
            # query = f'INSERT INTO {table} VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?);'
            if args != None:
                self.curs[database].execute(query, args)
            else:
                self.curs[database].execute(query)
        elif 'DELETE' in query:
            # query = (f"DELETE FROM listClient Where IP='{idgame}';")
            if args != None:
                self.curs[database].execute(query, args)
            else:
                self.curs[database].execute(query)
        self.conn[database].commit()
        return self.curs[database]
    def get_cur_con(self, database):
        # cur = self.curs[database]
        # con = self.conn[database]
        return self.curs[database], self.conn[database]
    def init_database(self, database):
        if database!=None:
            self.db[database] = database
    def close_db(self):
        for item in self.db:
            self.conn[item].close()

classsend = Sqlite()

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
@app_api.on_event("shutdown")
def shutdown_event():
    classsend.close_db()

# ------------- nén data trước khi send tính bằng byte có thể thay thế bằng Redis----------------#
app_api.add_middleware(GZipMiddleware, minimum_size=1000)

# --------------------------- cache redis ----------------------#
'''
# from fastapi_cache import caches, close_caches
# from fastapi_cache.backends.redis import CACHE_KEY, RedisCacheBackend
#
# def redis_cache():
#     return caches.get(CACHE_KEY)
#
# @app_api.on_event('startup')
# async def on_startup() -> None:
#     rc = RedisCacheBackend('redis://redis')
#     caches.set(CACHE_KEY, rc)
#
#
# @app_api.on_event('shutdown')
# async def on_shutdown() -> None:
#     await close_caches()
'''


import diskcache as dc
cache = dc.Cache('tmp')

# cache['key'] = {'test': 'abc'}
# print(cache['key'])
#---------------- tương tự rabbitmq --------------------------#
'''
# from typing import Union
# from fastapi import BackgroundTasks, Depends
# def write_notification(email: str, message=""):
#     # with open("log.txt", mode="w") as email_file:
#     #     content = f"notification for {email}: {message}"
#     #     email_file.write(content)
#     print(f"notification for {email}: {message}")
#     time.sleep(10)
#     print(f"Xong for {email}: {message}")
#
# def get_query(background_tasks: BackgroundTasks, q: Union[str, None] = None):
#     if q:
#         message = f"found query: {q}\n"
#         print(message)
#         background_tasks.add_task(write_notification, message, message="some notification")
#     return q
#
# @app_api.post("/send-notification/{email}")
# async def send_notification(email: str, background_tasks: BackgroundTasks, q: str = Depends(get_query)):
#     background_tasks.add_task(write_notification, email, message="some notification")
#     # threading.Thread(daemon=True, target=lambda: background_tasks.add_task(write_notification, email, message="some notification")).start()
#     return {"message": "Notification sent in the background"}

'''

#------------------------------ SHOP -------------------------#
from pydantic import BaseModel
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
    print("\033[K", "\033[F", '\n', '\r')
    # print('\n', '\r')
    try:
        columns = table[0].keys()
        df = pd.DataFrame(table, columns=columns)
        print(df)
    except:
        print('error')


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
        cur = classsend.get_curSQL('account.db', query=query, args=args)
        task_id = cur.lastrowid
        # print(task_id)
        return {'username': create['name']}
    elif create['action'] == 'get_user':
        query = f"SELECT * FROM 'account';"
        result_data = classsend.get_curSQL('account.db', query=query)
        return  result_data

@app_api.post('/login')
def login(user: User, response: Response, Authorize: AuthJWT = Depends()):
    query = f"SELECT * FROM account WHERE name='{user.username}' AND pass='{user.password}';"
    # classsend = Sqlite(database='account.db')
    result_data = classsend.get_curSQL('account.db', query=query)
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
    cur = classsend.get_curSQL('manager-order.db', query=query, args=args)
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
'''
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
# max_row = classsend.get_curSQL('manager-order.db', query=query)
# df = pd.DataFrame(max_row)
# print(df)
# print(max_row)
# check từ ngày đến ngày
query = f"""SELECT Dathang.*, Mathang.price_MH
                        FROM Dathang
                        join Mathang on Mathang.id_MH = Dathang.id_MH
                        WHERE Dathang.date_new between '2023-04-08 00:00:00'
                                    AND '2023-04-08 23:59:59';"""


query = f"""SELECT Mathang.name_MH, Mathang.id_DM, Mathang.price_MH, Sub_KM.phantramKM, Danhmuc.color_DM
                                       FROM Mathang
                                       join Danhmuc on Danhmuc.id_DM = Mathang.id_DM
                                       LEFT OUTER JOIN Sub_nhom on Sub_nhom.id_MH = Mathang.id_MH
                                       LEFT OUTER JOIN Sub_KM on Sub_nhom.id_nhom = Sub_KM.id_nhom
                                       LEFT OUTER JOIN Nhom on Nhom.id_nhom = Sub_nhom.id_nhom
                                       WHERE Mathang.id_MH = '7'
                                       AND Sub_KM.id_KM = '1' 
                                       AND '2023-04-09 13:00:00' > Sub_KM.date_begin 
                                       AND '2023-04-09 13:00:00' < Sub_KM.date_end
                                       ;"""
# result_datas = classsend.get_curSQL('manager-order.db', query=query)
# print_table(result_datas)
# print(result_datas)
# result = result[0]
'''


# ------------------------------- Dathang khach hang ------------------------------------#
tz_VN = pytz.timezone('Asia/Ho_Chi_Minh')
datetime_VN = datetime.now(tz_VN).strftime('%Y-%m-%d %H:%M:%S')
timedelta_VN = datetime.strptime(datetime_VN, '%Y-%m-%d %H:%M:%S')# - datetime.now()
'''
# print(timedelta_VN, datetime_VN, (timedelta_VN- tmpdate).total_seconds())
import math
# print(datetime_VN.timedelta())
# datetime_VN = datetime.now(tz_VN).strftime('%m')
# print(datetime_VN)
# query = f"""INSERT INTO TotalBill (date, DoanhThu, DT_dichvu, DT_khac, DT_pc) VALUES ('{datetime_VN}', '123', '100000','0','0')
# ON DUPLICATE KEY UPDATE (date='{datetime_VN}', DoanhThu='123000', DT_dichvu=100000', DT_khac='0', DT_pc='0');"""
# tz_VN = pytz.timezone('Asia/Ho_Chi_Minh')
# datetimedd = datetime.now(tz_VN).strftime('%Y-%m-%d')
# print(datetimedd)
# query = f"""INSERT INTO TotalBill (date, DoanhThu, DT_dichvu, DT_khac, DT_khac) VALUES ('{datetimedd}', '12220030', '100000','0','0')
# ON CONFLICT (date) DO UPDATE SET DoanhThu='123022220', DT_dichvu='100000', DT_khac='0', DT_pc='0';"""
# classsend.get_curSQL('./Database_app/history.db', query=query)
# yesterday = datetime.today() - timedelta(days=1)
# print(yesterday)
# cộng string
# query = f"""UPDATE 'NguyenLieu' SET id_Thaotac='0', name_NL = name_NL||' (Đã Xoá)' WHERE id_NL='11';"""
# classsend.get_curSQL('manager-order.db', query=query)

'''

@app_api.post('/dathang')
async def get_allorder(request: Request, Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()
    current_user = Authorize.get_jwt_subject()
    token = request.cookies['refresh_token_cookie']
    # classsend = Sqlite(database='manager-order.db')
    action = await request.json()

    if action['action'] == 'get-DH':
        query = f"""SELECT COUNT(*) as TotalRow
                          FROM Dathang;
                          """
        max_row = classsend.get_curSQL('manager-order.db', query=query)
        # print(max_row)
        # query = f"SELECT a.*, (SELECT color FROM DanhMuc WHERE DanhMuc.name = a.Danhmuc) AS color FROM Listorder a ORDER BY 'Date' DESC;"
        # phân trang trong table dùng query
        # query = f"SELECT a.*, (SELECT color FROM DanhMuc WHERE DanhMuc.name = a.Danhmuc) AS color FROM Listorder a where rowid in (select rowid from Listorder ORDER BY 'Date' DESC limit {action['pagesize']} OFFSET {action['page']*action['pagesize']});"
        # cách này lấy từ cuối danh sách
        # query = f"SELECT a.*, (SELECT color FROM DanhMuc WHERE DanhMuc.name = a.Danhmuc) AS color FROM Listorder a where rowid in (select rowid from Listorder ORDER BY datetime(Date) DESC limit {action['pagesize']} OFFSET {max_row[0]['TotalRow']-action['pagesize']-(action['page']*action['pagesize'])});"
        # cách này lấy từ đầu danh sách
        # query = f"SELECT a.*, (SELECT color FROM DanhMuc WHERE DanhMuc.name = a.Danhmuc) AS color, (SELECT SUM(ThanhToan)AS Total FROM Listorder WHERE Huy_Don='0' AND Date=a.Date GROUP BY Date) AS Total_Bill FROM Listorder a ORDER BY datetime(Date) DESC limit {action['pagesize']} OFFSET {action['page']*action['pagesize']};"""
        #
        # query = f"""SELECT a.*, (SELECT color_DM FROM Danhmuc WHERE Danhmuc.id_DM = a.id_DM) AS color, (SELECT SUM(ThanhToan)AS Total FROM Dathang WHERE Huy_Don='0' AND date_new=a.date_new GROUP BY date_new) AS Total_Bill FROM Dathang a ORDER BY datetime(date_new) DESC limit {action['pagesize']} OFFSET {action['page'] * action['pagesize']};"""
        ''''''

        query = f"""SELECT Dathang.*, Danhmuc.color_DM          
                                    FROM Dathang
                                    inner join Danhmuc on Danhmuc.id_DM = Dathang.id_DM
                                    ORDER BY datetime(Dathang.date_new) DESC limit {action['pagesize']} OFFSET {action['page'] * action['pagesize']};"""
        result_data = classsend.get_curSQL('manager-order.db', query=query)
        # print_table(result_data)
        #
        # # ----------------------- get Khuyen mai ---------------------------#
        # query = f"""SELECT Nhom.id_nhom, Nhom.name_nhom, Sub_KM.id_KM, Sub_KM.id_KM,
        #                         Sub_KM.name_subKM, (Mathang.price_MH - (Mathang.price_MH * Sub_KM.phantramKM / 100)) As price_MH, Sub_KM.date_begin, Sub_KM.date_end
        #                                          FROM Sub_nhom
        #                                          inner join MatHang on MatHang.id_MH = Sub_nhom.id_MH
        #                                          inner join Sub_KM on Sub_nhom.id_nhom = Sub_KM.id_nhom
        #                                          inner join Nhom on Nhom.id_nhom = Sub_nhom.id_nhom
        #                                          WHERE Sub_nhom.id_MH = '{result_data[0]['id_MH']}';"""
        # sub_data = classsend.get_curSQL('manager-order.db', query=query)
        # print_table(sub_data)
        # result_data[i]['KhuyenMai'] = sub_data

        #------- get price topping -----------#
        for i in range(len(result_data)):
            query = f"""SELECT * FROM Sub_ToppingDH WHERE id_DH = '{result_data[i]['id_DH']}'"""
            sub_data = classsend.get_curSQL('manager-order.db', query=query)
            result_data[i]['Topping'] = sub_data
        return {'listtable': result_data, 'TotalRow':max_row[0]['TotalRow']}
    elif action['action'] == 'dathang':
        # check lai giá trước khi add oki xư lý rồi
        # check soluong kho trước khi cho dat hàng
        # check khuyen mai
        tz_VN = pytz.timezone('Asia/Ho_Chi_Minh')
        datetime_VN = datetime.now(tz_VN).strftime('%Y-%m-%d %H:%M:%S')
        actions = action['data']
        for action in actions:
            # check khuyen mai
            print(action, datetime_VN)
            if action['date_new']==None:
                action['date_new'] = datetime_VN
            query =f"""WITH table_view AS (SELECT Mathang.name_MH, Mathang.id_DM, 
                        Mathang.price_MH,Sub_nhom.id_nhom,Danhmuc.name_DM,
                        Sub_KM.date_begin, Sub_KM.date_end, Sub_KM.id_KM,
                        CASE 
                             WHEN Sub_KM.id_KM = "1" 
                                AND '{action['date_new']}' > Sub_KM.date_begin 
                                AND '{action['date_new']}' < Sub_KM.date_end 
                                THEN Sub_KM.phantramKM
                             ELSE 0
                        END as phantramKM
                        FROM Mathang
                        LEFT OUTER JOIN Danhmuc on Danhmuc.id_DM = Mathang.id_DM
                        LEFT OUTER JOIN Sub_nhom on Sub_nhom.id_MH = Mathang.id_MH
                        LEFT OUTER JOIN Sub_KM on Sub_nhom.id_nhom = Sub_KM.id_nhom
                        LEFT OUTER JOIN Nhom on Nhom.id_nhom = Sub_nhom.id_nhom
                        WHERE Mathang.id_MH = '{action['id_MH']}')
                        SELECT name_MH, id_DM, price_MH, MAX(phantramKM) AS phantramKM, id_nhom, name_DM FROM table_view;"""
            temp_value = classsend.get_curSQL('manager-order.db', query=query)
            # print(temp_value[0])

            # check giá tuỳ chọn có hay không
            query = f"""INSERT INTO Dathang(date_new, id_ca, id_MH, price_TC, name_MH, name_DM, phantramKM, price_MH, id_nhom,id_DM,
                        soluong_MH, Ghichu, Action, Thaotac, id_table_custom, Custom, LoaiTT) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"""
            args = (action['date_new'], action['id_ca'], action['id_MH'],action['price_TC'], temp_value[0]['name_MH'], temp_value[0]['name_DM'],
                    temp_value[0]['phantramKM'], temp_value[0]['price_MH'], temp_value[0]['id_nhom'],
                    temp_value[0]['id_DM'], action['sl'], action['Ghichu'], 'CHAPNHAN', 'CHẤP NHẬN',action['id_table_custom'], action['Custom'], action['LoaiTT'])
            cur = classsend.get_curSQL('manager-order.db', query=query, args=args)
            task_id = cur.lastrowid
            # print(task_id)
            Topping_List_order = action['Topping']
            Total_topping = 0
            if Topping_List_order != None:
                for item in Topping_List_order:
                    query = f"""SELECT name_MH, price_MH FROM Mathang WHERE Mathang.id_MH = '{item['id_MH']}';"""
                    temp_value = classsend.get_curSQL('manager-order.db', query=query)
                    temp_value = temp_value[0]

                    args = (task_id, item['id_MH'], item['Topping_SL'], temp_value['name_MH'], temp_value['price_MH'])
                    query = "INSERT INTO Sub_ToppingDH(id_DH, id_MH, soluong_TPDH, name_MH, Topping_DG) VALUES (?, ?, ?, ?, ?)"
                    classsend.get_curSQL('manager-order.db', query=query, args=args)
                    # print(item)
            await manager.broadcast(action, token, current_user)
    elif action['action'] == 'getMH':
        # print(action)
        query = f"SELECT * FROM 'MatHang';"
        result_data = classsend.get_curSQL('manager-order.db', query=query)
        for i in range(len(result_data)):
            query = f"""SELECT a.nameNL, a.Soluong
                        FROM NguyenLieuMH a
                        WHERE a.MatHang_ID = '{result_data[i]['id']}'"""
            sub_data = classsend.get_curSQL('manager-order.db', query=query)

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

            sub_data = classsend.get_curSQL('manager-order.db', query=query)
            result_data[i]['Topping'] = sub_data
        # print(result_data, 'xong')
        return result_data
    elif action['action'] == 'getDM':
        query = f"SELECT * FROM 'DanhMuc';"
        result_data = classsend.get_curSQL('manager-order.db', query=query)
        return result_data
    elif action['action'] == 'getNV':
        # print(action)
        query = f"SELECT UserName FROM 'Account' WHERE Role='NV';"
        result_data = classsend.get_curSQL('datagame.db', query=query)
        return result_data
    elif action['action'] == 'getNL':
        # print(action)
        query = f"SELECT * FROM Nguyenlieu;"
        result_data = classsend.get_curSQL('manager-order.db', query=query)
        return result_data
    elif action['action'] == 'getLog_action':
        # print(action)
        query = f"SELECT * FROM Log_action;"
        result_data = classsend.get_curSQL('manager-order.db', query=query)
        return result_data
    elif action['action'] == 'check_DH':
        print(action)
        max_row =[]
        if action['Bia_thutiensau'] == 'unchecked':
            query = f"""SELECT * FROM Dathang WHERE Action='CHAPNHAN' OR
                                                    Action='THUTIEN';"""
            max_row = classsend.get_curSQL('manager-order.db', query=query)
        else:
            query = f"""SELECT * FROM Dathang WHERE (Action='CHAPNHAN' OR
                                                Action='THUTIEN') AND
                                                id_table_custom NOT like '%tableBia%'
                                                ;"""
            max_row = classsend.get_curSQL('manager-order.db', query=query)
        #     id_table_custom NOT like '%tableBia%'
        return max_row

# ------------------------------- cashier ------------------------------------#
@app_api.post('/cashier')
async def post_cashier(request: Request, Authorize: AuthJWT = Depends()):#cashier: Cashier,
    Authorize.jwt_required()
    current_user = Authorize.get_jwt_subject()
    cashier = await request.json()
    token = request.cookies['refresh_token_cookie']
    # classsend = Sqlite(database='manager-order.db')
    print('token: ', cashier)
    # current_user = Authorize.get_jwt_subject()

    if (cashier['action']=='IN'):
        query = f'''UPDATE Dathang SET Print='{cashier['thaotac']}' WHERE id_DH='{cashier['id']}';'''
        classsend.get_curSQL('manager-order.db', query=query)
        await manager.broadcast(cashier, token, current_user)
        return {"msg":"Successfully Print"}
    elif cashier['action'] == 'Search_Trangthai':
        query = f"""SELECT COUNT(*) as TotalRow
                                 FROM Dathang
                                 WHERE Action='{cashier['Thaotac']}';
                                 """
        max_row = classsend.get_curSQL('manager-order.db', query=query)
        # query = f"SELECT a.*, (SELECT color FROM DanhMuc WHERE DanhMuc.name = a.Danhmuc) AS color FROM Listorder a ORDER BY 'Date' DESC;"
        # phân trang trong table dùng query
        # query = f"SELECT a.*, (SELECT color FROM DanhMuc WHERE DanhMuc.name = a.Danhmuc) AS color FROM Listorder a where rowid in (select rowid from Listorder ORDER BY 'Date' DESC limit {action['pagesize']} OFFSET {action['page']*action['pagesize']});"
        # cách này lấy từ cuối danh sách
        # query = f"SELECT a.*, (SELECT color FROM DanhMuc WHERE DanhMuc.name = a.Danhmuc) AS color FROM Listorder a where rowid in (select rowid from Listorder ORDER BY datetime(Date) DESC limit {action['pagesize']} OFFSET {max_row[0]['TotalRow']-action['pagesize']-(action['page']*action['pagesize'])});"
        # cách này lấy từ đầu danh sách
        # query = f"SELECT a.*, (SELECT color FROM DanhMuc WHERE DanhMuc.name = a.Danhmuc) AS color, (SELECT SUM(ThanhToan)AS Total FROM Listorder WHERE Huy_Don='0' AND Date=a.Date GROUP BY Date) AS Total_Bill FROM Listorder a ORDER BY datetime(Date) DESC limit {action['pagesize']} OFFSET {action['page']*action['pagesize']};"""
        #
        # query = f"""SELECT a.*, (SELECT color FROM DanhMuc WHERE DanhMuc.id = a.id_DM) AS color, (SELECT SUM(ThanhToan)AS Total FROM Dathang WHERE Huy_Don='0' AND date_new=a.date_new GROUP BY date_new) AS Total_Bill FROM Dathang a WHERE Action='{cashier['Thaotac']}' ORDER BY datetime(date_new) DESC limit {cashier['pagesize']} OFFSET {cashier['page'] * cashier['pagesize']};"""
        # result_data = classsend.get_curSQL('manager-order.db', query=query)

        query = f"""SELECT Dathang.*, Danhmuc.color_DM          
                                            FROM Dathang
                                            inner join Danhmuc on Danhmuc.id_DM = Dathang.id_DM
                                            WHERE Action='{cashier['Thaotac']}' 
                                            ORDER BY datetime(Dathang.date_new) DESC limit {cashier['pagesize']} OFFSET {cashier['page'] * cashier['pagesize']};"""
        result_data = classsend.get_curSQL('manager-order.db', query=query)

        for i in range(len(result_data)):
            query = f"""SELECT * FROM Sub_ToppingDH WHERE id_DH = '{result_data[i]['id_DH']}'"""
            sub_data = classsend.get_curSQL('manager-order.db', query=query)
            result_data[i]['Topping'] = sub_data

        return {'listtable': result_data, 'TotalRow': max_row[0]['TotalRow']}
    elif cashier['action'] == 'Search_Danhmuc':
        query = f"""SELECT COUNT(*) as TotalRow
                                        FROM Dathang
                                        WHERE id_DM='{cashier['id_DM']}';
                                        """
        max_row = classsend.get_curSQL('manager-order.db', query=query)
        query = f"""SELECT Dathang.*, Danhmuc.color_DM          
                                                    FROM Dathang
                                                    inner join Danhmuc on Danhmuc.id_DM = Dathang.id_DM
                                                    WHERE Dathang.id_DM='{cashier['id_DM']}'
                                                    ORDER BY datetime(Dathang.date_new) DESC limit {cashier['pagesize']} OFFSET {cashier['page'] * cashier['pagesize']};"""
        result_data = classsend.get_curSQL('manager-order.db', query=query)

        for i in range(len(result_data)):
            query = f"""SELECT * FROM Sub_ToppingDH WHERE id_DH = '{result_data[i]['id_DH']}'"""
            sub_data = classsend.get_curSQL('manager-order.db', query=query)
            result_data[i]['Topping'] = sub_data
        return {'listtable': result_data, 'TotalRow': max_row[0]['TotalRow']}
    elif cashier['action'] == 'Search_Mathang':
        query = f"""SELECT COUNT(*) as TotalRow
                                                FROM Dathang
                                                WHERE id_MH='{cashier['id_MatHang']}';
                                                """
        max_row = classsend.get_curSQL('manager-order.db', query=query)
        query = f"""SELECT Dathang.*, Danhmuc.color_DM          
                                                   FROM Dathang
                                                   inner join Danhmuc on Danhmuc.id_DM = Dathang.id_DM
                                                   WHERE Dathang.id_MH='{cashier['id_MatHang']}' 
                                                   ORDER BY datetime(Dathang.date_new) DESC limit {cashier['pagesize']} OFFSET {cashier['page'] * cashier['pagesize']};"""
        result_data = classsend.get_curSQL('manager-order.db', query=query)

        for i in range(len(result_data)):
            query = f"""SELECT * FROM Sub_ToppingDH WHERE id_DH = '{result_data[i]['id_DH']}'"""
            sub_data = classsend.get_curSQL('manager-order.db', query=query)
            result_data[i]['Topping'] = sub_data
        return {'listtable': result_data, 'TotalRow': max_row[0]['TotalRow']}
    elif cashier['action'] == 'Search_NhomMathang':
        query = f"""SELECT COUNT(*) as TotalRow
                           FROM Dathang
                           WHERE id_MH in (SELECT id_MH FROM 'Sub_nhom' WHERE id_nhom= '{cashier['id_nhom']}')"""
        max_row = classsend.get_curSQL('manager-order.db', query=query)
        # print(max_row)
        query = f"""SELECT Dathang.*, Danhmuc.color_DM          
                                       FROM Dathang
                                       inner join Danhmuc on Danhmuc.id_DM = Dathang.id_DM
                                       WHERE Dathang.id_nhom='{cashier['id_nhom']}' 
                                       ORDER BY datetime(Dathang.date_new) DESC limit {cashier['pagesize']} OFFSET {cashier['page'] * cashier['pagesize']};"""
        result_data = classsend.get_curSQL('manager-order.db', query=query)

        for i in range(len(result_data)):
            query = f"""SELECT * FROM Sub_ToppingDH WHERE id_DH = '{result_data[i]['id_DH']}'"""
            sub_data = classsend.get_curSQL('manager-order.db', query=query)
            result_data[i]['Topping'] = sub_data
        return {'listtable': result_data, 'TotalRow': max_row[0]['TotalRow']}
        pass
    elif cashier['action'] == 'dropbox_search':
        result_data = {}
        query = f"SELECT * FROM 'Danhmuc' WHERE id_DM != '3' ORDER BY name_DM COLLATE NOCASE;"
        danhmuc = classsend.get_curSQL('manager-order.db', query=query)
        # print(danhmuc)
        result_data['danhmuc'] = danhmuc
        query = f"SELECT * FROM 'Nhom' ORDER BY name_nhom COLLATE NOCASE;"
        Nhom = classsend.get_curSQL('manager-order.db', query=query)
        # print(result_data)
        result_data['nhom'] = Nhom
        query = f"SELECT * FROM 'MatHang' WHERE id_DM != '3' ORDER BY 'name_MH' COLLATE NOCASE;"
        MatHang = classsend.get_curSQL('manager-order.db', query=query)
        result_data['mathang'] = MatHang
        # print(result_data)
        return result_data
    elif cashier['action'] == 'info-DoanhThu':
        query = f"SELECT * FROM Ca_NV WHERE id_ca = ( select max(id_ca) from Ca_NV );"
        result_data = classsend.get_curSQL('manager-order.db', query=query)
        return result_data
    elif cashier['action'] == 'HUY':
        query = f'''UPDATE Dathang SET date_thutien= '{cashier['date_thutien']}', Thaotac='{cashier['Thaotac']}', Action='{cashier['action']}', id_NV='{cashier['nv_order']}', id_ca='{cashier['id_ca']}', Huy_Don='{cashier['Huy_Don']}' WHERE id_DH='{cashier['id']}';'''
        classsend.get_curSQL('manager-order.db', query=query)

        query = f"SELECT * FROM 'Dathang' WHERE id_DH ='{cashier['id']}';"
        result_data = classsend.get_curSQL('manager-order.db', query=query)
        custom = result_data
        print(custom)
        await manager.broadcast(cashier, token, current_user)
        show_DT = get_doanhthu(cashier['id_ca'])
        # print(show_DT)
        return {"msg": "Successfully post", "DT": show_DT, 'custom': custom}
    elif cashier['action'] == 'HOANTHANH':
        put_HOANTHANH(cashier)
        show_DT = get_doanhthu(cashier['id_ca'])
        await manager.broadcast(cashier, token, current_user)
        return {"msg": "Successfully post", "DT": show_DT}
    elif cashier['action'] == 'THUTIEN' or cashier['action'] == 'CHAPNHAN':
        query =f'''UPDATE Dathang SET Thaotac='{cashier['Thaotac']}', Action='{cashier['action']}', id_NV='{cashier['nv_order']}', id_ca='{cashier['id_ca']}' WHERE id_DH='{cashier['id']}';'''
        classsend.get_curSQL('manager-order.db', query=query)

        # query = f"""SELECT Id, date_new, Name, SUM(ThanhToan)AS Total FROM Listorder WHERE Huy_Don='0' GROUP BY date_new ;"""
        # Total_TT_MatHang = classsend.get_curSQL('manager-order.db', query=query)
        # print(Total_TT_MatHang)

        await manager.broadcast(cashier, token, current_user)

        # show_DT = get_doanhthu()
        # print(show_DT)
        return {"msg":"Successfully post", "DT": 'show_DT'}
    elif cashier['action'] == 'KETCA':
        tz_VN = pytz.timezone('Asia/Ho_Chi_Minh')
        year = datetime.now(tz_VN).strftime('%Y')
        # --------------- update CaNV -------------#
        query = f"""UPDATE Ca_NV SET date_end = '{cashier['date_end']}', Table_Log = "Dathang_{year}", NV_ketca= "{cashier['NV_ketca']}" WHERE id_ca = '{cashier['id_ca']}';"""
        classsend.get_curSQL('manager-order.db', query=query)
        # -------------- set trang thái ------------#
        query = f"""UPDATE 'Tuychinh' SET Nhan_ca = 'unchecked'"""
        classsend.get_curSQL('manager-order.db', query=query)

        # ---------------- set data history --------------#
        cur, con = classsend.get_cur_con('./Database_app/history.db')
        # -------------------- save DH ---------------#
        # check điều kiện đơn hàng bia xử lý trước hay sau
        # if cashier['Bia_thutiensau'] == 'unchecked':
        #     query = f"""SELECT * FROM Dathang;"""
        #     result_data = classsend.get_curSQL('manager-order.db', query=query)
        # else:
        #     query = f"""SELECT * FROM Dathang WHERE id_table_custom NOT like '%tableBia%';"""
        #     result_data = classsend.get_curSQL('manager-order.db', query=query)
        query = f"""SELECT * FROM Dathang WHERE Action ="HUY" OR Action="HOANTHANH";"""
        result_data = classsend.get_curSQL('manager-order.db', query=query)


        df = pd.DataFrame(result_data)
        df.to_sql(f"""Dathang_{year}""", con, if_exists='append', index=False)  # writes to file
        # con = sqlite3.connect("./Database_app/history.db", timeout=30)
        # --------------------- save topping ---------------#
        query = f"""SELECT * FROM Sub_ToppingDH;"""
        result_data = classsend.get_curSQL('manager-order.db', query=query)
        # if null table
        if len(result_data) == 0:
            query = f"""CREATE TABLE "Sub_ToppingDH_{cashier['id_ca']}" (
                           "id_DH" INTEGER,
                             "name_TPDH" TEXT,
                             "soluong_TPDH" INTEGER,
                             "id_MH" INTEGER,
                             "Tongtien_TPDH" TEXT
                           )"""
            cur.execute(query)
            con.commit()
        else:
            df = pd.DataFrame(result_data)
            df.to_sql(f"""Sub_ToppingDH_{year}""", con, if_exists='append', index=False)  # writes to file
            # con.close()  # good practice: close connection
    elif cashier['action'] == 'BATDAUCA':
        # --------------- clear Dathang ---------------#
        query = f"""DELETE FROM Dathang WHERE Action = "HUY" OR Action= 'HOANTHANH';"""
        result_data = classsend.get_curSQL('manager-order.db', query=query)

        # ---------------- insert New CaNV ------------#
        query = f"""INSERT INTO Ca_NV(Table_Log, date_begin, name) VALUES( 'Dathang', ?, ?)"""
        args = (cashier['date_begin'], cashier['nameNV'])
        cur = classsend.get_curSQL('manager-order.db', query=query, args=args)
        task_id = cur.lastrowid
        # -------------- set trang thái ------------#
        query = f"""UPDATE 'Tuychinh' SET Nhan_ca = 'checked', Nhandon = 'checked';"""
        classsend.get_curSQL('manager-order.db', query=query)
        return {'action': 'ddd', 'id_ca': task_id}
def get_doanhthu(id_ca):
    # trả row nhân viên đang nhận ca
    # query = f"SELECT * FROM Ca_Staff WHERE ifnull(length(date_end), 0) = 0"
    query = f"""SELECT * FROM Ca_NV WHERE id_ca = '{id_ca}';"""
    result_data = classsend.get_curSQL('manager-order.db', query=query)
    # print(result_data)
    return result_data
def get_thanhtoan(id_DH):
    # ----------------- get price MH -----------------------#
    query = f"""SELECT Dathang.*
                                FROM Dathang
                                WHERE Dathang.id_DH = '{id_DH}';"""
    result_data = classsend.get_curSQL('manager-order.db', query=query)
    Total_TT= 0
    if result_data[0]['price_MH'] == 'Tuỳ Chọn':
        Total_TT += int(result_data[0]['price_TC'])
    else:
        Total_TT += int(result_data[0]['price_MH'])
    Total_TT = Total_TT- (Total_TT* result_data[0]['phantramKM']/100)
    print(Total_TT)
    #----------------- get price topping -------------------#
    query = f"""SELECT Mathang.name_MH, TP.soluong_TPDH, Mathang.price_MH Topping_DG, Mathang.id_MH
                                               FROM Sub_ToppingDH TP
                                               inner join Mathang on Mathang.id_MH = TP.id_MH
                                               WHERE TP.id_DH = '{result_data[0]['id_DH']}'"""
    sub_data = classsend.get_curSQL('manager-order.db', query=query)
    for item in range(len(sub_data)):
        Total_TT = Total_TT + (int(sub_data[item]['Topping_DG']) * int(sub_data[item]['soluong_TPDH']))

    Total_TT = Total_TT * result_data[0]['soluong_MH']
    soluong_MH = result_data[0]['soluong_MH']
    id_MH = result_data[0]['id_MH']
    return Total_TT, soluong_MH, id_MH
def put_HOANTHANH(cashier):
    Thanhtoan, soluong_MH, id_MH = get_thanhtoan(cashier['id'])

    tz_VN = pytz.timezone('Asia/Ho_Chi_Minh')
    datetime_VN = datetime.now(tz_VN).strftime('%m')
    datetime_CUR = datetime.now(tz_VN).strftime('%Y-%m-%d')
    # ---------- update luot mua sp in table Mathang --------------- #
    query = f'''UPDATE Mathang SET soluong_ban = soluong_ban + '{soluong_MH}' WHERE id_MH='{id_MH}';'''
    classsend.get_curSQL('manager-order.db', query=query)
    # chua update so luong mat hang topping
    # chua tính soluong don hang trong totalbill

    # ---------- save history luot mua sp Top Thang --------------- #
    query = f"""SELECT Mathang.name_MH, Mathang.soluong_ban, Mathang.id_MH, Danhmuc.color_DM, Color.color, Danhmuc.name_DM  
                                  FROM Mathang
                                  inner join Danhmuc on Danhmuc.id_DM = Mathang.id_DM
                                  inner join Color on Color.id = Danhmuc.color_DM
                                  """
    result_data = classsend.get_curSQL('manager-order.db', query=query)
    df = pd.DataFrame(result_data)
    cur, con = classsend.get_cur_con('./Database_app/history.db')
    # khong dc xoa
    """"""
    # for i in range(12):
    #     i= i+1
    #     table = f'Top_MH_Thang{i}'
    #     if (i < 10):
    #         table = f'Top_MH_Thang0{i}'
    #     df.to_sql(f"""{table}""", con, if_exists='replace', index=False)  # writes to file
    try:
        df.to_sql(f"""Top_MH_Thang{datetime_VN}""", con, if_exists='replace',
                  index=False)  # writes to file
    except sqlite3.ProgrammingError as e:
        print(e)
    # ============================ update Doanh Thu theo ngày ============================ #
    query = f"""INSERT INTO TotalBill (date, DoanhThu, DT_dichvu, DT_khac, DT_khac, SLDH) VALUES ('{datetime_CUR}', '{Thanhtoan}', '100000','0','0','1')
          ON CONFLICT (date) DO UPDATE SET DoanhThu=DT_dichvu+DT_khac+DT_pc+ {Thanhtoan}, DT_dichvu= DT_dichvu + {Thanhtoan}, DT_khac='0', DT_pc='0', SLDH= SLDH+'{soluong_MH}';"""
    classsend.get_curSQL('./Database_app/history.db', query=query)

    # ---------- update trang thái mua sp --------------- #
    query = f'''UPDATE Dathang SET date_thutien= '{cashier['date_thutien']}',Thaotac='{cashier['Thaotac']}', Action='{cashier['action']}', id_NV='{cashier['nv_order']}', id_ca='{cashier['id_ca']}' WHERE id_DH='{cashier['id']}';'''
    classsend.get_curSQL('manager-order.db', query=query)

    # ========================= Trừ nguyên liệu chưa có tính nguyen lieu topping ======================== #

    # -------------------- trừ nguyên liệu MH chính----------------------#
    query = f"""SELECT * FROM Dathang
                              WHERE id_DH='{cashier['id']}';"""
    result = classsend.get_curSQL('manager-order.db', query=query)
    result = result[0]
    query = f"""SELECT * FROM Sub_NL
                              WHERE id_MH='{result['id_MH']}';"""
    Nguyenlieu = classsend.get_curSQL('manager-order.db', query=query)
    soluong=0
    for item in range(len(Nguyenlieu)):
        value = Nguyenlieu[item]
        soluong = int(result['soluong_MH'])
        soluong_NL = int(value['soluong_NL']) * soluong
        query = f"""UPDATE Nguyenlieu SET Tonkho = Tonkho - {soluong_NL}
                                  WHERE id_NL = '{value['id_NL']}';"""
        classsend.get_curSQL('manager-order.db', query=query)

    # -------------------- trừ nguyên liệu MH Topping ----------------------#
    query = f"""SELECT * FROM Sub_ToppingDH
                                  WHERE id_DH='{cashier['id']}';"""
    result = classsend.get_curSQL('manager-order.db', query=query)
    if(result):
        result = result[0]
        query = f"""SELECT * FROM Sub_NL
                                      WHERE id_MH='{result['id_MH']}';"""
    Nguyenlieu = classsend.get_curSQL('manager-order.db', query=query)
    for item in range(len(Nguyenlieu)):
        value = Nguyenlieu[item]
        soluong_NLTP = int(value['soluong_NL']) * int(result['soluong_TPDH']) * soluong
        query = f"""UPDATE Nguyenlieu SET Tonkho = Tonkho - {soluong_NLTP}
                                      WHERE id_NL = '{value['id_NL']}';"""
        classsend.get_curSQL('manager-order.db', query=query)

    # ======================================= Công vào doanh thu ===================================== #
    query = f"""UPDATE Ca_NV SET DT_dichvu = DT_dichvu + {Thanhtoan}
                                         WHERE id_ca = '{cashier['id_ca']}';"""
    classsend.get_curSQL('manager-order.db', query=query)
def calc_time(id_table):
    query = f"""SELECT * FROM 'table_bia' WHERE id_table="{id_table}";"""
    result_data = classsend.get_curSQL('manager-order.db', query=query)
    date_begin = result_data[0]['date_begin']
    # print(result_data[0])
    gia_gio = float(result_data[0]['price'])
    date_begin = datetime.strptime(date_begin, '%Y-%m-%d %H:%M:%S')
    datetime_VN = datetime.now(tz_VN).strftime('%Y-%m-%d %H:%M:%S')
    # print(datetime_VN)
    datetime_VN = datetime.strptime(datetime_VN, '%Y-%m-%d %H:%M:%S')
    Seconds = (datetime_VN - date_begin).total_seconds()

    # hrs = math.floor(Seconds/3600)
    # mins = math.floor((Seconds - (hrs*3600)) / 60)
    # secs = math.floor(Seconds % 60)

    sophut = float(Seconds/60)
    gia_motphut =  float(gia_gio/60)
    Tien_gio =  float(sophut * gia_motphut)

    # if (secs < 10):
    #     secs = '0' + str(secs);
    # if (mins < 10):
    #     mins = '0' + str(mins);
    # if (hrs < 10):
    #     hrs = '0' + str(hrs);
    # print(Seconds, gia_motphut, sophut, Tien_gio)
    return round(Tien_gio)
def round_up(n): return int(n + 1)
# ------------------------------- nhap kho ------------------------------------#
@app_api.post('/inventory')
async def post_nguyenlieu(request: Request, Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()
    current_user = Authorize.get_jwt_subject()
    NL = await request.json()
    token = request.cookies['refresh_token_cookie']
    tz_VN = pytz.timezone('Asia/Ho_Chi_Minh')
    date_new = datetime.now(tz_VN).strftime('%Y-%m-%d %H:%M:%S')
    # -------------------------- Nguyên Liệu -------------------------------#
    if (NL['action']=='newNL'):
        args = (NL['date_new'], NL['name'], NL['mota'], NL['donvi'], NL['sl'])
        query = f"""INSERT INTO NguyenLieu(date_new, name_NL, mota_NL, donvi, Tonkho)  VALUES(?, ?, ?, ?, ?)"""
        classsend.get_curSQL('manager-order.db', query=query, args=args)
        # await manager.broadcast(nguyenlieu, token, current_user)
        return {"msg": "success", "content": f"Tạo Khuyến Mãi <b>{NL['name']} thành công</b>`"}
    elif (NL['action']=='update'):
        query = f'''UPDATE 'NguyenLieu' SET name_NL='{NL['name']}', mota_NL='{NL['mota']}',donvi='{NL['donvi']}' WHERE id_NL='{NL['id']}';'''
        # query = f"UPDATE * FROM 'List-order';"
        classsend.get_curSQL('manager-order.db', query=query)
        # await manager.broadcast(cashier, token, current_user)
        return {"msg": "Successfully kho"}
    elif (NL['action']=='nhapkho'):
        price = f"{NL['price']}"
        sl_new = f"{NL['sl_new']}"
        if NL['thaotac'] == 'Điều chỉnh':
            price = f"-{NL['price']}"
            sl_new = f"-{NL['sl_new']}"
            # check số lượng điều chỉnh
            query = f"SELECT * FROM 'NguyenLieu' WHERE id_NL='{NL['id']}';"
            result_data = classsend.get_curSQL('manager-order.db', query=query)
            if (int(NL['sl_new']) > int(result_data[0]['Tonkho'])):
                return {"msg": "error", "content": f"Nguyên liệu <b>{NL['nameNL']}</b> điều chỉnh vượt quá Tonkho"}
        Total_new = int(price) * int(NL['sl_new'])
        query = f'''UPDATE 'NguyenLieu' SET Tonkho='{NL['sl']}', TB_gia = ((TB_gia*Tonkho)+ '{Total_new}')/('{sl_new}'+Tonkho) WHERE id_NL='{NL['id']}';'''
        classsend.get_curSQL('manager-order.db', query=query)
        # ------- save log kho ----------- #
        args = (NL['date'], NL['mota'], NL['staff'], NL['nameNL'], NL['thaotac'],sl_new, NL['sl_old'], NL['total_sl'], price, Total_new)
        query = f"""INSERT INTO Log_Kho(date_new, mota, Person, NameNL, action, SL, Tonkho_before, Tonkho_after, Price_import,Total)  VALUES(?, ?, ?, ?,?, ?, ?, ?, ?, ?)"""
        classsend.get_curSQL('manager-order.db', query=query, args=args)
        return {"msg": "success", "content": f"Điều chỉnh Nguyên liệu <b>{NL['nameNL']} thành công</b>`"}
    elif (NL['action']=='delkho'):
        try:
            query = f'''DELETE FROM `NguyenLieu` WHERE id_NL='{NL['id']}' ;'''
            classsend.get_curSQL('manager-order.db', query=query)
            return {"msg": "success",
                    "content": f"Xoá Nguyên Liệu <b>{NL['name']} thành công!</b>`"}
        except:
            return {"msg": "error",
                    "content": f"Xoá Nguyên Liệu <b>{NL['name']} không thành công! Vui lòng xoá những mục liên quan trước.</b>`"}

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
        query = f"SELECT * FROM 'Log_Kho';"
        result_data = classsend.get_curSQL('manager-order.db', query=query)
        return result_data
   
# #--------------------------------- Danh mục -----------------------------------#
@app_api.post('/danhmuc')
async def post_danhmuc(request: Request, Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()
    current_user = Authorize.get_jwt_subject()
    token = request.cookies['refresh_token_cookie']
    tz_VN = pytz.timezone('Asia/Ho_Chi_Minh')
    date_new = datetime.now(tz_VN).strftime('%Y-%m-%d %H:%M:%S')
    danhmuc = await request.json()
    if (danhmuc['action'] == 'newDM'):
        args = (date_new, danhmuc['name'], danhmuc['color'], danhmuc['mota'], danhmuc['parent_id'], danhmuc['DTkhac'], danhmuc['mobanDM'],)
        query = "INSERT INTO Danhmuc(date_new, name_DM, color_DM, mota_DM, parent_id, DTkhac, moban_DM) VALUES(?, ?, ?, ?, ?, ?, ?)"
        classsend.get_curSQL('manager-order.db', query=query, args=args)
        # await manager.broadcast(danhmuc, token, current_user)
        return {"msg": "success", "content": f"Tạo Danh mục <b>{danhmuc['name']} thành công</b>`"}
    elif (danhmuc['action'] == 'update'):
        query = f'''UPDATE 'DanhMuc' SET name_DM='{danhmuc['name']}', color_DM='{danhmuc['color']}', mota_DM='{danhmuc['mota']}',parent_id='{danhmuc['DMcha']}', DTkhac='{danhmuc['DTkhac']}', moban_DM='{danhmuc['mobanDM']}' WHERE id_DM='{danhmuc['id']}';'''
        classsend.get_curSQL('manager-order.db', query=query)
        # await manager.broadcast(cashier, token, current_user)
        return {"msg": "Successfully kho"}
    elif (danhmuc['action'] == 'delDM'):
        try:
            query = f'''DELETE FROM `DanhMuc` WHERE id_DM='{danhmuc['id']}' ;'''
            classsend.get_curSQL('manager-order.db', query=query)
            return {"msg": "success",
                    "content": f"Xoá Danh Mục <b>{danhmuc['name']} thành công!</b>`"}
        except:
            query = f'''UPDATE 'DanhMuc' SET id_Thaotac='0', date_new='{date_new}', name_DM= name_DM||"<b style='color: red;'> (Đã Xoá)</b>" WHERE id_DM='{danhmuc['id']}';'''
            classsend.get_curSQL('manager-order.db', query=query)
            return {"msg": "success",
                    "content": f"Xoá Danh Mục <b>{danhmuc['name']} thành công!</b>`"}
    elif (danhmuc['action'] =='getDM'):
        query = f"SELECT * FROM 'DanhMuc';"
        result_data = classsend.get_curSQL('manager-order.db', query=query)
        return result_data
    elif (danhmuc['action'] =='mobanDM'):
        query = f'''UPDATE DanhMuc SET moban_DM='{danhmuc['mobanDM']}' WHERE id_DM='{danhmuc['id']}';'''
        classsend.get_curSQL('manager-order.db', query=query)
        # await manager.broadcast(cashier, token, current_user)
        return {"msg": "Successfully kho"}
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
        args = (nhomMH['date_new'], nhomMH['name'], nhomMH['mota'], nhomMH['show'], nhomMH['label'], nhomMH['name_label'], nhomMH['color_nhom'])
        query = "INSERT INTO Nhom(date_new, name_nhom, mota_nhom, show, label, name_label, color_nhom) VALUES(?, ?, ?, ?, ?, ?, ?)"
        classsend.get_curSQL('manager-order.db', query=query, args=args)
        #await manager.broadcast(danhmuc, token, current_user)
        return {"msg": "success", "content": f"Tạo Nhóm <b>{nhomMH['name']} thành công</b>`"}
    elif (nhomMH['action'] == 'update_nhom'):
        query = f'''UPDATE Nhom SET name_nhom='{nhomMH['name']}', mota_nhom='{nhomMH['mota']}',show='{nhomMH['show']}', label='{nhomMH['label']}', name_label='{nhomMH['name_label']}', color_nhom='{nhomMH['color_nhom']}' WHERE id_nhom='{nhomMH['id_nhom']}';'''
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
            return {"msg": "error", "content": f"Xoá Nhóm Mặt Hàng <b>{nhomMH['name']} không thành công! Vui lòng xoá những mục liên quan trước.</b>`"}
    elif (nhomMH['action'] =='get_nhom'):
        try:
            if (nhomMH['id_nhom']):
                query = f"SELECT * FROM 'Nhom' WHERE id_nhom = '{nhomMH['id_nhom']}';"
                result_data = classsend.get_curSQL('manager-order.db', query=query)
                return result_data
        except:
            query = f"SELECT * FROM 'Nhom';"
            result_data = classsend.get_curSQL('manager-order.db', query=query)
            # print(result_data)
            return result_data
    elif nhomMH['action'] == 'getMH':
        # print(action)
        list_nhom ={}
        query = f"""SELECT MatHang.*, Danhmuc.color_DM
                            FROM 'MatHang'
                            inner join Danhmuc on Danhmuc.id_DM = MatHang.id_DM;"""
        result_data = classsend.get_curSQL('manager-order.db', query=query)
        list_nhom['list_MH'] = result_data
        query = f"""SELECT Sub_nhom.*, MatHang.name_MH 
                            FROM 'Sub_nhom'
                            inner join MatHang on Sub_nhom.id_MH = MatHang.id_MH
                            WHERE id_nhom = '{nhomMH['id_nhom']}' ;"""
        result_data = classsend.get_curSQL('manager-order.db', query=query)
        list_nhom['MH_of_nhom']= result_data
        return list_nhom
    elif nhomMH['action'] == 'import_MH_to_nhom':
        args = (
        nhomMH['id_MH'], nhomMH['id_nhom'])
        query = "INSERT INTO Sub_nhom(id_MH, id_nhom) VALUES(?, ?)"
        cur = classsend.get_curSQL('manager-order.db', query=query, args=args)
        task_id = cur.lastrowid
        return {'id_nhomMH': task_id}
    elif nhomMH['action'] == 'del_MH_form_nhom':
        query = f"DELETE FROM Sub_nhom WHERE id_nhom = '{nhomMH['id_nhomMH']}' AND id_MH ='{nhomMH['id_MH']}';"
        classsend.get_curSQL('manager-order.db', query=query)
   
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
        args = (khuyenmai['name_KM'], khuyenmai['id_nhom'], khuyenmai['id_loaiKM'],khuyenmai['phantram'],khuyenmai['date_begin'],khuyenmai['date_end'])
        query = "INSERT INTO Sub_KM(name_subKM, id_nhom, id_KM, phantramKM, date_begin, date_end) VALUES(?, ?, ?, ?, ?, ?)"
        cur = classsend.get_curSQL('manager-order.db', query=query, args=args)
        task_id = cur.lastrowid
        # if khuyenmai['loaiKM']=='Nhập Mã':
        #     args = (task_id, khuyenmai['name_KM'], khuyenmai['phantram'])
        #     query = "INSERT INTO magiamgia(id_KM, nameKM, phantramKM) VALUES(?, ?, ?)"
        #     classsend.get_curSQL('manager-order.db', query=query, args=args)
        #await manager.broadcast(danhmuc, token, current_user)
        return {"msg": "success", "content": f"Tạo Khuyến Mãi <b>{khuyenmai['name_KM']} thành công</b>`", 'id_KM': task_id}
    elif (khuyenmai['action'] == 'update_KM'):
        # print(khuyenmai)
        query = f'''UPDATE 'Sub_KM' SET name_subKM='{khuyenmai['name_KM']}', id_nhom='{khuyenmai['id_nhom']}',id_KM='{khuyenmai['id_loaiKM']}', phantramKM='{khuyenmai['phantram']}', date_begin='{khuyenmai['date_begin']}', date_end='{khuyenmai['date_end']}' WHERE id_subKM='{khuyenmai['id_khuyenmai']}';'''
        # query = f"UPDATE * FROM 'List-order';"
        classsend.get_curSQL('manager-order.db', query=query)
        # await manager.broadcast(cashier, token, current_user)
        return {"msg": "Successfully kho"}
    elif (khuyenmai['action'] == 'del_KM'):
        try:
            query = f'''DELETE FROM `Sub_KM` WHERE id_subKM ='{khuyenmai['id_khuyenmai']}' ;'''
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
            query = f"""SELECT *, Nhom.name_nhom, Khuyenmai.name_KM
                            FROM 'Sub_KM'
                            inner join Khuyenmai on Khuyenmai.id_KM = Sub_KM.id_KM
                            inner join Nhom on Nhom.id_nhom = Sub_KM.id_nhom ;"""
            result_data = classsend.get_curSQL('manager-order.db', query=query)
            # print(result_data)
            return result_data
    elif (khuyenmai['action'] == 'getKM'):# show dropbox
        query = f"""SELECT * FROM 'khuyenmai';"""
        result_data = classsend.get_curSQL('manager-order.db', query=query)
        # print(result_data)
        return result_data

# ------------------------------- magiamgia ------------------------------------#
@app_api.post('/maKM')
async def post_magiamgia(request: Request, Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()
    current_user = Authorize.get_jwt_subject()
    # print(kho.stt)
    token = request.cookies['refresh_token_cookie']
    magiam = await request.json()
    if (magiam['action'] == 'newMagiam'):
        args = (magiam['id_subKM'], magiam['maKM'], magiam['solansudung'], magiam['solantkdung'], 0)
        query = "INSERT INTO MaKM(id_subKM, maKM, solansudung, solantkdung, dasudung) VALUES(?, ?, ?, ?, ?)"
        cur = classsend.get_curSQL('manager-order.db', query=query, args=args)
        # task_id = cur.lastrowid
        # if khuyenmai['loaiKM']=='Nhập Mã':
        #     args = (task_id, khuyenmai['name_KM'], khuyenmai['phantram'])
        #     query = "INSERT INTO magiamgia(id_KM, nameKM, phantramKM) VALUES(?, ?, ?)"
        #     classsend.get_curSQL('manager-order.db', query=query, args=args)
        #await manager.broadcast(danhmuc, token, current_user)
        pass
        return {"msg": "success", "content": f"Tạo Mã <b>{magiam['maKM']} thành công</b>`"}
    elif (magiam['action'] == 'update_Magiam'):
        query = f'''UPDATE 'MaKM' SET maKM='{magiam['maKM']}', solansudung='{magiam['solansudung']}',solantkdung='{magiam['solantkdung']}' WHERE id_subKM='{magiam['id_KM']}' AND id_MaKM='{magiam['id_magiam']}';'''
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
    elif (magiam['action'] =='get_MaKM'):
        try:
            query = f"SELECT * FROM MaKM WHERE id_subKM='{magiam['id_KM']}' AND id_magiam='{magiam['id_magiam']}';"
            result_data = classsend.get_curSQL('manager-order.db', query=query)
            print(result_data)
            return result_data
        except:
            query = f"SELECT * FROM MaKM WHERE id_subKM ='{magiam['id_KM']}';"
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
    tz_VN = pytz.timezone('Asia/Ho_Chi_Minh')
    date_new = datetime.now(tz_VN).strftime('%Y-%m-%d %H:%M:%S')
    #------ func check sql injection ---------#
    ''''''
    # check = check_dict_sqlinjection(Mathang)
    # if check!= True:
    #     return check
    # add thong tin log
    dicts = None
    try:
        # ----------- ghi log -----------#
        dicts = {
            'date_new': '',
            'user': Mathang['user'],
            'id_Thaotac': str(Mathang['id_Thaotac']),
            'Thaotac': Mathang['mota_Thaotac'],
            'id_DT': 'MH',
            'Doituong': 'Mặt hàng',
            'mota': Mathang['ten_MH']
        }
        print(dicts, 'test dicts')
        ghi_log_thaotac(dicts)
    except:
        pass

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
        cur.execute("INSERT INTO MatHang(date_new, name_MH, price_MH, photo_MH, id_DM, muctoithieu, chontoida) VALUES(?, ?, ?, ?, ?,?,?)",
                    (Mathang['date_new'], Mathang['ten_MH'], Mathang['price_MH'], Mathang['photo'], Mathang['id_DM'], Mathang['muctoithieu'], Mathang['chontoida']))
        con.commit()
        # query = f"""INSERT INTO MatHang(name, price, photo, id_DM, Danhmuc) VALUES(?, ?, ?, ?, ?)"""
        # args = (Mathang['ten_MH'], Mathang['price_MH'], Mathang['photo'], Mathang['id_DM'], Mathang['danhmuc_MH'])
        # cur = classsend.get_curSQL('manager-order.db', query=query, args=args)
        task_id = cur.lastrowid
        # -------- insert Sub_DM ------------#
        cur.execute(f"""INSERT INTO Sub_DM(id_MH, id_DM)
                                                     VALUES ({task_id}, {Mathang['id_DM']});""")
        con.commit()
        # -------- insert nguyenlieu ------------#
        data_array_nguyenlieu = []
        nguyenlieu= Mathang['nguyenlieu_MH']
        # print(nguyenlieu)
        if nguyenlieu:
            for item in nguyenlieu:
                tuple=(task_id, item['id'], item['v'])
                data_array_nguyenlieu.append(tuple)
        cur.executemany(f"""INSERT INTO Sub_NL(id_MH, id_NL, soluong_NL) VALUES(?, ?, ?)""", data_array_nguyenlieu)
        con.commit()
        # ---------------- insert Topping -------------- #
        Topping_MH = Mathang['Topping_MH']
        if Topping_MH != None:
            for item in Topping_MH:
                tuple = (task_id, item['id'], item['k'])
                cur.execute(f"""INSERT INTO Sub_ToppingMH(id_MH, id_Topping, name_Topping)
                                             VALUES {tuple};""")
                con.commit()
        con.close()
        return {"msg": "success", "content": f"<i class='ti-check' style='font-weight: bold;'> </i>Tạo Mặt Hàng <b>{Mathang['ten_MH']} thành công</b>`"}
    elif Mathang['action'] == 'update_MH':
        # phần này sử dụng ở edit MH
        # Before del all Nguyen Lieu and Topping of MH
        query = f"DELETE FROM 'Sub_NL' WHERE id_MH='{Mathang['id_MH']}';"
        classsend.get_curSQL('manager-order.db', query=query)
        query = f"DELETE FROM 'Sub_ToppingMH' WHERE id_MH='{Mathang['id_MH']}';"
        classsend.get_curSQL('manager-order.db', query=query)

        # phần này edit lại MH
        query = f'''UPDATE 'MatHang' SET name_MH='{Mathang['ten_MH']}', price_MH='{Mathang['price_MH']}',photo_MH='{Mathang['photo']}', id_DM= '{Mathang['id_DM']}', id_DM='{Mathang['id_DM']}', muctoithieu='{Mathang['muctoithieu']}', chontoida='{Mathang['chontoida']}'  WHERE id_MH='{Mathang['id_MH']}';'''
        classsend.get_curSQL('manager-order.db', query=query)

        # add lại NguyenLieuMH
        # -------- insert nguyenlieu ------------#
        task_id = Mathang['id_MH']
        # -------- insert nguyenlieu ------------#
        data_array_nguyenlieu = []
        nguyenlieu = Mathang['nguyenlieu_MH']
        # print(nguyenlieu)
        if nguyenlieu:
            for item in nguyenlieu:
                tuple = (task_id, item['id'], item['v'])
                data_array_nguyenlieu.append(tuple)

        cur.executemany(f"""INSERT INTO Sub_NL(id_MH, id_NL, soluong_NL) VALUES(?, ?, ?)""", data_array_nguyenlieu)
        con.commit()
        # ---------------- insert Topping -------------- #
        Topping_MH = Mathang['Topping_MH']
        # print('topping', Topping_MH, task_id)
        if Topping_MH != None:
            for item in Topping_MH:
                tuple = (task_id, item['id'], item['k'])
                cur.execute(f"""INSERT INTO Sub_ToppingMH(id_MH, id_Topping, name_Topping)
                                                    VALUES {tuple};""")
                con.commit()
        con.close()

        return {"msg": "success",
                "content": f"<i class='ti-check' style='font-weight: bold;'> </i>Chỉnh sửa Mặt Hàng <b>{Mathang['ten_MH']} thành công</b>`"}
    elif Mathang['action'] == 'getMH':
        if 'id' in Mathang:
            query = f"""SELECT *, Danhmuc.parent_id, Danhmuc.id_Thaotac id_DMThaotac, Danhmuc.moban_DM
                            FROM 'MatHang' 
                            inner join Danhmuc on Danhmuc.id_DM = MatHang.id_DM
                            WHERE id_MH= '{Mathang['id']}';"""
            result_data = classsend.get_curSQL('manager-order.db', query=query)
            # print(result_data)
            for i in range(len(result_data)):
                query = f"""SELECT name_DM
                                                      FROM Danhmuc a
                                                      WHERE a.id_DM = '{result_data[i]['id_DM']}'"""
                sub_data = classsend.get_curSQL('manager-order.db', query=query)
                if sub_data:
                    result_data[i]['Danhmuc'] = sub_data[0]['name_DM']
                else:
                    result_data[i]['Danhmuc'] = '<b style="color: red";>Đã Xoá</b>'
                    result_data[i]['id_DM'] = 0
                # print(sub_data)
                # ----------------------- get Nguyen lieu cua MH ----------------------------#
                query = f"""SELECT a.*, Nguyenlieu.*
                                       FROM Sub_NL a
                                       inner join NguyenLieu on NguyenLieu.id_NL = a.id_NL
                                       WHERE a.id_MH = '{result_data[i]['id_MH']}'"""
                sub_data = classsend.get_curSQL('manager-order.db', query=query)
                result_data[i]['NguyenLieu'] = sub_data

                # ----------------------- get Khuyen mai ---------------------------#
                query = f"""SELECT Nhom.id_nhom, Nhom.name_nhom, Sub_KM.id_KM, Sub_KM.id_KM, Sub_KM.name_subKM, Sub_KM.phantramKM, Sub_KM.date_begin, Sub_KM.date_end
                                                                                     FROM Sub_nhom
                                                                                     inner join MatHang on MatHang.id_MH = Sub_nhom.id_MH
                                                                                     inner join Sub_KM on Sub_nhom.id_nhom = Sub_KM.id_nhom
                                                                                  inner join Nhom on Nhom.id_nhom = Sub_nhom.id_nhom
                                                                                     WHERE Sub_nhom.id_MH = '{result_data[i]['id_MH']}';"""
                sub_data = classsend.get_curSQL('manager-order.db', query=query)
                result_data[i]['KhuyenMai'] = sub_data

                # ----------------------- get timer ---------------------------#
                query = f"""SELECT Hengio.gioban, Hengio.id_HG, Hengio.giongung
                                                                 FROM Hengio
                                                                 inner join MatHang on MatHang.id_MH = Hengio.id_MH
                                                                 WHERE Hengio.id_MH = '{result_data[i]['id_MH']}'"""
                sub_data = classsend.get_curSQL('manager-order.db', query=query)
                result_data[i]['timer'] = sub_data

                # ----------------------- get Topping ----------------------------#
                query = f"""SELECT Sub_ToppingMH.id_Topping, Sub_ToppingMH.name_Topping, Sub_ToppingMH.soluong_Topping, MatHang.price_MH Topping_DG, MatHang.id_MH
                                                                                     FROM Sub_ToppingMH
                                                                                     inner join MatHang on MatHang.id_MH = Sub_ToppingMH.id_Topping
                                                                                     WHERE Sub_ToppingMH.id_MH = '{result_data[i]['id_MH']}'"""
                sub_data = classsend.get_curSQL('manager-order.db', query=query)
                result_data[i]['Topping'] = sub_data
                # ----------------------- get nguyen lieu of Topping ----------------------------#
                for j in range(len(result_data[i]['Topping'])):
                    query = f"""SELECT a.*, Nguyenlieu.*
                                                           FROM Sub_NL a
                                                           inner join NguyenLieu on NguyenLieu.id_NL = a.id_NL
                                                           WHERE a.id_MH = '{result_data[i]['Topping'][j]['id_Topping']}'"""
                    sub_nguyenlieu_topping = classsend.get_curSQL('manager-order.db', query=query)
                    result_data[i]['Topping'][j]['NguyenLieu_Topping'] = sub_nguyenlieu_topping
            # print(result_data)
            return result_data
        else:
            query = f"""SELECT MatHang.*, Danhmuc.parent_id, Danhmuc.id_Thaotac id_DMThaotac, Danhmuc.moban_DM
                                    FROM 'MatHang'
                                    inner join Danhmuc on Danhmuc.id_DM = MatHang.id_DM
                                    ;"""
            ''''''
            # query =f"""WITH tree_view AS (
            #                 SELECT id,
            #                      parent_id,
            #                      name,
            #                      0 AS level,
            #                      CAST(id AS TEXT) AS order_sequence
            #                 FROM Danhmuc
            #                 WHERE parent_id IS NULL
            #
            #             UNION ALL
            #                 SELECT
            #                      parent.id,
            #                      parent.parent_id,
            #                      parent.name,
            #                      level + 1 AS level,
            #                      CAST(order_sequence || '_' || CAST(parent.id AS TEXT ) AS TEXT) AS order_sequence
            #                 FROM Danhmuc parent
            #                 JOIN tree_view tv
            #                   ON parent.parent_id = tv.id
            #             )
            #
            #             SELECT
            #                order_sequence As tree_DM, MatHang .*
            #             FROM tree_view
            #             inner join MatHang on MatHang.id_DM = tree_view.id
            #             ORDER BY order_sequence;"""
            result_data = classsend.get_curSQL('manager-order.db', query=query)
            # print(result_data)
            for i in range(len(result_data)):
                # -------------------------- get Danh Muc ------------------------#
                query = f"""SELECT name_DM, parent_id, tree_DM
                                           FROM Danhmuc
                                           WHERE id_DM = '{result_data[i]['id_DM']}'"""
                sub_data = classsend.get_curSQL('manager-order.db', query=query)
                if sub_data:
                    result_data[i]['Danhmuc'] = sub_data[0]['name_DM']
                else:
                    result_data[i]['Danhmuc']= '<b style="color: red";>Đã Xoá</b>'
                    result_data[i]['id_DM'] = 0

                # ----------------------- get Nguyen lieu cua MH ----------------------------#
                query = f"""SELECT a.*, Nguyenlieu.*
                            FROM Sub_NL a
                            inner join NguyenLieu on NguyenLieu.id_NL = a.id_NL
                            WHERE a.id_MH = '{result_data[i]['id_MH']}'"""
                sub_data = classsend.get_curSQL('manager-order.db', query=query)
                result_data[i]['NguyenLieu'] = sub_data

                # ----------------------- get Khuyen mai ---------------------------#
                query = f"""SELECT Nhom.id_nhom, Nhom.name_nhom, Sub_KM.id_KM, Sub_KM.id_KM, Sub_KM.name_subKM, Sub_KM.phantramKM, Sub_KM.date_begin, Sub_KM.date_end
                                                                      FROM Sub_nhom
                                                                      inner join MatHang on MatHang.id_MH = Sub_nhom.id_MH
                                                                      inner join Sub_KM on Sub_nhom.id_nhom = Sub_KM.id_nhom
                													  inner join Nhom on Nhom.id_nhom = Sub_nhom.id_nhom
                                                                      WHERE Sub_nhom.id_MH = '{result_data[i]['id_MH']}';"""
                sub_data = classsend.get_curSQL('manager-order.db', query=query)
                result_data[i]['KhuyenMai'] = sub_data

                # ----------------------- get timer ---------------------------#
                query = f"""SELECT Hengio.gioban, Hengio.id_HG, Hengio.giongung
                                                      FROM Hengio
                                                      inner join MatHang on MatHang.id_MH = Hengio.id_MH
                                                      WHERE Hengio.id_MH = '{result_data[i]['id_MH']}'"""
                sub_data = classsend.get_curSQL('manager-order.db', query=query)
                result_data[i]['timer'] = sub_data

                #----------------------- get Topping ----------------------------#
                query = f"""SELECT Sub_ToppingMH.id_Topping, Sub_ToppingMH.name_Topping, Sub_ToppingMH.soluong_Topping, MatHang.price_MH Topping_DG, MatHang.id_MH
                                                                          FROM Sub_ToppingMH
                                                                          inner join MatHang on MatHang.id_MH = Sub_ToppingMH.id_Topping
                                                                          WHERE Sub_ToppingMH.id_MH = '{result_data[i]['id_MH']}'"""
                sub_data = classsend.get_curSQL('manager-order.db', query=query)
                result_data[i]['Topping'] = sub_data
                # ----------------------- get nguyen lieu of Topping ----------------------------#
                for j in range(len(result_data[i]['Topping'])):
                    query = f"""SELECT a.*, Nguyenlieu.*
                                                FROM Sub_NL a
                                                inner join NguyenLieu on NguyenLieu.id_NL = a.id_NL
                                                WHERE a.id_MH = '{result_data[i]['Topping'][j]['id_Topping']}'"""
                    sub_nguyenlieu_topping = classsend.get_curSQL('manager-order.db', query=query)
                    result_data[i]['Topping'][j]['NguyenLieu_Topping'] = sub_nguyenlieu_topping
            # print(result_data, len(result_data))
            return result_data
    elif Mathang['action'] == 'del_MH':
        try:
            query = f"DELETE FROM Mathang WHERE id_MH= '{Mathang['id_MH']}';"
            classsend.get_curSQL('manager-order.db', query=query)
            return {"msg": "success",
                    "content": f"Xoá Mặt Hàng <b>{Mathang['ten_MH']} thành công!</b>`"}
        except:
            query = f'''UPDATE 'Mathang' SET id_Thaotac='0', date_new='{date_new}', name_MH= name_MH||"<b style='color: red;'> (Đã Xoá)</b>" WHERE id_MH='{Mathang['id_MH']}';'''
            classsend.get_curSQL('manager-order.db', query=query)
            return {"msg": "success",
                    "content": f"Xoá Mặt Hàng <b>{Mathang['ten_MH']} thành công!</b>`"}
    elif Mathang['action'] == 'getDanhmuc':
        query = f"SELECT * FROM 'DanhMuc';"
        result_data = classsend.get_curSQL('manager-order.db', query=query)
        return result_data
    # elif Mathang['action'] =='popup-mathang':
    #     result_data = {}
    #     query = f"SELECT * FROM 'Danhmuc' ORDER BY name_DM COLLATE NOCASE;"
    #     danhmuc = classsend.get_curSQL('manager-order.db', query=query)
    #     # print(danhmuc)
    #     result_data['danhmuc'] = danhmuc
    #     query = f"SELECT * FROM 'Nguyenlieu' ORDER BY name_NL COLLATE NOCASE;"
    #     Nguyenlieu = classsend.get_curSQL('manager-order.db', query=query)
    #     # print(result_data)
    #     result_data['nguyenlieu'] = Nguyenlieu
    #     query = f"SELECT * FROM 'MatHang' WHERE id_DM='3' ORDER BY 'name_MH' COLLATE NOCASE;"
    #     ToppingMH = classsend.get_curSQL('manager-order.db', query=query)
    #     result_data['mathang'] = ToppingMH
    #     # print(result_data)
    #     return result_data
    elif Mathang['action'] =='mobanMH':
        query = f'''UPDATE MatHang SET moban='{Mathang['mobanMH']}' WHERE id_MH='{Mathang['id']}';'''
        classsend.get_curSQL('manager-order.db', query=query)
        # await manager.broadcast(cashier, token, current_user)
        return {"msg": "Successfully kho"}
    elif Mathang['action'] == 'lock_MH':
        query = f'''UPDATE MatHang SET lock='{Mathang['lock']}', moban='{Mathang['moban']}' WHERE id_MH='{Mathang['id']}';'''
        classsend.get_curSQL('manager-order.db', query=query)
        # await manager.broadcast(cashier, token, current_user)
        return {"msg": "Successfully kho"}
    elif Mathang['action'] == 'new_timer':
        query = f"""INSERT INTO Hengio(id_MH, gioban, giongung) VALUES(?, ?, ?)"""
        args = (Mathang['id_MH'], Mathang['gioban'], Mathang['giongung'])
        cur = classsend.get_curSQL('manager-order.db', query=query, args=args)
        task_id = cur.lastrowid
        return task_id
    elif Mathang['action'] == 'get_timer':
        query = f"SELECT * FROM 'Hengio' WHERE id_MH='{Mathang['id_MH']}';"
        result_data = classsend.get_curSQL('manager-order.db', query=query)
        return result_data
    elif Mathang['action'] == 'del_timer':
        query = f"DELETE FROM 'Hengio' WHERE id_HG='{Mathang['id_timer']}';"
        result_data = classsend.get_curSQL('manager-order.db', query=query)
        return result_data
    elif Mathang['action'] == 'on_off_timer':
        query = f'''UPDATE 'MatHang' SET OpenHengio='{Mathang['OpenHengio']}'  WHERE id_MH='{Mathang['id_MH']}';'''
        classsend.get_curSQL('manager-order.db', query=query)
def ghi_log_thaotac(dict):
    tz_VN = pytz.timezone('Asia/Ho_Chi_Minh')
    year = datetime.now(tz_VN).strftime('%Y')
    date_new = datetime.now(tz_VN).strftime('%Y-%m-%d %H:%M:%S')
    dict['date_new'] = date_new
    # ------------------ update Doanh Thu theo ngày ------------------ #
    try:
        query = f"""INSERT INTO Log_action_{year} (date_new, user,  id_Thaotac, Thaotac, id_DT, Doituong, mota) VALUES ('{date_new}', '{dict['user']}', '{dict['id_Thaotac']}','{dict['Thaotac']}','{dict['id_DT']}','{dict['Doituong']}','{dict['mota']}');"""
        classsend.get_curSQL('./Database_app/history.db', query=query)
    except:
        df = pd.DataFrame([dict])
        cur, con = classsend.get_cur_con('./Database_app/history.db')
        df.to_sql(f"""Log_action_{year}""", con, if_exists='replace', index=False)
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
    # print(Bia)
    #------ func check sql injection ---------#
    # check = check_dict_sqlinjection(Mathang)
    # if check!= True:
    #     return check

    # classsend = Sqlite(database='manager-order.db')
    # print(Mathang)
    # token = request.cookies['refresh_token_cookie']

    # tuples= ("Sting", "cam ép")
    if (Bia['action'] == 'new_table'):
        args = (Bia['date_new'], Bia['name_table'], Bia['price_table'], Bia['mota'], 'BẮT ĐẦU', 'BATDAU', '', '')
        query = f"""INSERT INTO table_bia(date_new, name, price, mota, trangthai, id_Thaotac, date_begin, date_end)  VALUES(?, ?, ?, ?, ?, ?, ?, ?)"""
        classsend.get_curSQL('manager-order.db', query=query, args=args)
        # await manager.broadcast(nguyenlieu, token, current_user)
        return {"msg": "success", "content": f"Tạo Bàn BI-A <b>{Bia['name_table']} thành công</b>`"}
    elif Bia['action'] == 'getBia':
        query = f"SELECT * FROM 'table_bia';"
        result_data = classsend.get_curSQL('manager-order.db', query=query)
        print(result_data)
        for i in range(len(result_data)):
            if (result_data[i]['id_Thaotac'] == 'TINHTIEN' or result_data[i]['id_Thaotac'] == 'DONBAN'):
                query = f"""SELECT * FROM Dathang WHERE date_new = datetime('{result_data[i]['date_begin']}') AND id_table_custom = 'tableBia_{result_data[i]['id_table']}';"""
                list_order = classsend.get_curSQL('manager-order.db', query=query)
                result_data[i]['list_order'] = list_order
                for j in range(len(list_order)):
                    query = f"""SELECT * FROM Sub_ToppingDH WHERE id_DH = '{list_order[j]['id_DH']}'"""
                    sub_data = classsend.get_curSQL('manager-order.db', query=query)
                    # result_data[i]['Topping'] = sub_data
                    result_data[i]['list_order'][j]['Topping'] = sub_data
            else:
                result_data[i]['list_order'] = []
        return result_data
    elif Bia['action'] == 'getBia_dangsudung':
        query = f"SELECT name, group_bia, id_table, date_begin, 'tableBia_'||id_table id FROM 'table_bia' WHERE id_Thaotac='TINHTIEN';"
        result_data = classsend.get_curSQL('manager-order.db', query=query)
        return result_data
    elif Bia['action'] == "TINHTIEN":
        # ----------------------- update tien order ------------------- #
        for item in Bia['list_order']:
            print(item)
            put_HOANTHANH(item)
        # ----------------------- get Tien giờ bia --------------------- #
        tiengio = calc_time(Bia['id_table'])
        print(tiengio)
        query = f"""UPDATE table_bia SET id_Thaotac= "DONBAN",date_end='{Bia['date_end']}', trangthai="DỌN BÀN", Tong_TT='{tiengio}' WHERE id_table ='{Bia['id_table']}';"""
        classsend.get_curSQL('manager-order.db', query=query)
        # ======================================= Công vào doanh thu BIA ===================================== #
        query = f"""UPDATE Ca_NV SET DT_Bia = DT_Bia + {tiengio}
                                                 WHERE id_ca = '{Bia['id_ca']}';"""
        classsend.get_curSQL('manager-order.db', query=query)

        # ----------------------- get Tông Doanh Thu ----------------------- #
        show_DT = get_doanhthu(Bia['id_ca'])
        # await manager.broadcast(cashier, token, current_user)

        return {"msg": "Successfully post", "DT": show_DT, 'tiengio': tiengio}
    elif Bia['action'] == "BATDAU":
        query = f"""UPDATE table_bia SET id_Thaotac= "TINHTIEN", trangthai="TÍNH TIỀN", date_begin="{Bia['date_begin']}" WHERE id_table ='{Bia['id_table']}';"""
        classsend.get_curSQL('manager-order.db', query=query)
    elif Bia['action'] == "DONBAN":
        # ---------------------------- ghi log ------------------------------ #
        tz_VN = pytz.timezone('Asia/Ho_Chi_Minh')
        year = datetime.now(tz_VN).strftime('%Y')
        query = f"""SELECT * FROM table_bia WHERE id_table = '{Bia['id_table']}';"""
        list_tienban = classsend.get_curSQL('manager-order.db', query=query)
        df = pd.DataFrame(list_tienban)
        cur, con = classsend.get_cur_con('./Database_app/history.db')
        df.to_sql(f"""History_Bia_{year}""", con, if_exists='append', index=False)  # writes to file
        # --------------- update trạng thái table vể bắt đầu ---------#
        query = f"""UPDATE table_bia SET id_Thaotac= "BATDAU", trangthai="BẮT ĐẦU", date_begin="", date_end="" WHERE id_table ='{Bia['id_table']}';"""
        classsend.get_curSQL('manager-order.db', query=query)

        # ---------------------- refesh page ------------------------------ #
        query = f"SELECT * FROM 'table_bia';"
        result_data = classsend.get_curSQL('manager-order.db', query=query)
        # print(result_data)
        for i in range(len(result_data)):
            if (result_data[i]['id_Thaotac'] == 'TINHTIEN'):
                query = f"""SELECT * FROM Dathang WHERE date_new = datetime('{result_data[i]['date_begin']}');"""
                list_order = classsend.get_curSQL('manager-order.db', query=query)
                result_data[i]['list_order'] = list_order
                for j in range(len(list_order)):
                    query = f"""SELECT * FROM Sub_ToppingDH WHERE id_DH = '{list_order[j]['id_DH']}'"""
                    sub_data = classsend.get_curSQL('manager-order.db', query=query)
                    # result_data[i]['Topping'] = sub_data
                    result_data[i]['list_order'][j]['Topping'] = sub_data
            else:
                result_data[i]['list_order'] = []
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
        cur = classsend.get_curSQL('manager-order.db', query=query, args=args)
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
            # query = f"""SELECT *, Nhom.name
            #                 FROM 'khuyenmaiMH'
            #                 inner join Nhom on Nhom.id_nhom = khuyenmaiMH.id_nhom ;"""
            # result_data = classsend.get_curSQL('manager-order.db', query=query)
            query = f"""SELECT * FROM 'Sort_list';"""
            result_data = classsend.get_curSQL('manager-order.db', query=query)
            return result_data
# ------------------------------- Tuỳ chỉnh ------------------------------------#
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
    elif (tuychinh['action'] == 'get_tuychinh'):
        query = f"""SELECT *
                        FROM 'Tuychinh'"""
        result_data = classsend.get_curSQL('manager-order.db', query=query)
        # print(result_data)
        return result_data
    elif (tuychinh['action'] == 'Nhandon'):
        query = f"""UPDATE 'Tuychinh' SET Nhandon = '{tuychinh['checked']}'"""
        classsend.get_curSQL('manager-order.db', query=query)
        # await manager.broadcast(cashier, token, current_user)
        return {"msg": "Successfully kho"}
    elif (tuychinh['action']=='role'):
        query = f"""SELECT * FROM 'Color';"""
        color_list = classsend.get_curSQL('manager-order.db', query=query)
        query = f"""SELECT Color.*, Danhmuc.id_DM FROM 'Danhmuc'
                                    inner join Color on Danhmuc.color_DM = Color.id;"""
        color_list_DM = classsend.get_curSQL('manager-order.db', query=query)
        query = f"""SELECT *
                               FROM 'Tuychinh'"""
        result_data = classsend.get_curSQL('manager-order.db', query=query)
        # print({'color_list': color_list, 'DM_color': color_list_DM})
        return {'color_list': color_list, 'DM_color': color_list_DM, "role_order": result_data}
# ------------------------------- Báo cáo ------------------------------------#
@app_api.post('/baocao')
async def get_baocao(request: Request, Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()
    current_user = Authorize.get_jwt_subject()
    token = request.cookies['refresh_token_cookie']
    Report = await request.json()
    # print(Report)

    tz_VN = pytz.timezone('Asia/Ho_Chi_Minh')
    datetime_VN = datetime.now(tz_VN).strftime('%Y-%m-%d %H:%M:%S')

    if Report['action'] == 'get_BCDH':
        date_begin = Report['date_begin']
        date_end = Report['date_end']
        # query = f"SELECT strftime('%Y-%m-%d %H:%M:%S', datetime('now')) date_now;"
        # query = f"SELECT datetime('now') date_now;"
        # query = f"SELECT ifnull(null, datetime('{date_end}')) date_now"
        # data = classsend.get_curSQL('manager-order.db', query=query)

        # datetime.today().strftime('%Y-%m-%d %H:%M:%S')

        query = f"""SELECT * FROM Ca_NV WHERE 
                                    (datetime('{date_begin}') <= date_begin AND date_begin <= datetime('{date_end}')) OR
                                    (datetime('{date_begin}') <= COALESCE(date_end, datetime('{datetime_VN}')) AND COALESCE(date_end, datetime('{datetime_VN}')) <= datetime('{date_end}'))
                                    GROUP BY Table_log;"""
        data = classsend.get_curSQL('manager-order.db', query=query)
        result = []
        list_donhang =[]
        # --------- lấy danh sách list history và lấy danh sách hiện tại ỡ đây luôn -------------#
        for item in data:
            try:
                list_donhang.append({"Dathang": f'Dathang_{item["Table_Log"].split("_")[1]}', "Sub_ToppingDH": f'Sub_ToppingDH_{item["Table_Log"].split("_")[1]}'})
            except:
                pass
        # ------------- mặc định get table chính --------------#
        query = f"""SELECT Dathang.* FROM Dathang 
                                            WHERE 
                                                datetime('{date_begin}') <= date_thutien AND
                                                date_thutien <= datetime('{date_end}')
                                            ORDER BY datetime(date_new) DESC;"""
        result_data = classsend.get_curSQL('manager-order.db', query=query)
        # print_table(result_data)
        # --------------- get price topping ------------------#
        for i in range(len(result_data)):
            query = f"""SELECT * FROM Sub_ToppingDH WHERE id_DH = '{result_data[i]['id_DH']}'"""
            sub_data = classsend.get_curSQL('manager-order.db', query=query)
            result_data[i]['Topping'] = sub_data
        result = result + result_data
        # ----------------get table history -------------------#
        for item in list_donhang:
            try:
                query = f"""SELECT * FROM {item['Dathang']} 
                                    WHERE 
                                        datetime('{date_begin}') <= date_thutien AND
                                        date_thutien <= datetime('{date_end}')
                                    ORDER BY datetime(date_new) DESC;"""
                result_data = classsend.get_curSQL('./Database_app/history.db', query=query)
                # ------- get price topping -----------#
                for i in range(len(result_data)):
                    query = f"""SELECT * FROM {item['Sub_ToppingDH']} WHERE id_DH = '{result_data[i]['id_DH']}'"""
                    sub_data = classsend.get_curSQL('./Database_app/history.db', query=query)
                    result_data[i]['Topping'] = sub_data
                result = result+result_data
            except:
                pass
        return {'listtable': result, 'TotalRow': len(result)}
    elif Report['action'] == "get_BCMH":
        date_begin = Report['date_begin']
        date_end = Report['date_end']
        # query = f"SELECT strftime('%Y-%m-%d %H:%M:%S', datetime('now')) date_now;"
        # query = f"SELECT datetime('now') date_now;"
        # query = f"SELECT ifnull(null, datetime('{date_end}')) date_now"
        # data = classsend.get_curSQL('manager-order.db', query=query)

        # datetime.today().strftime('%Y-%m-%d %H:%M:%S')
        query = f"""SELECT * FROM Ca_NV WHERE 
                                            (datetime('{date_begin}') <= date_begin AND date_begin <= datetime('{date_end}')) OR
                                            (datetime('{date_begin}') <= COALESCE(date_end, datetime('{datetime_VN}')) AND COALESCE(date_end, datetime('{datetime_VN}')) <= datetime('{date_end}'))
                                            GROUP BY Table_log;"""
        data = classsend.get_curSQL('manager-order.db', query=query)

        result = []
        list_donhang = []
        # --------- lấy danh sách list history và lấy danh sách hiện tại ỡ đây luôn -------------#
        for item in data:
            try:
                list_donhang.append({"Dathang": f'Dathang_{item["Table_Log"].split("_")[1]}',
                                     "Sub_ToppingDH": f'Sub_ToppingDH_{item["Table_Log"].split("_")[1]}'})
            except:
                pass
        # ------------- mặc định get table chính --------------#
        query = f"""SELECT Dathang.* FROM Dathang 
                                                   WHERE 
                                                       datetime('{date_begin}') <= date_thutien AND
                                                       date_thutien <= datetime('{date_end}')
                                                   ORDER BY datetime(date_new) DESC;"""
        result_data = classsend.get_curSQL('manager-order.db', query=query)
        result = result + result_data
        # print_table(result)
        # --------------- get price topping ------------------#
        for i in range(len(result_data)):
            query = f"""SELECT Sub_ToppingDH.id_DH, Sub_ToppingDH.id_MH, Sub_ToppingDH.name_MH
                        , Sub_ToppingDH.Topping_DG price_MH
                        , Sub_ToppingDH.soluong_TPDH * '{result_data[i]['soluong_MH']}' soluong_MH, 0 phantramKM, 0 price_TC
                        , Dathang.id_DM
                        , 'Topping' name_DM, '3' id_DM
                        , '{result_data[i]['LoaiTT']}' LoaiTT
                        , '{result_data[i]['Action']}' Action
                                        FROM Sub_ToppingDH 
                                        inner join Dathang on Sub_ToppingDH.id_DH = Dathang.id_DH
                                        WHERE Sub_ToppingDH.id_DH = '{result_data[i]['id_DH']}'"""
            sub = classsend.get_curSQL('manager-order.db', query=query)
            result = result + sub

        # ----------------get table history -------------------#
        for item in list_donhang:
            # print(item)
            try:
                query = f"""SELECT * FROM {item['Dathang']}
                                            WHERE 
                                                datetime('{date_begin}') <= date_new AND
                                                date_new <= datetime('{date_end}')
                                            ORDER BY datetime(date_new) DESC;"""
                result_data = classsend.get_curSQL('./Database_app/history.db', query=query)
                result = result + result_data

                # ------- get price topping -----------#
                for i in range(len(result_data)):
                    query = f"""SELECT Sub_ToppingDH.id_DH, Sub_ToppingDH.id_MH, Sub_ToppingDH.name_MH
                                , Sub_ToppingDH.Topping_DG price_MH
                                , Sub_ToppingDH.soluong_TPDH * '{result_data[i]['soluong_MH']}' soluong_MH, 0 phantramKM, 0 price_TC
                                , Dathang.id_DM
                                , 'Topping' name_DM, '3' id_DM
                                , '{result_data[i]['LoaiTT']}' LoaiTT
                                , '{result_data[i]['Action']}' Action
                                        FROM '{item['Sub_ToppingDH']}' AS Sub_ToppingDH
                                        inner join {item['Dathang']} AS Dathang on Sub_ToppingDH.id_DH = Dathang.id_DH
                                        WHERE Sub_ToppingDH.id_DH = '{result_data[i]['id_DH']}'"""
                    sub_data = classsend.get_curSQL('./Database_app/history.db', query=query)
                    result = result + sub_data
                    print_table(sub_data)
                    # print(item['Sub_ToppingDH'])
            except:
                pass
        # print_table(result)
        return {'listtable': result, 'TotalRow': len(result)}
    elif Report['action'] == "get_BCNL":
        date_begin = Report['date_begin']
        date_end = Report['date_end']
        query = f"""SELECT * FROM Ca_NV WHERE 
                                            (datetime('{date_begin}') <= date_begin AND date_begin <= datetime('{date_end}')) OR
                                            (datetime('{date_begin}') <= COALESCE(date_end, datetime('{datetime_VN}')) AND COALESCE(date_end, datetime('{datetime_VN}')) <= datetime('{date_end}'));"""
        data = classsend.get_curSQL('manager-order.db', query=query)
        # print_table(data)

        result = []
        list_donhang = []
        Nguyenlieu = []
        dict ={}
        # --------- lấy danh sách list history và lấy danh sách hiện tại ỡ đây luôn -------------#
        for item in data:
            try:
                list_donhang.append({"Dathang": f'Dathang_{item["Table_Log"].split("_")[1]}', "Sub_ToppingDH": f'Sub_ToppingDH_{item["Table_Log"].split("_")[1]}'})
            except:
                pass
        # get table history
        # for item in list_donhang:
        #     # print(item)
        #     try:
        #         query = f"""SELECT * FROM {item['Dathang']}
        #                               WHERE
        #                                   datetime('{date_begin}') <= date_new AND
        #                                   date_new <= datetime('{date_end}')
        #                               ORDER BY datetime(date_new) DESC;"""
        #         result_data = classsend.get_curSQL('./Database_app/history.db', query=query)
        #         # ------- get price topping -----------#
        #         # for i in range(len(result_data)):
        #         #     query = f"""SELECT * FROM {item['Sub_ToppingDH']} WHERE id_DH = '{result_data[i]['id_DH']}'"""
        #         #     sub_data = classsend.get_curSQL('./Database_app/history.db', query=query)
        #         #     result_data[i]['Topping'] = sub_data
        #         # result = result + result_data
        #         for i in range(len(result_data)):
        #             #-------------- nguyen lieu MH --------------#
        #             query = f"""SELECT * FROM Sub_NL WHERE id_MH='{result_data[i]['id_MH']}';"""
        #             NL = classsend.get_curSQL('manager-order.db', query=query)
        #             for j in range(len(NL)):
        #                 soluongNL = NL[j]['soluong_NL']
        #                 query = f"""SELECT * FROM NguyenLieu WHERE id_NL='{NL[j]['id_NL']}';"""
        #                 NLtmp = classsend.get_curSQL('manager-order.db', query=query)
        #                 NLtmp[0]['soluongNLMH'] = soluongNL
        #                 NLtmp[0]['id_MH'] = result_data[i]['id_MH']
        #                 NLtmp[0]['id_DM'] = result_data[i]['id_DM']
        #                 # print(NLtmp)
        #                 Nguyenlieu.append(NLtmp[0])
        #
        #             # -------------- nguyen lieu Topping --------------#
        #             query = f"""SELECT * FROM {item['Sub_ToppingDH']} WHERE id_DH = '{result_data[i]['id_DH']}'"""
        #             sub_data = classsend.get_curSQL('manager-order.db', query=query)
        #             # result_data[i]['Topping'] = sub_data
        #             for items in range(len(sub_data)):
        #                 # -------------- nguyen lieu MH topping--------------#
        #                 query = f"""SELECT * FROM Sub_NL WHERE id_MH='{sub_data[items]['id_MH']}';"""
        #                 NLs = classsend.get_curSQL('manager-order.db', query=query)
        #                 for jitem in range(len(NLs)):
        #                     soluongNL = NL[jitem]['soluong_NL']
        #                     query = f"""SELECT * FROM NguyenLieu WHERE id_NL='{NLs[jitem]['id_NL']}';"""
        #                     NLtmp = classsend.get_curSQL('manager-order.db', query=query)
        #                     NLtmp[0]['soluongNLMH'] = soluongNL
        #                     NLtmp[0]['id_MH'] = sub_data[item]['id_MH']
        #                     NLtmp[0]['id_DM'] = result_data[i]['id_DM']
        #                     # print(NLtmp)
        #                     Nguyenlieu.append(NLtmp[0])
        #     except:
        #         pass
        # ------------- mặc định get table chính --------------#
        query = f"""SELECT Dathang.* FROM Dathang
                                              WHERE
                                                Action = 'HOANTHANH' AND
                                                COALESCE(Huy_Don,0) != 1 AND
                                                (datetime('{date_begin}') <= date_thutien AND
                                                date_thutien <= datetime('{date_end}'))
                                              ORDER BY datetime(date_new) DESC;"""
        result_data = classsend.get_curSQL('manager-order.db', query=query)
        # print_table(result_data)
        # ------- get price topping và lấy nguyen liệu-----------#
        for i in range(len(result_data)):
            #-------------- nguyen lieu MH --------------#
            query = f"""SELECT Sub_NL.id_NL, Sub_NL.id_MH
                            , '{result_data[i]['id_DM']}' id_DM
                            , Sub_NL.soluong_NL * '{result_data[i]['soluong_MH']}' soluong_NL
                            , NguyenLieu.name_NL, NguyenLieu.donvi
                            FROM Sub_NL
                            inner join NguyenLieu on NguyenLieu.id_NL = Sub_NL.id_NL
                            WHERE Sub_NL.id_MH='{result_data[i]['id_MH']}';"""
            NL = classsend.get_curSQL('manager-order.db', query=query)
            result = result + NL

            # -------------- nguyen lieu Topping --------------#
            query = f"""SELECT soluong_TPDH * '{result_data[i]['soluong_MH']}' soluongTP, id_MH FROM Sub_ToppingDH WHERE id_DH = '{result_data[i]['id_DH']}'"""
            sub_data = classsend.get_curSQL('manager-order.db', query=query)
            for item in range(len(sub_data)):
                # -------------- nguyen lieu MH topping--------------#
                query = f"""SELECT Sub_NL.id_NL, Sub_NL.id_MH
                                            , '{result_data[i]['id_DM']}' id_DM
                                            , Sub_NL.soluong_NL * '{sub_data[item]['soluongTP']}' soluong_NL
                                            , NguyenLieu.name_NL, NguyenLieu.donvi
                                            FROM Sub_NL
                                            inner join NguyenLieu on NguyenLieu.id_NL = Sub_NL.id_NL
                                            WHERE Sub_NL.id_MH='{sub_data[item]['id_MH']}';"""
                NL_topping = classsend.get_curSQL('manager-order.db', query=query)
                result = result + NL_topping
            # print_table(result)
            # return
        return {'listtable': result, 'TotalRow': "max_row[0]['TotalRow']"}
    elif Report['action'] == "get_BCGC":
        query = f"""SELECT * FROM Ca_NV;"""
        data = classsend.get_curSQL('manager-order.db', query=query)
        return {'listtable': data, 'TotalRow': "max_row[0]['TotalRow']"}
    elif Report['action'] == "get_BCkho":
        date_begin = Report['date_begin']
        date_end = Report['date_end']
        query = f"""SELECT * FROM 'Log_Kho' WHERE 
                                          (datetime('{date_begin}') <= date_new AND date_new <= datetime('{date_end}'))
                                          ;"""
        result_data = classsend.get_curSQL('manager-order.db', query=query)
        # print_table(result_data)
        return {'listtable': result_data, 'TotalRow': "max_row[0]['TotalRow']"}
    elif Report['action'] == "get_BCTonkho":
        query = f"SELECT * FROM 'NguyenLieu';"
        result_data = classsend.get_curSQL('manager-order.db', query=query)
        # print(result_data)
        return {'listtable': result_data, 'TotalRow': "max_row[0]['TotalRow']"}
    elif Report['action'] == 'getDM':
        result = []
        query = f"""SELECT id_MH, name_MH, Danhmuc.id_DM, Danhmuc.name_DM 
                            FROM 'Mathang'
                            inner join Danhmuc on Danhmuc.id_DM = Mathang.id_DM;"""
        result_data = classsend.get_curSQL('manager-order.db', query=query)
        for item in range (len(result_data)):
            query = f"""SELECT * FROM 'Sub_NL' WHERE id_MH = {result_data[item]['id_MH']};"""
            result_datas = classsend.get_curSQL('manager-order.db', query=query)
            result_data[item]['nguyenlieu']= result_datas
        print_table(result_data)
        return result_data
    elif Report['action'] == "get_BCThaotac":
        date_begin = Report['date_begin']
        date_end = Report['date_end']
        year = datetime.now(tz_VN).strftime('%Y')
        query = f"""SELECT * FROM Log_action_{year}
                                                   WHERE
                                                       datetime('{date_begin}') <= date_new AND
                                                       date_new <= datetime('{date_end}')
                                                   ORDER BY datetime(date_new) DESC;"""
        result_data = classsend.get_curSQL('./Database_app/history.db', query=query)
        # print_table(result_data)
        return {'listtable': result_data, 'TotalRow': "max_row[0]['TotalRow']"}
    elif Report['action'] == "get_BCBia":
        date_begin = Report['date_begin']
        date_end = Report['date_end']
        year = datetime.now(tz_VN).strftime('%Y')
        query = f"""SELECT * FROM History_Bia_{year} WHERE
                                                       datetime('{date_begin}') <= date_end AND
                                                       date_end <= datetime('{date_end}')
                                                   ORDER BY datetime(date_begin) DESC;"""
        # query = f"SELECT * FROM 'History_Bia_{year}' ORDER BY datetime(date_begin) DESC;"
        result_data = classsend.get_curSQL('./Database_app/history.db', query=query)
        # print(result_data)
        for i in range(len(result_data)):
            query = f"""SELECT * FROM Dathang WHERE date_thutien = datetime('{result_data[i]['date_end']}') AND id_table_custom = 'tableBia_{result_data[i]['id_table']}';"""
            list_order = classsend.get_curSQL('manager-order.db', query=query)
            result_data[i]['list_order'] = list_order
            for j in range(len(list_order)):
                query = f"""SELECT * FROM Sub_ToppingDH WHERE id_DH = '{list_order[j]['id_DH']}'"""
                sub_data = classsend.get_curSQL('manager-order.db', query=query)
                result_data[i]['list_order'][j]['Topping'] = sub_data
            # nếu check bảng chính không có thì check bảng log
            if(len(list_order) == 0):
                query = f"""SELECT * FROM Dathang_{year} WHERE date_thutien = datetime('{result_data[i]['date_end']}') AND id_table_custom = 'tableBia_{result_data[i]['id_table']}';"""
                list_order = classsend.get_curSQL('./Database_app/history.db', query=query)
                result_data[i]['list_order']= list_order
                for j in range(len(list_order)):
                    query = f"""SELECT * FROM Sub_ToppingDH_{year} WHERE id_DH = '{list_order[j]['id_DH']}'"""
                    sub_data = classsend.get_curSQL('./Database_app/history.db', query=query)
                    result_data[i]['list_order'][j]['Topping']=sub_data

        return {'listtable': result_data, 'TotalRow': "max_row[0]['TotalRow']"}

# ------------------------------- Thống kê ------------------------------------#
@app_api.post('/thongke')
async def get_thongke(request: Request, Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()
    current_user = Authorize.get_jwt_subject()
    token = request.cookies['refresh_token_cookie']
    Thongke = await request.json()
    # print(Report)
    tz_VN = pytz.timezone('Asia/Ho_Chi_Minh')
    datetime_VN = datetime.now(tz_VN).strftime('%m')

    if Thongke['action'] == 'Top_MH':
        # --------------- Top 10 Tháng ----------------#
        list_12thang = {}
        for i in range(int(datetime_VN)):
            i=i+1
            thang = i;
            table = f'Top_MH_Thang{i}'
            if (i<10):
                table = f'Top_MH_Thang0{i}'
                # thang = f'0{i}'
            query = f"""SELECT name_MH, soluong_ban, color, color_DM, name_DM FROM '{table}';"""
            result = classsend.get_curSQL('./Database_app/history.db', query=query)
            list_12thang[thang] = result
        # --------------- info Doanh Thu ----------------#
        datetime_CUR = datetime.now(tz_VN).strftime('%Y-%m-%d %H:%M:%S')
        datetime_BE = datetime.now(tz_VN).strftime('%Y-%m-%d 00:00:00')
        datetime_CURs = datetime.now(tz_VN).strftime('%Y-%m-%d')
        yesterday = datetime.today() - timedelta(days=1)
        yesterday = yesterday.strftime('%Y-%m-%d')

        query = f"""SELECT * FROM TotalBill WHERE date= '{datetime_CURs}';"""
        date_current = classsend.get_curSQL('./Database_app/history.db', query=query)
        query = f"""SELECT * FROM TotalBill WHERE date= '{yesterday}';"""
        date_yesterday = classsend.get_curSQL('./Database_app/history.db', query=query)

        result = {'date_current': date_current, 'date_yesterday': date_yesterday}
        # print_table(result)
        # print(yesterday)

        # ------------- DT dich vu 30 ngày --------------#
        query = f"""SELECT * FROM TotalBill;"""
        DT30 = classsend.get_curSQL('./Database_app/history.db', query=query)


        return {'top10': list_12thang, 'TotalDT': result, "Total_DV":DT30}
# ------------------------------- dropbox ------------------------------------#
@app_api.post('/dropbox')
async def get_dropbox(request: Request, Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()
    current_user = Authorize.get_jwt_subject()
    token = request.cookies['refresh_token_cookie']
    # dropbox = await request.json()

    result_data = {}
    query = f"SELECT * FROM 'Danhmuc' WHERE id_Thaotac='1' ORDER BY name_DM COLLATE NOCASE;"
    danhmuc = classsend.get_curSQL('manager-order.db', query=query)
    result_data['danhmuc'] = danhmuc

    query = f"SELECT * FROM 'Nhom' ORDER BY name_nhom COLLATE NOCASE;"
    Nhom = classsend.get_curSQL('manager-order.db', query=query)
    result_data['nhom'] = Nhom

    query = f"SELECT * FROM 'NguyenLieu' ORDER BY name_NL COLLATE NOCASE;"
    NL = classsend.get_curSQL('manager-order.db', query=query)
    result_data['nguyenlieu'] = NL

    query = f"SELECT * FROM 'MatHang' WHERE id_DM != '3' AND id_Thaotac='1' ORDER BY 'name_MH' COLLATE NOCASE;"
    MatHang = classsend.get_curSQL('manager-order.db', query=query)
    result_data['mathang'] = MatHang

    query = f"SELECT * FROM 'MatHang' WHERE id_DM ='3' AND id_Thaotac='1' ORDER BY 'name_MH' COLLATE NOCASE;"
    ToppingMH = classsend.get_curSQL('manager-order.db', query=query)
    result_data['Topping'] = ToppingMH

    query = f"SELECT UserName FROM 'Account' WHERE Role='NV';"
    nhanvien = classsend.get_curSQL('datagame.db', query=query)
    result_data['nhanvien'] = nhanvien

    return result_data

# =============================== Phong May ===================================== #
''''''
# ------------------- Hoi vien ------------------#
@app_api.post('/hoivien')
# async def post_mathang(payload: dict = Body(...), Authorize: AuthJWT = Depends()):
async def manager_HV(request: Request, Authorize: AuthJWT = Depends()):
# async def post_mathang(arbitrary_json: JSONObject = None, Authorize: AuthJWT = Depends()):
#     Authorize.jwt_required()
#     current_user = Authorize.get_jwt_subject()
    Authorize.jwt_required()
    current_user = Authorize.get_jwt_subject()
    token = request.cookies['refresh_token_cookie']
    HV = await request.json()
    print(HV)
    # print(Bia)
    #------ func check sql injection ---------#
    # check = check_dict_sqlinjection(Mathang)
    # if check!= True:
    #     return check

    # classsend = Sqlite(database='manager-order.db')
    # print(Mathang)
    # token = request.cookies['refresh_token_cookie']

    # tuples= ("Sting", "cam ép")
    if (HV['action'] == 'new_hv'):
        args = (HV['name_HV'], HV['pass_HV'], HV['Ho_hv'], HV['Ten_hv'],
                HV['date_birday'], HV['tendem_hv'], HV['phone'], HV['email'],
                HV['address'], HV['city'], HV['zipcode'], HV['cccd'],
                HV['date_create'], HV['chophep'])
        query = f"""INSERT INTO user_tb(UserName, Password, FirstName, LastName,
                    Birthdate, MiddeName, Phone, Email,
                     Address, City, Zipcode, ID,
                      RecordDate, Active)  VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"""
        classsend.get_curSQL('account.db', query=query, args=args)
        # await manager.broadcast(nguyenlieu, token, current_user)
        return {"msg": "success", "content": f"Tạo HV <b>{HV['name_HV']} thành công</b>`"}
    elif HV['action'] == 'get_hv':
        query = f"SELECT * FROM 'user_tb';"
        result_data = classsend.get_curSQL('account.db', query=query)
        # print(result_data)
        return result_data
    elif HV['action'] == 'get_nhom_hv':
        query = f"SELECT * FROM 'Nhom_HV';"
        result_data = classsend.get_curSQL('account.db', query=query)
        # print(result_data)
        return result_data
    elif HV['action'] == 'get_nhom_pc':
        query = f"SELECT * FROM 'Nhom_PC';"
        result_data = classsend.get_curSQL('account.db', query=query)
        # print(result_data)
        return result_data
    elif HV['action'] == 'new_nhom_pc':
        args = (HV['name_nhom_pc'], HV['mota'], '1')
        query = f"""INSERT INTO Nhom_PC(name_nhom_pc, mota, Active)  VALUES(?, ?, ?)"""
        classsend.get_curSQL('account.db', query=query, args=args)
        # await manager.broadcast(nguyenlieu, token, current_user)
        return {"msg": "success", "content": f"Tạo Nhóm máy <b>{HV['name_nhom_pc']} thành công</b>`"}

# ============================== IDC =============================== #
''''''
#------------------------- Login Server update game google script -------------------------#
def get_api_server(url, keyServer, keyResilio):
    port = None
    api = SV_google_app_script(
        url=url,
        port=port,
        keyServer=keyServer,
        keyResilio=keyResilio,
    )
    return api
Server_api=None
Server_Status=None
token = None

class SV_google_app_script(object):
    def __init__(self, url, port, keyServer, keyResilio):
        self.url, self.port = url, port
        self.api_url = f"http://{self.url}:{self.port}"
        self.keyServer, self.keyResilio = keyServer, keyResilio
        import requests
        self.session = requests.Session()
        self.session.verify = False
        self.token, self.Status = self.login_App()
        # print('token', self.token)
        threading.Thread(target=self.check_lisent).start()

    def login_App(self):
        global token #<== get biến token
        global Server_Status # <== get Status server
        # print(self.keyServer, self.keyResilio)
        value = {'event_key': 'Login_App',
                 'Key': self.keyServer,
                 'Key_Resilio': self.keyResilio,
                 # 'HoTen': 'khaicafe',
                 # 'Email': 'khaicafe@gmail.com',
                 # 'Date_Create': datetime.now().strftime("%H:%M:%S, %d/%m/%Y"),
                 }
        r = self.session.get(url=url, params=value)
        # print('login server status: ', r.status_code)
        value = r.json()
        # return value['token']['accessToken'], value['rev_data']
        print('login_server: ',value, '\n')
        if "rev_data" in value:
            Server_Status = value['rev_data']['Status']
            # print(Server_Status)
            if Server_Status == 'Ready':
                token = value['token']['accessToken']
                args = (value['rev_data']['Status'], value['rev_data']['Ngayhethan'])
                query = f"UPDATE Design SET Status=?, Ngayhethan=?"
                classsend.get_curSQL('datagame.db', query=query, args=args)
                # service_name = "rslsyncsvckl"
                # try:
                #     subprocess.check_output(f'''net start {service_name}''', shell=True)
                # except:
                #     pass
                # Box_alert(f'Success', 'ok')
            else:
                token = ''
                # Qwidget_main = False  # biến ghi log đã khởi động xong
                if Server_Status == 'Hết hạn':
                    args = (value['rev_data']['Status'], value['rev_data']['Ngayhethan'])
                    query = f"UPDATE Design SET Status=?, Ngayhethan=?"
                    classsend.get_curSQL('datagame.db', query=query, args=args)
                    # Box_alert(f'Key has expired ! Please renew the software on the web https:\\Menukl.com')
                elif Server_Status == 'ERROR-submit':
                    # args = (value['rev_data']['Status'],)
                    query = f"UPDATE Design SET Status='{value['rev_data']['Status']}'"
                    classsend.get_curSQL('datagame.db', query=query)
                    # Box_alert(f'Key {Server_Status} ! Please renew the software on the web https:\\Menukl.com')

                # =========== stop service resilio ============#
                service_name = "rslsyncsvckl"
                # try:
                #     subprocess.check_output(f'''net stop {service_name} /y''', shell=True)
                #     pass
                # except:
                #     print('stop service resilio error')
                # subprocess.check_output(f'''net stop {service_name} /y && net start {service_name}''', shell=True)
            print(token)
            return token, value['rev_data']

    def check_lisent(self):
        pass
        # while True:
        #     time.sleep(60)
        #     global token  # <== get biến token
        #     global Server_Status  # <== get Status server
        #     value = {'event_key': 'Login_App',
        #              'Key': self.keyServer,
        #              'Key_Resilio': self.keyResilio,
        #              # 'HoTen': 'khaicafe',
        #              # 'Email': 'khaicafe@gmail.com',
        #              # 'Date_Create': datetime.now().strftime("%H:%M:%S, %d/%m/%Y"),
        #              }
        #     r = self.session.get(url=url, params=value)
        #     # print('login server status: ',r.status_code)
        #     value = r.json()
        #     # print('login_server: ',value, '\n')
        #     if "rev_data" in value:
        #         Server_Status = value['rev_data']['Status']
        #         self.Status = value['rev_data']
        #         if Server_Status == 'Ready':
        #             token = value['token']['accessToken']
        #             args = (value['rev_data']['Status'], value['rev_data']['Ngayhethan'])
        #             query = f"UPDATE Design SET Status=?, Ngayhethan=?"
        #             classsend.get_curSQL('datagame.db', query=query, args=args)
        #             service_name = "rslsyncsvckl"
        #             # try:
        #             #     subprocess.check_output(f'''net start {service_name}''', shell=True)
        #             # except:
        #             #     pass
        #             # Box_alert(f'Success', 'ok')
        #         else:
        #             token = ''
        #             # Qwidget_main = False  # biến ghi log đã khởi động xong
        #             if Server_Status == 'Hết hạn':
        #                 args = (value['rev_data']['Status'], value['rev_data']['Ngayhethan'])
        #                 query = f"UPDATE Design SET Status=?, Ngayhethan=?"
        #                 get_curSQL('datagame.db', query=query, args=args)
        #                 # Box_alert(f'Key has expired ! Please renew the software on the web https:\\Menukl.com')
        #             elif Server_Status == 'ERROR-submit':
        #                 # args = (value['rev_data']['Status'],)
        #                 query = f"UPDATE Design SET Status='{value['rev_data']['Status']}'"
        #                 get_curSQL('datagame.db', query=query)
        #                 # Box_alert(f'Key {Server_Status} ! Please renew the software on the web https:\\Menukl.com')
        #
        #             # =========== stop service resilio ============#
        #             # service_name = "rslsyncsvckl"
        #             # try:
        #             #     subprocess.check_output(f'''net stop {service_name} /y''', shell=True)
        #             #     pass
        #             # except:
        #             #     print('stop service resilio error')
        #             # subprocess.check_output(f'''net stop {service_name} /y && net start {service_name}''', shell=True)
        #     # return token, value['rev_data']
    #          {'status': 'Invalid Signature get App', 'value-error':
    # ======================== get list game to Server ===========================#
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
        print(value)
        return value

    def sosanh_listgame(self,value):
        # self.cur.execute("SELECT * FROM Gamelist")
        # self.gamelist = self.cur.fetchall()
        query = f"SELECT * FROM Gamelist"
        gamelist = classsend.get_curSQL('gamelist.db', query=query)
        valuegame = []
        listresilio = []
        listsql = []

        list_idgame = []

        for i in gamelist:
            listsql.append(i['ID'])
        # print(listsql)

        for j in value:
            # listresilio.append(j['FolderID'])
            list_idgame.append(j['ID_Game'])
        # print(list_idgame)

        # s = ['a', 'b', 'c']
        s = list_idgame
        # f = ['a', 'b', 'd', 'c']
        f = listsql
        ss = set(s)
        fs = set(f)
        # =========== list game same ========= #
        # print (ss.intersection(fs))

        # =========== total 2 list game ========= #
        # print (ss.union(fs))

        # =========== total 2 list game đã loại ra những game giống nhau ========= #
        # print (ss.union(fs) - ss.intersection(fs))

        # =========== list game mới so vs list cũ =========#
        listnew = ss - ss.intersection(fs)
        # print (ss - ss.intersection(fs))
        # type(listnew)
        # print (list(listnew))

        for i in gamelist:
            for j in value:
                if j['ID_Game'] == i['ID']:
                    ID = j['ID_Game']
                    Photo = url_to_blob(j['Photo_Game'])
                    GroupGame = j['Group_Game']
                    NameGame = j['Name_Game']
                    Totalsize = j['Totalsize']
                    Category = j['Theloai']
                    filerun = j['FileRun']
                    linkgame = j['linkdown']
                    Status = 'update list'
                    Date_Create = j['Date_Create']
                    Price = j['Price']

                    args = (Photo, GroupGame, NameGame, Totalsize, Category, filerun, linkgame, Date_Create, Price, ID)
                    query = f"UPDATE Gamelist SET Photo=?, GroupGame=?, NameGame=?, Totalsize=?, Category=?, filerun=?, linkgame=?, Date_Create=?, Price=? WHERE ID=?"
                    get_curSQL('gamelist.db', query=query, args=args)

        for k in list(listnew):
            for j in value:
                if j['ID_Game'] == k:
                    ID = j['ID_Game']
                    Photo = url_to_blob(j['Photo_Game'])
                    FolderID = ''
                    GroupGame = j['Group_Game']
                    NameGame = j['Name_Game']
                    Totalsize = j['Totalsize']
                    Category = j['Theloai']
                    filerun = j['FileRun']
                    linkgame = j['linkdown']
                    Status = 'New Game'
                    Date_Create = j['Date_Create']
                    Price = j['Price']

                    values = (
                    ID, Photo, FolderID, GroupGame, NameGame, Totalsize, Category, filerun, linkgame, Status, Date_Create, Price,)
                    # curclient.execute(query, values)
                    query = f"INSERT INTO Gamelist VALUES(?,?,?,?,?,?,?,?,?,?,?,?)"
                    get_curSQL('gamelist.db', query=query, args=values)

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
        classsend.get_curSQL('datagame.db', query=query, args=args)
        return value

    # ======================== Set info PM to Server ===========================#
    def set_infoPM(self,Logo, TenPhongMay, DiaChi, Soluongmay, Ngayhethan, Status):
        Logo = url_to_blob(Logo)
        args = (Logo, TenPhongMay, DiaChi, Soluongmay, Ngayhethan, Status)
        query = f"UPDATE Design SET Logo=?,tenphongmay=?, DiaChi=?, Soluongmay=?, Ngayhethan=?, Status=?"
        classsend.get_curSQL('datagame.db', query=query, args=args)
url = 'https://script.google.com/macros/s/AKfycbzqO7xTGQ9ioT31Z0qrXXDCW8gLfA60hDuEQDC9u63jF9xoiLdS0e3iEV-0eqRYCXlBTA/exec'
keyServer ='5888-8392-3360-3788'
keyResilio = 'ECLLQNDVF7E4PJE4J57VMVP4WWOFXDLT'
# api = get_api_server(url, keyServer, keyResilio)
# allgame_idc = api.get_listgame()
# print(allgame_idc)
# allgame_idc = api.get_listgame()
# print(allgame_idc)

@app_api.post('/idc')
async def IDC_game(request: Request, Authorize: AuthJWT = Depends()):#, cache: RedisCacheBackend = Depends(redis_cache)):
    Authorize.jwt_required()
    current_user = Authorize.get_jwt_subject()
    token = request.cookies['refresh_token_cookie']
    IDC = await request.json()
    if IDC['action'] == 'All_game':
        All_Game = {}
        query = "SELECT * FROM Listgame Where Groupgame='Game Online' order by CAST(ID AS INTEGER)"
        getgameonline = classsend.get_curSQL('datagame.db',query=query)
        All_Game['online_game'] = getgameonline
        query = "SELECT * FROM Listgame Where Groupgame='Game Offline' order by CAST(ID AS INTEGER)"
        getgameoffline = classsend.get_curSQL('datagame.db', query=query)
        All_Game['offline_game'] = getgameoffline
        # query = "SELECT * FROM Design"
        # getdesign = get_curSQL('datagame.db', query=query)
        return All_Game
    elif IDC['action'] == 'All_game_idc':
        # in_cache = await cache.get('some_cached_key')

        # in_cache = None
        # try:
        #     in_cache = cache['key']
        # except:
        #     pass
        # print(in_cache)
        # if not in_cache:
        #     allgame_idc = api.get_listgame()
        #     # await cache.set('some_cached_key', allgame_idc, 5)
        #     cache['key'] = allgame_idc
        #     return allgame_idc
        # return in_cache

        allgame_idc = api.get_listgame()
        # urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
        return allgame_idc

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
'''
#Second .py module
# import thread
# import create_ftp_server

# this_ftp = ftp_server()

# threading.Thread(daemon=True, target=ftp).start()
# threading.Thread.start_new_thread(this_ftp.run,())
# threading.Thread.start_new_thread(this_ftp.add_user,('user','password',".",'elradfmwM'))

'''

'''
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
'''


# ---------------------------- stream same socket ----------------------------#
'''
# import pathlib
# desktop = pathlib.Path("D:/")
# desktop.iterdir()
# list(desktop.iterdir())
# for item in desktop.iterdir():
#     print(f"{item} - {'dir' if item.is_dir() else 'file'}")

# desktop.rglob("*")
# list(desktop.rglob("*"))
# print(list(desktop.rglob("*")))



'''


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
        return
        # Check if data in table
        query = f"""SELECT COUNT(*) as total FROM Listorder;"""
        task_id = classsend.get_curSQL('manager-order.db', query=query)
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

'''
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
'''
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

import multiprocessing
def start_web_app():
    # pyinstaller --onefile --hidden-import=Server-monitor Server-monitor.py (build file)
    # multiprocessing.freeze_support()
    # uvicorn.run("Server-monitor:app_api", host=f"0.0.0.0", port=8100, reload=True, debug= True, log_level="debug")#  reload=True, "Server-monitor:app_api" ,workers=1 , reload=True, log_level="info"
    # code build
    uvicorn.run("Server-monitor:app_api", host=f"0.0.0.0", port=8100)
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

#-------------------------------------- Resilio ------------------------------------------#
import requests as rq
import urllib.parse
from urllib.error import URLError
from urllib.request import urlopen
import bs4
import pandas as pd
def humanbytes(B):
    """Return the given bytes as a human friendly KB, MB, GB, or TB string."""
    B = float(B)
    KB = float(1024)
    MB = float(KB ** 2) # 1,048,576
    GB = float(KB ** 3) # 1,073,741,824
    TB = float(KB ** 4) # 1,099,511,627,776

    if B < KB:
        return '{0} {1}'.format(B,'Bytes' if 0 == B > 1 else 'Byte')
    elif KB <= B < MB:
        return '{0:.2f} KB'.format(B / KB)
    elif MB <= B < GB:
        return '{0:.2f} MB'.format(B / MB)
    elif GB <= B < TB:
        return '{0:.2f} GB'.format(B / GB)
    elif TB <= B:
        return '{0:.2f} TB'.format(B / TB)
class ResilioSyncClient(object):
    def __init__(self, host, port, username, password):
        self.host, self.port = host, port
        self.api_url = f"http://{self.host}:{self.port}"
        self.username, self.password = username, password
        self.session = rq.Session()
        self.session.auth = (self.username, self.password)
        self.session.timeout = 1
        self.session.verify = False
        self.token = self.get_token()

        # json = self.get_generic({"action": "events"})
        # print(json)

    def format_timestamp(self):
        dt = datetime.utcnow() - datetime(1970, 1, 1)
        ms = (dt.days * 24 * 60 * 60 + dt.seconds) * 1000 + dt.microseconds / 1000.0
        return int(ms)

    def get_token(self):
        # token_url = urllib.parse.urljoin(self.api_url, "gui/token.html")
        # response = self.session.get(token_url, params={"t": self.format_timestamp()}, timeout=10)
        # soup = bs4.BeautifulSoup(response.content, "lxml")
        # token_divs = soup.select("#token")
        # token = token_divs[0].decode_contents()
        # return token
        try:
            token_url = urllib.parse.urljoin(self.api_url, "gui/token.html")
            response = self.session.get(token_url, params={"t": self.format_timestamp()}, timeout=10)
            soup = bs4.BeautifulSoup(response.content, "lxml")
            token_divs = soup.select("#token")
            token = token_divs[0].decode_contents()
            return token
        except:
            if Server_Status != None:
                print("server api: ", Server_api.Status, Server_Status)
            else:
                print('Lỗi connect resilio')


    def get_generic(self, params):
        try:
            response = self.session.get(
                urllib.parse.urljoin(self.api_url, "gui/"),
                params={"token": self.token, **params, "t": self.format_timestamp()},
                timeout=5,
            )
            return response.json()
        except Exception as e:
            print('error func get_generic rsl')

    def post_generic(self, params):
        try:
            response = self.session.post(
                urllib.parse.urljoin(self.api_url, "gui/"),
                params={"token": self.token, **params, "t": self.format_timestamp()},
                timeout=5,
            )
            return response.json()
        except:
            print('error delete game in resilio')

    def get_ID_IP_mac(self):
        json = self.get_generic({"action": "getmfdevices"})
        id = json['value'][0]['id']
        mac = json['value'][0]['macaddress']
        ip = json['value'][0]['ipaddress']
        print(id, mac, ip)
        return id, mac, ip

    def get_folders(self):
        json = self.get_generic({"action": "getsyncfolders", "discovery": 1})
        # print(json)
        value = []
        for i in json["folders"]:
            self.get_generic({"action": "setfolderpref",
                              "id": i['folderid'],
                              "deletetotrash": "false",
                              "iswritable": "false",
                              "override": "true",
                              "paused": "false",
                              "relay": "true",
                              "searchlan": "true",
                              "selectivesync": "false",
                              "stopped": "false",
                              "usehosts": "true",
                              "usetracker": "true"})
            if True:
                folderid = i['folderid']
                id = i['id']
                GameName = i['name']
                Pathtemp = i['path']
                # userid = json["folders"][i]["users"][1]['id']
                # userName= json["folders"][i]["users"][1]['name']
                try:
                    Remote_index = i['remoteindexing']
                except:
                    Remote_index = False
                down_status = i['down_status']
                speed_down = i['down_speed']
                speed_down = humanbytes(speed_down)
                try:
                    errors = i['errors'][0]['data']['description']
                    if r"Share's identifying .sync/ID file is broken" in errors:
                        self.Service_files_missing(folderid, Pathtemp)
                        print('service broken nen xoa folder sync trong thu muc game')
                    if r"Share's identifying .sync/ID file is missing" in errors or "Service" in errors:
                        self.Service_files_missing(folderid, Pathtemp)
                        print('Service missing')
                    if r"Can't download file" in errors:
                        self.Service_files_missing(folderid, Pathtemp)
                        print('service broken nen xoa folder sync trong thu muc game')

                except:
                    errors = "N/A"
                current_downsize = i['local_size']
                current_downsize = humanbytes(current_downsize)
                Totalsize_Game = i['size']
                Totalsize_Game = humanbytes(Totalsize_Game)

                # print(current_downsize)
                # print(Totalsize_Game)
                # print(json["folders"])
                valuetemp = {
                    "GameName": GameName,
                    "FolderID": folderid,
                    "PathGame": Pathtemp,
                    "Status": down_status,
                    "Speed_Down": speed_down,
                    "Current_Down": f"{current_downsize}/{Totalsize_Game}",
                    "Errors": errors,
                    "Remoteindex": Remote_index,
                    # "UserName": userName,
                    # "UserID": userid,
                }
                value.append(valuetemp)
        return value


    def add_linkgame(self, ID, link, Pathgame):
        Folder_game = Pathgame
        isExist = os.path.exists(Folder_game)
        if isExist:
            Remove_ContentsFolder(Folder_game)

        self.get_generic({"action": "addlink",
                          "link": link,
                          # "https://link.resilio.com/#f=CrossFire&sz=1E10&t=2&s=L3GNKPN3PDTFOAQ2KYDG752YVFGDQST5C7UYUPC6QNBPS6KHNDSA&i=C2ALF73XLNRYMD2FQ2O6SVEICTROHCMM6&v=2.7&a=2",
                          "path": Folder_game,
                          "selectivesync": "false",
                          "force": "true",
                          })
        self.setfolder(ID, Folder_game, link)
        self.del_notify()

    def delete_game(self, folderid):
        Folder_game = self.get_FolderPath(folderid)
        # print(Folder_game)
        json = self.post_generic({"action": "removefolder", "folderid": folderid,
                                  "deletedirectory": 'true',
                                  "fromalldevices": "true",
                                  })
        Remove_ContentsFolder(Folder_game)
        self.del_notify()

    def pause_game(self, folderid):
        print(folderid)
        json = self.get_generic({"action": "setfolderpref", "id": folderid,
                                 "deletetotrash": 'false',
                                 "iswritable": "true",
                                 "paused": "true",
                                 "relay": "true",
                                 "searchlan": "true",
                                 "selectivesync": "false",
                                 "stopped": "false",
                                 "usehosts": "false",
                                 "usetracker": "true"})
        pass

    def speed_downgame(self, speed):
        json = self.get_generic({"action": "setsettings", "dlrate": speed})
        print(json)
        pass

    def setfolder(self,ID, Folder_game, link):
        print('setfolder: ',ID, Folder_game, link)
        json = self.get_generic({"action": "getsyncfolders", "discovery": 1})
        for i in json["folders"]:
            if Folder_game == i['path']:
                print('idfolder', i['folderid'])
                query = f"UPDATE Gamelist SET FolderID='{i['folderid']}', Status='Ready' WHERE (linkgame='{link}' AND ID='{ID}')"
                get_curSQL('gamelist.db', query=query)
                folderid = i['folderid']
                json = self.get_generic({"action": "setfolderpref",
                                         "id": folderid,
                                         "deletetotrash": "false",
                                         "iswritable": "false",
                                         "override": "true",
                                         "paused": "false",
                                         "relay": "true",
                                         "searchlan": "true",
                                         "selectivesync": "false",
                                         "stopped": "false",
                                         "usehosts": "true",
                                         "usetracker": "true"})
                json = self.get_generic({"action": "setknownhosts",
                                         "id": folderid,
                                         "hosts": "115.75.37.153:62651"})
                print(json)
                break

    def get_FolderPath(self, folderid):
        json = self.get_generic({"action": "getsyncfolders", "discovery": 1})
        for i in json["folders"]:  # range(len(json["folders"])):
            if folderid == i['folderid']:
                Pathtemp = i['path']
                return Pathtemp

    def del_notify(self):
        json = self.get_generic({"action": "getnotifications"})
        value = json['value']
        for i in value:
            print(i['id'])
            self.get_generic({"action": "deletenotification", "id": i['id']})


    def Service_files_missing(self, folderid, path):
        json = self.get_generic({"action": "getdir",
                                 "dir": path})
        json = self.get_generic({"action": "getattr",
                                 "path": path})
        json = self.get_generic({"action": "updatepath",
                                 "folderid": folderid,
                                 "newpath": path,
                                 "force": 'true'})

    def over_write(self):
        self.get_generic({
            "action": "setadvancedsettings",
            "overwrite_changes": "false",  # Cho phép "Ghi đè mọi tệp đã thay đổi" đối với chia sẻ Chỉ đọc theo mặc định
        })

    def del_link(self, folderid):
        json = self.post_generic({"action": "removefolder", "folderid": folderid,
                                  "deletedirectory": 'true',
                                  "fromalldevices": "true",
                                  })
def Resilio_login():
    host = 'localhost'
    port = '8888'
    username = 'admin'
    password = 'admin'
    apis = ResilioSyncClient(
        host=host,
        port=port,
        username=username,
        password=password,
    )
    # api.get_ID_IP_mac()
    print(apis.get_ID_IP_mac())
    return apis
# apis = Resilio_login()
# value = apis.get_folders()
# print(value)

# keyResilio = check_keyResilio()
''''''
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
                classsend.get_curSQL('datagame.db', query=query, args=args)
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
                    classsend.get_curSQL('datagame.db', query=query, args=args)
                    # Box_alert(f'Key has expired ! Please renew the software on the web https:\\Menukl.com')
                elif Server_Status == 'ERROR-submit':
                    # args = (value['rev_data']['Status'],)
                    query = f"UPDATE Design SET Status='{value['rev_data']['Status']}'"
                    classsend.get_curSQL('datagame.db', query=query)
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
                    # classsend.get_curSQL('datagame.db', query=query, args=args)
                    # service_name = "rslsyncsvckl"
                    query = "SELECT * FROM listClient order by CAST(substr(IP, 10) AS NUMERIC)"
                    getdata = classsend.get_curSQL('clientdata.db', query=query)
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
                        # classsend.get_curSQL('datagame.db', query=query, args=args)
                        print('het han')
                        # Box_alert(f'Key has expired ! Please renew the software on the web https:\\Menukl.com')
                    elif Server_Status == 'ERROR-submit':
                        # args = (value['rev_data']['Status'],)
                        # query = f"UPDATE Design SET Status='{value['rev_data']['Status']}'"
                        # classsend.get_curSQL('datagame.db', query=query)
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
        classsend.get_curSQL('datagame.db', query=query, args=args)
        return value
"""
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

"""


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
    getdesign = classsend.get_curSQL('datagame.db', query=query)
    keyServer = getdesign[0]['KeyServer']
    keyResilio = getdesign[0]['keyResilio']
    url = 'https://script.google.com/macros/s/AKfycbyvhJU56RfOvbePo45F6aQQrF-ECdTkUY-K-ewmeBYPq9_6o6i8tLTDpv0IzipMCvptwQ/exec'
    get_api_server(url, keyServer, keyResilio)
'''
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
'''
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
    # threading.Thread(daemon=True, target=Refesh_resilio).start()
    start_web_app()
    # hosttemp = path + "SV-host.py"
    # sys.argv = ["streamlit", "run", f"{hosttemp}", "--server.headless=true", "--global.developmentMode=false", "--server.port=8000"]
    # sys.exit(stcli.main())
    pass