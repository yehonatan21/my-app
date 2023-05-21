from typing import List

from fastapi import Body, Depends, APIRouter, Response, HTTPException
import bcrypt
from fastapi_login import LoginManager

from auth.auth_bearer import JWTBearer
from schemas.user import User, UserLoginSchema
from services.user import UserServices
from auth.auth_handler import signJWT
from decouple import config

JWT_SECRET = config("secret")

router = APIRouter()
manager = LoginManager(JWT_SECRET, token_url='/auth/token')


@router.get("/", dependencies=[Depends(JWTBearer())], tags=["user"])  # FIX: add return type user
async def read_users() -> List[User]:
    return UserServices.get_all()


@router.get("/{user_id}", dependencies=[Depends(JWTBearer())], tags=["user"])
async def read_user(user_id: str) -> User:
    return UserServices.get_user_by_id(user_id)


@router.delete("/{user_id}/delete", dependencies=[Depends(JWTBearer())], tags=["user"])
async def delete_user(user_id: str):
    return {"Implement Deleting user"}


@router.post("/login", tags=["user"])
async def user_login(response: Response, user: UserLoginSchema = Body(...)) -> dict:
    if check_user(user):
        token = manager.create_access_token(
            data=dict(sub=user.email)
        )
        manager.set_cookie(response, token)
        return {"message": "Cookie set successfully", "token": token}
    raise HTTPException(status_code=404, detail="Wrong login details!")


@router.post("/signup", tags=["user"])
async def create_user(user: User = Body(...)) -> dict[str, str]:
    UserServices.create_user(user)
    return signJWT(user.email)


def check_user(data: UserLoginSchema) -> bool:
    users = UserServices.get_all()

    for user in users:
        if user['email'] == data.email and bcrypt.checkpw(data.password.encode('utf-8'),
                                                          user['password'].encode('utf-8')):
            return True
    return False
