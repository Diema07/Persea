from django.db import models

class RiegoFertilizacion(models.Model):
    tipo_riego = models.CharField(max_length=100)
    fecha_riego = models.DateField()
    tipo_fertilizante = models.CharField(max_length=100)
    metodo_aplicacion = models.TextField()
    cantidad_fertilizante = models.DecimalField(max_digits=10, decimal_places=2)
    plantacion = models.ForeignKey('plantaciones.Plantacion', on_delete=models.CASCADE, related_name='riego_fertilizacion')

    def __str__(self):
        return f"Riego/Fertilización para {self.plantacion.nombre_parcela}"

class MantenimientoMonitoreo(models.Model):
    tipo_tratamiento = models.CharField(max_length=100)
    estado_planta = models.TextField()
    fecha_aplicacion = models.DateField()
    plantacion = models.ForeignKey('plantaciones.Plantacion', on_delete=models.CASCADE, related_name='mantenimiento')

    def __str__(self):
        return f"Mantenimiento de {self.plantacion.nombre_parcela}"

class Poda(models.Model):
    tipo_poda = models.CharField(max_length=100)
    herramientas_usadas = models.TextField()
    fecha_poda = models.DateField()
    plantacion = models.ForeignKey('plantaciones.Plantacion', on_delete=models.CASCADE, related_name='podas')

    def __str__(self):
        return f"Poda de {self.plantacion.nombre_parcela}"
