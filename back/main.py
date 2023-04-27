from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from mongoengine import connect

from routers.user import router as users_router
from routers.auth import router as auth_router
from routers.mail import router as mail_router

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:3000",
]

app = FastAPI()

app.include_router(users_router, prefix='/user')
app.include_router(auth_router, prefix='/auth')
app.include_router(mail_router, prefix='/mail')
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def connect_to_db(db='Reco', host='127.0.0.1', port=27017):
    client = connect(db=db, host=host, port=port)
    print('Connected Successfully')
    return client


connect_to_db(db='Reco', host='127.0.0.1', port=27017)
