from django.http import HttpRequest
from rest_framework import serializers

from contact.models import Contact, Invitation
from core.utils import update_object


class ContactSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField(required=False)

    class Meta:
        model = Contact
        fields = '__all__'

    def _get_request(self):
        request = self.context.get("request")
        if (
                request
                and not isinstance(request, HttpRequest)
                and hasattr(request, "_request")
        ):
            request = request._request
        return request

    def get_user(self, instance):
        return {
            'id': instance.user.id,
            'name': instance.user.username
        }

    def create(self, validated_data):
        user = self._get_request().user
        if hasattr(user, 'contacts'):
            instance = user.contacts
        else:
            instance = Contact(user=user)
        for friend in validated_data.get('friends'):
            instance.friends.add(friend)
        return instance


class InvitationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invitation
        fields = "__all__"