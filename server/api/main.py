from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware 
from dotenv import load_dotenv
import uvicorn
import os

from config.envs import FRONTEND_URL

from deps.db_session_dep import create_db_and_tables
from routes import auth_route, user_route, feedstock_route, product_route

from utils.dolar_api_utils import get_dolar_current_price

load_dotenv()

app = FastAPI(
  lifespan=create_db_and_tables, 
  title="Cotzia", 
  description="The endpoinst documentation", 
  version="1.0.0"
)

app.add_middleware(
  CORSMiddleware,
  allow_origins=[FRONTEND_URL],
  allow_credentials=True,
  allow_methods=["HEAD", "GET", "POST", "PUT", "DELETE"],
  allow_headers=["*"],
)

app.include_router(auth_route.router)
app.include_router(user_route.router)
app.include_router(feedstock_route.router)
app.include_router(product_route.router)

@app.get("/")
def root():
  get_dolar_current_price()
  return {"message": "API is running 🚀"}

if __name__ == "__main__":
  environment = os.getenv("ENVIRONMENT")
  uvicorn.run(
    "main:app",
    host="0.0.0.0",
    port=3000,
    reload=(environment == "development"),
    use_colors=True
  )