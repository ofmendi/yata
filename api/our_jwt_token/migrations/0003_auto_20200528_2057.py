# Generated by Django 3.0.6 on 2020-05-28 17:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('our_jwt_token', '0002_auto_20200528_2049'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blacklistedtoken',
            name='token_id',
            field=models.CharField(max_length=36),
        ),
    ]
