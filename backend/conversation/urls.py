from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .viewsets import (ConversationViewSet, ItemViewSet,
                       )

router = DefaultRouter()
router.register("conversation", ConversationViewSet, basename="conversation")
router.register("items", ItemViewSet, basename="items")

urlpatterns = [
    path("", include(router.urls)),
]
