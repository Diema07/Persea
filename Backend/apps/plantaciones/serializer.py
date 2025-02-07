from rest_framework import serializers
from .models import Plantacion

class PlantacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plantacion

        fields = '__all__'