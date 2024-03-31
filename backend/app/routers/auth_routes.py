from fastapi import Depends, APIRouter,HTTPException
from app.schemas import SignInInput, SignUpInput, ForgotPasswordInput, User
import random
from app.db import get_session
from sqlmodel import Session, select

router = APIRouter(prefix="/auth")

@router.get("/users", response_model=list[User])
def get_users(session: Session = Depends(get_session)):
    result = session.execute(select(User))
    users = result.scalars().all()
    return users

@router.post("/signin", response_model = SignInInput)
def sign_in(user: SignInInput, session: Session = Depends(get_session)) -> User:
    signed_in_user = session.execute(select(User).where(User.email == user.email, User.password == user.password)).scalars().one()
    return signed_in_user

@router.post("/signup", response_model = User)
def sign_in(user: SignUpInput, session: Session = Depends(get_session)) -> User:
    email_exists = session.execute(select(User).where(User.email == user.email)).scalars().all()
    if(len(email_exists)>0):
         raise HTTPException(status_code=400, detail=f"email {user.email} already exists.")
    
    new_user = User(name= user.name, email = user.email, password = user.password, id=random.randint(10,1000000000) )
    session.add(new_user)
    session.commit()
    session.refresh(new_user)
    return new_user

@router.post("/forgotpassword")
def sign_in(user: ForgotPasswordInput):
    _= user.email
    return {"message": "If this email is registered please check it to change your password."}