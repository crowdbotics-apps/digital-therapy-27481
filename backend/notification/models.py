from datetime import datetime, timedelta
from django.db import models
from core.models import TimestampModel
from model_utils import Choices


class NotificationQuerySet(models.query.QuerySet):
    ''' Notification QuerySet '''

    def create_send_push_notification(self, title, description, recipient, sender, level='alert'):
        return self.model(
            title=title,
            description=description,
            recipient=recipient,
            sender=sender,
            level=level
        )

    def unsent(self):
        return self.filter(notified=False)

    def sent(self):
        return self.filter(emailed=True)

    def unread(self, include_deleted=False):

        # When SOFT_DELETE=False, developers are supposed NOT to touch 'deleted' field.
        # In this case, to improve query performance, don't filter by 'deleted' field
        return self.filter(unread=True)

    def read(self, include_deleted=False):
        # When SOFT_DELETE=False, developers are supposed NOT to touch 'deleted' field.
        # In this case, to improve query performance, don't filter by 'deleted' field
        return self.filter(unread=False)

    def mark_all_as_read(self, recipient=None):
        """Mark as read any unread messages in the current queryset.
        Optionally, filter these by recipient first.
        """
        # We want to filter out read ones, as later we will store
        # the time they were marked as read.
        qset = self.unread(True)
        if recipient:
            qset = qset.filter(recipient=recipient)

        return qset.update(unread=False)

    def mark_all_as_unread(self, recipient=None):
        """Mark as unread any read messages in the current queryset.
        Optionally, filter these by recipient first.
        """
        qset = self.read(True)

        if recipient:
            qset = qset.filter(recipient=recipient)

        return qset.update(unread=True)

    def deleted(self):
        """Return only deleted items in the current queryset"""
        return self.filter(deleted=True)


class Notification(TimestampModel):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    deleted = models.BooleanField(default=False, db_index=True)
    notified = models.BooleanField(default=False, db_index=True)
    unread = models.BooleanField(default=True, blank=False, db_index=True)
    recipient = models.ForeignKey(
        'users.User',
        blank=False,
        related_name='notifications',
        on_delete=models.CASCADE
    )
    sender = models.ForeignKey(
        'users.User',
        blank=True,
        null=True,
        related_name='notifications_sender',
        on_delete=models.CASCADE
    )
    LEVELS = Choices('explain', 'info', 'sent', 'resolved')
    level = models.CharField(choices=LEVELS, default=LEVELS.info, max_length=20)

    objects = NotificationQuerySet.as_manager()

    class Meta:
        ordering = ('-created_on',)
        # speed up notifications count query
        index_together = ('recipient', 'unread')

    def timesince(self, now=None):
        """
        Shortcut for the ``django.utils.timesince.timesince`` function of the
        current timestamp.
        """
        # Get today's date
        today = datetime.now()  # or presentday = datetime.today()

        # Get Yesterday
        yesterday = today - timedelta(1)

        created_on = self.created_on.strftime('%B %d, %Y')

        # Get Tomorrow
        if yesterday.strftime('%B %d, %Y') == created_on:
            return 'Yesterday'
        if created_on == today.strftime('%B %d, %Y'):
            return 'Today'
        return created_on

    def mark_as_read(self):
        if self.unread:
            self.unread = False
            self.save()
