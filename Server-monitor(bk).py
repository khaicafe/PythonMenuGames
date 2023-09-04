import base64
import glob
import os
import socket
import sys
import time
from shutil import rmtree

import psutil
import streamlit.cli as stcli
import datetime
# Path maker
# import stcli as stcli
from fastapi.middleware.cors import CORSMiddleware


if getattr(sys, 'frozen', False) and hasattr(sys, '_MEIPASS'):
    path = sys._MEIPASS + '/'

else:
    path = ''

####################################fastapi###################################################
import sqlite3
import threading
import uvicorn
from fastapi import FastAPI, Request,WebSocket
from pydantic import BaseModel
from fastapi.responses import HTMLResponse

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
con = sqlite3.connect('datagame.db')  # (":memory:")
#con.text_factory = lambda b: b.decode(errors = 'ignore')
con.row_factory = dict_factory
cur = con.cursor()
hostname = socket.gethostname()
local_ip = socket.gethostbyname(hostname)
app_api = FastAPI()
origins = ['*'] #### "NetworkError when attempting to fetch
app_api.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)
class Item(BaseModel):
    ID: str
    call: str
    #print(name, price)
    # is_offer: Optional[bool] = None
class infopc(BaseModel):
    tenmay: str
    ip: str
    Main: str
    cpuname: str
    ram: str
    vga: str

class Page(BaseModel):
    call: str


@app_api.post("/data")
async def submit(item: Item, request: Request):
    #print(item)
    #print(item, item.ID, item.tengame)#nhận value client
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
        cura = cona.cursor()
        cura.execute(
            "SELECT * FROM minimizesoft")
        getsoft = cura.fetchall()
        try:
            getsofttemp = []
            for i in range(len(getsoft)):
                getsofttemp.append(getsoft[i][1])
            print(getsofttemp)
            return getsofttemp#{'danhsach': f"{getsofttemp}"}  # send value client
        except:
            pass
        pass
    elif item.call == 'SendNamePC':
        if True:
            IPclient = request.client.host

            cona = sqlite3.connect('clientdata.db')
            cura = cona.cursor()
            cura.execute(
                f"SELECT * FROM listClient Where IP='{IPclient}'")
            getIP = cura.fetchall()
            print("serversend   ", getIP[0][0])
            return str(getIP[0][0])#{'danhsach': f"{getsofttemp}"}  # send value client
        # except:
        #     pass
@app_api.post("/infopc")
async def info_pc(item: infopc):
    #print(item)#nhận value client
    conclient = sqlite3.connect('clientdata.db')  # (":memory:")
    # con.text_factory = lambda b: b.decode(errors = 'ignore')
    conclient.row_factory = dict_factory
    cur = conclient.cursor()
    if True:
        try:
            with conclient:
                cur.execute(
                        "SELECT * FROM listClient ")
                getdata = cur.fetchall()
            ip = ''
            for i in range(len(getdata)):
                #print(getdata[i].get('IP'))
                if item.ip == getdata[i].get('IP'):
                    ip ='co ip'
                    print(ip, item.ip, len(getdata))
                    break

            if len(getdata) == 0 or ip =='':
                args = (item.tenmay, item.ip,item.Main, item.cpuname, item.ram, item.vga,'')
                query = 'INSERT INTO listClient VALUES(?, ?, ?, ?, ?, ?, ?)'
                with conclient:
                    cur.execute(query, args)
                    conclient.commit()
                print('INSERT', item)
            # else:
            #     cur.execute(f"UPDATE listClient SET Tenmay='{item.tenmay}',IP='{item.ip}',Main='{item.Main}',CPU='{item.cpuname}',Ram='{item.ram}',VGA='{item.vga}' WHERE IP='{item.ip}'")
            #     conclient.commit()
            #     print('UPDATE',item)
        except:
            print('lỗi không ghi dc data')
            pass
# from fastapi.responses import ORJSONResponse
@app_api.get("/namepc")
def read_root(request: Request):
    client_host = request.client.host
    #print(client_host)
    return client_host



# testjina="""{{ call }}"""
# from jinja2 import Template
# input_data= {'call': 'khaicafe'}
# jinja2_template = Template(testjina)
# html_content = jinja2_template.render(**input_data)

