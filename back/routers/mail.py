from fastapi import APIRouter
from typing import Dict
from schemas.mail import Mail


from services.mail import MailServices

router = APIRouter()


@router.get("/", tags=["mail"])
async def read_mails():
    return MailServices.get_all()


# @router.get("/{user_id}", tags=["mail"])
# async def read_mail(user_id: str):
#     # return UserServices.get_mail_by_id(user_id)


@router.post("/create", tags=["mail"])
async def create_mail(mail: Mail):
    return MailServices.create_mail(mail)


# @router.delete("/{user_id}/delete", tags=["user"])
# async def delete_user(user_id: str):
#     return {"Implement Deleting user"}
