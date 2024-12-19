from google.oauth2 import id_token
from google.auth.transport import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Usuario
from django.db import IntegrityError
from django.conf import settings

CLIENT_ID = settings.GOOGLE_CLIENT_ID  # Obteniendo el clientID desde settings.py

@api_view(['POST'])
def google_login(request):
    token = request.data.get('token')

    if not token:
        return Response({'error': 'No se proporcionó ningún token'}, status=400)

    try:
        # Verificar el token de Google
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)

        # Extraer información del usuario
        google_id = idinfo['sub']
        name = idinfo.get('name')
        email = idinfo.get('email')

        if not google_id or not name or not email:
            return Response({'error': 'Datos incompletos del usuario'}, status=400)

        # Buscar el usuario en la base de datos o crearlo
        usuario, created = Usuario.objects.get_or_create(correo=email, defaults={
            'nombreUsuario': name,
            'idGoogle': google_id,
        })

        # Si el usuario existe pero el idGoogle ha cambiado, actualizarlo
        if not created and usuario.idGoogle != google_id:
            usuario.idGoogle = google_id
            usuario.save()

        return Response({
            'message': 'Usuario autenticado correctamente',
            'usuario': {
                'nombreUsuario': usuario.nombreUsuario,
                'correo': usuario.correo,
                'idGoogle': usuario.idGoogle,
            }
        })

    except ValueError:
        return Response({'error': 'Token de Google inválido'}, status=400)
