from django.db import models

class PreparacionTerreno(models.Model):
    analisis_suelo = models.TextField()
    correccion_suelo = models.TextField()
    labranza = models.TextField()
    delimitacion_parcela = models.TextField()
    fecha_preparacion = models.DateField()
    plantacion = models.ForeignKey('plantaciones.Plantacion', on_delete=models.CASCADE, related_name='preparaciones')

    def __str__(self):
        return f"Preparación de {self.plantacion.nombre_parcela}"

class SeleccionArboles(models.Model):
    seleccion_variedades = models.TextField()
    preparacion_colinos = models.TextField()
    plantacion = models.ForeignKey('plantaciones.Plantacion', on_delete=models.CASCADE, related_name='seleccion_arboles')

    def __str__(self):
        return f"Selección de árboles para {self.plantacion.nombre_parcela}"
