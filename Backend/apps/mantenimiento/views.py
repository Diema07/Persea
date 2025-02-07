from django.shortcuts import render
from rest_framework import viewsets
from .serializer import RiegoFertilizacionSerializer, MantenimientoMonitoreoSerializer, PodaSerializer
from .models import RiegoFertilizacion, MantenimientoMonitoreo, Poda

# Create your views here.
class RiegoFertilizacionView(viewsets.ModelViewSet):
    serializer_class = RiegoFertilizacionSerializer
    queryset = RiegoFertilizacion.objects.all()

class MantenimientoMonitoreoView(viewsets.ModelViewSet):
    serializer_class = MantenimientoMonitoreoSerializer
    queryset = MantenimientoMonitoreo.objects.all()

class PodaView(viewsets.ModelViewSet):
    serializer_class = PodaSerializer
    queryset = Poda.objects.all()