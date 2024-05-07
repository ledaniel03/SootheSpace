from django.db import models
from django.conf import settings

# Create your models here.


class Tokens(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Token {self.user.username}"
    

