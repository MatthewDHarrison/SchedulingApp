import sqlite3

conn = sqlite3.connect("schedule.sqlite")

cursor = conn.cursor()
sql_query = """ CREATE TABLE leaders (
    id integer PRIMARY KEY,
    name text NOT NULL,
    position text NOT NULL
)"""

cursor.execute(sql_query)