from flask import Flask, send_from_directory
from flask_cors import CORS
import os
from flask_pymongo import PyMongo

# api routes located at routes.py

# create app
app = Flask(__name__, static_folder='../build')
CORS(app)
app.config['MONGO_URI'] = os.getenv('MONGO_URI')
client = PyMongo(app,connect=False) # ??
db = client.db

app.config['ROOT_DIR'] = os.path.dirname(os.path.abspath(__file__)) # /server

# serve frontend
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
  '''Return index.html for all non-api routes'''
  return send_from_directory(app.static_folder, 'index.html')