from sqlmodel import SQLModel, Field, Enum
from datetime import datetime
from pydantic import EmailStr, BaseModel
from typing import List

import enum

class MessageResponse(SQLModel):
    message: str

class SignInInput(SQLModel):
    email: str
    password: str

class SignUpInput(SQLModel):
    name: str
    email: str
    password: str

class ForgotPasswordInput(SQLModel):
    email: str

class User(SQLModel, table=True):
    id: int = Field(nullable=False, primary_key=True)
    name: str
    email: str
    password: str

class TokenJson(SQLModel):
    token: str
    token_type: str


class GetMeResponse(SQLModel):
    name: str
    email: str

class Client(SQLModel, table=True):
    id: int = Field(nullable=False, primary_key=True)
    name: str
    email: str
    phone_number: str
    user_id: int = Field(foreign_key="user.id")

class Lead(SQLModel, table=True):
    id: int = Field(nullable=False, primary_key=True)
    name: str
    email: str
    phone_number: str

class Type(enum.Enum):
    Phone = "Phone"
    Video = "Video"

class Meeting(SQLModel, table=True):
    id: int = Field(nullable=False, primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    client_id: int = Field(foreign_key="client.id")
    date_time: datetime
    duration: int 
    type: Type

class ClientLeadInput(SQLModel):
    name: str
    email: str
    phone_number: str

class MeetingInput(SQLModel):
    client_id: int
    date_time: datetime
    duration: int 
    type: Type

class AddRemoveClientInput(SQLModel):
    id: int

class EmailSchema(BaseModel):
   email: List[EmailStr]