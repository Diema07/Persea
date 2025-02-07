from django.db import models

class Cosecha(models.Model):
    cantidadCosechada = models.FloatField()
    calidadMediaCosechada = models.CharField(max_length=60)
    fechaCosecha = models.DateField()
    idPlantacion = models.ForeignKey('plantaciones.Plantacion', on_delete=models.CASCADE, related_name='cosechas')

    def __str__(self):
        return f"Cosecha de {self.idPlantacion.nombreParcela}"

class PostCosecha(models.Model):
    cantidadMenos150 = models.IntegerField()
    cantidadMenos250 = models.IntegerField()
    cantidadMayor250 = models.IntegerField()
    idPlantacion = models.ForeignKey('plantaciones.Plantacion', on_delete=models.CASCADE, related_name='post_cosecha')

    def __str__(self):
        return f"Postcosecha de {self.idPlantacion.nombreParcela}"