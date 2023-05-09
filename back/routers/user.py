from typing import Dict

from fastapi import Body, Depends, APIRouter, Response, Request
import bcrypt
from fastapi.params import Cookie
from fastapi_login import LoginManager

from auth.auth_bearer import JWTBearer
from schemas.user import User, UserLoginSchema
from services.user import UserServices
from auth.auth_handler import signJWT
from decouple import config

JWT_SECRET = config("secret")

router = APIRouter()
manager = LoginManager(JWT_SECRET, token_url='/auth/token')


@router.get("/", dependencies=[Depends(JWTBearer())], tags=["user"])
async def read_users():
    return UserServices.get_all()


@router.get("/{user_id}", dependencies=[Depends(JWTBearer())], tags=["user"])
async def read_user(user_id: str):
    return UserServices.get_user_by_id(user_id)


# @router.post("/update/{user_id)", tags=["users"])
# async def update_user(user_id: string):
#     return UserServices.update_user(user)


# @router.post("/{user_id}/create_post", tags=["users"])
# async def create_post(user_id: str, post: Dict):
#     return UserServices.get_user_by_id(user_id)


@router.delete("/{user_id}/delete", dependencies=[Depends(JWTBearer())], tags=["user"])
async def delete_user(user_id: str):
    return {"Implement Deleting user"}


# @router.delete("/{user_id}/delete_post", tags=["users"])
# async def delete_user(user_id: str):
#     return {"Implement Deleting user"}

# @router.get("/me", tags=["user"])
# async def get_token():
#     return {"yes": "yes"}


# @router.get("/get_token", tags=["user"])
# async def read_cookie():
#     print("hello")
#
#     # if token:
#     #     return {"token": token}
#     # else:
#
#     # cookies = request.cookies
#     #
#     # if (cookies):
#     #     return {"answer": "yes"}
#
#     # if "token" in cookies:
#     #     token = cookies["token"]
#     #     return {"token": token}
#     # else:
#     #     return {"token": "not found"}


@router.post("/login", tags=["user"])
async def user_login(response: Response, user: UserLoginSchema = Body(...)):
    if check_user(user):
        token = manager.create_access_token(
            data=dict(sub=user.email)
        )
        manager.set_cookie(response, token)
        return {"message": "Cookie set successfully", "token": token}
        # return signJWT(user.email)
    return {  # add status code
        "error": "Wrong login details!"
    }


@router.post("/signup", tags=["user"])
async def create_user(user: User = Body(...)):
    UserServices.create_user(user)
    return signJWT(user.email)


def check_user(data: UserLoginSchema):
    users = UserServices.get_all()

    for user in users:
        if user['email'] == data.email and bcrypt.checkpw(data.password.encode('utf-8'),
                                                          user['password'].encode('utf-8')):
            return True
    return False
