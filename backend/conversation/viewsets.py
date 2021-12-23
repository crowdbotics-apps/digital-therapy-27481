from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import filters
from django.db import models
from django_filters.rest_framework import DjangoFilterBackend
from conversation.models import Conversation, Item
from conversation.serializers import (
    ConversationSerializer, ItemSerializer,
)
from contact.models import Contact, Invitation
from core.utils import send_invitation_code, create_invite_action
from notification.signal import notification_saved
from users.models import User
from notification.models import Notification


class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Item.objects.exclude(conversation__category='self').filter(
            models.Q(listener=self.request.user) |
            models.Q(speaker=self.request.user)
        )

    @action(["get"], detail=False)
    def sent(self, request):
        items = Item.objects.exclude(conversation__category='self').filter(speaker=request.user)
        page = self.paginate_queryset(items)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        return Response(self.serializer_class(items, many=True).data)

    @action(["get"], detail=False)
    def self(self, request):
        items = Item.objects.filter(conversation__category='self').filter(speaker=request.user)
        page = self.paginate_queryset(items)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        return Response(self.serializer_class(items, many=True).data)

    @action(["post"], detail=True)
    def resolve(self, request, pk):
        obj = self.get_object()
        obj.resolved = True
        obj.save()
        user = request.user
        notification = Notification.objects.create(
            title='Resolved',
            description=f'{user.first_name or user.last_name  or user.username} resolved the conversation',
            recipient=obj.person_from if user is not obj.person_from else obj.person_to,
            sender=obj.person_to if user is not obj.person_to else obj.person_from,
            level='resolved'
        )
        notification.save()
        notification_saved.send(sender=Notification, notification=notification)

        return Response(self.serializer_class(obj, context={'request': request}).data)


class ConversationViewSet(viewsets.ModelViewSet):
    queryset = Conversation.objects.all()
    serializer_class = ConversationSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['category', 'id']

    @action(["post"], detail=True)
    def resolve(self, request, pk):
        obj = self.get_object()
        obj.resolved = True
        obj.save()
        user = request.user
        notification = Notification.objects.create(
            title='Resolved',
            description=f'{user.first_name or user.last_name or user.username} resolved the conversation',
            recipient=obj.person_from if user is not obj.person_from else obj.person_to,
            sender=obj.person_to if user is not obj.person_to else obj.person_from,
            level='resolved'
        )
        notification.save()
        notification_saved.send(sender=Notification, notification=notification)

        return Response(self.serializer_class(obj, context={'request': request}).data)

    # def get_queryset(self):
    #     return Conversation.objects.filter(person_from=self.request.user)

    def perform_create(self, serializer):
        user = self.request.user

        instance = serializer.save(person_from=user)
        user_qs = User.objects.filter(email=instance.invited_email)
        if user_qs.exists():
            # add user as friend and send a notification
            # Create invitation
            Invitation.objects.create(
                invitee=user_qs.first(),
                inviter=user
            )
            # send notification
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

            # TODO: only add user in contact when they accept
            Contact.objects.add_friend(user, user_qs.first())
            instance.person_to = user_qs.first()
            instance.save()
        else:
            # send an email invitation
            if hasattr(user, 'contacts'):
                invite_code = user.contacts.invite_code
            else:
                _instance = Contact.objects.create(user=user)
                invite_code = _instance.invite_code
            send_invitation_code(user, invite_code, instance.invited_email)
