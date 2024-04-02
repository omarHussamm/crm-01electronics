from fastapi import Depends
from sqlmodel import Session
from app.db import get_session
from app.controllers.auth_controllerr import get_password_hash
from app.schemas import User, Meeting, Lead, Client

users = [
    {
        "name": "John Doe",
        "id" : 1,
        "email": "johndoe@gmail.com",
        "password": get_password_hash("johndoe")
    },
    {
        "name": "Jane Doe",
        "id" : 2,
        "email": "janedoe@gmail.com",
        "password": get_password_hash("janedoe")
    },
    {
        "name": "Ahmed Mohamed",
        "id" : 3,
        "email": "ahmedmohamed@gmail.com",
        "password": get_password_hash("ahmedmohamed")
    }
]

clients = [
    {
        "name": "Amir Doe",
        "id" : 4,
        "email": "amirdoe@gmail.com",
        "phone_number":"01231231231",
        "user_id": 1
    },
        {
        "name": "Khaled Doe",
        "id" : 5,
        "email": "khaleddoe@gmail.com",
        "phone_number":"01231231231",
        "user_id": 1
    },

    {
        "name": "Mariam Doe",
        "id" : 6,
        "email": "mariamdoe@gmail.com",
        "phone_number":"01231231231",
        "user_id": 1
    },

    {
        "name": "Anne Doe",
        "id" : 7,
        "email": "annedoe@gmail.com",
        "phone_number":"01231231231",
        "user_id": 2
    },

    {
        "name": "Khairy Doe",
        "id" : 8,
        "email": "khairydoe@gmail.com",
        "phone_number":"01231231231",
        "user_id": 2
    },

    {
        "name": "Karim Doe",
        "id" : 9,
        "email": "karimdoe@gmail.com",
        "phone_number":"01231231231",
        "user_id": 2
    },

    {
        "name": "Menna Doe",
        "id" : 10,
        "email": "mennadoe@gmail.com",
        "phone_number":"01231231231",
        "user_id": 3
    },

    {
        "name": "Hossam Doe",
        "id" : 11,
        "email": "hossamdoe@gmail.com",
        "phone_number":"01231231231",
        "user_id": 3
    }
]

leads = [
        {
        "name": "Amir tafeeda",
        "id" : 8 + 4,
        "email": "amirtafeeda@gmail.com",
        "phone_number":"01231231231",
    },
        {
        "name": "Khaled tafeeda",
        "id" : 8 + 5,
        "email": "khaledtafeeda@gmail.com",
        "phone_number":"01231231231",
    },

    {
        "name": "Mariam tafeeda",
        "id" : 8 + 6,
        "email": "mariamtafeeda@gmail.com",
        "phone_number":"01231231231",
    },

    {
        "name": "Anne tafeeda",
        "id" : 8 + 7,
        "email": "annetafeeda@gmail.com",
        "phone_number":"01231231231",
    },

    {
        "name": "Khairy tafeeda",
        "id" : 8 + 8,
        "email": "khairytafeeda@gmail.com",
        "phone_number":"01231231231",
    },

    {
        "name": "Karim tafeeda",
        "id" : 8 + 9,
        "email": "karimtafeeda@gmail.com",
        "phone_number":"01231231231",
    },

    {
        "name": "Menna tafeeda",
        "id" : 8 + 10,
        "email": "mennatafeeda@gmail.com",
        "phone_number":"01231231231",
    },

    {
        "name": "Hossam tafeeda",
        "id" : 8 + 11,
        "email": "hossamtafeeda@gmail.com",
        "phone_number":"01231231231",
    }
]
meetings = [
    {
        "id": 1,
        "user_id": 1,
        "date_time": "2024-04-02T17:19:00",
        "type": "Video",
        "client_id": 4,
        "duration": 34
    },
    {
        "id": 2,
        "user_id": 1,
        "date_time": "2024-04-04T06:07:00",
        "type": "Video",
        "client_id": 5,
        "duration": 45
    },
        {
        "id": 3,
        "user_id": 2,
        "date_time": "2024-04-02T17:19:00",
        "type": "Video",
        "client_id": 7,
        "duration": 34
    },
    {
        "id": 4,
        "user_id": 2,
        "date_time": "2024-04-04T06:07:00",
        "type": "Video",
        "client_id": 8,
        "duration": 45
    },
        {
        "id": 5,
        "user_id": 3,
        "date_time": "2024-04-02T17:19:00",
        "type": "Video",
        "client_id": 10,
        "duration": 34
    },
    {
        "id": 6,
        "user_id": 3,
        "date_time": "2024-04-04T06:07:00",
        "type": "Video",
        "client_id": 11,
        "duration": 45
    }
]

def populate_db( session: Session = Depends(get_session)):
    for user in users:
        session.add(User(id=user["id"], name = user["name"], email = user["email"], password = user["password"]))

    session.commit()
 
    for client in clients:
        session.add(Client(id=client["id"], name = client["name"], email = client["email"], phone_number = client["phone_number"], user_id = client["user_id"]))

    session.commit()

    for lead in leads:
        session.add(Lead(id=lead["id"], name = lead["name"], email = lead["email"], phone_number = lead["phone_number"]))

    session.commit()

    for meeting in meetings:
        session.add(Meeting(id=meeting["id"], user_id = meeting["user_id"], date_time = meeting["date_time"], type = meeting["type"], client_id = meeting["client_id"], duration = meeting["duration"])) 
 
    session.commit()
