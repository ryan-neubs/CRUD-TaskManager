import pytest
from server import app

@pytest.fixture
def flask_app():
    app.config['TESTING'] = True
    return app

@pytest.fixture
def client(flask_app):
    with flask_app.test_client() as client:
        yield client