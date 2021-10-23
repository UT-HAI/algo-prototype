'''server/app.py - main api app declaration'''
from flask import Flask, send_from_directory, Response
from flask_cors import CORS

'''Main wrapper for app creation'''
app = Flask(__name__, static_folder='../build')
CORS(app)

##
# API routes
##

@app.route('/api/selections')
def selections():
  '''Sends .csv of all participant feature selections'''
  mock = '1,2,3\n4,5,6\n'
  return Response(
    mock,
    mimetype='text/csv',
    headers={"Content-disposition": "attachment; filename=test.csv"}
  )
  

##
# View route
##

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
  '''Return index.html for all non-api routes'''
  #pylint: disable=unused-argument
  return send_from_directory(app.static_folder, 'index.html')