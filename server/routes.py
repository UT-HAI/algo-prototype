import os
import json
import pandas as pd
import numpy as np
from server.db import mongo
from flask import Blueprint, Response, jsonify, request, current_app
from server.ml import select_features, train_and_predict

api_blueprint = Blueprint('api', __name__, url_prefix="/api")

# feature selection routes /////////////////////////////////////////


# participant is submitting their feature selections
@api_blueprint.route('/selection', methods=['POST'])
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

    mongo.db.feature_selections.replace_one({'id': id}, {
        'id': id,
        'selections': selections
    },
                                            upsert=True)

    return jsonify(success=True)


@api_blueprint.route('/selections', methods=['GET', 'DELETE'])
def selections():
    if request.method == 'DELETE':
        mongo.db.feature_selections.drop()
        return jsonify(success=True)
    elif request.method == 'GET':
        features = []
        try:
            with open(
                    os.path.join(current_app.config['ROOT_DIR'],
                                 'data/meta.json')) as file:
                features = list(json.load(file)['features'].keys())
        except Exception as e:
            return str(e), 500

        feature_selections = mongo.db.feature_selections.find()
        selections_obj = {
            doc['id']: dict([(f, doc['selections'][f]) for f in features])
            for doc in feature_selections
        }

        return jsonify(selections_obj)


@api_blueprint.route('/selections/users')
def get_users():
    selections = mongo.db.feature_selections.find()
    return jsonify([doc['id'] for doc in selections])


# Sends .csv of all participant feature selections
@api_blueprint.route('/selections/selections.csv')
def selections_csv():
    selections = mongo.db.feature_selections.find()
    csv = ""
    features = []
    try:
        with open(
                os.path.join(current_app.config['ROOT_DIR'],
                             'data/meta.json')) as file:
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

        return Response(csv,
                        mimetype='text/csv',
                        headers={
                            "Content-disposition":
                            "attachment; filename=selections.csv"
                        })

    except Exception as e:
        print(e)
        return str(e), 500


# data routes /////////////////////////////////////////


def add_data(feature, data):
    data = data.replace({np.nan: None})
    # make transforms if specified (only categorical columns)
    if 'transform' in feature.keys():
        for transform in feature['transform']:
            # replace in data
            data = data.replace(to_replace=transform['from'],
                                value=transform['to'])
            # replace in counts
            if str(transform['from']) in feature['counts']:
                feature['counts'][str(transform['to'])] = feature['counts'][str(transform['from'])]
                del feature['counts'][str(transform['from'])]

    feature['data'] = data.tolist()


# combines the metadata and .csv file in /data and sends a json object
@api_blueprint.route('/data')
def data():
    # read meta.json into dict
    with open(os.path.join(current_app.config['ROOT_DIR'],
                           'data/meta.json')) as file:
        data_obj = json.load(file)
    # read data.csv into dataframe
    rows = pd.read_csv(os.path.join(current_app.config['ROOT_DIR'],
                                    'data/data.csv'),
                       header=0)

    # add the rows to each feature (each feature is like a pandas series)
    # NaN values are converted to None, which is converted to null in JSON
    for feature in data_obj['features'].keys():
        add_data(data_obj['features'][feature], rows[feature])

    add_data(data_obj['target'], rows[data_obj['target']['name']])

    data_obj['ids'] = rows[data_obj['id']].tolist()

    return jsonify(data_obj)


# return a list of features being considered (aka those present in meta.json)
@api_blueprint.route('/data/features')
def features():
    with open(os.path.join(current_app.config['ROOT_DIR'],
                           'data/meta.json')) as file:
        data_obj = json.load(file)
    return jsonify(list(data_obj['features'].keys()))


# notebook routes /////////////////////////////////////////


# one user's notebook
@api_blueprint.route('/notebook', methods=['GET', 'POST'])
def notebook():
    if request.method == 'GET':
        id = request.args.get('id')
        notebook = mongo.db.notebook.find_one({'id': id})
        if notebook and '_id' in notebook.keys():
            del notebook['_id']
        return jsonify(notebook)
    elif request.method == 'POST':
        if request.content_type != 'application/json':
            return 'content type must be application/json', 400
        data = request.json
        if any(prop not in data.keys()
               for prop in ['id', 'q1', 'q2', 'rules']):
            return 'invalid data format (must be { id: str, q1: str, q2: str, rules: str[]})', 400

        data['id'] = str(data['id'])

        mongo.db.notebook.replace_one({'id': data['id']}, data, upsert=True)

        return jsonify(success=True)


