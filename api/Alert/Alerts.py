from flask_restplus import Resource
from flask import jsonify,Response,abort
from app_main.config import mongo




class Alerts(Resource):
    def get(self, monitorid):
        """Returns all the Alerts related to a Monitor """
        alerts = mongo.db.Alerts
        query = alerts.find({'Monitor_id': monitorid}, {"_id": 0, "created_at": 0})
        if query.count()>0:

            output = []
            for q in query:
                print(monitorid)
                for i in q['AlertList']:
                    output.append(i)

            response = jsonify({'result': output})
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response
        else:
            abort(404,'Monitor_id %s does not exist '%monitorid)
            # return Response('Monitor_id %s does not exist '%monitorid,status=404)
