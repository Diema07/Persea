from django.shortcuts import render
from rest_framework import viewsets
from .serializer import PlantacionSerializer
from .models import Plantacion

# Create your views here.
class PlantacionView(viewsets.ModelViewSet):
    serializer_class = PlantacionSerializer
    queryset = Plantacion.objects.all()