from rest_framework import serializers

from feedback.models import Feedback


class FeedbackSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField(required=False)

    class Meta:
        model = Feedback
        fields = '__all__'

    def get_user(self, instance):
        return {
            "id": instance.user.id,
            "fullname": instance.user.fullname()
        }

    def create(self, validated_data):
        user = self.context['request'].user

        instance = Feedback(user=user, **validated_data)
        return instance
