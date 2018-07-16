from flask_restplus import Resource, marshal_with
from flask import jsonify, request
from app_main.config import mongo, api
from influxdb import InfluxDBClient
import datetime

from influxDATA.models import influxDay
import math

class HourlyData(Resource):
    def get(self, db):
        """Get Values per Hour """
        client = InfluxDBClient('34.243.186.74', 8086, 'root', 'root',db)

        result = client.query(
            "SELECT integral(value,1h) AS value_1h FROM data_monitor WHERE (time >= now()-1d AND (measure_type = 'RealP1')) GROUP BY time(1h)")
        # "SELECT integral(value,1h) AS value_1h FROM data_monitor WHERE (time >= 1524672000000000000 AND (measure_type = 'RealP1')) GROUP BY time(1h)")
        output = []
        listperhour = list(result.get_points())
        for i in listperhour:
            t = i['time']
            # t = (datetime.datetime.strptime(t, '%Y-%m-%dT%H:%M:%SZ')).time()
            output.append({'x': str(t), 'y': round(i["value_1h"], 3)})
            # output.append({'x': i["time"], 'y': round(i["y"], 3)})
        print(listperhour)
        response = jsonify(output)
        response.headers.add('Access-Control-Allow-Origin', '*')

        # close connection when finished
        client.close()
        return response


class DailyData(Resource):
    def get(self, db):
        """Get Values per Day """
        client = InfluxDBClient('34.243.186.74', 8086, 'root', 'root', db)

        result = client.query(
            "SELECT INTEGRAL(value,1h)/1000 AS value_1d FROM data_monitor WHERE (time >= now()-7d AND (measure_type = 'RealP1')) GROUP BY time(24h)")
        output = []
        listperhour = list(result.get_points())
        for i in listperhour:
            output.append({'x': i["time"], 'y': round(i["value_1d"], 3)})
            print(listperhour)
        response = jsonify(output)
        response.headers.add('Access-Control-Allow-Origin', '*')

        # close connection when finished
        client.close()
        return response

class MonthlyData(Resource):
    def get(self, db):
        """Get Values per Day """
        client = InfluxDBClient('34.243.186.74', 8086, 'root', 'root', db)
        
        result = client.query(
            "SELECT INTEGRAL(value,1h)/1000 AS value_1d FROM data_monitor WHERE (time >= now()-4w AND (measure_type = 'RealP1')) GROUP BY time(24h)")
        output = []
        listperhour = list(result.get_points())
        for i in listperhour:
            output.append({'x': i["time"], 'y': round(i["value_1d"], 3)})
            print(listperhour)
        response = jsonify(output)
        response.headers.add('Access-Control-Allow-Origin', '*')

        # close connection when finished
        client.close()
        return response

class MonthlyConsumption(Resource):
    def get(self, db):
        """Get Monthly Consumption """
        client = InfluxDBClient('34.243.186.74', 8086, 'root', 'root', db)
        result = client.query(
            "SELECT INTEGRAL(value,1h)/1000 AS value_1m FROM data_monitor WHERE (time >= 1524672000000000000 AND (measure_type = 'RealP1')) GROUP BY time(30d)"
        )
        listperhour = list(result.get_points())
        somme = 0
        for i in listperhour:
            somme = somme + i["value_1m"]
            print(somme)
        date = datetime.datetime.strptime(listperhour[-1]["time"], '%Y-%m-%dT%H:%M:%SZ').date()
        print(datetime.datetime.strptime(i["time"], '%Y-%m-%dT%H:%M:%SZ').date()
              , datetime.datetime.strptime(i["time"], '%Y-%m-%dT%H:%M:%SZ').date())
        response = jsonify({"somme": math.ceil(somme*100)/100, "date": date})
        response.headers.add('Access-Control-Allow-Origin', '*')

        # close connection when finished
        client.close()
        return response

    # @marshal_with(influxDay)
    # def get(self,day:influxDay):
    #     client = InfluxDBClient('34.243.186.74', 8086, 'root', 'root', db)
    #     q=[]
    #     q.append(day)
    #     print(q)
    #     # seq = ("SELECT INTEGRAL(value,1h) AS value_1h FROM data_monitor WHERE (time >=",str(influxDay["day"])
    #     #                                                                                ), "AND time <",
    #     #        str(influxDay["day"])
    #     #        , " AND (measure_type = 'RealP1')) GROUP BY time(1h)")
    #     # print(q.join(seq))
    #     # print(seq)
    #     # result = client.query(seq)
    #     # output = []
    #     # listperhour = list(result.get_points())
    #     # for i in listperhour:
    #     #     output.append({'x': i["time"], 'y': round(i["value_1h"], 3)})
    #     # print(listperhour)
    #     # response = jsonify(output)
    #     # response.headers.add('Access-Control-Allow-Origin', '*')
    #     #
    #     # # close connection when finished
    #     # client.close()
    #     # return response


