import argparse
from pymongo import MongoClient
from dotenv import load_dotenv
import os
import json
import random
import string
import pandas as pd

# script for managing Mongo database (both development and production)
# assuming this runs from the project root (which is true if you use `yarn db`)
# see README for documentation and examples

load_dotenv()

parser = argparse.ArgumentParser()
parser.add_argument("command", help="which command to run on the database (seed, drop, or copy)")
parser.add_argument("-c", "--collection", help="which collection to act on (will act on ALL collections if not specified)")
parser.add_argument("-p", "--production", help="make changes to the production database", action="store_true")
parser.add_argument("-r", "--rows", help="if command is 'seed', number of rows to seed", type=int)

# all the collections in the database
collections = ['feature_selections','notebook','train_results']

def rand_string(n):
  return ''.join(random.choice(string.ascii_lowercase) for _ in range(n))

if __name__ == "__main__":
  args = parser.parse_args()
  prod = args.production
  connection = os.environ.get('MONGO_URI_PROD') if prod else os.environ.get('MONGO_URI')
  tag = 'prod' if prod else 'dev'
  db = MongoClient(connection).get_default_database() # db should be specified in URI
  command = args.command
  collection = args.collection

  if command == "seed":
    rows = args.rows or 10
    if not collection or collection == "feature_selections":
      features = []
      with open('server/data/meta.json') as file:
          features = list(json.load(file)['features'].keys())
      for i in range(rows):
        selections = {}
        for f in features:
          selections[f] = {
            'decision': random.choice(['include','exclude']),
            'sure': random.choice([True,False]),
            'reason': random.choice(['one two three', 'four five six', 'seven eight nine']),
          }
        row = { 'id': str(random.randrange(99999)), 'selections': selections}
        db.feature_selections.insert_one(row)

    if not collection or collection == "notebook":
      for i in range(rows):
        rules = [rand_string(10) for _ in range(random.choice([1,2,3]))]
        row = { 'id': str(random.randrange(99999)), 'q1': rand_string(20), 'q2': rand_string(15), 'rules': rules}
        db.notebook.insert_one(row)

    if not collection or collection == "train_results":
      test_ids = list(pd.read_csv('server/data/data_test.csv')['Subject ID'])
      features = []
      with open('server/data/meta.json') as file:
          features = list(json.load(file)['features'].keys())
          
      def create_row():
        preds = {}
        for id in test_ids:
          preds[str(id)] = random.random()
        coef = {}
        for f in features:
          # randomly exclude some features
          if random.random() > 0.2:
            coef[f] = random.random()*2 - 1
        row = { 'id': str(random.randrange(99999)), 'predictions': preds, 'coef': coef }
        return row

      for i in range(rows-1):
        db.train_results.insert_one(create_row())
      group = create_row()
      group['id'] = 'admin'
      db.train_results.insert_one(group)

      
    print('[{}] seeded collection(s): {}'.format(tag, collection or ','.join( collections)))

  elif command == "drop":
    if collection:
      collections = [collection]
    for col in collections:
      db[col].drop()
    print('[{}] dropped collection(s): {}'.format(tag,','.join(collections)))

  elif command == "copy":
    other_db_connection = os.environ.get('MONGO_URI') if prod else os.environ.get('MONGO_URI_PROD')
    other_db = MongoClient(other_db_connection).get_default_database()
    if collection:
      collections = [collection]
    for col in collection:
      for doc in other_db[col].find():
        db[col].insert_one(doc)
    print('[{}] copied collection(s): {}'.format(tag,','.join(collections)))
      