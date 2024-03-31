from sqlmodel import SQLModel, Field
from typing import Optional

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
    id: int = Field(default=None, nullable=False, primary_key=True)
    name: str
    email: str
    password: str

class Token(SQLModel):
    access_token: str
    token_type: str

class TokenJson(SQLModel):
    token: str
    token_type: str

class TokenData(SQLModel):
    username: Optional[str] = None