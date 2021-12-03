import jwt
import stripe
from django.conf import settings
from allauth.socialaccount.providers.facebook.views import \
    FacebookOAuth2Adapter
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from django.contrib.auth import get_user_model
from home.api.v1.serializers import (PasswordResetConfirmSerializer,
                                     SignupSerializer, SocialSerializer,
                                     UserSerializer, VerifyTokenSerializer, AuthTokenEmailPasswordSerializer,
                                     StripePaymentSerializer)
from home.api.v1.user_utils import UserUtils
from home.utils import convert_base64_to_file
from rest_auth.registration.views import SocialLoginView
from rest_framework import authentication, status, serializers, views
from rest_framework.authentication import (SessionAuthentication,
                                           TokenAuthentication)
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.decorators import action, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework.views import APIView
from core.gateway import Gateway

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
    callback_url = "https://speak-listen-resolve.firebaseapp.com/__/auth/handler"


class AppleLogin(ViewSet):
    serializer_class = SocialSerializer

    def create(self, request):
        social_serializer = SocialSerializer(data=request.data)
        social_serializer.is_valid(raise_exception=True)
        id_token = jwt.decode(request.data.get('access_token'), options={"verify_signature": False},
                              audience="com.crowdbotics.digital-therapy-27481")
        response_data = {}
        if id_token:
            decoded = id_token
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

    def get_queryset(self):
        if self.request.query_params.get('contact'):
            friends = []
            if hasattr(self.request.user, 'contacts'):
                friends = [i.id for i in self.request.user.contacts.friends.all()]

            return User.objects.filter(id__in=friends)
        return User.objects.all()

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context

    @action(detail=False, methods=['get'])
    def get_user_profile(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated],
            authentication_classes=[authentication.TokenAuthentication])
    def cancel(self, request, pk=None):
        user = request.user
        user.is_active = False
        user.save()
        return Response(request.data)

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

    @action(methods=['post'], detail=False, permission_classes=[])
    def verify_token(self, request):
        serializer = VerifyTokenSerializer(data=request.data)
        if not serializer.is_valid():
            raise serializers.ValidationError(serializer.errors)
        serializer.save()
        return Response('Success')

    @action(methods=['post'], detail=False, permission_classes=[])
    def password_reset_confirm(self, request):
        serializer = PasswordResetConfirmSerializer(data=request.data)

        serializer.is_valid()
        serializer.save()
        return Response({"details": "Password reset"})


class StripePaymentViewSet(views.APIView):
    """
    {
    card_number* string
    exp_month* string
    exp_year* string max_length=4
    cvc* string max_length=4
    }
    """
    serializer_class = StripePaymentSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [IsAuthenticated, ]

    def post(self, request):
        user = request.user
        serializer = StripePaymentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        stripe.api_key = settings.STRIPE.get('api_key')
        try:
            token = stripe.Token.create(
                card={
                    "number": data.get('card_number'),
                    "exp_month": data.get('exp_month'),
                    "exp_year": data.get('exp_year'),
                    "cvc": data.get('cvc'),
                }, )
            stripe.Charge.create(
                amount=5000,  # TODO: store subscription fee in the database
                currency="usd",
                source=token.id,
                description=f"{user.email} membership payment",
            )

            user.is_member = True
            user.save()

            return Response({
                'success': True,
                'result': UserSerializer(user).data,
                'type': 'apple',
                'token': Token.objects.get(user=user).key
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(e)


class BrainTreeAPIView(APIView):
    """
    BrainTree gateway
    payload {
      payment_method_nonce* string
      device_data object device data from the client
    }
    """
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [IsAuthenticated, ]

    def get(self, request, request_type=None, format=None):
        return Response(Gateway.client_token())

    def post(self, request, format=None):
        try:
            payload = {
                "amount": "50.00",
                "payment_method_nonce": request.data.get("payment_method_nonce"),
                "device_data": request.data.get("device_data"),
                "options": {
                    "submit_for_settlement": True
                },
                "billing": {
                    "postal_code": request.data.get("postal_code")
                }
            }
            Gateway.sale(payload)
            user = request.user
            user.is_member = True
            user.save()
            return Response({
                'success': True,
                'result': UserSerializer(user).data,
                'type': 'apple',
                'token': Token.objects.get(user=user).key
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(e)
