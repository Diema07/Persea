# Generated by Django 5.1.4 on 2024-12-12 17:57

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('plantaciones', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='MantenimientoMonitoreo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tipo_tratamiento', models.CharField(max_length=100)),
                ('estado_planta', models.TextField()),
                ('fecha_aplicacion', models.DateField()),
                ('plantacion', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='mantenimiento', to='plantaciones.plantacion')),
            ],
        ),
        migrations.CreateModel(
            name='Poda',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tipo_poda', models.CharField(max_length=100)),
                ('herramientas_usadas', models.TextField()),
                ('fecha_poda', models.DateField()),
                ('plantacion', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='podas', to='plantaciones.plantacion')),
            ],
        ),
        migrations.CreateModel(
            name='RiegoFertilizacion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tipo_riego', models.CharField(max_length=100)),
                ('fecha_riego', models.DateField()),
                ('tipo_fertilizante', models.CharField(max_length=100)),
                ('metodo_aplicacion', models.TextField()),
                ('cantidad_fertilizante', models.DecimalField(decimal_places=2, max_digits=10)),
                ('plantacion', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='riego_fertilizacion', to='plantaciones.plantacion')),
            ],
        ),
    ]