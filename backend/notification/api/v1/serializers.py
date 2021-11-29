from django.db import transaction
from rest_framework import serializers

from core.utils import update_object
from notification.models import Notification
from notification.signal import notification_saved


class NotificationSerializer(serializers.ModelSerializer):
    sender = serializers.SerializerMethodField(required=False)
    timesince = serializers.SerializerMethodField()

    class Meta:
        model = Notification
        fields = "__all__"

    def get_timesince(self, instance):
        return instance.timesince()

    def get_sender(self, instance):
        if instance.sender:
            return {'id': instance.sender.id}
        return {}

    @transaction.atomic()
    def update(self, instance, validated_data):
        updated_instance = update_object(instance, validated_data)
        return updated_instance

    @transaction.atomic()
    def create(self, validated_data):
        profile = self.context.get('profile')
        instance = update_object(Notification(sender=profile), validated_data)
        notification_saved.send(sender=Notification, notification=instance)
        return instance
