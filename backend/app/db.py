from sqlmodel import create_engine, Session
import os

engine = create_engine(
    os.environ['DATABASE_URL'],
    echo=True  # Log generated SQL
)

def get_session():
    with Session(engine) as session:
        yield session 