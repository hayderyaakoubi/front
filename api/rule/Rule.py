from flask_restplus import Resource
from flask import jsonify, request
from app_main.config import mongo,api
from rule.models import alert_fields

class Rule(Resource):

    def get(self, account_id, customer_id):
        """returns the Rule details related to an account """
        accounts = mongo.db.Customers
        # query = accounts.find({'Customer_id': customer_id},
        #                       {"AdressList": 0, "_id": 0, "Customer_id": 0, "Account_id": 0})
        query_op = accounts.find({"Accounts.Account_id": account_id, "Customer_id": customer_id},
                                 {"AdressList": 0, "_id": 0, "Customer_id": 0, "Account_id": 0})
        if query_op.count()> 0:
            # print ('query',no)
            output = []
            for q in query_op:
                print(q)
                for i in q['Accounts']:
                    if i['Account_id'] == account_id:
                        output.append(i['Rules'])
            return jsonify({'result': output[0]})
        return 'account_id %s does not Exist' %account_id

    @api.expect(alert_fields)
    def put(self,account_id,customer_id):
        """updates the Rule related to an account"""
        accounts = mongo.db.Customers
        data = request.get_json()
        print(data)
        # query_c = accounts.find({"Customer_id": customer_id},
        #                         {"AdressList": 0, "_id": 0, "Customer_id": 0, "Account_id": 0})
        # if query_c.count() > 0:
        #     response = jsonify({'result': 'Customer %s does not exist ' % customer_id})
        #     response.headers.add('Access-Control-Allow-Origin', '*')
        #     return response
        # query_op = accounts.find({"Accounts.Account_id": account_id},
        #                          {"AdressList": 0, "_id": 0, "Customer_id": 0, "Account_id": 0})
        # if query_op.count() > 0:
        #     response = jsonify({'result': 'Account_id %s does not exist ' % account_id})
        #     response.headers.add('Access-Control-Allow-Origin', '*')
        #     return response
        #
        # else:
        result = accounts.update(

            {"Accounts.Account_id": account_id, "Customer_id": customer_id},
            {
                "$set": {"Accounts.$.Rules.DoNotDisturbFrom": data["DoNotDisturbFrom"],
                         "Accounts.$.Rules.DoNotDisturbTo": data["DoNotDisturbTo"],
                         "Accounts.$.Rules.Goal": data["Goal"],
                         "Accounts.$.Rules.Frequency": data["Frequency"]
                         }}
        )
        print(result)
        if result['updatedExisting'] and result['n'] > 0:
            return jsonify({'result': 'account Rule Updated successfully'})
        return 'account_id %s does not Exist' % account_id

    # {projection:{"AdressList": 0, "_id": 0, "Customer_id": 0, "Account_id": 0}})
