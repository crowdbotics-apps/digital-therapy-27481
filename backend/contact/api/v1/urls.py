from rest_framework.routers import DefaultRouter
from django.urls import include, path
from .viewsets import ContactViewset, InviteUserAPIView

router = DefaultRouter()
router.register('contacts', ContactViewset)

urlpatterns = [
    path('', include(router.urls)),
    path('invite', InviteUserAPIView.as_view())
]