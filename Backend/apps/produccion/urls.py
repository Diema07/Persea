from django.urls import path, include
from rest_framework import routers
from apps.produccion import views

# Configuración del enrutador de Django REST Framework
router = routers.DefaultRouter()

# Registrar las vistas en el enrutador
# Esto permite generar automáticamente las rutas para las operaciones CRUD (Crear, Leer, Actualizar, Eliminar)
# de los modelos Cosecha y PostCosecha.

# Registro de la vista CosechaView:
# - 'Cosecha': Es el prefijo de la URL para acceder a esta vista.
# - views.CosechaView: La vista asociada al modelo Cosecha.
# - 'Cosecha': Nombre de la ruta (opcional, usado para generar nombres de URL).
router.register(r'Cosecha', views.CosechaView, 'Cosecha')

# Registro de la vista PostCosechaView:
# - 'PostCosecha': Es el prefijo de la URL para acceder a esta vista.
# - views.PostCosechaView: La vista asociada al modelo PostCosecha.
# - 'PostCosecha': Nombre de la ruta (opcional, usado para generar nombres de URL).
router.register(r'PostCosecha', views.PostCosechaView, 'PostCosecha')

# Definición de las rutas principales de la API
urlpatterns = [
    # Incluir las rutas generadas por el enrutador bajo el prefijo 'api/v1/'.
    # Esto significa que todas las rutas de Cosecha y PostCosecha estarán disponibles en:
    # - /api/v1/Cosecha/ para operaciones relacionadas con Cosecha.
    # - /api/v1/PostCosecha/ para operaciones relacionadas con PostCosecha.
    path("api/v1/", include(router.urls))
]