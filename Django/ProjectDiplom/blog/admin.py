from django.contrib import admin
from .models import User, Profile, Article
from markdownx.admin import MarkdownxModelAdmin

admin.site.register(User)
admin.site.register(Profile)
admin.site.register(Article, MarkdownxModelAdmin)