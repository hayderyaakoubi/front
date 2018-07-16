from flask_bcrypt import Bcrypt
from flask_pymongo import PyMongo
from flask import Flask, jsonify, request
from flask_restplus import Resource, Api
from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)
application = Flask(__name__)  # Change assignment here
# app = Flask(__name__)
api = Api(application, title='Web App API',
          description='This is the API of the web application related to the energy monitor'
          , default='API-TechAbility',
          default_label='webapi',
          version='2.0'
          )
CORS(application)
bcrypt = Bcrypt(application)

# Setup the Flask-JWT-Extended extension
application.config['JWT_SECRET_KEY'] = 'CoL6Wk2o9+W3kOPpkZcoh5HubkUgoY2hV76hE1yrp5M='
jwt = JWTManager(application)
application.config_prefix = 'MONGO'
application.config['MONGO_HOST'] = '13.95.148.9'
application.config['MONGO_DBNAME'] = 'webAPI'
application.config['MONGO_USERNAME'] = 'ouss'
application.config['MONGO_PASSWORD'] = 'romdhane'
mongo = PyMongo(application, config_prefix='MONGO')

# db_connect = PyMongo.MongoClient('localhost', 27017)
# database_name = 'webAPI'
# database = db_connect[database_name]
# collection = database.collection_names(include_system_collections=False)
# for collect in collection:
#     print (collect)
