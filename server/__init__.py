import os
from server.db import mongo
from server.routes import api_blueprint
from dotenv import load_dotenv
from flask import Flask, send_from_directory
from flask_cors import CORS

# api routes located at routes.py

# todo: scripts
#  - seed either database with sample data
#  - clear either database (or just one collection)
#  - write copy from one db to another (one or all collections)
# https://docs.python.org/3/howto/argparse.html

load_dotenv()


# create app
def create_app(test_config=None):
    app = Flask(__name__, static_folder='../build')
    CORS(app)
    app.config['MONGO_URI'] = os.getenv('MONGO_URI')

    mongo.init_app(app)

    app.config['ROOT_DIR'] = os.path.dirname(
        os.path.abspath(__file__))  # /server

    app.register_blueprint(api_blueprint)

    # serve frontend
    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def index(path):
        '''Return index.html for all non-api routes'''
        return send_from_directory(app.static_folder, 'index.html')

    return app
