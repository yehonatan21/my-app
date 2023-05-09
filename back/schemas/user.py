from pydantic import BaseModel, Field, EmailStr


class User(BaseModel):
    name: str
    email: str
    password: str


class UserLoginSchema(BaseModel):
    email: EmailStr = Field(...)
    password: str = Field(...)

    class Config:
        schema_extra = {
            "example": {
                "email": "a@gmail.com",
                "password": "111111"
            }
        }
