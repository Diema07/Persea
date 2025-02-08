# serializers.py en la app usuarios
from rest_framework import serializers
from .models import Usuario

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['nombreUsuario', 'correo', 'idGoogle']