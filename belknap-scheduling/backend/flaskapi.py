from flask import Flask, request, jsonify
import json
import sqlite3 

app = Flask(__name__)

def db_connection():
    conn = None
    try:
        conn = sqlite3.connect('schedule.sqlite')
    except sqlite3.error as e:
        print(e)
    return conn

@app.route('/leaders', methods=['GET', 'POST'])
def leaders():
    conn = db_connection()
    cursor = conn.cursor()

    if request.method == 'GET':
        cursor = conn.execute("SELECT * FROM leaders")
        leaders = [
            dict(id=row[0], name=row[1], position=row[2]) for row in cursor.fetchall()
        ]

        if leaders is not None:
            return jsonify(leaders)

    if request.method == 'POST':
      
        new_name = request.form['name']
        new_position = request.form['position']

        sql = """INSERT INTO leaders (name, position)
                 VALUES (?, ?)"""

        cursor = conn.execute(sql, (new_name, new_position))
        conn.commit()
       
        return f"Leader w/ id: {cursor.lastrowid} added to db"

if __name__ == "__main__":
    app.run(debug=True)