import classsend
@app_api.get("/")
async def read_items():
    getdesign = classsend.getdesing()
    LOGO_IMAGE = base64.b64encode(getdesign[0].get('Banner')).decode()
    with open("style.css") as f:
        text= f'<style>{f.read()}</style>'

    pathtemp = path + "styletest.css"
    contenchinh = f'<style>{text}</style>' + f"""<div class="header-logo" style="width:100%">
        <img class='hinh' src="data:image/png;base64,{LOGO_IMAGE}"></img>
            <h2 class='neon' id='test'  ></h2></div>"""

    html =f"""
    <html>
        <head>
        <link rel="icon" type="image/x-icon" href="https://e7.pngegg.com/pngimages/930/295/png-clipart-magic-wand-ico-icon-halloween-hat-purple-marine-mammal-thumbnail.png">
            {contenchinh}
            {testscript}
            {jsgetnamPC}
            
        </head>
        <body>
            <form action="" onsubmit="sendMessage(event)">
            <input type="text" id="messageText" autocomplete="off"/>
            <button>Send</button>
            </form>
            <ul id='messages'>
            </ul>
            {setpage()}
            
        </body>
    </html>
    """
    return HTMLResponse(html)



testscript = """<script>
            var ws = new WebSocket("ws://192.168.1.220:8100/ws");
            function sendMessage(event) {
                var input = document.getElementById("messageText")
                ws.send(input.value)
                input.value = ''
                event.preventDefault()
                location.assign(location.href)
            };</script> """

jsgetnamPC = '''<script>
             function getvals(){
            return fetch("http://192.168.1.220:8100/data", {
            method: "POST",
            body: JSON.stringify({
                                    ID: "1",
                                    call: "SendNamePC"}),
            headers: {"Content-type": "application/json; charset=UTF-8"},})
    .then((response) => response.json())
    .then((responseData) => {
    console.log(responseData);
    
    //Thay text element cách 1
    //const main = document.getElementById("test");
    //main.innerHTML = responseData;
    
    //Thay text element cách 2
    var element = document.getElementById('test');
    while (element.firstChild) {
    element.removeChild(element.firstChild);
    }
    element.appendChild(document.createTextNode(responseData));
    return responseData;
    })
    .catch(error => console.warn(error));
  }
  getvals().then(response => console.log(response));
        </script>'''
def setpage():
    contentphu = ""
    if pagetemp == '1':
        return gameonline(contentphu)
    elif pagetemp == '2':
        return gameoffline(contentphu)

def gameonline(contentphu):
    # video = openfilea('particles.mp4')
    # cur.execute("SELECT * FROM Listgame WHERE Groupgame = 'Game Online' order by CAST(ID AS INTEGER)")
    # getdata = cur.fetchall()
    getdata = classsend.gameonline(contentphu)*10
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
        content1 = f"""<div class="box">
                            <div class="box-img">
                                <img src="data:image/png;base64,{hinh}" onerror="this.src='https://i.imgur.com/NhGzwjO.gif';this.onerror='';">
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
                                <li><button class="b1" onClick="filerun{getdata[i].get('ID')}.send('my-bridge')">Play Game</button></li>
                                <li><button class="b1" onClick="openfolder{getdata[i].get('ID')}('my-bridge')">Open Folder</button></li>
                            </div>
                        </div>"""
        contentphu += str(content1)
    return contentphu #+ '''</div>'''
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
        content1 = f"""<div class="box">
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
                                       <li><button class="b1" onClick="filerun{getdata[i].get('ID')}.send('my-bridge')">Play Game</button></li>
                                       <li><button class="b1" onClick="openfolder{getdata[i].get('ID')}('my-bridge')">Open Folder</button></li>
                                   </div>
                               </div>"""
        contentphu += str(content1)
    return contentphu


@app_api.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    global pagetemp
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        pagetemp = data
        print(pagetemp)

        await websocket.send_text(f"Message text was: {data}")
pagetemp = '2'




def start_web_app():
    uvicorn.run("Server-monitor:app_api", host=f"{local_ip}", port=8100, log_level="info", reload=True)# workers=1

############## Refesh service Resilio ####################
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


########################################################################################################


#sample_string = LOGO_KL.decode()
#print(LOGO_KL)
if __name__ == '__main__':
    # threading.Thread(daemon=True, target=start_web_app).start()
    threading.Thread(daemon=True, target=Refesh_resilio).start()
    start_web_app()
    # hosttemp = path + "SV-host.py"
    # sys.argv = ["streamlit", "run", f"{hosttemp}", "--server.headless=true", "--global.developmentMode=false", "--server.port=8000"]
    # sys.exit(stcli.main())
    pass