# Generated by Django 5.1.4 on 2024-12-14 02:15

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('usuarios', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Plantacion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombreParcela', models.CharField(max_length=50)),
                ('fechaPlantacion', models.DateField()),
                ('estado', models.BooleanField(default=True)),
                ('idUsuario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='plantaciones', to='usuarios.usuario')),
            ],
        ),
    ]
