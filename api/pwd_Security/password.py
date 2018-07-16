from werkzeug.security import generate_password_hash,check_password_hash
from flask_restplus import Resource, fields
from app_main.config import mongo, api, bcrypt
from flask import jsonify, request, make_response, Response, abort

# class User(Resource):
#     def get(self, password):
#         pw_hash = generate_password_hash(password)
#         print(pw_hash)
#         t1 = check_password_hash(pw_hash,password)
#         t2 = check_password_hash(pw_hash,'test')
#         return str(t1)+'///hash='+pw_hash
class User(Resource):
    def get(self, password):
        # pw_hash = bcrypt.generate_password_hash('hunter2')
        pw_hash = bcrypt.generate_password_hash(password).decode('utf-8')
        print(pw_hash)
        t1 = bcrypt.check_password_hash(pw_hash,password)
        t2 = bcrypt.check_password_hash(pw_hash,'test')
        print (t1,t2)
        return pw_hash
