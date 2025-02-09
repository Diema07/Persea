# apps/plantaciones/serializers.py
from rest_framework import serializers
from .models import Plantacion

class PlantacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plantacion
        fields = ['id', 'nombreParcela', 'fechaPlantacion', 'estado', 'idUsuario']
        read_only_fields = ['fechaPlantacion', 'estado', 'idUsuario']  # Campos automáticos
        extra_kwargs = {
            'nombreParcela': {
                'required': True,
                'allow_blank': False,
                'min_length': 3,
                'error_messages': {
                    'required': 'El nombre de la parcela es obligatorio',
                    'min_length': 'Mínimo 3 caracteres',
                    'blank': 'No puede estar vacío'
                }
            }
        }