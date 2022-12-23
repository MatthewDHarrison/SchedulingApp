from apispec import APISpec
from apispec.ext.marshmallow import MarshmallowPlugin
from apispec_webframeworks.flask import FlaskPlugin
from flask import Flask, jsonify, render_template, send_from_directory
from marshmallow import Schema, fields
from werkzeug.utils import secure_filename

companies = [{"id": 1, "name": "Company One"}, {"id": 2, "name": "Company Two"}]

app = Flask(__name__)

spec = APISpec(
    title = 'flask-api-swagger-doc',
    version = '1.0.0',
    openapi_version = '3.0.2',
    plugins = [FlaskPlugin(), MarshmallowPlugin()]
)

@app.route('/api/swagger.json')
def create_swagger_spec():
    return jsonify(spec.to_dict())

class TodoResponseSchema(Schema):
    id = fields.Int()
    title = fields.Str()
    status = fields.Boolean()

class TodoListResponseSchema(Schema):
    todo_list = fields.List(fields.Nested(TodoResponseSchema))

@app.route('/todo')
def todo():
    """Get List of Todo
        ---
        get: 
            description: Get List of Todos
            response:
                200:
                    description: Return a todo list
                    content: 
                        application/json:
                            schema: TodoListResponseSchema
    """
    dummy_data = [{
        'id': 1,
        'title': 'Finish this task',
        'status': False
    }, {
        'id': 2,
        'title': 'Finish that task',
        'status': True
        
    }]

    return TodoListResponseSchema().dump({'todo_list': dummy_data})


with app.test_request_context():
    spec.path(view=todo)


@app.route('/companies', methods=['GET'])
def get_companies():
  return json.dumps(companies)

@app.route('/companies', methods=['POST'])
def post_companies():
  return json.dumps({"success": True}), 201

if __name__ == '__main__':
    app.run(debug=True)