from fastapi.testclient import TestClient
from fastapi import status

def test_get_feedstock_with_missing_token(client: TestClient):
  response = client.get('/feedstocks')
  assert response.status_code == status.HTTP_401_UNAUTHORIZED
  assert response.headers["content-type"] == "application/json"
  assert response.json() == {
    'detail': 'Authorization token is missing' 
  }

def test_get_feedstock_with_expired_token(client: TestClient):
  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0MDgwMmNhNy1lYmRhLTQ4NzctOGUzOC0xZTQ1NTZiYmUyYTAiLCJyb2xlIjoiQURNSU4iLCJleHAiOjE3NTQxNjUzMjh9.VYd3VStVQ4vu3C5HFsd_xyFToldocfFF57Hc5sIIRs0'
  response = client.get('/feedstocks', headers={ "Authorization": f'Bearer {token}'})
  assert response.status_code == status.HTTP_401_UNAUTHORIZED
  assert response.headers["content-type"] == "application/json"
  assert response.json() == {
    'detail': 'Invalid or expired token' 
  }
