from fastapi import APIRouter
from pydantic import BaseModel


class User(BaseModel):
    name: str
    email: str
    password: str


router = APIRouter()


@router.get("/", tags=["users"])
async def read_users():
    return [{"username": "Rick"}, {"username": "Morty"}]


@router.get("/{user_id}", tags=["users"])
async def read_user(user_id: str):
    return {"user_id": user_id}


@router.post("/create", tags=["users"])
async def create_user(user: User):
    return user


@router.post("/{user_id}/create_post", tags=["users"])
async def create_user(user_id: str):
    return {"Implement Creating post user"}


@router.delete("/{user_id}/delete", tags=["users"])
async def delete_user(user_id: str):
    return {"Implement Deleting user"}


@router.delete("/{user_id}/delete_post", tags=["users"])
async def delete_user(user_id: str):
    return {"Implement Deleting user"}
