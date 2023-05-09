from datetime import datetime, timedelta
from typing import Annotated

from starlette.responses import JSONResponse

from services.user import UserServices

from fastapi import Depends, APIRouter, HTTPException, status, Request, Cookie
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel
from decouple import config

SECRET_KEY = config("secret")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None


class User(BaseModel):
    name: str
    email: str
    password: str
    disabled: bool | None = None


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

router = APIRouter()


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_user(username: str) -> User | None:
    user = UserServices.get_user_by_email(username)
    if user:
        return User(**user)
    else:
        return None


def authenticate_user(email: str, password: str):
    user = UserServices.get_user_by_email(email)
    if not user:
        return False
    if not verify_password(password, user["password"]):
        return False
    return user


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = get_user(username=token_data.username)
    if user is None:
        raise credentials_exception
    return user


async def get_current_active_user(
        current_user: Annotated[User, Depends(get_current_user)]
):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


# @router.post("/token", tags=['auth'], response_model=Token)ss
# async def login_for_access_token(
#         form_data: Annotated[OAuth2PasswordRequestForm, Depends()]
# ):
#     user = authenticate_user(
#         form_data.username, form_data.password)
#     if not user:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Incorrect username or password",
#             headers={"WWW-Authenticate": "Bearer"},
#         )
#     access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
#     access_token = create_access_token(
#         data={"sub": user["email"]}, expires_delta=access_token_expires
#     )
#     return {"access_token": access_token, "token_type": "bearer"}


@router.get("/users/me/", tags=['auth'], response_model=User)
async def read_users_me(
        current_user: Annotated[User, Depends(get_current_active_user)]
):
    return current_user


@router.get("/get_token")
async def read_cookie(request: Request, token: str = Cookie(None)):
    if token:
        return {"token": token}
    elif request.cookies:
        cookies = request.cookies
        if "access-token" in cookies:
            token = cookies["access-token"]
            user = await get_current_user(token)
            return {"token": token, "user": user}
    elif request.headers:
        headers = request.headers
        if "authorization" in headers:
            token = headers["authorization"]
            user = await get_current_user(token)
            return {"token": token, "user": user}
    else:
        return JSONResponse(status_code=status.HTTP_404_NOT_FOUND, content={"token": "not found"})

        # return status{"token": "not found"}
