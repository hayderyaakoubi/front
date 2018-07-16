from flask_restplus import fields
from app_main.config import api


alert_fields=api.model('alert',
{
    'DoNotDisturbFrom': fields.DateTime,
    'DoNotDisturbTo': fields.String,
    'Goal': fields.String,
    'Frequency': fields.String(description='Possible values are ', enum=['Hourly','Daily','Weekly'])
})
