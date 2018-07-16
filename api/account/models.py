from flask_restplus import fields
from app_main.config import api

account_fields = api.model('account',
                           {
                               # 'Account_id': fields.String,
                               'FirstName': fields.String,
                               'LastName': fields.String,
                               'Email': fields.String,
                               # 'Password': fields.String,
                               # 'AccountType': fields.String,

                               # 'address': fields.String,
                               # 'Created_at': fields.DateTime(dt_format='rfc822'),
                           })
email = api.model('email',
                  {
                      'Email': fields.String
                  })
