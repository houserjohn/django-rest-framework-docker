from django.db import models

# Create your models here.

# Source table
# name (string), organization (string), email (string), phone (string), notes (string)

class Source(models.Model):
    name = models.CharField(max_length=30)
    organization = models.CharField(max_length=30)
    email = models.CharField(max_length=30)
    phone = models.CharField(max_length=20)
    notes = models.CharField(max_length=100)
