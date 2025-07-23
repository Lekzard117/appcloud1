from django.db import models
from django.contrib.auth.models import AbstractBaseUser

class Cliente(models.Model):  # O extiende de AbstractBaseUser si lo deseas más adelante
    nombre = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    creado = models.DateTimeField(auto_now_add=True)
    clave = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.nombre

    @property
    def is_authenticated(self):
        return True

class Actividad(models.Model):
    titulo = models.CharField(max_length=255)
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, related_name='actividades')
    creado = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.titulo} ({self.cliente.nombre})"
    
