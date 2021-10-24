'''server/app.py - main api app declaration'''
from flask import Flask, send_from_directory, Response, jsonify
from flask_cors import CORS
import json
import os
import pandas as pd
import numpy as np

ROOT_DIR = os.path.dirname(os.path.abspath(__file__)) # /server

'''Main wrapper for app creation'''
app = Flask(__name__, static_folder='../build')
CORS(app)

##
# API routes
##

# Sends .csv of all participant feature selections
@app.route('/api/selections')
def selections():
  mock = '1,2,3\n4,5,6\n'
  return Response(
    mock,
    mimetype='text/csv',
    headers={"Content-disposition": "attachment; filename=test.csv"}
  )

# combines the metadata and .csv file in /data and sends a json object
@app.route('/api/data')
def data():
  # print(os.path.join(ROOT_DIR,'/data/meta.json'))
  # read meta.json into dict
  with open(os.path.join(ROOT_DIR,'data/meta.json')) as file:
    data_obj = json.load(file)
  # read data.csv into dataframe
  rows = pd.read_csv(os.path.join(ROOT_DIR,'data/data.csv'),header=0)
  
  # add the rows to each feature (each feature is like a pandas series)
  # NaN values are converted to None, which is converted to null in JSON
  for feature in data_obj['features'].keys():
    data_obj['features'][feature]['data'] = rows[feature].replace({np.nan: None}).tolist()

  return jsonify(data_obj)
  

##
# View route
##

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
  '''Return index.html for all non-api routes'''
  #pylint: disable=unused-argument
  return send_from_directory(app.static_folder, 'index.html')