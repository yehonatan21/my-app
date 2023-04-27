from pydantic import BaseModel


class Mail(BaseModel):
    sender: str
    recipient: str
    subject: str
    body: str
