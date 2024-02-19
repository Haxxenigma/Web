from .models import User
from django.contrib.auth.forms import UserCreationForm, UserChangeForm


class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = User
        fields = ["username", "email", "password1", "password2", "birth_date", "avatar"]


class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = User
        fields = ["username", "email", "birth_date", "avatar"]