from django.db import models
from django.utils import timezone


class User(models.Model):
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=100)
    date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.username