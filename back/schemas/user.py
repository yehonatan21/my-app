from pydantic import BaseModel, Field, EmailStr


class User(BaseModel):
    name: str
    email: str
    password: str


class UserLoginSchema(BaseModel):
    email: EmailStr = Field(...)
    password: str = Field(...)
