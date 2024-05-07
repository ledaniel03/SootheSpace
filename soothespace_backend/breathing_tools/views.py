from rest_framework import generics, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import MeditationVideo
from .serializers import MeditationVideoSerializer
from soothespace_backend.user_settings.models import UserProfile  # Correct import based on your project structure

class MeditationVideoList(generics.ListAPIView):
    serializer_class = MeditationVideoSerializer

    def get_queryset(self):
        category = self.kwargs['category']
        duration = self.kwargs['duration']
        return MeditationVideo.objects.filter(category=category, duration=duration)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def complete_meditation(request):
    try:
        profile = UserProfile.objects.get(user=request.user)
        profile.completed_meditations += 1
        profile.save()
        return Response({'status': 'Meditation completion recorded', 'completed_meditations': profile.completed_meditations})
    except UserProfile.DoesNotExist:
        return Response({'error': 'UserProfile does not exist'}, status=404)
