from fastapi import Depends, APIRouter,HTTPException, Request
from datetime import timedelta
from app.schemas import SignInInput, SignUpInput, ForgotPasswordInput, User, MessageResponse, TokenJson, GetMeResponse, EmailSchema
from app.controllers.auth_controllerr import authenticate_user, get_password_hash, create_access_token,get_current_user, mail_conf
import random
import string
from fastapi_mail import FastMail, MessageSchema, MessageType
from app.db import get_session
from sqlmodel import Session, select

router = APIRouter(prefix="/auth")


ACCESS_TOKEN_EXPIRE_MINUTES = 43200

@router.get("/users", response_model=list[User])
def get_users(session: Session = Depends(get_session)) ->list[User]:
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
def sign_up(user: SignUpInput, session: Session = Depends(get_session)) -> MessageResponse:
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
async def forgot_password(email: EmailSchema, session: Session = Depends(get_session)) -> MessageResponse:
    recipients = email.dict().get("email")
    email_exists = session.execute(select(User).where(User.email == recipients[0])).scalars().one_or_none()
    if email_exists:
        new_password = ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))
        email_exists.password = get_password_hash(new_password)
        session.add(email_exists)
        html = """<p>Your new password is """ + new_password + """</p> """
        message = MessageSchema(
            subject="01 Electronics CRM Reset Password",
            recipients=recipients,
            body=html,
            subtype=MessageType.html)

        fm = FastMail(mail_conf)
        await fm.send_message(message)
        session.commit()

    return MessageResponse(message= "If this email is registered please check it to change your password")

@router.get("/me", response_model = GetMeResponse)
def get_me(req: Request, session: Session = Depends(get_session)) -> GetMeResponse:
    return get_current_user((req.headers["Authorization"]).split(' ')[1], session)

# njmn fsam uqqu wzpo
