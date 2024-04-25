from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import UserProfile

@receiver(post_save, sender=User)
def create_or_update_user_profile(sender, instance, created, **kwargs):
    """Ensure only one UserProfile per User; create if new, update if exists."""
    if created:
        # Only create a new profile if the user is newly created
        UserProfile.objects.create(user=instance)
    else:
        # Update the profile if it already exists, this ensures we do not attempt to recreate it
        UserProfile.objects.update_or_create(user=instance)
