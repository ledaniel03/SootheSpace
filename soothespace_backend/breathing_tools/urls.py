# breathing_tools/urls.py
from django.urls import path
from .views import MeditationVideoList, complete_meditation

urlpatterns = [
    path('meditations/<str:category>/<int:duration>/', MeditationVideoList.as_view(), name='meditation-videos'),
    path('complete-meditation/', complete_meditation, name='complete_meditation'),
]
