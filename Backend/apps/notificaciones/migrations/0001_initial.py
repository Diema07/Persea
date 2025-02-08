# Generated by Django 5.1.4 on 2025-02-08 04:52

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('plantaciones', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Notificacion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tipoNotificacion', models.CharField(max_length=50)),
                ('fechaNotificacion', models.DateField()),
                ('idPlantacion', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='notificaciones', to='plantaciones.plantacion')),
            ],
        ),
    ]
