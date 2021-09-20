from home.api.v1.serializers import UserSerializer
from rest_framework import serializers

from .models import Category, Conversation, Item, Video


class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        exclude = ['user']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class ConversationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Conversation
        fields = '__all__'

    def get_fields(self):
        fields = super().get_fields()
        request = self.context.get('request')
        if request.method != 'GET':
            del fields['person_from']
        return fields


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
        return Item.objects.create(speaker=user, listener=other_user, **validated_data)
