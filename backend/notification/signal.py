from django.dispatch import Signal, receiver
from core.onesignal.onesignal import onesignal
from notification.models import Notification

notification_saved = Signal(providing_args=['notification'])


@receiver(notification_saved)
def notification_receiver(**kwargs):
    print('Notification signal ')
    # send a push notification to recipient if they have allowed and has onesignal connected
    notification: Notification = kwargs.get('notification')
    if notification.recipient.onesignal_user_id and notification.recipient.allow_push_notification:
        body = {"include_player_ids": [notification.recipient.onesignal_user_id],
                "contents": {"en": notification.description}}
        onesignal.create_notification(body)

    print(kwargs)
