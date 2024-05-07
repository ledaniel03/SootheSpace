from django.db import models

# Create your models here.
class MeditationVideo(models.Model):
    CATEGORY_CHOICES = [
        ('nature', 'Nature'),
        ('binaural_beats', 'Binaural Beats'),
        ('chimes', 'Chimes')
    ]
    DURATION_CHOICES = [
        (5, '5 minutes'),
        (10, '10 minutes'),
        (25, '25 minutes')
    ]

    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    duration = models.IntegerField(choices=DURATION_CHOICES)
    video_url = models.URLField(max_length=200)

    def __str__(self):
        return f"{self.get_category_display()} - {self.duration} Minutes"