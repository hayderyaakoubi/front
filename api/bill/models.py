from flask_restplus import fields
from app_main.config import api


bill_fields=api.model('bill',
{

    # 'Account_id': fields.String,
    # 'Bill_id': fields.String,
    'From': fields.Date,
    'To': fields.Date,
    'Amount': fields.String,
    'PaymentStatus': fields.Boolean,
    'PaymentDate': fields.Date,
    'CreatedAt': fields.DateTime(dt_format='rfc822'),
})

bill=api.model('bill',
{  'Bill_id': fields.String
})