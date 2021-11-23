from django.urls import path
from django.views.generic import TemplateView

from .views import home

urlpatterns = [
    path("", home, name="home"),
    path('terms-and-conditions/', TemplateView.as_view(template_name="home/terms.html")),
    path('delete-data/', TemplateView.as_view(template_name='home/data-deletion.html'))
]
