from conversation.urls import router as conversation_router
from django.urls import include, path, re_path
from home.api.v1.viewsets import (AppleLogin, FacebookLogin, GoogleLogin,
                                  LoginViewSet, SignupViewSet, UserViewSet, StripePaymentViewSet, BrainTreeAPIView)
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register("signup", SignupViewSet, basename="signup")
router.register("login", LoginViewSet, basename="login")
router.register("login/apple", AppleLogin, basename="apple_login")
router.register("user", UserViewSet, basename='user')

urlpatterns = [
    path("", include(router.urls)),
    path("conversation/", include(conversation_router.urls)),
    path("braintree/token", BrainTreeAPIView.as_view()),
    re_path(r'^login/facebook/$', FacebookLogin.as_view(), name='fb_login'),
    re_path(r'^login/google/$', GoogleLogin.as_view(), name='google_login'),

]
