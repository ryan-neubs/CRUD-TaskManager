from flask import Flask, jsonify, request
from sqlalchemy import create_engine, Column, Integer, String, select
from sqlalchemy.orm import Session
from datetime import datetime
from dotenv import load_dotenv
from Backend.db_schema import Task
import os

app = Flask(__name__)

load_dotenv('.env') # Get environment variables
db_user = os.getenv("DB_USER")
db_pass = os.getenv("DB_PASSWORD")
db_host = os.getenv("DB_HOST")
db_port = os.getenv("DB_PORT")
db_name = os.getenv("DB_NAME")

engine = create_engine(f"mysql://{db_user}:{db_pass}@{db_host}:{db_port}/{db_name}") # Connection to database using environment variables

@app.route('/tasks', methods=['POST'])
def create_task():
    data = request.get_json()

    with Session(engine) as session: # Open session for database requests
        try:
            new_task = Task(
                title=data['title'],
                description=data.get('description', ''),
                status=data.get('status', 'incomplete'),
                created_by='Test User', # Defaulting to test user right now. Not sure how user idenification will work yet
                priority=data.get('priority', None) 
            )

            session.add(new_task)
            session.commit() # Confirms addition of task to database
            return jsonify({'message':'Task added successfully', 'task_id': new_task.task_id}), 201
        
        except Exception as e:
            session.rollback()
            return jsonify({'error': str(e)}), 500


@app.route('/tasks/', methods=['GET']) # Change this to use a query parameter such as ?amount=10 (Ex: http://localhost:5000/tasks/?amount=10) 
def get_tasks():
    amount = request.args.get('amount') # Booya, first try. Retrieves amount specified in request

    with Session(engine) as session: 
        try:
            statement = select(Task).filter_by(created_by='Test User').limit(amount) # SQL Query

            tasks_retrieved = session.execute(statement).scalars().all() # Executes query
            task_list = [
                {
                    'task_id': task.task_id,
                    'title': task.title,
                    'description': task.description,
                    'creation_date': task.creation_date,
                    'status': task.status,
                    'created_by': task.created_by,
                    'priority': task.priority,
                    'date_modified': task.date_modified

                }
                for task in tasks_retrieved # Creates a list of each task returned in the query
            ]
            return jsonify(task_list), 200

        except Exception as e:
            session.rollback() # Rolls back session if error occurs
            return jsonify({'error': str(e)}), 500


@app.route('/tasks/<int:id>', methods=["GET"]) # int:id is the id number of the task being retrieved
def get_task(id: int):
    if id < 0: # Can't have an id left than zero, duh
            return jsonify({"error": "Invalid input, task id must be a postive integer."}), 400

    with Session(engine) as session:
        try:
            statement = select(Task).filter_by(task_id=id)

            task_retrieved = session.execute(statement).scalars().first()

            task = {
                'task_id': task_retrieved.task_id,
                'title': task_retrieved.title,
                'description': task_retrieved.description,
                'creation_date': task_retrieved.creation_date,
                'status': task_retrieved.status,
                'created_by': task_retrieved.created_by,
                'priority': task_retrieved.priority,
                'date_modified': task_retrieved.date_modified
            } # Creates the json object to return in the request

            return jsonify(task), 200

        except Exception as e:
            session.rollback()
            return jsonify({'error': str(e)}), 500


@app.route('/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id: int):
    data = request.get_json()
    for key, val in data.items():
        tasks[task_id][key] = val

    return jsonify(tasks[task_id]), 200


@app.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id: int):
    if task_id < 0:
        return jsonify({"error": "Invalid input, task id must be a postive integer."}), 400

    if task_id not in tasks:
        return jsonify({"error": f"Task with id {task_id} not found."}), 404

    del tasks[task_id]
    return '', 204


@app.errorhandler(400)
def bad_request_error(error):
    response = {
        "error": "Bad Request",
        "message": str(error)
    }
    return jsonify(response), 400

@app.errorhandler(401)
def unauthorized_error(error):
    response = {
        "error": "Unauthorized",
        "message": str(error)
    }
    return jsonify(response), 401

@app.errorhandler(403)
def forbidden_error(error):
    response = {
        "error": "Forbidden",
        "message": str(error)
    }
    return jsonify(response), 403

@app.errorhandler(404)
def not_found_error(error):
    response = {
        "error": "Not Found",
        "message": str(error)
    }
    return jsonify(response), 404

@app.errorhandler(405)
def method_not_allowed_error(error):
    response = {
        "error": "Method Not Allowed",
        "message": str(error)
    }
    return jsonify(response), 405

@app.errorhandler(408)
def request_timeout_error(error):
    response = {
        "error": "Request Timeout",
        "message": str(error)
    }
    return jsonify(response), 408

@app.errorhandler(409)
def conflict_error(error):
    response = {
        "error": "Conflict",
        "message": str(error)
    }
    return jsonify(response), 409

@app.errorhandler(410)
def gone_error(error):
    response = {
        "error": "Gone",
        "message": str(error)
    }
    return jsonify(response), 410

@app.errorhandler(413)
def payload_too_large_error(error):
    response = {
        "error": "Payload Too Large",
        "message": str(error)
    }
    return jsonify(response), 413

@app.errorhandler(415)
def unsupported_media_type_error(error):
    response = {
        "error": "Unsupported Media Type",
        "message": str(error)
    }
    return jsonify(response), 415

@app.errorhandler(429)
def too_many_requests_error(error):
    response = {
        "error": "Too Many Requests",
        "message": str(error)
    }
    return jsonify(response), 429

@app.errorhandler(500)
def internal_server_error(error):
    response = {
        "error": "Internal Server Error",
        "message": "An unexpected error occurred. Please try again later."
    }
    return jsonify(response), 500


if __name__ == '__main__':
    app.run(debug=True)