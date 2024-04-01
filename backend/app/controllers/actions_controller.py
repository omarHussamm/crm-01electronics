from sqlmodel import Session, select
from app.schemas import Client,Lead
from fastapi import HTTPException

def client_exists(email:str, session: Session):
    client = session.execute(select(Client).where(Client.email == email)).scalars().all()
    if(len(client)>0):
        raise HTTPException(status_code=400, detail=f"Client with email {email} already exists")

def lead_exists(email:str, session: Session):
    lead = session.execute(select(Lead).where(Lead.email == email)).scalars().all()
    if(len(lead)>0):
        raise HTTPException(status_code=400, detail=f"Lead with email {email} already exists")
    
def validate_meeting(user_id: int, client_id: int, session: Session):
    client = session.execute(select(Client).where(Client.id == client_id)).scalars().one_or_none()
    if not client:
        raise HTTPException(status_code=400, detail=f"Invalid Client id")
    if(client.user_id!= user_id):
        raise HTTPException(status_code=400, detail=f"This Client is not yours")