from fastapi import APIRouter
from schemas.mail import Mail

from services.mail import MailServices

router = APIRouter()


@router.get("/", tags=["mail"])
async def read_mails():
    return MailServices.get_all()


@router.get("/{id}", tags=["mail"])
async def read_mails(_id):
    return MailServices.get_mail_by_id(_id)


# @router.get("/{user_id}", tags=["mail"])
# async def read_mail(user_id: str):
#     # return UserServices.get_mail_by_id(user_id)


@router.post("/create", tags=["mail"])
async def create_mail(mail: Mail):
    return MailServices.create_mail(mail)


@router.delete("/delete/{mail_id}", tags=["mail"])
async def delete_user(mail_id: str):
    # return {"message": f"Mail with id {mail_id} deleted successfully."}
    return MailServices.delete_mail(mail_id)


@router.delete("/delete/", tags=["mail"])
async def delete_user(mail_id: str) -> dict:
    return {"message": "All Emails deleted successfully."}
