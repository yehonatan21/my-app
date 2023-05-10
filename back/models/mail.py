from mongoengine import Document, StringField, ObjectIdField
from bson import ObjectId


class Mail(Document):
    _id = ObjectIdField(default=ObjectId, required=True)
    sender = StringField(required=True)
    recipient = StringField(required=True)
    subject = StringField(required=True)
    body = StringField(required=True)

    def to_dict(self):
        return {
            'id': str(self._id),
            'sender': self.sender,
            'recipient': self.recipient,
            'subject': self.subject,
            'body': self.body,
        }

    def to_json(self):
        return {
            'id': str(self._id),
            'sender': self.sender,
            'recipient': self.recipient,
            'subject': self.subject,
            'body': self.body,
        }
