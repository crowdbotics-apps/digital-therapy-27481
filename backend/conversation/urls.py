from django.urls import include, path, re_path
from rest_framework.routers import DefaultRouter

from .viewsets import (CatergoryViewSet, ConversationViewSet, ItemViewSet,
                       VideoViewSet)

router = DefaultRouter()
router.register("video", VideoViewSet, basename="video")
router.register("category", CatergoryViewSet, basename="category")
router.register("conversation", ConversationViewSet, basename="conversation")
router.register("items", ItemViewSet, basename="items")

urlpatterns = [
    path("", include(router.urls)),
]
