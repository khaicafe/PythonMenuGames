

import sqlite3
def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d
Pass_sqlite = 'khaicafe'
con = sqlite3.connect('manager-order.db')  # (":memory:")
#con.text_factory = lambda b: b.decode(errors = 'ignore')
con.row_factory = dict_factory
cur = con.cursor()
cur.execute(f"PRAGMA key={Pass_sqlite}")

# EMP(eid,ename,eage,esalary)
# Works(eid,did,pct_time)
# Dept(did,dname,budget, managerid)

# cur.execute(f"""SELECT e.* FROM NguyenLieuMH e, MatHang w
#                 WHERE e.MatHang_ID = w.id""")

# cur.execute(f"""
# SELECT a.nameNL, a.Soluong
# FROM NguyenLieuMH a
# INNER JOIN MatHang b ON a.MatHang_ID = b.id""")

# cur.execute(f"""
# SELECT *
#   FROM MatHang AS e
#   JOIN (SELECT w.*
#           FROM NguyenLieuMH AS w) AS s
#   ON s.MatHang_ID = e.id
# """)

# cur.execute(f"""
# SELECT MatHang.name
# , (SELECT NguyenLieuMH.nameNL FROM NguyenLieuMH
#          WHERE NguyenLieuMH.MatHang_ID = MatHang.id
#        ) AS U_DATA1
# ,(SELECT NguyenLieuMH.Soluong FROM NguyenLieuMH
#          WHERE NguyenLieuMH.MatHang_ID = MatHang.id
#        ) AS U_DATA2
# FROM MatHang
# INNER JOIN NguyenLieuMH ON NguyenLieuMH.MatHang_ID = MatHang.id
#
# """)


# tuple = (3,4)
# cur.execute(f"""INSERT INTO test(testddd) VALUES ('{tuple}');""")
# con.commit()
# result = cur.execute(f"""select (replace(name,"'",""))AS Website_Name from testcode where id='1'""").fetchall()
# print((result))
# tuple = '("(1,banh)"),(4)'
# cur.execute(f"""INSERT INTO testcode(id, name)
# SELECT (name=replace(name,"'",""))
# FROM testcode
# WHERE id='1'
# """)


# con.commit()
# INSERT INTO HostMedia (host_id, id_media)
# SELECT i.host_id, m.id_verification
# FROM (
#   SELECT host_id,
#   json_array_elements_text(replace(media,'''','"')::json) AS media_name
#   FROM ImportH
# ) AS i
# JOIN Media AS m ON m.media = i.media_name;



# tuple = (3,4)
# cur.execute(f"""INSERT INTO test(name)
#                      SELECT name
#                       FROM NguyenLieu
#                       WHERE id IN {tuple}""")
# con.commit()

# update_values = {
#                 "sim": 'sim',
#                 "country": 'country',
#                 "product_name": 'product_name',
#                 "serialno": 'serial_no',
#                 "version": 'version',
#                 "time": 'current_time'
#             }
# dict = update_values
# for value in dict:
#     print(dict[value])
# sql_values = {"id": 1}
#
# sql = "UPDATE 'test' SET "
# set_values = ', '.join([f"""{key} = '{key}'""" for key in update_values])
# sql += set_values
# sql += " WHERE id = %(id)"
# print(sql)
# cur.execute(sql, sql_values)
# con.commit()

#------------------- check hack sql inject ------------------#
# không nên dùng mấy cái % trong query
# result = cur.execute(f"select * from test where id= %(id)s" %{"id": '1'}).fetchall()
# # result = cur.execute("select * from test where id= %(id)s" %{"id": "') or ('a'='a'"}).fetchall()
# print(result)


# Do this instead anti sql inject
# t = ('RHAT',)
# c.execute('SELECT * FROM stocks WHERE symbol=?', t)
# print c.fetchone()
#
# temp ="' or 1=1--"
# result = cur.execute(f"SELECT * FROM test WHERE id= '{temp}'").fetchall()
# result = cur.execute(f"SELECT * FROM test WHERE id= ?",('" or 1=1--',)).fetchall() #-- cú pháp anit sql inject
# result = cur.execute(f"SELECT * FROM test WHERE id= '' or 1=1--").fetchall()
# print(result)
# temp =("'' or 1=1--",4)
# cur.execute(f"""SELECT *
# FROM ToppingMH WHERE ToppingMH.Topping_ID IN {temp}""")
# result = cur.fetchall()
# print(result)



# cur.execute(f"""INSERT INTO Listorder_NL ( id_Listorder, date, id_MatHang, id_NL, nameNL,SL_NL_dadung)
# SELECT Listorder.Id , Listorder.Date, Listorder.id_MatHang, NguyenLieuMH.NguyenLieu_ID, NguyenLieuMH.nameNL, Listorder.SL*NguyenLieuMH.Soluong
# FROM Listorder INNER JOIN NguyenLieuMH ON NguyenLieuMH.MatHang_ID = Listorder.id_MatHang
# WHERE Listorder.Id=94""")
# con.commit()




# print(sqlite_injection_protection())
# result = cur.execute("select id from test where id = '%s'" % "'; select true; --") # dùng check thử sql inject
# print("select admin from users where username = '%s'" % "'; select true; --")

#
# cur.execute(f"""SELECT *
# FROM test""")
# result = cur.fetchall()
# # print(result[1], type(result[0]['testddd']))
# cur.execute(f"""SELECT *
# FROM ToppingMH WHERE ToppingMH.Topping_ID IN {result[1]['testddd']}""")
# result = cur.fetchall()
# print(result)



# Fastapi server socket đầy đủ
from fastapi import FastAPI
from fastapi.responses import HTMLResponse
import socket

app = FastAPI()

# @app.get("/")
# def index():
#     return HTMLResponse("<h1>Welcome to FastAPI!</h1>")

# @app.get("/socket")
def socket_connection():
    s = socket.socket()
    host = "127.0.0.1"
    port = 5000
    s.bind((host, port))
    s.listen(5)
    while True:
        c, addr = s.accept()
        print("Got connection from", addr)
        data = c.recv(1024).decode()
        print("Received:", data)
        c.send("Message received".encode())
        c.close()
        return ("<h1>Socket connection established!</h1>")

socket_connection()

# if __name__ == '__main__':
#     import uvicorn
#     uvicorn.run(app, host="127.0.0.1", port=5000)


