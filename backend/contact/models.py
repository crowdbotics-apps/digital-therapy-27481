import random
import string
from django.db import models


def generate_code():
    return ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(6))


class Contact(models.Model):
    user = models.OneToOneField('users.User', related_name='contacts', on_delete=models.CASCADE)
    invite_code = models.CharField(max_length=20, null=True, blank=True)
    friends = models.ManyToManyField('users.User', blank=True)

    def save(self, *args, **kwargs):
        if not self.invite_code:
            self.invite_code = generate_code()
        super(Contact, self).save(*args, **kwargs)
