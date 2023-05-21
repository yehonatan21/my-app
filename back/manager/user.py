import string
from typing import List, Dict
from models.user import User
import bcrypt

from models.user import User as user_repo


class UserManager:
    @staticmethod
    def create_user_to_db(user: User) -> User:
        return user_repo(name=user.name,
                         email=user.email,
                         password=bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt())).save().to_json()

    @staticmethod
    def get_user_by_id(user_id: string) -> User | None:
        return user_repo.objects.get(id=user_id).to_json()

    @staticmethod
    def get_user_by_email(user_email: string) -> User | None:
        return user_repo.objects.get(email=user_email).to_json()

    @staticmethod
    def get_all_users_db() -> List[user_repo] | None:
        return [user.to_json() for user in user_repo.objects()]

    @staticmethod
    def delete_user(name: string) -> User | None:
        return user_repo.objects.get(name=name).delete()
