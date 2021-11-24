from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.core.mail import send_mail
from django.conf import settings
from rest_framework import viewsets, serializers, authentication, views, permissions, response
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

        send_mail(
            'Get Resolve',
            f'{user.email} sent you a Resolve invitation code. Follow this link to download the app https://digital-therapy-27481.botics.co/. '
            f'Please use {invite_code} invitation code when signing in the app to be automatically added into the {user.email} contact list.',
            settings.DEFAULT_FROM_EMAIL,
            [self.request.data.get('email')],
            fail_silently=False,
        )

        return response.Response('Success')
