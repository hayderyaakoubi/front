from flask_restplus import Resource
from flask import jsonify, request
from app_main.config import mongo, api
from bill.models import bill_fields, bill
import time
from flask import jsonify, request, make_response, Response, abort

class Bill(Resource):
    def get(self, monitor_id):
        """Returns all the the Bills related to a Monitor """
        customers = mongo.db.Monitors
        query = customers.find({"Monitor_id": monitor_id
                                },
                               {
                                   "Monitor_id": 0, "PlanType": 0,
                                   "MonitorType": 0, "Customer_id": 0, "_id": 0, "Sensors": 0})
        output = []
        if query.count() > 0:
            for q in query:
                if monitor_id:
                    output.append(q['BillsList'])
                    print(output)

            response = jsonify({'result': output})
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response
        return 'Monitor_id %s does not exist ' % monitor_id,404

    @api.expect(bill_fields)
    def post(self, monitor_id):
        """Add new Bill to Bills List of a Monitor"""
        customers = mongo.db.Monitors
        data = request.get_json()
        print(data)
        query=customers.find({"Monitor_id": monitor_id
                           },
                          {
                              "Monitor_id": 0, "PlanType": 0,
                              "MonitorType": 0, "Customer_id": 0, "_id": 0, "Sensors": 0})
        if query.count() > 0:
            customers.update(
                {"Monitor_id": monitor_id},

                {"$push": {
                    "BillsList.Bills":
                        {
                            # "Bill_id": data["Bill_id"],
                             "Bill_id": int(time.time()),
                             "From": data["From"],
                            "To": data["To"],
                            "Amount": data["Amount"],
                            "PaymentStatus": data["PaymentStatus"],
                            "PaymentDate": data["PaymentDate"],
                            "CreatedAt": data["CreatedAt"]
                        }

                }
                }
            )
            response = jsonify({'result':'Bill Added Successfully'})
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response
        response = jsonify({'result':'Monitor_id %s does not exist '% monitor_id })
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

    @api.expect(bill)
    def delete(self,monitor_id):
        """Delete an  Account from list :: Input:Email"""
        customers = mongo.db.Monitors
        data = request.get_json()
        result = customers.update({"Monitor_id": monitor_id},
                                 {"$pull": {"BillsList.$.Bills": {"Email": data['bill_id']}}},
                                 upsert=True
                                 )
        print(result)
        if result['updatedExisting'] and result['nModified'] > 0:
            return jsonify({'result': 'account Deleted successfully'})
        abort(400, 'Bill_id does not exist')



