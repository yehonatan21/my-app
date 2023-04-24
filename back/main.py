from fastapi import FastAPI
from mongoengine import connect

from routers.user import router as users_router
from routers.auth import router as auth_router

app = FastAPI()

app.include_router(users_router, prefix='/user')
app.include_router(auth_router, prefix='/auth')


def connect_to_db(db='Reco', host='127.0.0.1', port=27017):
    client = connect(db=db, host=host, port=port)
    print('Connected Successfully')
    return client


connect_to_db(db='Reco', host='127.0.0.1', port=27017)
