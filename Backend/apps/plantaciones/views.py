# apps/plantaciones/views.py
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .serializer import PlantacionSerializer
from .models import Plantacion

class PlantacionView(viewsets.ModelViewSet):
    serializer_class = PlantacionSerializer
    permission_classes = [IsAuthenticated]  # Se requiere autenticación

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return Plantacion.objects.filter(idUsuario=self.request.user)
        return Plantacion.objects.none()  # No devuelve nada si no está autenticado

    def create(self, request):
        if self.request.user.is_authenticated:
            print(f"self.request.user ={self.request.user}")
            serializer.save(idUsuario=self.request.user)
        else:
            raise PermissionError("El usuario no está autenticado.")
