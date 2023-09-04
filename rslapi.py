import getpass
import time

import requests
import urllib.parse
from datetime import datetime
import bs4
from pathlib import Path

requests.packages.urllib3.disable_warnings()


class ResilioSyncFolder(object):
    def __init__(self, folder_obj):
        self.data = folder_obj

        # first the straightforward copies
        self.name = folder_obj["name"]
        self.folderid = folder_obj["folderid"]

        # now for more complicated things
        self.path = None
        if "path" in folder_obj:
            self.path = Path(folder_obj["path"]).resolve()

        self.synclevel = folder_obj["synclevel"]
        self.selected = self.synclevel > 0

    def __repr__(self):
        return f'<ResilioSyncFolder "{self.name} {self.folderid} {self.path} {self.synclevel}">'


class ResilioSyncClient(object):
    def __init__(self, host, port, username, password):
        self.host, self.port = host, port
        self.api_url = f"http://{self.host}:{self.port}"
        self.username, self.password = username, password

        self.session = requests.Session()
        self.session.auth = (self.username, self.password)
        self.session.timeout = 1
        self.session.verify = False

        self.token = self.get_token()

    def format_timestamp(self):
        dt = datetime.utcnow() - datetime(1970, 1, 1)
        ms = (dt.days * 24 * 60 * 60 + dt.seconds) * 1000 + dt.microseconds / 1000.0
        return int(ms)

    def normalize_path(self, path):
        return Path(path).absolute().resolve()

    def get_token(self):
        token_url = urllib.parse.urljoin(self.api_url, "gui/token.html")
        response = self.session.get(token_url, params={"t": self.format_timestamp()}, timeout=5)

        soup = bs4.BeautifulSoup(response.content, "lxml")
        token_divs = soup.select("#token")
        token = token_divs[0].decode_contents()
        return token

    def get_generic(self, params):
        response = self.session.get(
            urllib.parse.urljoin(self.api_url, "gui/"),
            params={"token": self.token, **params, "t": self.format_timestamp()},
            timeout=5,
        )
        #http://localhost:8888/gui/images/disconnect.svg
        # testcode = self.session.get(
        #     urllib.parse.urljoin("http://localhost:8888/gui/images/disconnect.svg")
        # print('testcode ',testcode)
        return response.json()

    def get_folders(self):
        json = self.get_generic({"action": "getpendingrequests"})
        print(json)
        #getsysteminfo
        #getusername
        #settings
        #setsettings
        #getpeersstat


        #generatelicenselink
        #getappinfo
        #checknewversion
        # folderid = json["folders"][0]['folderid']
        # id = json["folders"][0]['id']
        # # id': '3041572280668926896'
        # print(id,'\n', json["folders"])
        # print('folderid: ', json["folders"][0]['folderid'])
        #&action=getmfdevices&t=
        # json = self.get_generic({"action": "getmfdevices"})
        # #getstatuses
        # json = self.get_generic({"action": "getstatuses"})
        # #setfolderpref Pause
        # #action=setfolderpref&id=11934475632055144808&deletetotrash=true&iswritable=true&paused=true&relay=true&searchlan=true&selectivesync=true&stopped=false&usehosts=false&usetracker=true&t=1659503726686
        # json = self.get_generic({"action": "setfolderpref", "id": folderid,
        #                          "deletetotrash": 'false',
        #                          "iswritable": "true",
        #                          "paused": "true",
        #                          "relay": "true",
        #                          "searchlan": "true",
        #                          "selectivesync": "true",
        #                          "stopped": "false",
        #                          "usehosts": "false",
        #                          "usetracker": "true"})
        # # resume
        # json = self.get_generic({"action": "setfolderpref", "id": folderid,
        #                          "deletetotrash": 'false',
        #                          "iswritable": "true",
        #                          "paused": "false",
        #                          "relay": "true",
        #                          "searchlan": "true",
        #                          "selectivesync": "false",
        #                          "stopped": "false",
        #                          "usehosts": "false",
        #                          "usetracker": "true"})
        # disconect and remove
        # json = self.get_generic({"action": "removefolder", "id": folderid,
        #                          "deletedirectory": 'false',
        #                          "fromalldevices": "false",
        #                          })
        # remove
        # json = self.get_generic({"action": "removefolder", "id": folderid,
        #                          "deletedirectory": 'true',
        #                          "fromalldevices": "true",
        #                          })

        # connect
        #action=adddisconnectedfolder&folderid=11934475632055144808&selectivesync=false&path=C:\Users\khaicafe\Resilio Sync\test (1)
        # json = self.get_generic({"action": "adddisconnectedfolder", "id": folderid,
        #                          "deletetotrash": 'false',
        #                          "iswritable": "true",
        #                          "selectivesync": "false",
        #                          "path": r"C:\Users\khaicafe\ResilioSync\test",
        #                          })
        # synjod
        # json = self.get_generic({"action": "synjod"})
        # # proxysetting
        # json = self.get_generic({"action": "proxysettings"})

        # add new
        #https://link.resilio.com/#f=CrossFire&sz=1E10&t=2&s=L3GNKPN3PDTFOAQ2KYDG752YVFGDQST5C7UYUPC6QNBPS6KHNDSA&i=C2ALF73XLNRYMD2FQ2O6SVEICTROHCMM6&v=2.7&a=2
        #&path=E:\test&selectivesync=fals
        # json = self.get_generic({"action": "addlink",
        #                          "link": "https://link.resilio.com/#f=CrossFire&sz=1E10&t=2&s=L3GNKPN3PDTFOAQ2KYDG752YVFGDQST5C7UYUPC6QNBPS6KHNDSA&i=C2ALF73XLNRYMD2FQ2O6SVEICTROHCMM6&v=2.7&a=2",
        #                          "path": r'E:\test',
        #                          "selectivesync": "false",
        #                          })
        #action=deletenotification&id=7909284494729561044&t=1659509482033

        # set proxy host or clear proxy
        # action=setknownhosts&id=3041572280668926896&hosts=192.168.1.2:8000,192.168.1.1:111&isfolder=true
        # json = self.get_generic({"action": "setknownhosts",
        #                          "id": "3041572280668926896",
        #                          "hosts": '',
        #                          "isfolder": "true",
        #                          })
        # disable or enable proxy
        # action=setfolderpref&id=3041572280668926896&deletetotrash=true&iswritable=false&override=false&paused=false&relay=true&searchlan=true&selectivesync=false&stopped=false&usehosts=true&usetracker=true&status=200


        # action=parselink&link=https://link.resilio.com/#f=CrossFire&sz=1E10&t=2&s=L3GNKPN3PDTFOAQ2KYDG752YVFGDQST5C7UYUPC6QNBPS6KHNDSA&i=C2ALF73XLNRYMD2FQ2O6SVEICTROHCMM6&v=2.7&a=2
        # print(json["folders"])
        # assert json["status"] == 200
        # return [ResilioSyncFolder(obj) for obj in json["folders"]]

    def get_ID_IP_mac(self):
        json = self.get_generic({"action": "getmfdevices"})
        id = json['value'][0]['id']
        mac = json['value'][0]['macaddress']
        ip = json['value'][0]['ipaddress']
        print(id, mac, ip)

    def get_folder_by_path(self, rel_path):
        abs_path = self.normalize_path(rel_path)
        folders = self.get_folders()
        containing_folders = []
        for folder in folders:
            if not folder.selected:
                continue
            if folder.path == abs_path or folder.path in abs_path.parents:
                containing_folders.append(folder)

        assert len(containing_folders) <= 1
        if not containing_folders:
            raise ValueError("Path is not contained in a synced folder.")

        return containing_folders[0]

    def file_exists(self, folder, path):
        assert folder.selected
        path = Path(path)
        if not path.is_absolute():
            path = folder.path / path

        abs_path = self.normalize_path(path)
        base_path = Path(".")

        while True:
            path_str = str(base_path)
            if base_path == Path("."):
                path_str = ""

            result = self.get_generic(
                {
                    "action": "getfileslist",
                    "folderid": folder.folderid,
                    "path": path_str,
                }
            )

            assert result["status"] == 200
            files = result["value"]["files"]
            for f in files:
                test_path = folder.path / base_path / f["name"]
                if test_path == abs_path:
                    return True

                if test_path in abs_path.parents:
                    base_path /= f["name"]
                    break
            else:
                return False

    def set_sync_status(self, rel_path, sync=True):
        # First, track down the parent folder, if it exists
        abs_path = self.normalize_path(rel_path)
        folder = self.get_folder_by_path(abs_path)
        child_rel_path = abs_path.relative_to(folder.path)

        # Now, check if the folder has our file
        if not self.file_exists(folder, child_rel_path):
            raise ValueError("Path does not exist in the folder!")

        self.get_generic(
            {
                "action": "setfilemode",
                "folderid": folder.folderid,
                "path": child_rel_path,
                "selected": "true" if sync else "false",
                "removefromall": "false",
            }
        )

    def getnotify(self):
        json = self.get_generic({"action": "getnotifications"})
        value = json['value']
        for i in value:
            print(i['id'])
            self.get_generic({"action": "deletenotification", "id": i['id']})

        # print(json)

def Resilio_login():
    host = 'localhost'
    port = '8888'
    username = 'admin'
    password = 'admin'
    api = ResilioSyncClient(
        host=host,
        port=port,
        username=username,
        password=password,
    )
    # api.get_ID_IP_mac()
    api.getnotify()

Resilio_login()