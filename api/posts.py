# from app_main.config import api
# from flask_restplus import Resource, fields, marshal_with
#
#
# post_fields = {
# 'title': fields.String(),
# 'text': fields.String(),
# 'publish_date': fields.DateTime(dt_format='iso8601')
# }
#
# blog_post = api.model('Blog post', {
#     'id': fields.Integer(description='The unique identifier of a blog post'),
#     'title': fields.String(required=True, description='Article title'),
# }
#                       )
# class PostApi(Resource):
#     @api.response(201, 'Blog post successfully created.')
#     @api.expect(blog_post)
#     # @marshal_with(post_fields)
#     def get(self, post_id=None):
#         if post_id: return {"id": post_id}
#
#         return {"hello": "world"}
