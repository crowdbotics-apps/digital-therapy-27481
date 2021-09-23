import jwt
from allauth.socialaccount.providers.facebook.views import \
    FacebookOAuth2Adapter
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from django.contrib.auth import get_user_model
from home.api.v1.serializers import (SignupSerializer, SocialSerializer,
                                     UserSerializer)
from home.api.v1.user_utils import UserUtils
from home.utils import convert_base64_to_file
from rest_auth.registration.views import SocialLoginView
from rest_framework import authentication, status
from rest_framework.authentication import (SessionAuthentication,
                                           TokenAuthentication)
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.decorators import action
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, ViewSet

User = get_user_model()


class SignupViewSet(ModelViewSet):
    serializer_class = SignupSerializer
    http_method_names = ["post"]


class LoginViewSet(ViewSet):
    """Based on rest_framework.authtoken.views.ObtainAuthToken"""

    serializer_class = AuthTokenSerializer

    def create(self, request):
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        token, created = Token.objects.get_or_create(user=user)
        user_serializer = UserSerializer(user)
        return Response({"token": token.key, "user": user_serializer.data})


class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter


class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    client_class = OAuth2Client
    callback_url = "https://nubu-app.firebaseapp.com/__/auth/handler"


class AppleLogin(ViewSet):
    serializer_class = SocialSerializer

    def create(self, request):
        social_serializer = SocialSerializer(data=request.data)
        social_serializer.is_valid(raise_exception=True)
        res_status = UserUtils.verify_apple_details(
            request.data["access_token"])
        if res_status.status_code != 200:
            return Response({
                'success': False,
                'result': "Invalid Token!",
            }, status=status.HTTP_400_BAD_REQUEST)
        user_info = res_status.json()
        id_token = user_info.get('id_token', None)  # request.data["id_token"]
        response_data = {}
        if id_token:
            decoded = jwt.decode(id_token, '', verify=False)
            response_data.update(
                {'email': decoded['email'] if 'email' in decoded else None})
            response_data.update(
                {'id': decoded['sub']}) if 'sub' in decoded else None
            response_data.update(
                {'name': request.data['name'] if 'name' in request.data else None})
        user = SocialSerializer(context={"request": request}). \
            social_login(response_data, "Apple")

        return Response({
            'success': True,
            'result': UserSerializer(user).data,
            'type': 'apple',
            'token': Token.objects.get(user=user).key
        }, status=status.HTTP_200_OK)


class UserViewSet(ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    authentication_classes = (
        authentication.TokenAuthentication,
    )
    permission_classes = [IsAuthenticated]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context

    @action(detail=False, methods=['get'])
    def get_user_profile(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

    @action(methods=['post'], detail=False)
    def set_profile_picture(self, request, pk=None):
        image = request.data['image']
        request.user.profile_picture = convert_base64_to_file(image)
        request.user.save()
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

    @action(methods=['get'], detail=False)
    def get_users(self, request, pk=None):
        users = User.objects.all().exclude(id=request.user.id)
        return Response(self.serializer_class(users, many=True).data)
