# Usuario/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),  # Ruta de la página principal
    path('detalle/<int:id>/', views.detalle, name='detalle'),  # Otra vista
]
