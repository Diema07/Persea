from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Usuario
from django.db import IntegrityError
from django.http import JsonResponse

@api_view(['POST'])
def google_login(request):
    # Obtener los datos enviados desde el frontend (token de Google, nombre y correo)
    data = request.data
    google_id = data.get('googleId')  # ID de Google
    name = data.get('name')  # Nombre del usuario
    email = data.get('email')  # Correo electrónico del usuario

    if not google_id or not name or not email:
        return Response({'error': 'Datos incompletos'}, status=400)

    # Verificar si el usuario ya existe en la base de datos
    usuario = Usuario.objects.filter(correo=email).first()

    if not usuario:
        # Si el usuario no existe, crearlo
        try:
            usuario = Usuario.objects.create(
                nombreUsuario=name,
                correo=email,
                idGoogle=google_id
            )
            usuario.save()
        except IntegrityError:
            return Response({'error': 'Error al crear el usuario'}, status=400)

    # Si el usuario ya existe, actualizar el idGoogle si es diferente
    elif usuario.idGoogle != google_id:
        usuario.idGoogle = google_id
        usuario.save()

    return Response({
        'message': 'Usuario autenticado correctamente',
        'usuario': {
            'nombreUsuario': usuario.nombreUsuario,
            'correo': usuario.correo,
            'idGoogle': usuario.idGoogle
        }
    })
