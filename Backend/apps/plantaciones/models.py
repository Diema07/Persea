from django.db import models

class Plantacion(models.Model):
    nombreParcela = models.CharField(max_length=50)
    fechaPlantacion = models.DateField(auto_now_add=True)  # Fecha automática
    estado = models.BooleanField(default=True)
    idUsuario = models.ForeignKey('usuarios.Usuario', on_delete=models.CASCADE, related_name='plantaciones')

    def __str__(self):
        return f"{self.nombreParcela} ({'Activa' if self.estado else 'Inactiva'})"