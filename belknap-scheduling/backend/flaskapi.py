import json
from flask import render_template, url_for, flash, request, redirect, Response, jsonify, Flask
import sqlite3
from flask_login import LoginManager, UserMixin, login_required, login_user, logout_user, current_user
import secrets
import datetime


app = Flask(__name__)
secret = secrets.token_urlsafe(32)
app.secret_key = secret


login_manager = LoginManager(app)
login_manager.login_view = "login"


class User(UserMixin):
    def __init__(self, id, username, password):
        self.id = id
        self.username = username
        self.password = password
        self.authenticated = False   
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
        return User(int(lu[0]), lu[1], lu[2])

@login_manager.request_loader
def request_loader(request):
    conn = db_connection()
    curs = conn.cursor()
    user_id = request.form.get('id')
    curs.execute("SELECT * from users where id = (?)",[user_id])
    lu = curs.fetchone()

    if lu is None:
        return None
    else:
        return User(int(lu[0]), lu[1], lu[2])

    
@app.route("/users/login", methods=['POST'])
def login():
    if current_user.is_authenticated:
        return f"User already autheticated"

    login_username = request.form['username']
    login_password = request.form['password']

    conn = db_connection()
    curs = conn.cursor()

    # Get user with given username from database
    curs.execute("SELECT * FROM users where username = (?)", [login_username])

    # store list of user data in user
    user = list(curs.fetchone())

    # load User with user id
    Us = load_user(user[0])

    # if User loaded has same username and password, login user
    if login_username == Us.username and login_password == Us.password:
        login_user(Us)
        return str(Us.id)
    else:
        return f"Login failed"

@app.route('/users/logout')
def logout():
    logout_user()
    return 'Logged out'

@login_manager.unauthorized_handler
def unauthorized_handler():
    return 'Unauthorized', 401

@app.route('/leaders', methods=['GET', 'POST'])
@login_required
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

@app.route('/users/register', methods=['POST'])
def usersRegister():
    if request.method == 'POST':
        conn = db_connection()
        cursor = conn.cursor()

        new_username = request.form['username']
        new_password = request.form['password']

        sql = """INSERT INTO users (username, password)
                    VALUES (?, ?)"""
        
        cursor = cursor.execute(sql, (new_username, new_password))
        conn.commit()
        
        return f"Leader w/ id: {cursor.lastrowid} added to db"

if __name__ == "__main__":
    app.run(debug=True)