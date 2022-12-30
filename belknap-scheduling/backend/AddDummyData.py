import csv
import sqlite3
import random


def db_connection():
    conn = None
    try:
        conn = sqlite3.connect('schedule.sqlite')
    except sqlite3.error as e:
        print(e)
    return conn

conn = db_connection()
cursor = conn.cursor()



with open('belknapGuards.csv', newline='') as csvfile:
    guardreader = csv.reader(csvfile, delimiter=',', quotechar='|')
    temp = []
    for row in guardreader:
        temp.append(row)
    for row in temp[1:]:
        sql = """INSERT INTO users (username, password, fname, lname, yac, position, div, lifeguard, 
                        ropes, boat, lund, eddie, bill, nymcah, wfa) 
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"""
        name = row[0]
        fname = name.split()[1].replace('"', '')
        lname = name.split()[0].replace('"', '')
        yac = random.randint(2, 15)
        pos = row[2]
        div = row[3]
        lifeguard = True if row[1] == "yes" else False
        cursor.execute(sql, (fname, lname, fname, lname, yac, pos, div, lifeguard, False, False, False, False, False, False, False))
        conn.commit()
