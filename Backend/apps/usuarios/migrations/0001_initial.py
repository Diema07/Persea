# Generated by Django 5.1.4 on 2024-12-12 17:57

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Usuario',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('nombreUsuario', models.CharField(max_length=150)),
                ('correo', models.EmailField(max_length=254, unique=True)),
                ('idGoogle', models.CharField(max_length=255, unique=True)),
            ],
        ),
    ]
