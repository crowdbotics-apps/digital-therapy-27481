from django.core.validators import validate_email
from django.core.exceptions import ValidationError

from rest_framework import permissions, viewsets, serializers, authentication, views, permissions, response
from rest_framework.decorators import action
from rest_framework.response import Response

from core.utils import send_invitation_code, create_invite_action
from notification.models import Notification
from notification.signal import notification_saved
from .serializers import ContactSerializer, InvitationSerializer
from contact.models import Contact, Invitation
from users.models import User


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
        # if user is in the system send a push notification
        user_qs = User.objects.filter(email=self.request.data.get('email'))
        if user_qs.exists():
            notification = Notification.objects.create(
                title='Friend Invite',
                description=f'{user.first_name or user.last_name or user.username} sent you a invitation request.',
                recipient=user_qs.first(),
                sender=user,
                level='invitation',
                action_url=f'/{user.id}/',
                action=create_invite_action(user)
            )
            notification.save()
            notification_saved.send(sender=Notification, notification=notification)

        else:  # send an email invite
            if hasattr(user, 'contacts'):
                invite_code = user.contacts.invite_code
            else:
                instance = Contact.objects.create(user=user)
                invite_code = instance.invite_code
            send_invitation_code(user, invite_code, self.request.data.get('email'))

        return response.Response('Success')


class InvitationViewSet(viewsets.ModelViewSet):
    serializer_class = InvitationSerializer
    queryset = Invitation.objects.all()
    authentication_classes = (
        authentication.TokenAuthentication,
    )

    permission_classes = [permissions.IsAuthenticated, ]

    def get_queryset(self):
        return Invitation.objects.filter(inviter=self.request.user)

    @action(detail=False, methods=['post'], url_path='reject/(?P<inviter_pk>[^/.]+)')
    def reject(self, request, inviter_pk=None, ):
        user = request.user
        recipient = User.objects.get(pk=inviter_pk)
        st = Invitation.objects.update_status(recipient, user, status='reject')
        if not st:
            raise serializers.ValidationError('Invitation action failed')
            # send notification

        return Response('Success')

    @action(detail=False, methods=['post'], url_path='accept/(?P<inviter_pk>[^/.]+)')
    def accept(self, request, inviter_pk=None, ):
        user = request.user
        recipient = User.objects.get(pk=inviter_pk)
        st = Invitation.objects.update_status(recipient, user, status='accepted')
        if not st:
            raise serializers.ValidationError('Invitation action failed')

        # send notification
        notification = Notification.objects.create(
            title='Friend Invite',
            description=f'{user.first_name or user.last_name or user.username} accepted your invitation.',
            recipient=recipient,
            sender=user,
            level='invitation',
        )
        notification.save()
        notification_saved.send(sender=Notification, notification=notification)

        return Response('Success')
