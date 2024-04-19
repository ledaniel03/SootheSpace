from django.db import models

# Create your models here.
class Entry(models.Model):
    id = models.AutoField(primary_key=True) # auto incrementing primary key
    user = models.CharField(max_length=16, default='')  # WILL be a foreign key to our inbuilt django user model
    time = models.BigIntegerField(default=0) # Use serializer if setting time to DateTimeField & auto_now_add=True
    mood = models.CharField(max_length=16, default='')
    activity = models.CharField(max_length=16, default='')
    val = models.TextField(max_length=2000, default='') # Journal entry



    def __str__(self): # This is a string representation of the object (debugging purposes & admin panel)
        return f'{self.user}: {self.val}'
