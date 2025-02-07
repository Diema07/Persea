from rest_framework import viewsets
from .serializer import CosechaSerializer, PostCosechaSerializer
from .models import Cosecha, PostCosecha

"""
    Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre las instancias de Cosecha.
    Utiliza el serializador para convertir los datos entre JSON y el modelo.
"""

class CosechaView(viewsets.ModelViewSet):

    serializer_class = CosechaSerializer  # Serializador asociado a la vista
    queryset = Cosecha.objects.all()  # Consulta que devuelve todas las instancias de Cosecha


class PostCosechaView(viewsets.ModelViewSet):

    serializer_class = PostCosechaSerializer  # Serializador asociado a la vista
    queryset = PostCosecha.objects.all()  # Consulta que devuelve todas las instancias de PostCosecha