from flask_restplus import Resource, fields
from flask import jsonify, request, make_response, Response, abort
from pymongo.message import query
import time, datetime
from app_main.config import mongo, api
from .models import account_fields,email


class Accounts(Resource):
    # @api.expect(email)
    def delete(self, customer_id,email):
        """Delete an  Account from list :: Input:Email"""
        accounts = mongo.db.Customers
        # data = request.get_json()
        # print (data)
        result = accounts.update({"Customer_id": customer_id},
            # {"$pull": {"Accounts": {"Email": data['Email']}}},
            {"$pull": {"Accounts": {"Email": email}}},
            upsert=True
            )
        print(result)
        if result['updatedExisting'] and result['nModified'] > 0:
            return jsonify({'result': 'account Deleted successfully'})
        abort(400, 'Account does not exist')

    def get(self, customer_id):
        """Returns all the Accounts related to the Customer """

        customers = mongo.db.Customers
        query = customers.find({"Customer_id": customer_id},
                               {"Accounts.Rules": 0, "AdressList": 0, "_id": 0, "Customer_id": 0, "Name": 0})

        if query.count() > 0:
            output = []

            for q in query:
                print(q)
                for i in q['Accounts']:
                    for acc in i:
                        output.append(acc)
                response = jsonify({'result': q})
                response.headers.add('Access-Control-Allow-Origin', '*')
                return response

        else:
            response = jsonify({'result': 'customer_id %s does not Exist' % customer_id})
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response

    @api.expect(account_fields)
    def post(self, customer_id):
        """Adds a new Account for a customer  """
        customers = mongo.db.Customers
        data = request.get_json()
        findOneuser = customers.find({"Customer_id": customer_id, "Accounts.Email": data["Email"]},
                                     {"Accounts.Email.$": 1, "_id": 0})
        print(findOneuser.count())
        if findOneuser.count() == 0:
            customers.update(
                {"Customer_id": customer_id},
                {"$addToSet": {
                    "Accounts":
                        {
                            "Account_id": int(time.time()),
                            # "Account_id": data["Account_id"],
                            "FirstName": data["FirstName"],
                            "LastName": data["LastName"],
                            "Password": "",
                            "Email": data["Email"],
                            "AccountType": "user",
                            # "Created_at": int(time.time().now),
                            "Created_at": str(datetime.datetime.now()),
                            "Rules": {
                                "Goal": "",
                                "DoNotDisturbFrom": "",
                                "DoNotDisturbTo": "",
                                "Frequency": ""
                            }
                        }

                }
                }
            )
            response = jsonify({'result': 'user added successfully'})
            # response.headers.add('Access-Control-Allow-Origin', '*')
            return response
        else:
            abort(400, 'Account Already exists')


class Account(Resource):
    def get(self, account_id):
        """Returns all the details of an Account"""
        customers = mongo.db.Customers
        query = customers.find({"Accounts.Account_id": account_id},
                               {"Accounts.Rules": 0, "_id": 0, "Customer_id": 0, "Name": 0})

        output = []
        if query.count() > 0:
            for q in query:
                # print(q)
                for i in q['Accounts']:
                    if i['Account_id'] == account_id:
                        output.append(i)
                        print(i)
                return jsonify(output[0])
        else:
            return 'account_id %s does not Exist' % account_id

    @api.expect(account_fields)
    def put(self, account_id):
        """Update Account  : input : JSON """
        accounts = mongo.db.Customers
        data = request.get_json()
        print(data)

        result = accounts.update(

            {"Accounts.Account_id": account_id},
            {
                "$set": {"Accounts.$.FirstName": data["FirstName"],
                         "Accounts.$.LastName": data["LastName"],
                         "Accounts.$.Email": data["Email"],
                         # "Accounts.$.Password": data["Password"],
                         # "Accounts.$.AccountType": data["AccountType"]
                         }}
        )
        if result['updatedExisting'] and result['n'] > 0:
            return jsonify({'result': 'account Details Updated successfully'})
        return 'account_id %s does not Exist' % account_id


class Customer(Resource):
    def get(self, email):
        """Returns all the details of an Account"""
        customers = mongo.db.Customers
        query = customers.find({"Accounts.Email": email},
                               {"Customer_id": 1, "Name": 1, "_id": 0, "Accounts.Email": 1,
                                "Accounts.Account_id": 1})

        output = {}
        if query.count() > 0:
            for q in query:
                print(q)
                output.update({"Name": q["Name"]})
                output.update({"Customer_id": q["Customer_id"]})

                for i in q['Accounts']:
                    if i['Email'] == email:
                        output.update({"Account_id": i["Account_id"]})
                        print(i, output)
                return jsonify(output)
        else:
            return 'email %s does not Exist' % email


class Monitor(Resource):
    """retuns Monitor_id when givena customer id"""

    def get(self, custID):
        monitors = mongo.db.Monitors
        query = monitors.find({"Customer_id": custID}, {"Monitor_id": 1, "PlanType": 1, "_id": 0})
        output = []
        if query.count() > 0:
            for q in query:
                print(q)
                output.append(q)
            return jsonify(output[0])
        else:
            return 'customer_id %s does not Exist' % custID
