from django.db import models
from django.urls import reverse
from django.contrib.auth.models import AbstractUser
from markdownx.models import MarkdownxField
from markdownx.utils import markdownify


def user_avatar_path(instance, filename):
    ext = filename.split(".")[-1]
    filename = f"{instance.username}.{ext}"
    return f"avatar_images/{filename}"


def article_preview_path(instance, filename):
    ext = filename.split(".")[-1]
    filename = f"{instance.title}.{ext}"
    return f"article_previews/{filename}"


class User(AbstractUser):
    username = models.CharField(max_length=40, unique=True)
    password = models.CharField(max_length=200)
    email = models.EmailField(default=None, blank=True, null=True)
    birth_date = models.DateField(default=None, blank=True, null=True)
    avatar = models.ImageField(upload_to=user_avatar_path, blank=True, null=True)
    created_at = models.DateField(auto_now_add=True)
    USERNAME_FIELD = "username"
    # REQUIRED_FIELDS = [""]

    def __str__(self):
        return self.username

    # def get_absolute_url(self):
    #     return reverse("profile", args=[str(self.user.username)])


class Profile(models.Model):
    user_profile = models.OneToOneField(User, on_delete=models.CASCADE)
    user_link = models.SlugField(unique=True)

    def __str__(self):
        return self.user_link


class Article(models.Model):
    title = models.CharField(max_length=50)
    preview = models.ImageField(upload_to=article_preview_path, blank=True, null=True)
    content = MarkdownxField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateField(auto_now_add=True)

    @property
    def md_content(self):
        return markdownify(self.content)

    def __str__(self):
        return self.title
