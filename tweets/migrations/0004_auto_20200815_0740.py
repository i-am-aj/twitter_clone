# Generated by Django 2.2.15 on 2020-08-15 07:40

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tweets', '0003_auto_20200815_0736'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tweet',
            name='liked_by',
            field=models.ManyToManyField(related_name='liked_tweets', to=settings.AUTH_USER_MODEL),
        ),
    ]
