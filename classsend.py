import sqlite3
def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d


Pass_sqlite = 'khaicafe'
def dbcon():
    con = sqlite3.connect('datagame.db')  # (":memory:")
    con.text_factory = lambda b: b.decode(errors='ignore')  # decode bỏ b'
    con.row_factory = dict_factory
    cur = con.cursor()
    cur.execute(f"PRAGMA key={Pass_sqlite}")
    cur.execute(f"PRAGMA journal_mode=WAL")
    cur.execute(f"PRAGMA synchronous=normal")
    cur.execute(f"PRAGMA temp_store=memory")
    cur.execute(f"PRAGMA mmap_size=30000000000")
    cur.execute(f"PRAGMA optimize")
    cur.execute(f"PRAGMA temp_store = 2")
    return cur

def getdesing():
    cur = dbcon()
    cur.execute("SELECT * FROM Design")
    getdesign = cur.fetchall()
    return getdesign

def getdata():
    cur = dbcon()
    cur.execute("SELECT * FROM Listgame")
    getdata = cur.fetchall()
    cur.close()
    return getdata

def searchgame(contentphu):
    cur = dbcon()
    cur.execute(f'SELECT * FROM Listgame WHERE Tengame GLOB "{str(contentphu.upper())}*"')
    getdata = cur.fetchall()
    cur.close()
    return getdata

def gameonline(contentphu):
    # video = openfilea('particles.mp4')
    cur = dbcon()
    cur.execute("SELECT * FROM Listgame WHERE Groupgame = 'Game Online' order by CAST(ID AS INTEGER)")
    getdata = cur.fetchall()
    # print(getdata)
    cur.close()
    return getdata

def gameoffline(contentphu):
    cur = dbcon()
    cur.execute("SELECT * FROM Listgame WHERE Groupgame = 'Game Offline' order by CAST(ID AS INTEGER)")
    getdata = cur.fetchall()
    cur.close()
    return getdata

def changline():
    cur = dbcon()
    cur.execute("SELECT * FROM listgateway")
    getdata = cur.fetchall()
    cur.close()
    return getdata

def get_curSQL(database, args=None, query=None):
    try:
        con = sqlite3.connect(database, timeout=10)  # (":memory:")
        # con.text_factory = lambda b: b.decode(errors='ignore')
        con.row_factory = dict_factory
        cur = con.cursor()
        cur.execute(f"PRAGMA key={Pass_sqlite}")
        cur.execute(f"PRAGMA key={Pass_sqlite}")
        cur.execute(f"PRAGMA journal_mode=WAL")
        cur.execute(f"PRAGMA synchronous=normal")
        cur.execute(f"PRAGMA temp_store=memory")
        cur.execute(f"PRAGMA mmap_size=30000000000")
        cur.execute(f"PRAGMA optimize")
        cur.execute(f"PRAGMA temp_store = 2")
        if query == None:
            return cur,con
        elif 'SELECT' in query:
            # query = (f"SELECT * FROM {table};")
            if args != None:
                cur.execute(query, args)
            else:
                cur.execute(query)
            getdata = cur.fetchall()
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
        con.close()
    except Exception as e:
        if 'UNIQUE' in str(e):
            # Box_alert("Game đã tồn tại")
            return 'Game đã tồn tại'
        else:
            return (str(e))
            # Box_alert(str(e))
            # offmain()

