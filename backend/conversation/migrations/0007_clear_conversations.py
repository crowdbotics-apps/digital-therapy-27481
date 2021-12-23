from django.db import migrations
from conversation.models import Conversation


def delete_all_conversations(_, __):
    Conversation.objects.all().delete()


class Migration(migrations.Migration):
    dependencies = [
        ('conversation', '0006_auto_20211216_0820'),
    ]
    operations = [
        migrations.RunPython(
            delete_all_conversations, reverse_code=migrations.RunPython.noop
        )
    ]
