from django.db import migrations

from users.models import User


def clean_users_table(_, __):
    User.objects.exclude(username='crowdbotics').delete()


class Migration(migrations.Migration):
    dependencies = [
        ("users", "0006_user_is_member")
    ]

    operations = [
        migrations.RunPython(clean_users_table, reverse_code=migrations.RunPython.noop)
    ]
