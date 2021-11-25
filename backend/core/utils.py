from django.core.mail import send_mail
from django.conf import settings


def update_object(instance, data):
    """
    Update any model instance with data
    :param instance: Model instance
    :param data: dictionary containing model fields as keys and values as value
    :return: model instance
    """
    for key, value in data.items():
        setattr(instance, key, value)
    instance.save()
    return instance


def send_invitation_code(user, invite_code, to_email):
    send_email_local(
        subject='Get Resolve App',
        message=f'{user.email} sent you a Resolve invitation code. Follow this link to download the app https://digital-therapy-27481.botics.co/. '
                f'Please use {invite_code} invitation code when signing in the app to be automatically added into the {user.email} contact list.',

        to_emails=[to_email],
    )


def send_email_local(subject, message, to_emails: list):
    return send_mail(
        subject,
        message,
        settings.DEFAULT_FROM_EMAIL,
        to_emails,
        fail_silently=False,
    )
