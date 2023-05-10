from fastapi import APIRouter, Request
from typing import Dict
from schemas.mail import Mail
from fastapi import FastAPI, Body, Depends
from auth.auth_bearer import JWTBearer

from services.mail import MailServices

router = APIRouter()


@router.get("/", dependencies=[Depends(JWTBearer())], tags=["mail"])
async def read_mails():
    return MailServices.get_all()


@router.get("/{id}", dependencies=[Depends(JWTBearer())], tags=["mail"])
async def read_mails(_id):
    return MailServices.get_mail_by_id(_id)


# @router.get("/{user_id}", tags=["mail"])
# async def read_mail(user_id: str):
#     # return UserServices.get_mail_by_id(user_id)


@router.post("/create", dependencies=[Depends(JWTBearer())], tags=["mail"])
async def create_mail(mail: Mail):
    return MailServices.create_mail(mail)


@router.delete("/delete/{mail_id}", dependencies=[Depends(JWTBearer())], tags=["user"])
async def delete_user(mail_id: str):
    # return {"message": f"Mail with id {mail_id} deleted successfully."}
    return MailServices.delete_mail(mail_id)


@router.delete("/delete/", dependencies=[Depends(JWTBearer())], tags=["user"])
async def delete_user(mail_id: str):
    return {"message": "All Emails deleted successfully."}
