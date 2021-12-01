from django.db import models

from core.models import TimestampModel
from core.utils import send_email_local


class Feedback(TimestampModel):
    user = models.ForeignKey('users.User', related_name='feedbacks', on_delete=models.CASCADE)
    content = models.TextField()
    email = models.EmailField()
    response = models.TextField(null=True, blank=True)

    class Meta:
        ordering = ('-id',)

    def save(self, *args, **kwargs):
        if self.response and self.email:
            send_email_local(
                subject='Feedback response',
                message=self.response,
                to_emails=[self.email]
            )


        super(Feedback, self).save(*args, **kwargs)