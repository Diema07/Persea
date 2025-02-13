from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path('accounts/', include('allauth.urls')),  # Incluir las rutas de allauth

    path('api/usuarios/', include('apps.usuarios.urls')),  # Incluir rutas de la app usuarios
    path('plantaciones/', include('apps.plantaciones.urls')), #Incluir rutas de la app plantaciones
    path('produccion/', include('apps.produccion.urls')),  # Incluir rutas de la app produccion
    path('preparacion/', include('apps.preparacion.urls')),  # Incluir rutas de la app preparacion
    path('notificaciones/', include('apps.notificaciones.urls')),  # Incluir rutas de la app notificaciones
    path('mantenimiento/', include('apps.mantenimiento.urls')),  # Incluir rutas de la app mantenimiento
    path('informes/', include('apps.informes.urls'))  # Incluir rutas de la app informes
]

