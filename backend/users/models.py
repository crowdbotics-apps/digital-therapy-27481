from random import randint

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.urls import reverse
from django.utils.translation import ugettext_lazy as _
from home.models import DateTimeInfo


class User(AbstractUser):
    # WARNING!
    """
    Some officially supported features of Crowdbotics Dashboard depend on the initial
    state of this User model (Such as the creation of superusers using the CLI
    or password reset in the dashboard). Changing, extending, or modifying this model
    may lead to unexpected bugs and or behaviors in the automated flows provided
    by Crowdbotics. Change it at your own risk.


    This model represents the User instance of the system, login system and
    everything that relates with an `User` is represented by this model.
    """

    # First Name and Last Name do not cover name patterns
    # around the globe.
    name = models.CharField(_("Name of User"), blank=True,
                            null=True, max_length=255)
    surname = models.CharField(max_length=250, blank=True,
                               null=True)
    age = models.PositiveIntegerField(blank=True,
                                      null=True)
    location = models.CharField(max_length=250, blank=True,
                                null=True)
    profile_picture = models.ImageField(blank=True, null=True)
    allow_push_notification = models.BooleanField(default=True)
    onesignal_user_id = models.CharField(max_length=300, default='', null=True, blank=True)

    def fullname(self):
        return f'{self.first_name} {self.last_name}'

    def get_absolute_url(self):
        return reverse("users:detail", kwargs={"username": self.username})


class Token(DateTimeInfo):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    token = models.CharField(max_length=6)

    @staticmethod
    def generate_token(digits=6):
        return ''.join("{}".format(randint(0, 9)) for _ in range(digits))

    @staticmethod
    def verify(user, token):
        token_obj = Token.objects.filter(
            user=user).order_by('-created_at').first()
        return bool(token_obj and token_obj.token == token)
