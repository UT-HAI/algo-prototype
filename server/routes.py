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
    return 'invalid data format (must be { id: str, selections: { reason: str, decision: include | exclude, sure: boolean } })', 400
  id = str(data['id'])
  selections = data['selections']
  if not id or not selections or type(selections) != dict:
    return 'invalid data format (must be { id: str, selections: { reason: str, decision: include | exclude, sure: boolean } })', 400

  db.feature_selections.replace_one({ 'id': id }, {
    'id': id,
    'selections': selections
  }, upsert=True)

  return jsonify(success=True)

@app.route('/api/selections',methods=['GET','DELETE'])
def selections():
  if request.method == 'GET':
    features = []
    try:
      with open(os.path.join(app.config['ROOT_DIR'],'data/meta.json')) as file:
          features = list(json.load(file)['features'].keys())
    except Exception as e:
      return str(e), 500

    feature_selections = db.feature_selections.find()
    selections_obj = {}

    for doc in feature_selections:
      selections_obj[doc['id']] = dict([(f,doc['selections'][f]) for f in features])

    return jsonify(selections_obj)

  elif request.method == 'DELETE':
    db.feature_selections.drop()
    return jsonify(success=True)

@app.route('/api/selections/users')
def get_users():
  selections = db.feature_selections.find()
  return jsonify([doc['id'] for doc in selections])

# Sends .csv of all participant feature selections
@app.route('/api/selections/selections.csv')
def selections_csv():
  selections = db.feature_selections.find()
  csv = ""
  features = []
  try:
    with open(os.path.join(app.config['ROOT_DIR'],'data/meta.json')) as file:
      features = list(json.load(file)['features'].keys())

    # header
    columns = []
    for f in features:
      columns.append(f)
      columns.append('{} - reason'.format(f))
    csv += ','.join(['user id'] + columns) + '\n'

    # each row is one user's selections
    for user_selection in selections:
        id = user_selection['id']
        row = [str(id)]
        for f in features:
          selection = ""
          reason = ""
          if f in user_selection['selections'].keys():
            selection = user_selection['selections'][f]['decision']
            if not user_selection['selections'][f]['sure']:
              selection += ' (not sure)'
            reason = user_selection['selections'][f]['reason']
          row.append(selection)
          row.append(reason)
            
        csv += ",".join(row) + "\n"

    return Response(
      csv,
      mimetype='text/csv',
      headers={"Content-disposition": "attachment; filename=selections.csv"}
    )
    
  except Exception as e:
    print(e)
    return str(e), 500

def add_data(feature, data):
  data = data.replace({np.nan: None})
  # make transforms if specified (only categorical columns)
  if 'transform' in feature.keys():
    for transform in feature['transform']:
      # replace in data
      data = data.replace(to_replace=transform['from'], value=transform['to'])
      # replace in counts
      feature['counts'][str(transform['to'])] = feature['counts'][str(transform['from'])]
      del feature['counts'][str(transform['from'])]
      
  feature['data'] = data.tolist()

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
    add_data(data_obj['features'][feature],rows[feature])
  
  add_data(data_obj['target'], rows[data_obj['target']['name']])

  data_obj['ids'] = rows[data_obj['id']].tolist()

  return jsonify(data_obj)

# return a list of features being considered (aka those present in meta.json)
@app.route('/api/data/features')
def features():
  with open(os.path.join(app.config['ROOT_DIR'],'data/meta.json')) as file:
    data_obj = json.load(file)
  return jsonify(list(data_obj['features'].keys()))

@app.route('/api/notebook',methods=['GET','POST'])
def notebook():
  if request.method == 'POST':
    if request.content_type != 'application/json':
      return 'content type must be application/json', 400
    data = request.json
    if not all([prop in data.keys() for prop in ['id','q1','q2','rules']]):
      return 'invalid data format (must be { id: str, q1: str, q2: str, rules: str[]})', 400

    data['id'] = str(data['id'])

    db.notebook.replace_one({ 'id': data['id'] }, data, upsert=True)

    return jsonify(success=True)

  elif request.method == 'GET':
    id = request.args.get('id')
    notebook = db.notebook.find_one({ 'id': id })
    if notebook and '_id' in notebook.keys():
      del notebook['_id']
    return jsonify(notebook)
