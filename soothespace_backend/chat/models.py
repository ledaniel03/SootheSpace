from django.db import models
from django.conf import settings

class ChatSession(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Session {self.id} - User {self.user.username}"

class Message(models.Model):
    chat_session = models.ForeignKey(ChatSession, related_name='messages', on_delete=models.CASCADE)
    text = models.TextField()
    sent_by_user = models.BooleanField(default=True)  # True if sent by user, False if sent by AI
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        sender = "User" if self.sent_by_user else "AI"
        return f"Message {self.id} by {sender} - Session {self.chat_session.id}"