# all notebooks
@api_blueprint.route('/notebooks', methods=['GET', 'DELETE'])
def notebooks_route():
    if request.method == 'DELETE':
        mongo.db.notebook.drop()
        return jsonify(success=True)
    elif request.method == 'GET':
        notebooks = mongo.db.notebook.find()
        notebook_obj = {
            doc['id']: {
                'q1': doc['q1'],
                'q2': doc['q2'],
                'rules': doc['rules']
            }
            for doc in notebooks
        }

        return jsonify(notebook_obj)


@api_blueprint.route('/notebooks/notebooks.csv')
def notebook_csv():
    notebooks = mongo.db.notebook.find()

    # header
    csv = 'id,q1,q2,rules\n'

    # each row is one user's notebook
    for notebook in notebooks:
        id = notebook['id']
        row = [str(id), notebook['q1'], notebook['q2']]
        row += notebook['rules']

        csv += ",".join(row) + "\n"

    return Response(
        csv,
        mimetype='text/csv',
        headers={"Content-disposition": "attachment; filename=notebooks.csv"})


@api_blueprint.route('/notebooks/users')
def get_notebook_users():
    notebooks = mongo.db.notebook.find()
    return jsonify([doc['id'] for doc in notebooks])


@api_blueprint.route('/ml/train', methods=['POST'])
def train():
    if request.content_type != 'application/json':
        return 'content type must be application/json', 400
    data = request.json
    df_train = pd.read_csv(os.path.join(current_app.config['ROOT_DIR'],
                                        'data/data_train.csv'),
                           header=0)
    df_test = pd.read_csv(os.path.join(current_app.config['ROOT_DIR'],
                                       'data/data_test.csv'),
                          header=0)

    selections = mongo.db.feature_selections.find()
    features = []
    try:
        with open(
                os.path.join(current_app.config['ROOT_DIR'],
                             'data/meta.json')) as file:
            features = list(json.load(file)['features'].keys())
    except Exception as e:
        return str(e), 500

    def train_predict_save(user_id, selected_features):
        X_train, X_test, y_train, _ = select_features(df_train, df_test,
                                                      selected_features)
        coef, proba = train_and_predict(X_train, y_train, X_test)

        row = {'id': user_id, 'predictions': {}, 'coef': {}}

        for i, subject_id in enumerate(df_test['Subject ID'].values):
            row['predictions'][str(subject_id)] = proba[i][1]

        for i, coef in enumerate(coef):
            row['coef'][X_test.columns[i]] = coef

        mongo.db.train_results.replace_one({'id': row['id']}, row, upsert=True)

    # train user models
    for doc in selections:
        selected_features = list(
            filter(lambda x: doc['selections'][x]['decision'] == 'include',
                   features))

        train_predict_save(doc['id'], selected_features)

    # train group model
    train_predict_save('admin', data['selected_features'])

    return jsonify(success=True)


@api_blueprint.route('/ml/predictions')
def predictions():
  id = request.args.get('id')
  your_model = mongo.db.train_results.find_one({ 'id': id })
  group_model = mongo.db.train_results.find_one({ 'id': 'admin' })

  if not your_model or not group_model: return jsonify(None)

  models = {'group': {}, 'your': {}}
  test_ids = your_model['predictions'].keys()
  rows = pd.read_csv(os.path.join(current_app.config['ROOT_DIR'], 'data/data_test.csv'), header=0)
  rows['y'] = (~(rows['Admission Decision'] == 'D')).astype(int)
  y = {}
  for _, row in rows.iterrows():
    str_id = str(row['Subject ID'])
    if str_id in test_ids:
      y[str_id] = row['y']

  print(y)

  def get_metrics(ids, predictions, ys):
    tn = tp = fn = fp = 0
    n = len(ids)
    for id in ids:
      y_actual = ys[id]
      y_hat = predictions[id]
      if y_actual == 0:
        if y_hat < 0.5: tn +=1
        else: fp +=1
      else:
        if y_hat >= 0.5: tp +=1
        else: fn +=1
    acc = (tp + tn) / n
    precision = tp / (tp + fp)
    recall = tp / (tp + fn)
    return { 'tn':tn/n, 'tp':tp/n, 'fn':fn/n, 'fp':fp/n, 'acc':acc, 'precision':precision, 'recall':recall }

  models['group']['predictions'] = group_model['predictions']
  models['group']['coef'] = group_model['coef']
  models['group']['metrics'] = get_metrics(test_ids, group_model['predictions'], y)

  models['your']['predictions'] = your_model['predictions']
  models['your']['coef'] = your_model['coef']
  models['your']['metrics'] = get_metrics(test_ids, your_model['predictions'], y)

  return jsonify(models)
