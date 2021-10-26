from app import app, db
from flask import Response, jsonify, request
import os
import json
import pandas as pd
import numpy as np

##
# API routes
##


# participant is submitting their feature selections
@app.route('/api/selection',methods=['POST'])
def selection():
  if request.content_type != 'application/json':
    return 'content type must be application/json', 400
  data = request.json
  if 'id' not in data.keys() or 'selections' not in data.keys():
    return 'invalid data format (must be { id: str, selections: dict })', 400
  id = str(data['id'])
  selections = data['selections']
  if not id or not selections or type(selections) != dict:
    return 'invalid data format (must be { id: str, selections: dict })', 400

  db.feature_selections.replace_one({ 'id': id }, {
    'id': id,
    'selections': selections
  }, upsert=True)

  return jsonify(success=True)

# Sends .csv of all participant feature selections
@app.route('/api/selections')
def selections():
  selections = db.feature_selections.find()
  csv = ""
  features = []
  try:
    with open(os.path.join(app.config['ROOT_DIR'],'data/meta.json')) as file:
        features = list(json.load(file)['features'].keys())

    # header
    csv += ",".join(["user id"] + features) + "\n"

    # each row is one user's selections
    for user_selection in selections:
        id = user_selection['id']
        row = [str(id)]
        for f in features:
            if not f in user_selection['selections'].keys():
                row.append("")
            elif user_selection['selections'][f]:
                row.append("include")
            else:
                row.append('exclude')
        csv += ",".join(row) + "\n"

    return Response(
      csv,
      mimetype='text/csv',
      headers={"Content-disposition": "attachment; filename=test.csv"}
    )
    
  except Exception as e:
    return str(e), 500


  

# combines the metadata and .csv file in /data and sends a json object
@app.route('/api/data')
def data():
  # read meta.json into dict
  with open(os.path.join(app.config['ROOT_DIR'],'data/meta.json')) as file:
    data_obj = json.load(file)
  # read data.csv into dataframe
  rows = pd.read_csv(os.path.join(app.config['ROOT_DIR'],'data/data.csv'),header=0)
  
  # add the rows to each feature (each feature is like a pandas series)
  # NaN values are converted to None, which is converted to null in JSON
  for feature in data_obj['features'].keys():
    data_obj['features'][feature]['data'] = rows[feature].replace({np.nan: None}).tolist()

  return jsonify(data_obj)