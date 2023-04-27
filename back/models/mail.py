from mongoengine import Document, StringField


class Mail(Document):
    sender = StringField(required=True)
    recipient = StringField(required=True)
    subject = StringField(required=True)
    body = StringField(required=True)

    def to_json(self):
        return {
            'sender': self.sender,
            'recipient': self.recipient,
            'subject': self.subject,
            'body': self.body,
        }
