from home.api.v1.serializers import UserSerializer
from rest_framework import serializers

from notification.models import Notification
from notification.signal import notification_saved
from .models import Conversation, Item


class ItemSerializer(serializers.ModelSerializer):
    speaker = UserSerializer(read_only=True)
    listener = UserSerializer(read_only=True)
    should_resolve = serializers.SerializerMethodField(read_only=True)
    resolved = serializers.BooleanField(read_only=True)

    def get_should_resolve(self, obj):
        response = obj.conversation.items.filter(argument=False).first()
        return bool(obj.argument and (not response or not response.resolved))

    class Meta:
        model = Item
        fields = '__all__'

    def get_fields(self):
        fields = super().get_fields()
        request = self.context.get('request')
        if request.method == 'GET':
            fields['conversation'] = ConversationSerializer()
        return fields

    def create(self, validated_data):
        conversation = validated_data['conversation']
        other_user = conversation.person_from
        user = self.context.get('request').user
        if other_user == user:
            other_user = conversation.person_to
        Item.objects.filter(conversation=conversation,
                            listener=other_user).delete()
        notification = Notification.objects.create(
            title='Sent Video',
            description=f'{user.first_name or user.last_name or user.username} sent a video!',
            recipient=user,
            sender=other_user,
            level='sent'
        )
        notification.save()
        notification_saved.send(sender=Notification, notification=notification)

        return Item.objects.create(speaker=user, listener=other_user, **validated_data)


class ItemsSerializer(serializers.ModelSerializer):
    speaker = UserSerializer(read_only=True)
    listener = UserSerializer(read_only=True)

    class Meta:
        model = Item
        fields = "__all__"


class ConversationSerializer(serializers.ModelSerializer):
    items = ItemsSerializer(many=True, read_only=True)
    from_user = UserSerializer(read_only=True)
    to_user = UserSerializer(read_only=True)

    class Meta:
        model = Conversation
        fields = '__all__'

    def get_fields(self):
        fields = super().get_fields()
        request = self.context.get('request')
        if request.method != 'GET':
            del fields['person_from']
        return fields
