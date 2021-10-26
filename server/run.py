from app import app
from flask_cors import CORS
from routes import *

CORS(app)

if __name__ == "__main__":
    app.run()