from django.db import models

class RiegoFertilizacion(models.Model):
    tipoRiego = models.CharField(max_length=30)
    fechaRiego = models.DateField()
    metodoAplicacionFertilizante = models.CharField(max_length=30)
    tipoFertilizante = models.CharField(max_length=30)
    nombreFertilizante = models.CharField(max_length=30)
    cantidadFertilizante = models.FloatField()
    medidaFertilizante = models.CharField(max_length=20)
    fechaFertilizante = models.DateField()
    idPlantacion = models.ForeignKey('plantaciones.Plantacion', on_delete=models.CASCADE, related_name='riego_fertilizacion')

    def __str__(self):
        return f"Riego/Fertilización para {self.idPlantacion.nombreParcela}"

class MantenimientoMonitoreo(models.Model):
    guadaña = models.DateField()
    necesidadArboles = models.CharField(max_length=30)
    tipoTratamiento = models.CharField(max_length=30)
    fechaAplicacionTratamiento = models.DateField()
    idPlantacion = models.ForeignKey('plantaciones.Plantacion', on_delete=models.CASCADE, related_name='mantenimiento')

    def __str__(self):
        return f"Mantenimiento de {self.idPlantacion.nombreParcela}"

class Poda(models.Model):
    tipoPoda = models.CharField(max_length=30)
    herramientasUsadas = models.CharField(max_length=60)
    tecnicasUsadas = models.CharField(max_length=60)
    fechaPoda = models.DateField()
    idPlantacion = models.ForeignKey('plantaciones.Plantacion', on_delete=models.CASCADE, related_name='podas')

    def __str__(self):
        return f"Poda de {self.idPlantacion.nombreParcela}"