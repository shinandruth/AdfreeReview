from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class MyModel(models.Model):
    name = models.CharField(max_length=64)

    def __str__(self):
        return self.name
