# apps/usuarios/views.py
from django.http import JsonResponse
from django.middleware.csrf import get_token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

# Vista para CSRF (ya la tienes)
def get_csrf_token(request):
    return JsonResponse({'csrfToken': get_token(request)})

# Vista para obtener el token de autenticación de DRF (¡NUEVA!)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_token(request):
    token, created = Token.objects.get_or_create(user=request.user)  # Obtener o crear token
    return Response({'token': token.key})