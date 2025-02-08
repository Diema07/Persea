# views.py en la app usuarios
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from google.oauth2 import id_token
from google.auth.transport import requests
from .models import Usuario
from .serializer import UsuarioSerializer
from django.conf import settings

CLIENT_ID = settings.GOOGLE_CLIENT_ID

@api_view(['POST'])
def google_login(request):
    token = request.data.get('token')

    if not token:
        return Response({'error': 'No se proporcionó ningún token'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)
        google_id = idinfo['sub']
        name = idinfo.get('name')
        email = idinfo.get('email')

        if not google_id or not name or not email:
            return Response({'error': 'Datos incompletos del usuario'}, status=status.HTTP_400_BAD_REQUEST)

        usuario, created = Usuario.objects.get_or_create(
            correo=email,
            defaults={
                'nombreUsuario': name,
                'idGoogle': google_id,
            }
        )

        if not created and usuario.idGoogle != google_id:
            usuario.idGoogle = google_id
            usuario.save()

        serializer = UsuarioSerializer(usuario)
        return Response({
            'message': 'Usuario autenticado correctamente',
            'usuario': serializer.data
        }, status=status.HTTP_200_OK)

    except ValueError:
        return Response({'error': 'Token de Google inválido'}, status=status.HTTP_400_BAD_REQUEST)