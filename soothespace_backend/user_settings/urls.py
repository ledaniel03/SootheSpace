# user_settings/urls.py
from django.urls import path
from .views import manage_user_settings

urlpatterns = [
    path('settings/', manage_user_settings, name='manage_user_settings'),
]
