# user_settings/views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import UserProfile
from .serializers import UserProfileSerializer, UserSerializer

"""
@author @marios-petrov

"""
@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def manage_user_settings(request):
    try:
        profile = request.user.profile
    except UserProfile.DoesNotExist:
        return Response({'error': 'User profile does not exist'}, status=404)

    if request.method == 'GET':
        serializer = UserProfileSerializer(profile)
        return Response(serializer.data)

    elif request.method == 'PUT':
        user_serializer = UserSerializer(request.user, data=request.data, partial=True)
        profile_serializer = UserProfileSerializer(profile, data=request.data, partial=True)
        if user_serializer.is_valid() and profile_serializer.is_valid():
            user_serializer.save()
            profile_serializer.save()
            return Response({'status': 'Settings updated successfully'})
        else:
            errors = user_serializer.errors
            errors.update(profile_serializer.errors)
            return Response(errors, status=400)