# class MonthlyData(Resource):
#     def get(self, db):
#         """Get Values per Month """
#         client = InfluxDBClient('34.243.186.74', 8086, 'root', 'root', db)
#
#         result = client.query(
#             "SELECT INTEGRAL(value,1h)/1000 AS value_1m FROM data_monitor WHERE (time >= 1524672000000000000 AND (measure_type = 'RealP1')) GROUP BY time(30d)")
#         output = []
#         listperhour = list(result.get_points())
#         for i in listperhour:
#             output.append({'x': i["time"], 'y': round(i["value_1m"], 3)})
#         print(listperhour)
#         response = jsonify(output)
#         response.headers.add('Access-Control-Allow-Origin', '*')
#
#         # close connection when finished
#         client.close()
#         return response


class RealTime(Resource):
    def get(self, db):
        """Returns Real-Time value """

        client = InfluxDBClient('34.243.186.74', 8086, 'root', 'root', db)
        output = []
        result = client.query("SELECT LAST(value) FROM data_monitor WHERE (measure_type = 'RealP1')")
        lastrealp1 = list(result.get_points())
        result = client.query("SELECT LAST(value) FROM data_monitor WHERE (measure_type = 'RealP2')")
        lastrealp2 = list(result.get_points())
        result = client.query("SELECT LAST(value) FROM data_monitor WHERE (measure_type = 'RealP3')")
        lastrealp3 = list(result.get_points())
        last = lastrealp1 + lastrealp2 + lastrealp3
        somme = sum(item['last'] for item in last)
        t = lastrealp1[0]['time']
        # t = (datetime.datetime.strptime(t, '%Y-%m-%dT%H:%M:%SZ')).time()
        t = (datetime.datetime.strptime(t, '%Y-%m-%dT%H:%M:%SZ'))
        output = {"time": str(t), "value": abs(somme)}

        response = jsonify(output)
        response.headers.add('Access-Control-Allow-Origin', '*')

        # close connection when finished
        client.close()
        return response


class EveryMinute(Resource):
    def get(self, db):
        """Get Values per minute """
        client = InfluxDBClient('34.243.186.74', 8086, 'root', 'root', db)

        result = client.query(
            "SELECT integral(value,1h) AS value_1h FROM data_monitor WHERE (time >= now()-1d AND (measure_type = 'RealP1')) GROUP BY time(1h)")
        # "SELECT integral(value,1h) AS y FROM data_monitor WHERE (time >= 1524672000000000000 AND (measure_type = 'RealP1')) GROUP BY time(1h)")
        output = []
        listperhour = list(result.get_points())
        for i in listperhour:
            t = i['time']
            t = (datetime.datetime.strptime(t, '%Y-%m-%dT%H:%M:%SZ')).time()
            output.append({'x': str(t), 'y': round(i["value_1h"], 3)})
            # output.append({'x': i["time"], 'y': round(i["y"], 3)})
            print(listperhour)
        response = jsonify(listperhour)
        response.headers.add('Access-Control-Allow-Origin', '*')

        # close connection when finished
        client.close()
        return response
