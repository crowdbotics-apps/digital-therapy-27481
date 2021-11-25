from django.core.validators import validate_email
from django.core.exceptions import ValidationError

from rest_framework import viewsets, serializers, authentication, views, permissions, response

from core.utils import send_email_local, send_invitation_code
from .serializers import ContactSerializer
from contact.models import Contact


class ContactViewset(viewsets.ModelViewSet):
    authentication_classes = (
        authentication.TokenAuthentication,
        authentication.SessionAuthentication,
    )

    permission_classes = [permissions.IsAuthenticated]
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer


class InviteUserAPIView(views.APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, format=None):
        """
        Post request to invite user to resolve.
        Send a JSON post request with user email
        e.g {
            "email": "email@gmail.com"
            }
        """
        try:
            validate_email(self.request.data.get('email'))
        except ValidationError as e:
            raise serializers.ValidationError('Invalid email.')
        user = self.request.user
        if hasattr(user, 'contacts'):
            invite_code = user.contacts.invite_code
        else:
            instance = Contact.objects.create(user=user)
            invite_code = instance.invite_code
        send_invitation_code(user, invite_code, self.request.data.get('email'))

        return response.Response('Success')
