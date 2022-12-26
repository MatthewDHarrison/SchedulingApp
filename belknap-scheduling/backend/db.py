import sqlite3

conn = sqlite3.connect("schedule.sqlite")

cursor = conn.cursor()
# sql_query = """ CREATE TABLE leaders (
#     id integer PRIMARY KEY,
#     name text NOT NULL,
#     position text NOT NULL
# )"""

# cursor.execute(sql_query)

sql_query2 = """ CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username text NOT NULL,
    password text NOT NULL
)"""

# sq3 = """insert into users values(0, 'xyz@gmail.com','XYZ123abc')"""

cursor.execute(sql_query2)
# cursor.execute(sq3)