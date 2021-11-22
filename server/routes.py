import os
import json
import pandas as pd
import numpy as np
from server.db import mongo
from flask import Blueprint, Response, jsonify, request, current_app
from server.ml import select_features, train_and_predict

api_blueprint = Blueprint('api', __name__, url_prefix="/api")


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
        data = rows[feature].replace({np.nan: None})
        col = data_obj['features'][feature]
        # make transforms if specified (only categorical columns)
        if 'transform' in col.keys():
            for transform in col['transform']:
                # replace in data
                data = data.replace(to_replace=transform['from'],
                                    value=transform['to'])
                # replace in counts
                data_obj['features'][feature]['counts'][str(
                    transform['to'])] = col['counts'][str(transform['from'])]
                del data_obj['features'][feature]['counts'][str(
                    transform['from'])]

        data_obj['features'][feature]['data'] = data.tolist()

    return jsonify(data_obj)


# return a list of features being considered (aka those present in meta.json)
@api_blueprint.route('/data/features')
def features():
    with open(os.path.join(current_app.config['ROOT_DIR'],
                           'data/meta.json')) as file:
        data_obj = json.load(file)
    return jsonify(list(data_obj['features'].keys()))


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


@api_blueprint.route('/train', methods=['GET'])
def train_predict():
    # read data.csv into dataframe
    df = pd.read_csv(os.path.join(current_app.config['ROOT_DIR'],
                                  'data/data_1.csv'),
                     header=0)
    X_train, X_test, y_train, y_test = select_features(df, [])
    proba = train_and_predict(X_train, y_train, X_test)
    return jsonify({
        'test_data': X_test.to_json(),
        'true_results': y_test.to_json(),
        'predictions': proba.tolist()
    })
