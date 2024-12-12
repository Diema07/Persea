from django.db import models

class Cosecha(models.Model):
    cantidad_cosechada = models.PositiveIntegerField()
    calidad_media = models.TextField()
    fecha_cosecha = models.DateField()
    plantacion = models.ForeignKey('plantaciones.Plantacion', on_delete=models.CASCADE, related_name='cosechas')

    def __str__(self):
        return f"Cosecha de {self.plantacion.nombre_parcela} ({self.fecha_cosecha})"

class PostCosecha(models.Model):
    limpieza_frutos = models.TextField()
    cantidad_menos150 = models.PositiveIntegerField()
    cantidad_mayor250 = models.PositiveIntegerField()
    plantacion = models.ForeignKey('plantaciones.Plantacion', on_delete=models.CASCADE, related_name='post_cosecha')

    def __str__(self):
        return f"Postcosecha de {self.plantacion.nombre_parcela}"
