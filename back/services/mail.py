from typing import List

from models.mail import Mail

from manager.mail import MailManager


class MailServices:
    @staticmethod
    def create_mail(mail: Mail) -> Mail:
        return MailManager.create_mail(mail)

    @staticmethod
    def get_all() -> List[Mail]:
        return MailManager.get_all_mails()

    @staticmethod
    def get_mail_by_id(mail_id) -> Mail:
        return MailManager.get_mail_by_id(mail_id)

    @staticmethod
    def delete_mail(mail_id) -> Mail | None:
        return MailManager.delete_mail(mail_id)
