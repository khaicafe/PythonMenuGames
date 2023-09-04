class connect_server(object):
    def __init__(self, url, port, keyServer, keyResilio):
        self.url, self.port = url, port
        self.api_url = f"http://{self.url}:{self.port}"
        self.keyServer, self.keyResilio = keyServer, keyResilio
        self.session = requests.Session()
        self.session.verify = False
        self.token, self.Status = self.login_App()
        print('token', self.token)
        threading.Thread(target=self.check_lisent).start()

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
        r = self.session.get(url=url, params=value)
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
                    subprocess.check_output(f'''net start {service_name}''', shell=True)
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
                    Box_alert(f'Key has expired ! Please renew the software on the web https:\\Menukl.com')
                elif Server_Status == 'ERROR-submit':
                    # args = (value['rev_data']['Status'],)
                    query = f"UPDATE Design SET Status='{value['rev_data']['Status']}'"
                    get_curSQL('datagame.db', query=query)
                    Box_alert(f'Key {Server_Status} ! Please renew the software on the web https:\\Menukl.com')

                # =========== stop service resilio ============#
                service_name = "rslsyncsvckl"
                try:
                    subprocess.check_output(f'''net stop {service_name} /y''', shell=True)
                    pass
                except:
                    print('stop service resilio error')
                # subprocess.check_output(f'''net stop {service_name} /y && net start {service_name}''', shell=True)
            return token, value['rev_data']

    def check_lisent(self):
        while True:
            time.sleep(60)
            global token  # <== get biến token
            global Server_Status  # <== get Status server
            value = {'event_key': 'Login_App',
                     'Key': self.keyServer,
                     'Key_Resilio': self.keyResilio,
                     # 'HoTen': 'khaicafe',
                     # 'Email': 'khaicafe@gmail.com',
                     # 'Date_Create': datetime.now().strftime("%H:%M:%S, %d/%m/%Y"),
                     }
            r = self.session.get(url=url, params=value)
            print('login server status: ',r.status_code)
            value = r.json()
            print('login_server: ',value, '\n')
            if "rev_data" in value:
                Server_Status = value['rev_data']['Status']
                self.Status = value['rev_data']
                if Server_Status == 'Ready':
                    token = value['token']['accessToken']
                    args = (value['rev_data']['Status'], value['rev_data']['Ngayhethan'])
                    query = f"UPDATE Design SET Status=?, Ngayhethan=?"
                    get_curSQL('datagame.db', query=query, args=args)
                    service_name = "rslsyncsvckl"
                    try:
                        subprocess.check_output(f'''net start {service_name}''', shell=True)
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
                        subprocess.check_output(f'''net stop {service_name} /y''', shell=True)
                        pass
                    except:
                        print('stop service resilio error')
                    # subprocess.check_output(f'''net stop {service_name} /y && net start {service_name}''', shell=True)
            # return token, value['rev_data']
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
        # print(r, value)
        return value

    def sosanh_listgame(self,value):
        # self.cur.execute("SELECT * FROM Gamelist")
        # self.gamelist = self.cur.fetchall()
        query = f"SELECT * FROM Gamelist"
        gamelist = get_curSQL('gamelist.db', query=query)
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
        get_curSQL('datagame.db', query=query, args=args)
        return value

    # ======================== Set info PM to Server ===========================#
    def set_infoPM(self,Logo, TenPhongMay, DiaChi, Soluongmay, Ngayhethan, Status):
        Logo = url_to_blob(Logo)
        args = (Logo, TenPhongMay, DiaChi, Soluongmay, Ngayhethan, Status)
        query = f"UPDATE Design SET Logo=?,tenphongmay=?, DiaChi=?, Soluongmay=?, Ngayhethan=?, Status=?"
        get_curSQL('datagame.db', query=query, args=args)
