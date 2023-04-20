from mongoengine import Document, StringField


class User(Document):
    name = StringField(required=True)
    email = StringField(required=True, unique=True)
    password = StringField(required=True)

    def to_json(self):
        return {
            'name': self.name,
            'email': self.email,
            'password': self.password,
        }
