from pydantic import BaseModel


class Post(BaseModel):
    sender: str
    recipient = str
    subject = str
    body = str
