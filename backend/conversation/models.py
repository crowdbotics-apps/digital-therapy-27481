from django.contrib.auth import get_user_model
from django.db import models
from datetime import datetime, timedelta
from home.models import DateTimeInfo
from .enums import CategoryEnum, ItemTypeEnum, ItemStatusEnum

User = get_user_model()

Categories_enum = (
    (CategoryEnum.couple.name, CategoryEnum.couple.value),
    (CategoryEnum.family.name, CategoryEnum.family.value),
    (CategoryEnum.friend.name, CategoryEnum.friend.value),
    (CategoryEnum.self.name, CategoryEnum.self.value),
)

ItemType_enum = (
    (ItemTypeEnum.main.name, ItemTypeEnum.main.value),
    (ItemTypeEnum.response.name, ItemTypeEnum.response.value),
    (ItemTypeEnum.opinion.name, ItemTypeEnum.opinion.value),
)

ItemStatus_enum = (
    (ItemStatusEnum.sent.name, ItemStatusEnum.sent.value),
    (ItemStatusEnum.replied.name, ItemStatusEnum.replied.value),
    (ItemStatusEnum.confirmed.name, ItemStatusEnum.confirmed.value),
    (ItemStatusEnum.not_confirmed.name, ItemStatusEnum.not_confirmed.value),
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
    resolved = models.BooleanField(default=False)

    def can_resolve(self):
        if self.resolved:
            return False
        last_item = self.items.filter(owner=self.person_from).first()
        if last_item:
            return self.items.filter(
                status=ItemStatusEnum.confirmed.name).count() > 1 and last_item.status in [
                       ItemStatusEnum.confirmed.value, ItemStatusEnum.confirmed.name]
        return False

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
    owner = models.ForeignKey(
        User, related_name='owner_item', on_delete=models.CASCADE, blank=True, null=True)

    speaker = models.ForeignKey(
        User, related_name='speaker_item', on_delete=models.CASCADE, blank=True, null=True)
    listener = models.ForeignKey(
        User, related_name='listener_item', on_delete=models.CASCADE, blank=True, null=True)

    status = models.CharField('Status', choices=ItemStatus_enum, default=ItemStatusEnum.sent.value,
                              max_length=25)

    video = models.FileField(blank=True, null=True)

    class Meta:
        ordering = ('-id',)

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
