from fastapi import Depends, APIRouter,HTTPException
from datetime import timedelta
from app.schemas import SignInInput, SignUpInput, ForgotPasswordInput, User, MessageResponse, TokenJson
from app.controllers.auth_controllerr import authenticate_user, get_password_hash, create_access_token
import random
from app.db import get_session
from sqlmodel import Session, select

router = APIRouter(prefix="/auth")

ACCESS_TOKEN_EXPIRE_MINUTES = 43200

@router.get("/users", response_model=list[User])
def get_users(session: Session = Depends(get_session)):
    result = session.execute(select(User))
    users = result.scalars().all()
    return users

@router.post("/signin", response_model = TokenJson)
def sign_in(user: SignInInput, session: Session = Depends(get_session)) -> TokenJson:
    signed_in_user = authenticate_user(user.email, user.password, session)

    if not signed_in_user:
        raise HTTPException(status_code=400, detail=f"incorrect email or password")
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"token": access_token, "token_type": "bearer"}

@router.post("/signup", response_model = MessageResponse)
def sign_in(user: SignUpInput, session: Session = Depends(get_session)) -> MessageResponse:
    email_exists = session.execute(select(User).where(User.email == user.email)).scalars().all()
    if(len(email_exists)>0):
         raise HTTPException(status_code=400, detail=f"email {user.email} already exists")
    
    hashed_password = get_password_hash(user.password)
    new_user = User(name= user.name, email = user.email, password = hashed_password, id=random.randint(10,1000000000) )
    session.add(new_user)
    session.commit()
    session.refresh(new_user)
    return MessageResponse(message = "You created an account successfully")

@router.post("/forgotpassword", response_model = MessageResponse)
def sign_in(user: ForgotPasswordInput) -> MessageResponse:
    _= user.email
    return MessageResponse(message= "If this email is registered please check it to change your password")