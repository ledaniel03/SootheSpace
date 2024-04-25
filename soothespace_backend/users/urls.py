from django.urls import path
from . import views

urlpatterns = [
    path('api/register/', views.register, name='api_register'),
    path('api/login/', views.login_user, name='api_login'),
    path('api/update_profile/', views.update_profile, name='api_update_profile'),
]
