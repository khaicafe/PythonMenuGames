import sqlite3

# --------------- khi create db set pass thành công thì phải có tạo luôn table thì mới co passs ------------------#
conn = sqlite3.connect('./Database_app/createdb.db')
c = conn.cursor()
c.execute("PRAGMA key='khaicafe'")
c.execute('''create table stocks (date text, trans text, symbol text, qty real, price real)''')
# c.execute("""insert into stocks values ('2006-01-05','BUY','RHAT',100,35.14)""")
conn.commit()
c.close()
#
#
# conn = sqlite3.connect('clientdata.db')
# c = conn.cursor()
# c.execute("PRAGMA key='test'")
# c.execute("SELECT * FROM AppNew;")
# print(c.fetchall())
c.close()