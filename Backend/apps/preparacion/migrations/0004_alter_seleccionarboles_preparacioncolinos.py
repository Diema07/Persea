# Generated by Django 5.1.4 on 2025-02-26 22:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('preparacion', '0003_alter_seleccionarboles_seleccionvariedades'),
    ]

    operations = [
        migrations.AlterField(
            model_name='seleccionarboles',
            name='preparacionColinos',
            field=models.DateField(blank=True, default=None, null=True),
        ),
    ]
