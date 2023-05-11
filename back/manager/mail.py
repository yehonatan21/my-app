import string
from typing import List, Dict
from models.mail import Mail

from models.mail import Mail as Mail_repo


class MailManager:
    @staticmethod
    def create_mail(mail: Mail) -> Dict:
        return Mail_repo(
            sender=mail.sender,
            recipient=mail.recipient,
            subject=mail.subject,
            body=mail.body,
        ).save().to_dict()

    @staticmethod
    def get_mail_by_id(mail_id: string):
        return Mail_repo.objects.get(id=mail_id).to_json()

    @staticmethod
    def get_mail_by_email(mail_email: string) -> Mail:
        return Mail_repo.objects.get(email=mail_email).to_json()

    @staticmethod
    def get_all_mails() -> List[Mail_repo]:
        return [mail.to_json() for mail in Mail_repo.objects()]

    @staticmethod
    def delete_mail(mail_id: string) -> Dict | None:
        return Mail_repo.objects(_id=mail_id).delete()
