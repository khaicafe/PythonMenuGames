import sys
import streamlit as st
import classsend

# Path maker
if getattr(sys, 'frozen', False) and hasattr(sys, '_MEIPASS'):
    print('running in a PyInstaller bundle')
    path = sys._MEIPASS + '/'
else:
    print('running in a normal Python process')
    path = ''

import base64
from streamlit_option_menu import option_menu
from st_bridge import bridge, html

if __name__ == '__main__':
    st.set_page_config(layout="wide", page_icon=":art:", page_title="Menu Game KTeam@2022")

    getdesign = classsend.getdesing()

    def local_css(file_name):
        with open(file_name) as f:
            st.markdown(f'<style>{f.read()}</style>', unsafe_allow_html=True)

    def remote_css(url):
        pass
        st.markdown(f'<link href={path + "styletest.css"} rel="stylesheet" type="text/css">', unsafe_allow_html=True)

    local_css("styletest.css")
    remote_css('')

    st.markdown("""
         <style>
         [kind="header"]> button{
         color: #e1e1e1;
         visibility: hidden;
         position: absolute;
         }
         [data-testid="stToolbar"]> div:first-child{

         padding-top: 0rem;
         margin: 0;
         }
         [data-testid="stSidebar"]> div:first-child{
         padding-top: 0rem;
         color: #e1e1e1;
         margin: 0;

         }
         [data-testid="stSidebar"][aria-expanded="true"] > div:first-child {
            padding-top: 0rem;
            padding-bottom: 0rem;
            height: 100%;
             width: 280px;
            box-sizing: border-box;
            text-align: center;
            background-color: #212125;


           }
           [data-testid="stSidebar"][aria-expanded="false"] > div:first-child {
               width: 280px;
               box-sizing: border-box;
               margin-left: -500px;
               padding-top: 0rem;
               background-color: #212125;
            }
            .css-18e3th9 {
                        padding-top: 0rem;
                        padding-bottom: 0rem;
                        padding-left: 2rem;
                        padding-right: 0rem;

                    }
            .css-1d391kg {
                        padding-top: 0rem;
                        padding-right: 0rem;
                        padding-bottom: 0rem;
                        padding-left: 0rem;

                    }

            </style>
            """, unsafe_allow_html=True)
    st.markdown('''
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">''',unsafe_allow_html=True)
    st.markdown("""
    <nav class="navbar fixed-top navbar-expand-lg navbar-dark" style="background-color: #212125;padding-top: 0rem;margin: 0;"></nav>""", unsafe_allow_html=True)

    search_term = ''
    with st.sidebar:
        selected = option_menu("Main Menu", ["Online Games", "Offline Games", "App PC", 'Tool Games', 'Menu Food'],
                               icons=['cloud-upload', 'house', "list-task", 'gear'],
                               menu_icon='cast', default_index=0,
                               styles={'menu-title': {"padding-top": "0!important", "margin": "0", "color": "#e1e1e1",
                                                      "font-size": "30px"},
                                       'separator': {"color": "#e1e1e1"},
                                       "container": {"padding": "0!important", "background-color": "#212125",
                                                     "border-radius": "0px"},
                                       "icon": {"color": "orange", "font-size": "20px"},
                                       "nav-link": {"font-size": "20px", "text-align": "left", "margin": "0px",
                                                    "color": "#e1e1e1",
                                                    "--hover-color": "#424242"},
                                       "nav-link-selected": {"background-color": "green"},
                                       }
                               )

        st.write(f'''<div style="text-align: center; font-size: 30px;"><span class='densang'>{getdesign[0].get('ADS')}</span></div><div style="text-align: center; font-size: 19px;"><span class='densang'>{getdesign[0].get('Contains')}</span></div><div><br></div><div class='slider'></div><div><h6></h6></div>''', unsafe_allow_html=True)
        search_term = st.text_input('Search game', 'input game')
        st.markdown('''<div style="text-align: center; padding: 2px 0 0 0 0;font-size: 8px;"><h6></h6><h>KLteam2022 Version 1.0</h></div>''', unsafe_allow_html=True)

        # print(selected)

    def openfilea(file):
        with open(file, 'rb') as f:
            data = f.read()
        # return data
        return base64.b64encode(data).decode()

    def covertblob(name, blob):
        with open(name + ".jpg", "wb") as output_file:
            file = output_file.write(blob)
        # return base64.b64encode(file).decode()

    LOGO_KL = openfilea('logo.png')

    LOGO_IMAGE = base64.b64encode(getdesign[0].get('Banner')).decode()
    contenchinh = f"""<div class="header-logo" style="width:100%">
    <img class='hinh' src="data:image/png;base64,{LOGO_IMAGE}"></img>
        <h2 class='ADS' style="width:100%">
            <img class='hinh-kl' src="data:image/png;base64,{LOGO_KL}"></img><span style="--i:1;width:100%"></span>

        </h2>
        </div>"""
    contentphu = ""

    def searchgame(contentphu):
        # cur.execute(f'SELECT * FROM Listgame WHERE Tengame GLOB "{str(contentphu.upper())}*"')
        # getdata = cur.fetchall()
        getdata = classsend.getdata(contentphu)
        contentphu = ''
        print(len(getdata))
        for i in range(len(getdata)):
            tengame = str(getdata[i].get('Tengame'))
            if len(tengame) > 15:
                tengame = str(getdata[i].get('Tengame'))[:15] + "..."
            Group = 'tengame'
            if getdata[i].get('Groupgame') == 'Game Offline':
                Group = 'tengame_off'
            content1 = f"""<div class="box">
                                    <div class="box-img">
                                        <img src={getdata[i].get('Pathimage')} onerror="this.src='https://i.imgur.com/NhGzwjO.gif';this.onerror='';">
                                    </div>
                                    <div class={Group}>
                                        <span>{getdata[i].get('Groupgame')}</span>
                                        <h3 class="name">{tengame}</h3>
                                        <h3 class="theloai">{getdata[i].get('Theloai')}</h3>
                                        <h3 class="luotchoi">&#9734; {getdata[i].get('Luotplay')}</h3>
                                    </div>
                                    <div class="content">
                                        <h3>{getdata[i].get('Tengame')}</h3>
                                        <p>{getdata[i].get('Theloai')}</p>
                                    </div>
                                    <div class="button" >
                                        <li><button class="b1" onClick="openfile.send('my-bridge', {getdata[i].get('ID')}))">Play Game</button></li>
                                        <li><a class="b1" onClick="openfile.send('my-bridge', {getdata[i].get('ID')})>Open Folder</a></li>
                                    </div>
                                </div>"""
            contentphu += str(content1)
        return contentphu

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
                hinh = base64.b64encode(blob).decode()
            except:
                pass
            content1 = f"""<div class="box">
                                <div class="box-img">
                                    <img src="data:image/png;base64,{hinh}" onerror="this.src='https://i.imgur.com/NhGzwjO.gif';this.onerror='';">
                                </div>
                                <div class="tengame">
                                    <span>Game Online</span>
                                    <h3 class="name">{tengame}</h3>
                                    <h3 class="theloai">{getdata[i].get('Theloai')}</h3>
                                    <h3 class="luotchoi" >&#9734; {getdata[i].get('Luotplay')}</h3>
                                </div>
                                <div class="content">
                                    <h3>{tengame}</h3>
                                    <p>{getdata[i].get('Theloai')}</p>
                                </div>
                                <div class="button" >
                                    <li><button class="b1" onClick="filerun{getdata[i].get('ID')}.send('my-bridge')">Play Game</button></li>
                                    <li><button class="b1" onClick="openfolder{getdata[i].get('ID')}('my-bridge')">Open Folder</button></li>
                                </div>
                            </div>"""
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
                hinh = base64.b64encode(blob).decode()
            except:
                pass
            # save file image từ link ref
            # hinh = covertblob('test', blob)

            content1 = f"""<div class="box">
                                    <div class="box-img">
                                    <img src="data:image/png;base64,{hinh}" onerror="this.src='https://i.imgur.com/NhGzwjO.gif';this.onerror='';">
                                </div>
                                    <div class="tengame_off">
                                        <span>Game Offline</span>
                                        <h3 class="name">{tengame}</h3>
                                    <h3 class="theloai">{getdata[i].get('Theloai')}</h3>
                                    <h3 class="luotchoi">&#9734; {getdata[i].get('Luotplay')}</h3>
                                </div>
                                <div class="content">
                                    <h3>{tengame}</h3>
                                    <p>{getdata[i].get('Theloai')}</p>
                                </div>
                                <div class="button" >
                                    <li><button class="b1" onClick="stBridges.send('my-bridge', {getdata[i].get('ID')})">Play Game</button></li>
                                    <li><button class="b1" onClick="afaf.send('my-bridge', {getdata[i].get('ID')})">Open Folder</button></li>
                                </div>
                            </div>"""
            contentphu += str(content1)
        return contentphu

    if search_term == 'input game' or search_term == '' or search_term == "search_term":
        # print('No search_term')
        if selected == "Online Games":
            contentphu = gameonline(contentphu)
        elif selected == "Offline Games":
            contentphu = gameoffline(contentphu)
        elif selected == "App PC":
            pass
        elif selected == "Tool Games":
            pass
        elif selected == "Menu Food":
            pass
    else:
        contentphu = searchgame(search_term)
        # print('search_term', search_term)

    data = bridge("my-bridge", default="no button is clicked")
    html(contenchinh + contentphu + '''</div>''')
    datatemp = -1
    try:
        datatemp = int(data)
    except:
        pass
    if datatemp >= 0:
        if data == 1:
            print(data)
            data = 0
