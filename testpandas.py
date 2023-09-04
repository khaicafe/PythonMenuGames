import sqlite3

import numpy as np
import pandas as pd

def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d
con = sqlite3.connect('test.db')  # (":memory:")
con.text_factory = lambda b: b.decode(errors='ignore')  # decode bỏ b'
con.row_factory = dict_factory
cur = con.cursor()
def Reading_sqlite_to_df():
    conn = sqlite3.connect('{}.sqlite'.format('test.db'))
    df = pd.read_sql('select * from {}'.format('Listgame'), conn)
    conn.close()
def Writing_df_to_sqlite():
    conn = sqlite3.connect('{}.sqlite'.format('test.db'))
    df.to_sql('Listgame', conn, if_exists='replace', index=False)  # writes to file
    conn.close()  # good practice: close connection

def sql_query(query):
    cur.execute(query)
    getdata = cur.fetchall()
    return getdata

getdata = sql_query(f'SELECT * FROM Listgame')

columns = getdata[0].keys()
df = pd.DataFrame(getdata, columns=columns)
# convert sqlite to pandas
df2 = pd.read_sql('select * from Listgame', con)
print(df2)

#1. SELECT

getsql = sql_query(f'SELECT * FROM Listgame;')
getdf = df

# getsql = sql_query(f'SELECT * FROM Listgame LIMIT 5;')
# getdf = df.head(5) # The default is 5 so churn.head() also works

# SELECT CustomerId, Geography FROM CHURN;
# churn[['CustomerId', 'Geography']]

getsql = sql_query(f'SELECT * FROM Listgame Where Groupgame="Game Online"')
getdf = df[df["Groupgame"] == "Game Online"]
# print(getdf)


# 2. update

# getsql = sql_query(f'UPDATE Listgame SET Tengame="khaicafe" WHERE ID="18";')

df.loc[df["ID"] == "18", "Tengame"]= "khaicafe"
# update multi value
df.loc[df["ID"] == "18", ["Tengame", "Pathgame"]]= "khaicafe", "c:\\"
# print(df)

# 3.Delete

# getsql = sql_query(f'DELETE FROM Listgame WHERE Tengame="khaicafe";')
df = df.drop(np.where(df.loc[df.Tengame == 'khaicafe'])[0])       #(inplace=True)
# print(getsql)

# 4.insert

dict = {'ID': '100',
        'imagedata': 'khongco',
        'Groupgame': 'Game Online',
        'Tengame': 'newgame',
        'Category': 'Badao',
        'Pathgame': '0',
        'Argument': '0',
        'Pathimage': '0',
        'Luotplay': '0'
        }
new_row = pd.DataFrame([dict])
# pd to dict
df.to_dict('records')
# print(new_row)
df = df.append(new_row, ignore_index=True)
# print(df)

value = {'IP': str(IPclient), **value}
value = {'PC': str(getIP[0][0]), **value}

# 5.Search

# print(df['ID'].where(df['ID'] == 200))
# print (df[df['ID'].str.contains('1')])
print (df.loc[df['ID'] == 'IDC001'])

# 6.write to sqlite
df.to_sql(name='Listgame', con=con, if_exists='replace', index=False)

# 7.Rename Columns

#df = df.rename(columns={'oldName1': 'newName1', 'oldName2': 'newName2'})


#--------- copy db sang db khác ----------#
tabs = pd.read_sql("SELECT table_name FROM INFORMATION_SCHEMA.TABLES", db1)
for tab in tabs['table_name']:
    pd.read_sql("select * from {}".format(tab), db1).to_sql(tab, db2, index=False)

