from django.core.mail import send_mail
from django.conf import settings
from twilio.rest import Client


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


def create_invite_action(user):
    """
    create accept/reject urls
    don't include the api v1 or domain name
    /api/v1/invitation/accept/{inviter_pk}/
    /api/v1/invitation/reject/{inviter_pk}/
    """
    return {
        "accept": f'invitation/accept/{user.id}/',
        "reject": f'invitation/reject/{user.id}/',
    }


def send_sms(to_number, body):
    TWILIO_SETTING = settings.TWILIO
    account_sid = TWILIO_SETTING.get('account_sid')
    auth_token = TWILIO_SETTING.get('auth_token')
    client = Client(account_sid, auth_token)
    print(account_sid, auth_token)
    try:
        client.messages.create(
            body=body,
            from_=TWILIO_SETTING.get('from_'),
            to=to_number
        )
        return True
    except Exception as e:
        print(e)
        return False
