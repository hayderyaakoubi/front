from flask_restplus import fields
from app_main.config import api


influxDay=api.model('day',
{    'day': fields.Date(dt_format='rfc822'),
})
