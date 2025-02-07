from django.shortcuts import render
from rest_framework import viewsets
from .serializer import PreparacionTerrenoSerializer, SeleccionArbolesSerializer
from .models import PreparacionTerreno, SeleccionArboles

# Create your views here.
class PreparacionTerrenoView(viewsets.ModelViewSet):
    serializer_class = PreparacionTerrenoSerializer
    queryset = PreparacionTerreno.objects.all()

class SeleccionArbolesView(viewsets.ModelViewSet):
    serializer_class = SeleccionArbolesSerializer
    queryset = SeleccionArboles.objects.all()