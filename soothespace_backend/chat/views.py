from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import ChatSession, Message
from django.contrib.auth.models import User
import openai

openai.api_key = 'your-openai-api-key'  # Replace with environment variables


@api_view(['POST'])
def start_chat_session(request):
    # Create a new chat session
    user = request.user if request.user.is_authenticated else User.objects.get(username='anonymous')
    chat_session = ChatSession.objects.create(user=user)

    # GPT's opening message
    opening_message = "Hi, how are you doing today?"

    # Save GPT's opening message in the database
    Message.objects.create(chat_session=chat_session, text=opening_message, sent_by_user=False)

    return Response({'session_id': chat_session.id, 'message': opening_message}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def send_message(request):
    session_id = request.data.get("session_id")
    user_input = request.data.get("input")

    try:
        chat_session = ChatSession.objects.get(id=session_id, user=request.user)
    except ChatSession.DoesNotExist:
        return Response({"error": "Invalid session ID or session does not belong to the user."},
                        status=status.HTTP_404_NOT_FOUND)

    # Save user message to database
    Message.objects.create(chat_session=chat_session, text=user_input, sent_by_user=True)

    # Here, incorporate the logic for OpenAI API call with role="assistant" and preset personality
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are a helpful AI therapist."},
            {"role": "user", "content": user_input},
        ],
    )

    # Save AI response to database
    gpt_response = response['choices'][0]['message']['content']
    Message.objects.create(chat_session=chat_session, text=gpt_response, sent_by_user=False)

    return Response({"session_id": chat_session.id, "input": user_input, "response": gpt_response},
                    status=status.HTTP_200_OK)
