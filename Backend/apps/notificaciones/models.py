from django.db import models

class Notificacion(models.Model):
    tipo_notificacion = models.CharField(max_length=100)
    fecha_notificacion = models.DateTimeField(auto_now_add=True)
    contenido = models.TextField()
    plantacion = models.ForeignKey('plantaciones.Plantacion', on_delete=models.CASCADE, related_name='notificaciones')

    def __str__(self):
        return f"Notificación: {self.tipo_notificacion} para {self.plantacion.nombre_parcela}"
