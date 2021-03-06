# Generated by Django 2.2.20 on 2021-09-20 14:19

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=250)),
            ],
            options={
                'verbose_name': 'Category',
                'verbose_name_plural': 'Categories',
            },
        ),
        migrations.CreateModel(
            name='Conversation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('topic', models.CharField(max_length=350)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='conversation.Category')),
                ('person_from', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='conversation_from', to=settings.AUTH_USER_MODEL)),
                ('person_to', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='conversation_to', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Video',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('video', models.FileField(upload_to='')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='videos', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Video',
                'verbose_name_plural': 'Videos',
            },
        ),
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('argument', models.BooleanField(default=True)),
                ('video', models.FileField(upload_to='')),
                ('conversation', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='items', to='conversation.Conversation')),
                ('listener', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='listener_item', to=settings.AUTH_USER_MODEL)),
                ('speaker', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='speaker_item', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
