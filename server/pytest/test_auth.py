from fastapi.testclient import TestClient
from fastapi import status
from typing import List

def test_login(client: TestClient):
  response = client.post('/auth/login')
  assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
  assert response.headers["content-type"] == "application/json"

def test_login_with_wrong_credentials(client: TestClient):
  response = client.post('/auth/login', json={ "email": "admintest@example.com", "password": "wrongpassword"})
  assert response.status_code == status.HTTP_401_UNAUTHORIZED
  assert response.headers["content-type"] == "application/json"

def test_login(client: TestClient):
  response = client.post('/auth/login', json={ "email": "admintest@example.com", "password": "fakepassword"})
  assert response.status_code == status.HTTP_200_OK
  assert response.headers["content-type"] == "application/json"