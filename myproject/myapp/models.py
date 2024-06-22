from django.contrib.auth.models import AbstractUser
from django.db import models

class Organization(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class User(AbstractUser):
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, related_name='users')
