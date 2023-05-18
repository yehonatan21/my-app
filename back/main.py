import os
import ssl
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.params import Depends
from dotenv import load_dotenv
from mongoengine import connect
from auth.auth_bearer import JWTBearer
from routers.user import router as users_router
from routers.auth import router as auth_router
from routers.mail import router as mail_router
from fastapi.middleware.httpsredirect import HTTPSRedirectMiddleware

# from utils import logger

load_dotenv()

DB_IP = os.getenv('DB_IP')
DB_PORT = int(os.getenv('DB_PORT'))


def connect_to_db(db='Reco', host='127.0.0.1', port=27017):
    client = connect(db=db, host=host, port=port)
    return client


connect_to_db(db='Reco', host=DB_IP, port=DB_PORT)

origins = [
    "*"
    "http://localhost"
    "http://localhost:8000"
]

app = FastAPI()

ssl_context = ssl.create_default_context(ssl.Purpose.CLIENT_AUTH)
ssl_context.load_cert_chain(
    certfile="./ssl/self-signed.crt", keyfile="./ssl/self-signed.key")

app.add_middleware(HTTPSRedirectMiddleware)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users_router, prefix='/api/user')
app.include_router(auth_router, prefix='/api/auth')
app.include_router(mail_router, dependencies=[
    Depends(JWTBearer())], prefix='/api/mail')


@app.get("/hello", tags=["hello"])
async def read_mails():
    return {"hello": "world"}
