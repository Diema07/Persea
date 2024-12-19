from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path('accounts/', include('allauth.urls')),  # Incluir las rutas de allauth

    path('api/usuarios/', include('apps.usuarios.urls')),  # Incluir rutas de la app usuarios
]
