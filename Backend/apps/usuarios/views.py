from google.oauth2 import id_token
from google.auth.transport import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Usuario
from django.conf import settings

# Obtener el CLIENT_ID de Google desde settings.py
CLIENT_ID = settings.GOOGLE_CLIENT_ID

@api_view(['POST'])
def google_login(request):
    """
    Maneja la autenticación de usuarios mediante Google OAuth.
    Recibe un token de Google, lo verifica y crea o actualiza el usuario en la base de datos.
    """
    token = request.data.get('token')

    # Verificar si se proporcionó un token
    if not token:
        return Response({'error': 'No se proporcionó ningún token'}, status=400)

    try:
        # Verificar el token de Google
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)

        # Extraer información del usuario desde el token
        google_id = idinfo['sub']  # ID único de Google
        name = idinfo.get('name')  # Nombre del usuario
        email = idinfo.get('email')  # Correo electrónico del usuario

        # Validar que los datos necesarios estén presentes
        if not google_id or not name or not email:
            return Response({'error': 'Datos incompletos del usuario'}, status=400)

        # Buscar o crear el usuario en la base de datos
        usuario, created = Usuario.objects.get_or_create(
            correo=email,
            defaults={
                'nombreUsuario': name,
                'idGoogle': google_id,
            }
        )

        # Si el usuario ya existe pero el idGoogle ha cambiado, actualizarlo
        if not created and usuario.idGoogle != google_id:
            usuario.idGoogle = google_id
            usuario.save()

        # Respuesta exitosa con los datos del usuario
        return Response({
            'message': 'Usuario autenticado correctamente',
            'usuario': {
                'nombreUsuario': usuario.nombreUsuario,
                'correo': usuario.correo,
                'idGoogle': usuario.idGoogle,
            }
        })

    except ValueError:
        # Manejar errores de token inválido
        return Response({'error': 'Token de Google inválido'}, status=400)