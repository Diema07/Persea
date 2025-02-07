from django.db import models

class Usuario(models.Model):
    nombreUsuario = models.CharField(max_length=150)
    correo = models.EmailField(unique=True)  # Correo electrónico único
    idGoogle = models.CharField(max_length=255, unique=True)  # ID de Google único y requerido

    def __str__(self):
        return self.nombreUsuario  # Representación legible del usuario en el admin