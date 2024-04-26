from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)
    privacy = models.BooleanField(default=False)  # False means not private, True means private

    def __str__(self):
        return self.user.username

# Signal to create or update user profile
@receiver(post_save, sender=User)
def create_or_update_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)  # If user is created, create a new profile with the user instance
    instance.profile.save() # Every time the User is created or updated, instance.profile.save() is called to save the profile
