# breathing_tools/serializers.py
from rest_framework import serializers
from .models import MeditationVideo

class MeditationVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = MeditationVideo
        fields = ['id', 'category', 'duration', 'video_url']
