from fastapi import FastAPI
from backend.app.routers import auth_routes
from sqlmodel import SQLModel

from app.db import engine 

app = FastAPI()

app.include_router(auth_routes.router)

@app.on_event("startup")
def on_startup():
    SQLModel.metadata.create_all(engine)

@app.get("/")
def hello_api():
    return {"Message":"Welcome to 01electonics CRM "} 