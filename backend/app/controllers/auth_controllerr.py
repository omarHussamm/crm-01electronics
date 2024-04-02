from typing import Optional
from fastapi import Depends, HTTPException, status
from sqlmodel import Session, select
from datetime import datetime, timedelta, timezone
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType

from app.db import get_session
from app.schemas import User

import os

SECRET_KEY = os.environ['SECRET_KEY']
ALGORITHM = os.environ['ALGORITHM']

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def authenticate_user(email: str, password: str, session: Session):
        results = session.execute(select(User).where(User.email == email))
        user = results.scalars().first()

        if not user:
            return False
        if not verify_password(password, user.password):
            return False
        return user

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=30)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_current_user(token: str = Depends(oauth2_scheme), session: Session = Depends(get_session)) -> User:
        credentials_exception = HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        ) 
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            email: str = payload.get("sub")
            if email is None:
                raise credentials_exception
        except JWTError:
            raise credentials_exception
        results = session.query(User).filter(User.email == email)
        user = results.first()
        if user is None:
            raise credentials_exception
        return user


mail_conf = ConnectionConfig(
    MAIL_USERNAME = os.environ['MAIL_USERNAME'],
    MAIL_PASSWORD = os.environ['MAIL_PASSWORD'],
    MAIL_FROM = 'electronics.01.crm@gmail.com',
    MAIL_PORT = 587,
    MAIL_SERVER = 'smtp.gmail.com',
    MAIL_FROM_NAME = '01 electronics',
    MAIL_STARTTLS = True,
    MAIL_SSL_TLS = False,
    USE_CREDENTIALS = True,
    VALIDATE_CERTS = True
)