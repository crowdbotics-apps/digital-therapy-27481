from django.contrib.auth import get_user_model
from django.db import models
from datetime import datetime, timedelta
from home.models import DateTimeInfo
from .enums import CategoryEnum

User = get_user_model()

Categories_enum = (
    (CategoryEnum.couple.name, CategoryEnum.couple.value),
    (CategoryEnum.family.name, CategoryEnum.family.value),
    (CategoryEnum.friend.name, CategoryEnum.friend.value),
    (CategoryEnum.self.name, CategoryEnum.self.value),
)


class Conversation(DateTimeInfo):
    category = models.CharField('Category', choices=Categories_enum, default=CategoryEnum.couple.value,
                                max_length=25)
    person_from = models.ForeignKey(
        User, related_name='conversation_from', on_delete=models.CASCADE)
    person_to = models.ForeignKey(
        User, related_name="conversation_to", on_delete=models.CASCADE, null=True, blank=True)
    topic = models.CharField(max_length=350)
    invited_email = models.CharField(max_length=125, null=True, blank=True)

    def timesince(self, now=None):
        """
        Shortcut for the ``django.utils.timesince.timesince`` function of the
        current timestamp.
        """
        # Get today's date
        today = datetime.now()  # or presentday = datetime.today()

        # Get Yesterday
        yesterday = today - timedelta(1)

        created_on = self.created_at.strftime('%B %d, %Y')

        # Get Tomorrow
        if yesterday.strftime('%B %d, %Y') == created_on:
            return 'Yesterday'
        if created_on == today.strftime('%B %d, %Y'):
            return 'Today'
        return created_on

    class Meta:
        ordering = ('-id',)


class Item(DateTimeInfo):
    conversation = models.ForeignKey(
        'Conversation', related_name='items', on_delete=models.CASCADE)
    speaker = models.ForeignKey(
        User, related_name='speaker_item', on_delete=models.CASCADE)
    listener = models.ForeignKey(
        User, related_name='listener_item', on_delete=models.CASCADE)
    argument = models.BooleanField(default=True)
    video = models.FileField()
    resolved = models.BooleanField(default=False)

    def timesince(self, now=None):
        """
        Shortcut for the ``django.utils.timesince.timesince`` function of the
        current timestamp.
        """
        # Get today's date
        today = datetime.now()  # or presentday = datetime.today()

        # Get Yesterday
        yesterday = today - timedelta(1)

        created_on = self.created_at.strftime('%B %d, %Y')

        # Get Tomorrow
        if yesterday.strftime('%B %d, %Y') == created_on:
            return 'Yesterday'
        if created_on == today.strftime('%B %d, %Y'):
            return 'Today'
        return created_on
