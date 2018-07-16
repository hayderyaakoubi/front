from flask_restplus import Resource, fields
from flask import jsonify, request, make_response, Response, abort
from pymongo.message import query
import time
from app_main.config import mongo, api, bcrypt
from authentication.model.login_fields import login_fields
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)


class Login(Resource):
    @api.expect(login_fields)
    def post(self):
        """login"""

        customers = mongo.db.Customers
        data = request.get_json()
        query = customers.find({"Accounts.Email": data["Email"]},
                               {"Accounts.Email": 1, "Accounts.Password": 1, "_id": 0})
        output = []
        if query.count() > 0:
            for q in query:
                print(q)
                print(q['Accounts'][0]['Password'])
                t1 = bcrypt.check_password_hash(q['Accounts'][0]['Password'], data['Password'])
                Email = request.json.get('Email', None)
                print(Email,t1)
                if t1:
                    access_token = create_access_token(identity=Email)
                    print(access_token)
                    return make_response(jsonify(access_token=access_token))
                    # return True
                else:
                    return abort(401, 'Incorrect Credentials ')
        else:
            return 'Incorrect Credentials'
    # return jsonify({'result': output})
    # else:
    # return 'account_id %s does not Exist' % account_id


class Test(Resource):
    @api.expect(login_fields)
    # @jwt_required
    def post(self):
        if not request.is_json:
            return jsonify({"msg": "Missing JSON in request"}), 400

        username = request.json.get('Email', None)
        password = request.json.get('Password', None)
        print (username)
        # if not Email:
        #     return jsonify({"msg": "Missing username parameter"}), 400
        # if not password:
        #     return jsonify({"msg": "Missing password parameter"}), 400
        #
        # if username != 'test' or password != 'test':
        #     return jsonify({"msg": "Bad username or password"}), 401

        # Identity can be any data that is json serializable
        access_token = create_access_token(identity=username)
        print(access_token)
        current_user = get_jwt_identity()
        print(current_user)

        return make_response(jsonify(access_token=access_token,))
