from fastapi import APIRouter, Request
from typing import Dict
from schemas.mail import Mail
from fastapi import FastAPI, Body, Depends
from auth.auth_bearer import JWTBearer

from services.mail import MailServices

router = APIRouter()


@router.get("/", dependencies=[Depends(JWTBearer())], tags=["mail"])
async def read_mails(request: Request):
    print(request.headers["authorization"])
    return MailServices.get_all()


# @router.get("/{user_id}", tags=["mail"])
# async def read_mail(user_id: str):
#     # return UserServices.get_mail_by_id(user_id)


@router.post("/create", dependencies=[Depends(JWTBearer())], tags=["mail"])
async def create_mail(mail: Mail):
    return MailServices.create_mail(mail)

# @router.delete("/{user_id}/delete", tags=["user"])
# async def delete_user(user_id: str):
#     return {"Implement Deleting user"}
