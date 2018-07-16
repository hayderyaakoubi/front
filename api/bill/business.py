# from pymongo import MongoClient
#
# # def getNextSequence(name):
# c = MongoClient()
# db = c.test
# print (db)
#
#
# def getNextSequence(name):
#     ret = db.counters.findAndModify(name)
#     {
#         {
#             "query": {"_id": name},
#             "update": {"$inc": {"seq": 1}},
#             "new": "true"
#         }
#     }
#     return ret.seq
#
# db.users.insert(
#    {
#      "_id": getNextSequence("userid"),
#      "name": "Sarah C."
#    }
# )
#
# #     ret = db.counters.findAndModify(
# #           {
# #             "query": { _id: name },
# #             "update": { $inc: { seq: 1 } },
# #             "new": true
# #           }
# #    )
# #
# #    return ret.seq;
# # }
