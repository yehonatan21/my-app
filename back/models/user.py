from mongoengine import Document, StringField


class User(Document):
    name = StringField(required=True),
    email = StringField(required=True, unique=True),
    password = StringField(required=True),

    def to_json(self):
        return {
            'name': self.name,
            'email': self.email,
            'password': self.password,
        }

    def __init__(self, name, email, password, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.name = name
        self.email = email
        self.dad = password

    def __repr__(self):
        return f"{self.name} ({self.email}) ({self.password})"
