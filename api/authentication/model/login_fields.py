from flask_restplus import fields
from app_main.config import api

login_fields = api.model('Login',
                           {
                               'Email': fields.String,
                               'Password': fields.String})
