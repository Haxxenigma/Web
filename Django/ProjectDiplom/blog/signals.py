from django.db.models.signals import post_save
from django.db.models.signals import pre_save
from django.dispatch import receiver
from .models import User, Profile


@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user_profile=instance, user_link=instance.username)


@receiver(post_save, sender=User)
def save_profile(sender, instance, **kwargs):
    instance.profile.save()


@receiver(pre_save, sender=User)
def update_profile(sender, instance, **kwargs):
    if instance.pk is not None:
        old_user = User.objects.get(pk=instance.pk)
        if old_user.username != instance.username:
            instance.profile.user_link = instance.username
            instance.profile.save()