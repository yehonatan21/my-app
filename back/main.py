import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.params import Depends
from dotenv import load_dotenv
from mongoengine import connect
from auth.auth_bearer import JWTBearer
from routers.user import router as users_router
from routers.auth import router as auth_router
from routers.mail import router as mail_router
from utils import logger

load_dotenv()

DB_IP = os.getenv('DB_IP')
DB_PORT = int(os.getenv('DB_PORT'))


def connect_to_db(db='Reco', host='127.0.0.1', port=27017):
    client = connect(db=db, host=host, port=port)
    # logger.info('Connected Successfully')
    return client


connect_to_db(db='Reco', host=DB_IP, port=DB_PORT)

# BUG: how to fix it to be cross over all origins
origins = [
    "http://localhost:8081"
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(users_router, prefix='/user')
app.include_router(auth_router, prefix='/auth')
app.include_router(mail_router, dependencies=[
    Depends(JWTBearer())], prefix='/mail')


@app.get("/hello", tags=["hello"])
async def read_mails():
    return {"hello": "world"}

# logger.info("Trying to connect")
