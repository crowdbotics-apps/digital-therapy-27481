from rest_framework.routers import DefaultRouter
from django.urls import include, path
from .viewsets import ContactViewset, InviteUserAPIView, InvitationViewSet

router = DefaultRouter()
router.register('contacts', ContactViewset)
router.register('invitation', InvitationViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('invite', InviteUserAPIView.as_view())
]