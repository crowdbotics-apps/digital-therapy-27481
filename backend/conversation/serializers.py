from core.utils import update_object
from home.api.v1.serializers import UserSerializer
from rest_framework import serializers

from notification.models import Notification
from notification.signal import notification_saved
from .enums import ItemStatusEnum
from .models import Conversation, Item


class ItemSerializer(serializers.ModelSerializer):
    speaker = UserSerializer(read_only=True)
    listener = UserSerializer(read_only=True)
    timesince = serializers.SerializerMethodField(read_only=True)

    def get_timesince(self, instance):
        return instance.timesince()

    class Meta:
        model = Item
        fields = '__all__'

    def get_fields(self):
        fields = super().get_fields()
        request = self.context.get('request')
        if request.method == 'GET':
            fields['conversation'] = ConversationSerializer()
        return fields

    def update(self, instance, validated_data):
        instance = update_object(instance, validated_data)
        user = self.context.get('request').user
        recipient = instance.speaker if instance.speaker is not user else instance.listener
        if validated_data.get('status') in [ItemStatusEnum.confirmed.value, ItemStatusEnum.confirmed.name]:
            # swap listener / speaker
            instance.speaker, instance.listener = instance.listener, instance.speaker
            instance.save()

        # send notification if status is confirmed or not_confirmed
        if validated_data.get('status') in [ItemStatusEnum.confirmed.value, ItemStatusEnum.confirmed.name, ItemStatusEnum.not_confirmed.value,ItemStatusEnum.not_confirmed.name] and recipient is not None:
            status = validated_data.get('status', '').replace('_', ' ').capitalize()
            notification = Notification.objects.create(
                title=f'{status} your video',
                description=f'{user.first_name or user.last_name or user.username} {status} your video!',
                recipient=recipient,
                sender=user,
                level='sent'
            )
            notification.save()
            notification_saved.send(sender=Notification, notification=notification)

        return instance

    def create(self, validated_data):
        conversation = validated_data['conversation']

        last_item = Item.objects.filter(conversation=conversation).order_by('-id').first()

        person_from = conversation.person_from
        person_to = conversation.person_to
        receipient = person_to
        user = self.context.get('request').user

        item = None

        # speaker is always the person_from, unless
        # previous

        speaker = person_from
        listener = person_to
        if last_item:
            speaker = last_item.speaker
            listener = last_item.listener
            receipient = last_item.owner if last_item.owner is not user else user
            # update last item status to replied
            if last_item.status in [ItemStatusEnum.sent.name, ItemStatusEnum.sent.value]:
                last_item.status = ItemStatusEnum.replied.value
                last_item.save()

            # update last item, if it was not confirmed
            # owner replying to an item that was not confirmed
            if last_item.status in [ItemStatusEnum.not_confirmed.name,
                                    ItemStatusEnum.not_confirmed.value]:  # and user.id == last_item.owner:
                last_item.status = ItemStatusEnum.sent.value
                last_item.save()
                item = last_item

        if item:
            #  replying to a not confirmed item
            instance = update_object(item, validated_data)
        else:
            instance = Item.objects.create(
                owner=user,
                speaker=speaker,
                listener=listener,
                **validated_data
            )
        notification = Notification.objects.create(
            title='Sent Video',
            description=f'{user.first_name or user.last_name or user.username} sent a video!',
            recipient=receipient,
            sender=user,
            level='sent'
        )
        notification.save()
        notification_saved.send(sender=Notification, notification=notification)

        return instance


class ItemsSerializer(serializers.ModelSerializer):
    speaker = UserSerializer(read_only=True)
    listener = UserSerializer(read_only=True)

    timesince = serializers.SerializerMethodField(read_only=True)

    def get_timesince(self, instance):
        return instance.timesince()

    class Meta:
        model = Item
        fields = "__all__"


class ConversationSerializer(serializers.ModelSerializer):
    items = ItemsSerializer(many=True, read_only=True)
    from_user = UserSerializer(read_only=True)
    to_user = UserSerializer(read_only=True)
    can_resolve = serializers.SerializerMethodField(required=False, read_only=True)

    timesince = serializers.SerializerMethodField(read_only=True)

    def get_can_resolve(self, instance):
        return instance.can_resolve()

    def get_timesince(self, instance):
        return instance.timesince()

    class Meta:
        model = Conversation
        fields = '__all__'

    def update(self, instance, validated_data):
        return update_object(instance, validated_data)

    def get_fields(self):
        fields = super().get_fields()
        request = self.context.get('request')
        if request.method != 'GET':
            del fields['person_from']
        return fields
