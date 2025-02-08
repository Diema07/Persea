# apps/plantaciones/views.py
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated  # Importa el permiso
from .serializer import PlantacionSerializer
from .models import Plantacion

class PlantacionView(viewsets.ModelViewSet):
    serializer_class = PlantacionSerializer
    permission_classes = [IsAuthenticated]  # Se requiere autenticación

    def get_queryset(self):
        # Muestra solo las plantaciones del usuario autenticado
        return Plantacion.objects.filter(idUsuario=self.request.user)

    def perform_create(self, serializer):
        # Al crear, se asigna el usuario autenticado al campo idUsuario
        serializer.save(idUsuario=self.request.user)
