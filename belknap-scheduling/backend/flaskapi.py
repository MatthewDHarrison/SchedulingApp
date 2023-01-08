import json
from flask import render_template, url_for, flash, request, redirect, Response, jsonify, Flask
import sqlite3
from flask_login import LoginManager, UserMixin, login_required, login_user, logout_user, current_user
import secrets
import datetime
from flask_cors import CORS
from lifeguardScheduling import getSimAnnealedSchedule


app = Flask(__name__)
secret = secrets.token_urlsafe(32)
app.secret_key = secret
CORS(app)


login_manager = LoginManager(app)
login_manager.login_view = "login"


class User(UserMixin):
    def __init__(self, id, username, password, yac):
        self.id = id
        self.username = username
        self.password = password
        self.authenticated = False   
        self.yac = yac
    def is_active(self):
        return self.is_active()    
    def is_anonymous(self):
        return False    
    def is_authenticated(self):
        return self.authenticated    
    def is_active(self):
        return True    
    def get_id(self):
        return self.id
    def get_yac(self):
        return self.yac

def db_connection():
    conn = None
    try:
        conn = sqlite3.connect('schedule.sqlite')
    except sqlite3.error as e:
        print(e)
    return conn



@login_manager.user_loader
def load_user(user_id):
    conn = db_connection()
    curs = conn.cursor()
    curs.execute("SELECT * from users where id = (?)",[user_id])
    lu = curs.fetchone()
    if lu is None:
        return None
    else:
        return User(int(lu[0]), lu[1], lu[2], lu[3])

@login_manager.request_loader
def request_loader(request):
    conn = db_connection()
    curs = conn.cursor()
    data = request.get_json()
    print(data)
    id = data['uid']
    curs.execute("SELECT * from users where id = (?)",[id])
    lu = curs.fetchone()

    if lu is None:
        return None
    else:
        return User(int(lu[0]), lu[1], lu[2], lu[3])

    
@app.route("/users/login", methods=['POST'])
def login():
    data = request.get_json()
    login_username = data['username']
    login_password = data['password']

    conn = db_connection()
    curs = conn.cursor()

    # Get user with given username from database
    curs.execute("SELECT * FROM users where username = (?)", [login_username])

    try:
        # store list of user data in user if username is in database
        user = list(curs.fetchone())
    except:
        # else, return error code
        return jsonify({"uid": str(-1)}), 200
    # load User with user id
    Us = load_user(user[0])
    print(login_password, Us.password)
    # if User loaded has same username and password, login user
    if login_username == Us.username and login_password == Us.password:
        login_user(Us)
        return jsonify({"uid": str(Us.id), "yac": str(Us.yac)}), 200
    else:
        return jsonify({"uid": str(-1)}), 200

@app.route('/users/logout', methods=['POST'])
@login_required
def logout():
    data = request.get_json()
    username = data['username']
    if (current_user.username == username and current_user.is_authenticated):
        logout_user()
        return 'Logged out'
    else:
        return 'Bad logout username'

@login_manager.unauthorized_handler
def unauthorized_handler():
    return 'Unauthorized', 401

@app.route('/users/register', methods=['POST'])
def usersRegister():
    if request.method == 'POST':
        conn = db_connection()
        cursor = conn.cursor()

        data = request.get_json()
        new_username = data['username']
        new_password = data['password']

        cursor.execute("SELECT * FROM users where username = (?)", [new_username])

        user = cursor.fetchone()
        if user is not None:
            return jsonify({"uid": -1}), 200

        sql = """INSERT INTO users (username, password)
                    VALUES (?, ?)"""
        
        cursor = cursor.execute(sql, (new_username, new_password))
        conn.commit()
        
        return jsonify({"uid": str(cursor.lastrowid)}), 200

@app.route('/users/update', methods=['PUT'])
@login_required
def usersUpdate():
    if request.method == 'PUT':
        conn = db_connection()
        cursor = conn.cursor()

        data = request.get_json()
        id = data['uid']
        fname = data['fname']
        lname = data['lname']
        position = data['position']
        yac = data['yac']
        div = data['div']
        lifeguard = data['lifeguard']
        ropes = data['ropes']
        boat = data['boat']
        lund = data['lund']
        eddie = data['eddie']
        bill = data['bill']
        nymcah = data['nymcah']
        wfa = data['wfa']

        statement = """ UPDATE users SET fname = ?, lname = ?, yac = ?, position = ?, div = ?, lifeguard = ?, 
                        ropes = ?, boat = ?, lund = ?, eddie = ?, bill = ?, nymcah = ?, wfa = ?  WHERE id = ? """

        cursor.execute(statement, [fname, lname, yac, position, div, lifeguard, ropes, boat, lund, eddie, bill, nymcah, wfa, id])
        conn.commit()

        return jsonify({"uid": id}), 200

@app.route('/admin/lifeguardSchedule', methods=['POST'])
@login_required
def makeLifeguardSchedule():
    data = request.get_json()
    uid = data['uid']
    if uid == '1':
        print('here')
        getSimAnnealedSchedule()
        return jsonify({"users": []}), 200
    else:
        return jsonify({"err": "unauthorized call, admin only"}), 200

@app.route('/lifeguardSchedule', methods=['GET'])
def getLifeguardSchedule():
    conn = db_connection()
    cursor = conn.cursor()

    sql_query = """ SELECT lg_sched.id, lg_sched.timeslot, users.fname, users.lname, lg_sched.certified FROM lg_sched, users
    WHERE lg_sched.guardId = users.id """
    cursor.execute(sql_query)

    sched = cursor.fetchall()

    return jsonify(sched), 200
if __name__ == "__main__":
    app.run(debug=True)