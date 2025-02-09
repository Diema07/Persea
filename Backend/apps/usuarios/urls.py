# usuarios/urls.py
from django.urls import path, include  # Importar include
from .views import get_csrf_token, get_user_token  # Importar la vista

urlpatterns = [
    path('auth/', include('allauth.urls')),  # Rutas de allauth
    path('get-csrf-token/', get_csrf_token, name='get_csrf_token'),  # Nueva ruta para obtener el token CSRF
    path('get_user_token/', get_user_token),
    path('get_user_token/', get_user_token)  # Ruta completa: /api/usuarios/get_user_token/
]