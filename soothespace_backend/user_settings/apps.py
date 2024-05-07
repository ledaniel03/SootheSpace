# user_settings/apps.py
from django.apps import AppConfig

class UserSettingsConfig(AppConfig):
    name = 'user_settings'

    def ready(self):
        from . import signals  # ensure the signal is ready
