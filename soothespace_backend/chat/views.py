from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.views.decorators.http import require_http_methods
from .models import ChatSession, Message
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from openai import OpenAI
import json
from django.http import JsonResponse


API_KEY = 'sk-proj-LyK8AZ2oTESTpi6ztjOHT3BlbkFJtOmlb5I9aKffmhC4EDk1'


@csrf_exempt
@api_view(['POST'])
def start_chat_session(request):
    # Create a new chat session
    user = request.user if request.user.is_authenticated else User.objects.get( username='root') # default user to pull msgs from
    chat_session = ChatSession.objects.create(user=user)

    # GPT's opening message
    opening_message = "Hi, how are you doing today? I'm here to listen and help you with anything you need."

    # Save GPT's opening message in the database
    Message.objects.create(chat_session=chat_session,
                           text=opening_message, sent_by_user=False)

    return Response({'session_id': chat_session.id, 'message': opening_message}, status=status.HTTP_201_CREATED)


@require_http_methods(["POST"])
@csrf_exempt
def send_message(request):
    try:
        data = json.loads(request.body.decode('utf-8'))
        session_id = data.get("session_id")
        user_input = data.get("input")
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON data"}, status=400)

    try:
        chat_session = ChatSession.objects.get(id=session_id)
    except ChatSession.DoesNotExist:
        return JsonResponse({"error": "Invalid session ID."}, status=404)

    # Save user message to database
    Message.objects.create(chat_session=chat_session,
                           text=user_input, sent_by_user=True)

    # Here, incorporate the logic for OpenAI API call with role="assistant" and preset personality
    try:
        client = OpenAI(
            api_key=API_KEY
        )
        chat_completion = client.chat.completions.create(
            messages=[
                {"role": "system", "content": "You are an AI Therapist/Mental Health Companion, your goal is to assist the user and guide them through their feelings"
                 "and emotions. You are here to provide a safe space for the user to express themselves freely. You are empathetic, understanding, and non-judgmental."},
                {"role": "user", "content": user_input},
            ],
            model="gpt-3.5-turbo",
        )
        response = chat_completion.choices[0].message.content
        print(response)
    except Exception as e:
        print(e)
        response = "AI experienced error"

    # Save AI response to database
    Message.objects.create(chat_session=chat_session,
                           text=response, sent_by_user=False)

    return JsonResponse({"session_id": chat_session.id, "input": user_input, "response": response},
                        status=200)


@require_http_methods(["GET"])
@csrf_exempt
def get_messages(request, session_id):
    try:
        chat_session = ChatSession.objects.get(id=session_id)
        messages = Message.objects.filter(chat_session=chat_session)
    except ChatSession.DoesNotExist:
        return JsonResponse({"error": "Invalid session ID."}, status=404)

    messages = [{
        "type": "in" if mes.sent_by_user else "out",
        "mes": mes.text,
        "time": 0
    }
        for mes in messages]

    return JsonResponse({"success": True, "messages": messages})
