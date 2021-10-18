from collections import OrderedDict

from allauth.account import app_settings as allauth_settings
from allauth.account.adapter import get_adapter
from allauth.account.forms import ResetPasswordForm
from allauth.account.utils import complete_signup, setup_user_email
from allauth.socialaccount.helpers import complete_social_login
from allauth.utils import email_address_exists, generate_unique_username
from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.sites.shortcuts import get_current_site
from django.http import HttpRequest
from django.utils.translation import ugettext_lazy as _
from home.api.v1.user_utils import UserUtils
from rest_auth.registration.serializers import SocialLoginSerializer
from rest_auth.serializers import PasswordResetSerializer
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from users.models import Token as UserToken

User = get_user_model()


class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'name', 'email', 'password',
                  'age', 'surname', 'location')
        extra_kwargs = {
            'password': {
                'write_only': True,
                'style': {
                    'input_type': 'password'
                }
            },
            'email': {
                'required': True,
                'allow_blank': False,
            }
        }

    def _get_request(self):
        request = self.context.get('request')
        if request and not isinstance(request, HttpRequest) and hasattr(request, '_request'):
            request = request._request
        return request

    def validate_email(self, email):
        email = get_adapter().clean_email(email)
        if allauth_settings.UNIQUE_EMAIL:
            if email and email_address_exists(email):
                raise serializers.ValidationError(
                    _("A user is already registered with this e-mail address."))
        return email

    def create(self, validated_data):
        user = User(
            email=validated_data.get('email'),
            name=validated_data.get('name'),
            age=validated_data.get('age'),
            location=validated_data.get('location'),
            surname=validated_data.get('surname'),
            username=generate_unique_username([
                validated_data.get('name'),
                validated_data.get('email'),
                'user'
            ])
        )
        user.set_password(validated_data.get('password'))
        user.save()
        request = self._get_request()
        setup_user_email(request, user, [])
        return user

    def save(self, request=None):
        """rest_auth passes request so we must override to accept it"""
        return super().save()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'name', 'surname',
                  'age', 'location', 'profile_picture']


class CustomResetPasswordForm(ResetPasswordForm):
    def save(self, request, **kwargs):
        current_site = get_current_site(request)
        email = self.cleaned_data["email"]

        for user in self.users:
            token = UserToken.objects.create(
                user=user, token=UserToken.generate_token())
            context = {
                "current_site": current_site,
                "user": user,
                "token": token.token,
                "request": request,
            }

            get_adapter(request).send_mail(
                "account/email/password_reset_key", email, context
            )
        return self.cleaned_data["email"]


class PasswordSerializer(PasswordResetSerializer):
    """Custom serializer for rest_auth to solve reset password error"""
    password_reset_form_class = CustomResetPasswordForm

    def get_email_options(self):
        return {
            "extra_email_context": {
                "token": "lol"
            }
        }

    def save(self):
        request = self.context.get('request')
        # Set some values to trigger the send_email method.
        opts = {
            'use_https': request.is_secure(),
            'from_email': getattr(settings, 'DEFAULT_FROM_EMAIL'),
            'request': request,
        }

        opts.update(self.get_email_options())
        self.reset_form.save(**opts)


class PasswordResetConfirmSerializer(serializers.Serializer):
    email = serializers.EmailField()
    token = serializers.CharField()
    password = serializers.CharField(max_length=150)

    def create(self, validated_data):
        user = User.objects.get(email=validated_data['email'])
        is_verified = UserToken.verify(user, validated_data['token'])
        if is_verified:
            user.set_password(validated_data['password'])
            user.save()
            return user
        else:
            raise serializers.ValidationError("Token does not match")


class AppleSocialLoginSerializer(SocialLoginSerializer):
    def validate(self, attrs):
        view = self.context.get('view')
        request = self._get_request()

        if not view:
            raise serializers.ValidationError(
                _('View is not defined, pass it as a context variable')
            )

        adapter_class = getattr(view, 'adapter_class', None)
        if not adapter_class:
            raise serializers.ValidationError(
                _('Define adapter_class in view'))

        adapter = adapter_class(request)
        # app = adapter.get_provider().get_app(request)
        app = settings.SOCIALACCOUNT_PROVIDERS.get('apple')['APP']

        # More info on code vs access_token
        # http://stackoverflow.com/questions/8666316/facebook-oauth-2-0-code-and-token

        # Case 1: We received the access_token
        if attrs.get('access_token'):
            access_token = attrs.get('access_token')
            token = {'access_token': access_token}

        # Case 2: We received the authorization code
        elif attrs.get('code'):
            self.callback_url = getattr(view, 'callback_url', None)
            self.client_class = getattr(view, 'client_class', None)

            if not self.callback_url:
                raise serializers.ValidationError(
                    _('Define callback_url in view')
                )
            if not self.client_class:
                raise serializers.ValidationError(
                    _('Define client_class in view')
                )

            code = attrs.get('code')

            provider = adapter.get_provider()
            scope = provider.get_scope(request)
            client = self.client_class(
                request,
                app['client_id'],
                app['secret'],
                adapter.access_token_method,
                adapter.access_token_url,
                self.callback_url,
                scope,
                key=app['key'],
                cert=app['certificate_key'],
            )
            token = client.get_access_token(code)
            access_token = token['access_token']

        else:
            raise serializers.ValidationError(
                _('Incorrect input. access_token or code is required.'))

        # The important change is here.
        social_token = adapter.parse_token(token)
        social_token.app = app

        try:
            login = self.get_social_login(
                adapter, app, social_token, access_token)
            complete_social_login(request, login)
        except Exception:
            raise serializers.ValidationError(_('Incorrect value'))

        if not login.is_existing:
            # We have an account already signed up in a different flow
            # with the same email address: raise an exception.
            # This needs to be handled in the frontend. We can not just
            # link up the accounts due to security constraints
            if allauth_settings.UNIQUE_EMAIL:
                # Do we have an account already with this email address?
                if get_user_model().objects.filter(email=login.user.email).exists():
                    raise serializers.ValidationError(
                        _('E-mail already registered using different signup method.'))

            login.lookup()
            login.save(request, connect=True)

        attrs['user'] = login.account.user
        return attrs


class SocialSerializer(serializers.Serializer):
    access_token = serializers.CharField()

    def social_login(self, user_info, social_platform):
        social_id = user_info.pop("id")
        request = self.context.get("request")
        profile = UserUtils.get_profle_meta_details(request.META,
                                                    social_id=str(social_id),
                                                    social_platform=social_platform,
                                                    user_info=user_info
                                                    )
        update_data = {"is_active": True, "profile": profile}
        if "name" in user_info and user_info['name']:
            update_data.update({
                "name": user_info['name']
            })
        try:
            user = User.objects.get(username__iexact=user_info["email"])
            try:
                if user.profile.profile_image.file:
                    del update_data['profile']['profile_image']
            except:
                pass
        except User.DoesNotExist:
            user_dict = UserUtils.get_user_social_dict(user_info)
            user = UserSerializer().create(user_dict)
            token = Token.objects.create(user=user)
        except KeyError:
            raise serializers.ValidationError("Email not found")
        user = UserSerializer().update(instance=user,
                                       validated_data=update_data)

        return user
