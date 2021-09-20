

from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from conversation.models import Category, Conversation, Item, Video
from conversation.serializers import (CategorySerializer,
                                      ConversationSerializer, ItemSerializer,
                                      VideoSerializer)

# Create your views here.


class VideoViewSet(viewsets.ModelViewSet):

    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Video.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CatergoryViewSet(viewsets.ModelViewSet):

    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]


class ItemViewSet(viewsets.ModelViewSet):

    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Item.objects.filter(listener=self.request.user)

    @action(["get"], detail=False)
    def sent(self, request):
        items = Item.objects.filter(speaker=request.user)
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
        return Response(self.serializer_class(obj, context={'request': request}).data)


class ConversationViewSet(viewsets.ModelViewSet):

    queryset = Conversation.objects.all()
    serializer_class = ConversationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Conversation.objects.filter(person_from=self.request.user)

    def perform_create(self, serializer):
        serializer.save(person_from=self.request.user)
