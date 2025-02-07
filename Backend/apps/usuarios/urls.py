from django.urls import path
from .views import google_login

urlpatterns = [
    path('auth/google/', google_login, name='google-login'),  # URL para autenticación con Google
]
