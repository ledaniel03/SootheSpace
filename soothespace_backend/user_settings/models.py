# user_settings/models.py
from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    avatar = models.ImageField(upload_to='user_avatars/', null=True, blank=True)
    completed_meditations = models.IntegerField(default=0)

    @property
    def has_star(self):
        return self.completed_meditations >= 5

    def __str__(self):
        return f"{self.user.username}'s profile - {'Star' if self.has_star else 'No Star'}"
