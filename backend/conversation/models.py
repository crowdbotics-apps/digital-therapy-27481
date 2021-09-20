from django.contrib.auth import get_user_model
from django.db import models
from home.models import DateTimeInfo

# Create your models here.

User = get_user_model()


class Video(DateTimeInfo):
    user = models.ForeignKey(
        User, related_name='videos', on_delete=models.CASCADE)
    video = models.FileField()

    class Meta:
        verbose_name = ("Video")
        verbose_name_plural = ("Videos")

    def __str__(self):
        return self.name


class Category(models.Model):
    name = models.CharField(max_length=250)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'


class Conversation(DateTimeInfo):
    category = models.ForeignKey('Category', on_delete=models.CASCADE)
    person_to = models.ForeignKey(
        User, related_name="conversation_to", on_delete=models.CASCADE)
    person_from = models.ForeignKey(
        User, related_name='conversation_from', on_delete=models.CASCADE)
    topic = models.CharField(max_length=350)


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
