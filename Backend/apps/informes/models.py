from django.db import models

class Informe(models.Model):
    tipo_informe = models.CharField(max_length=100)
    fecha_generacion = models.DateField(auto_now_add=True)
    datos_analizados = models.TextField()
    plantacion = models.ForeignKey('plantaciones.Plantacion', on_delete=models.CASCADE, related_name='informes')

    def __str__(self):
        return f"Informe {self.tipo_informe} de {self.plantacion.nombre_parcela}"
