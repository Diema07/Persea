from django.shortcuts import render
from rest_framework import viewsets
from .serializer import InformeSerializer
from .models import Informe

# Create your views here.
class InformeView(viewsets.ModelViewSet):
    serializer_class = InformeSerializer
    queryset = Informe.objects.all()