from typing import Dict
from models.mail import Mail

from manager.mail import MailManager


class MailServices:
    @staticmethod
    def create_mail(mail: Dict):
        return MailManager.create_mail(mail)

    @staticmethod
    def get_all():
        return MailManager.get_all_mails()

    @staticmethod
    def get_mail_by_id(mail_id):
        return MailManager.get_mail_by_id(mail_id)

    @staticmethod
    def get_mail_by_email(mail_email):
        try:
            return MailManager.get_mail_by_email(mail_email)
        except:
            return None
