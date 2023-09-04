import datetime
import sqlite3 as sqlite
import threading
from threading import Thread
import time
import progressbar

pbar = progressbar.ProgressBar().start()

def for_loop(l, target):
    for i in l:
        if target in i['ID']:
            i["ID"] = 'kkaka'
            i['name'] = 'khaicafe'
            return l
    return None

def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d
class myThread(Thread):
    """docstring for myThread"""
    def __init__(self, name, counter, delay):
        super(myThread, self).__init__()
        self.name= name
        self.counter=counter
        self.delay=delay

    def run(self):
        total_steps = 100

        for index in range(total_steps):
            #pbar.update((index / total_steps) * 100)  # current step/total steps * 100
            self.ghidata(index, datetime.datetime.now())
            print(self.name)
        #pbar.finish()

    def ghidata(self,id,name):
        global getdata
        conclient = sqlite.connect('E:\BaccaratB.db',timeout=10)# isolation_level='EXCLUSIVE')  # (":memory:")
        #con.text_factory = lambda b: b.decode(errors = 'ignore')

        conclient.row_factory = dict_factory
        cur = conclient.cursor()
        cur.execute("SELECT * FROM minimizesoft ")
        getdata = cur.fetchall()
        args = (id, name)
        query = 'INSERT INTO minimizesoft VALUES(?, ?)'
        cur.execute(query, args)
        conclient.commit()


start_time = time.time()
thread1 = myThread("thread 1", 10, 2)
thread2 = myThread("thread 2", 10, 3)
thread1.start()
thread2.start()
print("--- %s seconds ---" % (time.time() - start_time))
