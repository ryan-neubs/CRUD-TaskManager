import pytest

def test_create_task(client):
    task = {
        "title": "Test Task",
        "description": "This is a test task",
        "status": "incomplete",
        "priority": "high"
    }
    response = client.post('/tasks', json=task)
    assert response.status_code == 201
    assert 'task_id' in response.get_json()


def test_blank_desc(client):
    task = {
        "title": "Test Task"
    }

    response = client.post('/tasks', json=task)
    data = response.get_json()

    assert response.status_code == 201

    task_id = data['task_id']
    get_response = client.get(f'/tasks/{task_id}')
    task_data = get_response.get_json()
    
    assert task_data["description"] == ""
    assert task_data["status"] == "incomplete"