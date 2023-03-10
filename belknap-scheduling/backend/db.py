import sqlite3

conn = sqlite3.connect("schedule.sqlite")

cursor = conn.cursor()
# sql_query = """ CREATE TABLE leaders (
#     id integer PRIMARY KEY,
#     name text NOT NULL,
#     position text NOT NULL
# )"""

# cursor.execute(sql_query)

# sql_query2 = """ CREATE TABLE users (
#     id INTEGER PRIMARY KEY AUTOINCREMENT,
#     username text NOT NULL,
#     password text NOT NULL,
#     fname text,
#     lname text,
#     yac INTEGER,
#     position text,
#     div text,
#     lifeguard BOOL,
#     ropes BOOL,
#     boat BOOL,
#     lund BOOL,
#     eddie BOOL,
#     bill BOOL,
#     nymcah BOOL,
#     wfa BOOL
# )"""

# sq3 = """insert into users values(0, 'xyz@gmail.com','XYZ123abc')"""


# sql_query = """ CREATE TABLE lg_sched (
#     id INTEGER PRIMARY KEY AUTOINCREMENT,
#     timeslot text NOT NULL,
#     guardId INTEGER references users (id),
#     certified BOOL references users (lifeguard)
# )"""

# cursor.execute(sql_query)

sql_query = """ CREATE TABLE master_schedule (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timeslot text NOT NULL,
    period_name text NOT NULL,
    location text NOT NULL,
    for_c BOOL,
    for_j BOOL,
    for_m BOOL,
    for_b BOOL,
    for_s BOOL,
    req_lifeguard BOOL,
    req_ropes BOOL,
    req_boat BOOL,
    req_lund BOOL,
    req_eddie BOOL,
    req_bill BOOL,
    req_nymcah BOOL,
    req_wfa BOOL,
    num_leaders INTEGER NOT NULL,
    leaders text
    )"""

cursor.execute(sql_query)

# cursor.execute(sq3)