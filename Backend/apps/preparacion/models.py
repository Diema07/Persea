from django.db import models

class PreparacionTerreno(models.Model):
    limpiezaTerreno = models.DateField()
    analisisSuelo = models.DateField()
    correcionSuelo = models.DateField()
    labranza = models.DateField()
    delimitacionParcela = models.FloatField()
    idPlantacion = models.ForeignKey('plantaciones.Plantacion', on_delete=models.CASCADE, related_name='preparaciones')

    def __str__(self):
        return f"Preparación de {self.idPlantacion.nombreParcela}"

class SeleccionArboles(models.Model):
    seleccionVariedades = models.CharField(max_length=30)
    preparacionColinos = models.DateField()
    excavacionHoyos = models.DateField()
    plantacion = models.DateField()
    idPlantacion = models.ForeignKey('plantaciones.Plantacion', on_delete=models.CASCADE, related_name='seleccion_arboles')

    def __str__(self):
        return f"Selección de árboles para {self.idPlantacion.nombreParcela}"