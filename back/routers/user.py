# import string
from typing import Dict

from fastapi import APIRouter

from schemas.user import User
from services.user import UserServices

router = APIRouter()


@router.get("/", tags=["user"])
async def read_users():
    return UserServices.get_all()


@router.get("/{user_id}", tags=["user"])
async def read_user(user_id: str):
    return UserServices.get_user_by_id(user_id)


@router.post("/login", tags=["user"])
async def connect_user(data: Dict):
    return UserServices.connect_user(data)


@router.post("/create", tags=["user"])
async def create_user(user: User):
    return UserServices.create_user(user)


# @router.post("/update/{user_id)", tags=["users"])
# async def update_user(user_id: string):
#     return UserServices.update_user(user)


# @router.post("/{user_id}/create_post", tags=["users"])
# async def create_post(user_id: str, post: Dict):
#     return UserServices.get_user_by_id(user_id)


@router.delete("/{user_id}/delete", tags=["user"])
async def delete_user(user_id: str):
    return {"Implement Deleting user"}


# @router.delete("/{user_id}/delete_post", tags=["users"])
# async def delete_user(user_id: str):
#     return {"Implement Deleting user"}
