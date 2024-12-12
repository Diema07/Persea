from django.db import models

class Plantacion(models.Model):
    nombre_parcela = models.CharField(max_length=100)
    fecha_plantacion = models.DateField()
    usuario = models.ForeignKey('usuarios.Usuario', on_delete=models.CASCADE, related_name='plantaciones')

    def __str__(self):
        return self.nombre_parcela
