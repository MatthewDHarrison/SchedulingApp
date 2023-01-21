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



# with open('belknapGuards.csv', newline='') as csvfile:
#     guardreader = csv.reader(csvfile, delimiter=',', quotechar='|')
#     temp = []
#     for row in guardreader:
#         temp.append(row)
#     for row in temp[1:]:
#         sql = """INSERT INTO users (username, password, fname, lname, yac, position, div, lifeguard, 
#                         ropes, boat, lund, eddie, bill, nymcah, wfa) 
#                         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"""
#         name = row[0]
#         fname = name.split()[1].replace('"', '')
#         lname = name.split()[0].replace('"', '')
#         yac = random.randint(2, 15)
#         pos = row[2]
#         div = row[3]
#         lifeguard = True if row[1] == "yes" else False
#         cursor.execute(sql, (fname, lname, fname, lname, yac, pos, div, lifeguard, False, False, False, False, False, False, False))
#         conn.commit()




with open('base_schedule.csv', newline='') as csvfile:
    schedreader = csv.reader(csvfile, delimiter=',', quotechar='|')
    temp = []
    for row in schedreader:
        temp.append(row)
    for row in temp[1:]:
        sql = """INSERT INTO master_schedule (timeslot, period_name, location, for_c, for_j, for_m, for_b, for_s,
                        req_lifeguard, req_ropes, req_boat, req_lund, req_eddie, req_bill, req_nymcah, req_wfa,
                        num_leaders, leaders) 
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"""
        timeslot = row[0]

        location = ''
        prefix = ''

        row[1] = row[1].strip()
        period_name = row[1]
        if ('12' in row[1] or '16' in row[1]):
            if ('12 & 16' in row[1]):
                divs = 'CJMBS'
            elif ('12' in row[1]):
                divs = 'CJM'
            elif ('16' in row[1]):
                divs = 'MBS'

            if ('(' in row[1]):
                location = row[1].split('(')[-1].strip(')')

                
        else:
            divs = row[1].split(' (')[0].split(' ')[-1]
            if ('(' in row[1]):
                location = row[1].split('(')[-1].strip(')')


            

        num_leaders = int(row[9])

        cursor.execute(sql, (timeslot, period_name, location, 'C' in divs, 'J' in divs, 'M' in divs, 'B' in divs, 'S' in divs,
                        False, 'Ropes' in period_name or 'Tower' in period_name, 
                        'Sailing' in period_name or 'Waterskiing' in period_name, 
                        'Sailing' in period_name, False, 
                        'Waterskiing' in period_name, False, False,
                        num_leaders, ''))
        conn.commit()
        