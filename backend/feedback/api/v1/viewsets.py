from rest_framework import viewsets, authentication, permissions

from feedback.models import Feedback
from .serializers import FeedbackSerializer


class FeedbackViewset(viewsets.ModelViewSet):
    serializer_class = FeedbackSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    queryset = Feedback.objects.all()
