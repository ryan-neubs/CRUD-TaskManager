from flask import Flask, jsonify, request
from sqlalchemy import create_engine, Column, Integer, String
from datetime import datetime
from dotenv import load_dotenv
import os

app = Flask(__name__)

load_dotenv('.env')
db_user = os.getenv("DB_USER")
db_pass = os.getenv("DB_PASSWORD")
db_host = os.getenv("DB_HOST")
db_port = os.getenv("DB_PORT")
db_name = os.getenv("DB_NAME")

engine = create_engine(f"mysql://{db_user}:{db_pass}@{db_host}:{db_port}/{db_name}")

tasks = {}
curr_id = 1

@app.route('/tasks', methods=['POST'])
def create_task():
    global curr_id
    data = request.get_json()

    if not data or 'title' not in data or 'description' not in data:
        return jsonify({"error":"Title and description are required"}), 400
    
    task = {
        "id": curr_id,
        "title": data['title'],
        "description": data['description'],
        "status": data.get('status', 'incomplete'),
        "date_created": datetime.today().strftime('%Y-%m-%d %H:%M:%S')
    }
    tasks[curr_id] = task
    curr_id += 1
    return jsonify(task), 201


@app.route('/tasks', methods=['GET'])
def get_tasks():
    return jsonify(tasks), 200


@app.route('/tasks/<int:task_id>')
def get_task(task_id: int):
    if task_id < 0:
            return jsonify({"error": "Invalid input, task id must be a postive integer."}), 400

    if task_id not in tasks:
        return jsonify({"error": f"Task with id {task_id} not found."}), 404
    
    return jsonify(tasks[task_id]), 200


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


@app.errorhandler(500)
def handle_internal_server_error(e):
    return jsonify({"error": f"An internal server error occured: {e}"}), 500


if __name__ == '__main__':
    app.run(debug=True)