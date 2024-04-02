from fastapi import Depends, APIRouter, Request, HTTPException
from app.schemas import Client, Lead, Meeting, AddRemoveClientInput, ClientLeadInput, MeetingInput, MessageResponse
from app.controllers.auth_controllerr import get_current_user
from app.controllers.actions_controller import  client_exists, lead_exists, validate_meeting
import random
from app.db import get_session
from sqlmodel import Session, select


router = APIRouter(prefix="/actions")

@router.get("/clients", response_model=list[Client])
def get_clients(req: Request, session: Session = Depends(get_session)) -> list[Client]:
    get_current_user((req.headers["Authorization"]).split(' ')[1], session) 
    result = session.execute(select(Client))
    clients = result.scalars().all()
    return clients

@router.get("/leads", response_model=list[Lead])
def get_leads(req: Request, session: Session = Depends(get_session)) -> list[Lead]:
    get_current_user((req.headers["Authorization"]).split(' ')[1], session) 
    result = session.execute(select(Lead))
    leads = result.scalars().all()
    return leads

@router.get("/meetings", response_model=list[Meeting])
def get_clients(req: Request, session: Session = Depends(get_session)) -> list[Meeting]:
    get_current_user((req.headers["Authorization"]).split(' ')[1], session) 
    result = session.execute(select(Meeting))
    meetings = result.scalars().all()
    return meetings

@router.post("/client", response_model=Client)
def create_client(client: ClientLeadInput ,req: Request, session: Session = Depends(get_session)) -> Client:
    user = get_current_user((req.headers["Authorization"]).split(' ')[1], session) 
    client_exists(client.email, session)
    new_client = Client(id=random.randint(10,1000000000), name=client.name, email= client.email, phone_number = client.phone_number, user_id= user.id)
    session.add(new_client)
    session.commit()
    session.refresh(new_client)
    return new_client

@router.post("/lead", response_model=Lead)
def create_lead(lead: ClientLeadInput ,req: Request, session: Session = Depends(get_session)) -> Lead:
    get_current_user((req.headers["Authorization"]).split(' ')[1], session)
    lead_exists(lead.email, session) 
    new_lead = Lead(id=random.randint(10,1000000000), name=lead.name, email= lead.email, phone_number = lead.phone_number)
    session.add(new_lead)
    session.commit()
    session.refresh(new_lead)
    return new_lead

@router.post("/meeting", response_model=Meeting)
def create_meeting(meeting: MeetingInput ,req: Request, session: Session = Depends(get_session)) -> Meeting:
    user = get_current_user((req.headers["Authorization"]).split(' ')[1], session) 
    validate_meeting(user.id, meeting.client_id, session)
    new_meeting = Meeting(id=random.randint(10,1000000000), user_id= user.id, client_id=meeting.client_id, date_time=meeting.date_time, duration=meeting.duration, type=meeting.type)
    session.add(new_meeting)
    session.commit()
    session.refresh(new_meeting)
    return new_meeting

@router.get("/myclients", response_model=list[Client])
def get_my_clients(req: Request, session: Session = Depends(get_session)) -> list[Client]:
    user = get_current_user((req.headers["Authorization"]).split(' ')[1], session) 
    result = session.execute(select(Client).where(Client.user_id == user.id))
    clients = result.scalars().all()
    return clients

@router.get("/mymeetings", response_model=list[Meeting])
def get_my_meetings(req: Request, session: Session = Depends(get_session)) -> list[Meeting]:
    user = get_current_user((req.headers["Authorization"]).split(' ')[1], session) 
    result = session.execute(select(Meeting).where(Meeting.user_id == user.id))
    meetings = result.scalars().all()
    return meetings

@router.post("/addclient", response_model=Client)
def add_client(input: AddRemoveClientInput, req: Request, session: Session = Depends(get_session)) -> Client:
    user = get_current_user((req.headers["Authorization"]).split(' ')[1], session)
    lead = session.execute(select(Lead).where(Lead.id == input.id)).scalars().one_or_none()
    if not lead:
        raise HTTPException(status_code=400, detail=f"Invalid Lead id")
    session.delete(lead)
    new_client = Client(id=lead.id, name=lead.name, email= lead.email, phone_number = lead.phone_number, user_id= user.id)
    session.add(new_client)
    session.commit()
    session.refresh(new_client)
    return new_client

@router.post("/removeclient", response_model=Lead)
def remove_client(input: AddRemoveClientInput, req: Request, session: Session = Depends(get_session)) -> Lead:
    user = get_current_user((req.headers["Authorization"]).split(' ')[1], session)
    client = session.execute(select(Client).where(Client.id == input.id)).scalars().one_or_none()
    if not client:
        raise HTTPException(status_code=400, detail=f"Invalid Lead id")
    if(client.user_id != user.id):
        raise HTTPException(status_code=400, detail=f"This Client is not yours")
    session.delete(client)
    new_lead = Lead(id=client.id, name=client.name, email= client.email, phone_number = client.phone_number)
    session.add(new_lead)
    session.commit()
    session.refresh(new_lead)
    return new_lead

@router.delete("/meeting/{id}", response_model=MessageResponse)
def delete_meeting(id: int, req: Request, session: Session = Depends(get_session)) -> MessageResponse:
    user = get_current_user((req.headers["Authorization"]).split(' ')[1], session)
    meeting = session.execute(select(Meeting).where(Meeting.id == id)).scalars().one_or_none()
    if not meeting:
        raise HTTPException(status_code=400, detail=f"Invalid Meeting id")
    if(meeting.user_id != user.id):
        raise HTTPException(status_code=400, detail=f"This Meeting is not yours")
    session.delete(meeting)
    session.commit()
    return MessageResponse(message= "Meeting Deleted Successfully")  