from fastapi import FastAPI, Depends
from app.routers import auth_routes, actions_routes
from sqlmodel import SQLModel, Session
from fastapi.middleware.cors import CORSMiddleware
from app.data import populate_db

from app.db import engine, get_session

app = FastAPI()


app.include_router(auth_routes.router)
app.include_router(actions_routes.router)

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

@app.post("/populatedb")
def populate(session: Session = Depends(get_session)):
    populate_db(session)
