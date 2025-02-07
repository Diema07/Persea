from rest_framework import serializers
from .models import Cosecha, PostCosecha

"""
    Permite la conversión de instancias de Cosecha a JSON y viceversa.
    Incluye todos los campos del modelo.
"""

class CosechaSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Cosecha  # Modelo asociado al serializador
        fields = '__all__'  # Incluir todos los campos del modelo


class PostCosechaSerializer(serializers.ModelSerializer):

    class Meta:
        model = PostCosecha  # Modelo asociado al serializador
        fields = '__all__'  # Incluir todos los campos del modelo