from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .viewsets import FeedbackViewset

router = DefaultRouter()
router.register('feedback', FeedbackViewset)

urlpatterns = [
    path("", include(router.urls))
]
