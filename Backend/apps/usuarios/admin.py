from django.contrib import admin
from .models import Usuario  # Importa tu modelo existente

@admin.register(Usuario)
class UsuarioAdmin(admin.ModelAdmin):
    # Campos que se mostrarán en la lista de objetos
    list_display = ('id', 'nombreUsuario', 'correo', 'idGoogle')
    # Campos por los que se puede buscar
    search_fields = ('nombreUsuario', 'correo')
    # Opciones para filtrar en la lista (si necesitas más control)
    list_filter = ('correo',)
    # Ordenar los usuarios por ID
    ordering = ('id',)
    # Hacer campos solo de lectura, si es necesario
    readonly_fields = ('id',)
