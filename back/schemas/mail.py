from pydantic import BaseModel


class Mail(BaseModel):
    # _id: str
    sender: str
    recipient: str
    subject: str
    body: str
