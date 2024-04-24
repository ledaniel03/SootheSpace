from django.urls import path
from . import views

urlpatterns = [
    path('start_session/', views.start_chat_session, name='start_chat_session'),
    path('send_message/', views.send_message, name='send_message'),
]
