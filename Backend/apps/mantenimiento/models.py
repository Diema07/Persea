from django.db import models

class RiegoFertilizacion(models.Model):
    tipoRiego = models.CharField(max_length=30, null=True, blank=True)
    fechaRiego = models.DateField( null=True, blank=True)
    metodoAplicacionFertilizante = models.CharField(max_length=30, null=True, blank=True)
    tipoFertilizante = models.CharField(max_length=30, null=True, blank=True)
    nombreFertilizante = models.CharField(max_length=30, null=True, blank=True)
    cantidadFertilizante = models.FloatField( null=True, blank=True)
    medidaFertilizante = models.CharField(max_length=20, null=True, blank=True)
    fechaFertilizante = models.DateField( null=True, blank=True)
    idPlantacion = models.ForeignKey('plantaciones.Plantacion', on_delete=models.CASCADE, related_name='riego_fertilizacion')

    def __str__(self):
        return f"Riego/Fertilización para {self.idPlantacion.nombreParcela}"

class MantenimientoMonitoreo(models.Model):
    TIPO_TRATAMIENTO_CHOICES = [
        ('insecticida', 'Insecticida'),
        ('fungicida', 'Fungicida'),
        ('herbicida', 'Herbicida'),
    ]

    guadana = models.DateField( null=True, blank=True)
    necesidadArboles = models.CharField(max_length=30, null=True, blank=True)
    # Ahora tipoTratamiento es un CharField con opciones
    tipoTratamiento = models.CharField(
        max_length=30, null=True, blank=True,
        choices=TIPO_TRATAMIENTO_CHOICES
    )
    fechaAplicacionTratamiento = models.DateField( null=True, blank=True)
    idPlantacion = models.ForeignKey(
        'plantaciones.Plantacion',
        on_delete=models.CASCADE,
        related_name='mantenimiento'
    )

    def __str__(self):
        return f"Mantenimiento de {self.idPlantacion.nombreParcela}"


class Poda(models.Model):
    tipoPoda = models.CharField(max_length=30, null=True, blank=True)
    herramientasUsadas = models.CharField(max_length=60, null=True, blank=True)
    tecnicasUsadas = models.CharField(max_length=60, null=True, blank=True)
    fechaPoda = models.DateField( null=True, blank=True)
    idPlantacion = models.ForeignKey('plantaciones.Plantacion', on_delete=models.CASCADE, related_name='podas')

    def __str__(self):
        return f"Poda de {self.idPlantacion.nombreParcela}"