from fastapi import FastAPI
from app.routers import auth_routes
from sqlmodel import SQLModel
from fastapi.middleware.cors import CORSMiddleware

from app.db import engine 

app = FastAPI()

app.include_router(auth_routes.router)

origins = [
    "http://localhost:3000",
    "http://frontend:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    SQLModel.metadata.create_all(engine)

@app.get("/")
def hello_api():
    return {"Message":"Welcome to 01electonics CRM "} 