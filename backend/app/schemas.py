from sqlmodel import SQLModel, Field, UniqueConstraint

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