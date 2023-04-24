import bcrypt
from typing import Dict
from models.user import User

from manager.user import UserManager


class UserServices:
    @staticmethod
    def create_user(user: Dict):
        return UserManager.create_user_to_db(user)

    def connect_user(data: Dict) -> bool:
        user: User = UserManager.get_user_by_email(data['email'])
        plain_password: str = data['password']

        return bcrypt.checkpw(plain_password.encode('utf-8'), user['password'].encode('utf-8'))

    @staticmethod
    def get_all():
        return UserManager.get_all_users_db()

    @staticmethod
    def get_user_by_id(user_id):
        return UserManager.get_user_by_id(user_id)

    @staticmethod
    def get_user_by_email(user_email):
        try:
            return UserManager.get_user_by_email(user_email)
        except:
            return None
