from django.urls import path, include
from rest_framework import routers
from apps.informes import views

router = routers.DefaultRouter()
router.register(r'Informe', views.InformeView, 'Informe')

urlpatterns = [
    path("api/v1/", include(router.urls))
]