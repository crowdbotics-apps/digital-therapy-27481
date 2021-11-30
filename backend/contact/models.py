import random
import string
from django.db import models
from model_utils import Choices


def generate_code():
    return ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(6))


class ContactQueryset(models.QuerySet):
    def add_friend(self, user, friend):
        if hasattr(user, 'contacts'):
            contact = user.contacts
        else:
            contact = self.create(user=user)
        contact.friends.add(friend)


class Contact(models.Model):
    user = models.OneToOneField('users.User', related_name='contacts', on_delete=models.CASCADE)
    invite_code = models.CharField(max_length=20, null=True, blank=True)
    friends = models.ManyToManyField('users.User', blank=True)
    objects = ContactQueryset.as_manager()

    def save(self, *args, **kwargs):
        if not self.invite_code:
            self.invite_code = generate_code()
        super(Contact, self).save(*args, **kwargs)


LEVELS = Choices('accepted', 'pending', 'rejected', )


class InvitationQueryset(models.QuerySet):
    def update_status(self, invitee, inviter, status):
        invitation_qs = self.filter(invitee=invitee, inviter=inviter)
        if not invitation_qs.exists():
            return False
        invitation = invitation_qs.first()
        invitation.status = status
        invitation.save()
        if status == LEVELS.accepted:  # add user to contact list
            Contact.objects.add_friend(invitee, inviter)
            Contact.objects.add_friend(inviter, invitee)
        return True


class Invitation(models.Model):
    invitee = models.ForeignKey('users.User', related_name='invitations_invitee', on_delete=models.CASCADE)
    inviter = models.ForeignKey('users.User', related_name='invitations_inviter', on_delete=models.CASCADE)
    invite_code = models.CharField(max_length=20, null=True, blank=True)

    status = models.CharField(choices=LEVELS, default=LEVELS.pending, max_length=20)

    objects = InvitationQueryset.as_manager()

    def save(self, *args, **kwargs):
        if not self.invite_code:
            self.invite_code = generate_code()
        super(Invitation, self).save(*args, **kwargs)
