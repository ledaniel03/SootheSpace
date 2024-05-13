from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login as django_login, logout as django_logout
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Tokens

"""
@author @ledaniel03 @marios-petrov

"""

@csrf_exempt
def register(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data['username']
            password = data['password']

            # Check if username already exists
            if User.objects.filter(username=username).exists():
                return JsonResponse({'error': 'Username already exists'}, status=400)

            # Create new user
            user = User.objects.create_user(
                username=username, password=password)
            user.save()
            newToken = Tokens(user=user)
            newToken.save()
            return JsonResponse({'success': 'User created successfully'})
        except KeyError:
            return JsonResponse({'error': 'Invalid request'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_exempt
def login(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data['username']
            password = data['password']
            user = authenticate(username=username, password=password)
            token = Tokens.objects.filter(user=user) if user else None
            if user is not None:  # Only create a token if it does not exist
                # django_login(request, user)
                if not token or len(token) < 1:
                    token = Tokens(user=user)
                    token.save()

                return JsonResponse({'success': 'Login successful'})
            else:
                return JsonResponse({'error': 'Invalid credentials'}, status=401)
        except KeyError:
            return JsonResponse({'error': 'Invalid request'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_exempt
def logout(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data['username']
        user = User.objects.filter(username=username)
        if user and len(user) > 0:
            token = Tokens.objects.filter(user=user[0])
            token.delete()
        return JsonResponse({'success': 'Logout successful'})
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_exempt
def checklogin(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data['username']
        user = User.objects.filter(username=username)
        token = Tokens.objects.filter(
            user=user[0]) if user and len(user) > 0 else None
        print(user,token)
        if token and len(token) > 0:
            return JsonResponse({'success': 'Logged in'})
        else:
            return JsonResponse({'error': 'Not logged in'})
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)
