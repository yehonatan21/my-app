from typing import Dict

from manager.user import UserManager


class UserServices:
    @staticmethod
    def create_user(user: Dict):
        return UserManager.create_user_to_db(user)

    @staticmethod
    def get_all():
        return UserManager.get_all_users_db()

    @staticmethod
    def get_user_by_id(user_id):
        return UserManager.get_user_by_id(user_id)
