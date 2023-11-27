from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required
from django.forms.models import BaseModelForm
from django.http import HttpResponse
from django.shortcuts import render, redirect, get_object_or_404
from django.utils.decorators import method_decorator
from django.urls import reverse
from django.views.generic import (
    CreateView,
    DetailView,
    UpdateView,
    DeleteView,
    ListView,
)
from ProjectDiplom.settings import MEDIA_ROOT
from .forms import CustomUserCreationForm, CustomUserChangeForm
from .models import User, Profile, Article
from django.db.models import Q
from PIL import Image
import os


@login_required
def profile(request, user_link):
    profile = get_object_or_404(Profile, user_link=user_link)
    articles = Article.objects.filter(author=profile.user_profile)
    context = {"profile": profile, "articles": articles}
    return render(request, "blog/profile.html", context)


def profile_update(request, user_link):
    user = request.user

    if user.username != user_link:
        return render(request, "blog/forbidden.html")

    if request.method == "POST":
        form = CustomUserChangeForm(request.POST, request.FILES, instance=user)
        old_avatar = user.avatar

        if form.is_valid():
            if old_avatar != user.avatar:
                old_avatar = os.path.join(MEDIA_ROOT, str(old_avatar))
                if os.path.isfile(old_avatar):
                    os.remove(old_avatar)
            form.save()
            return redirect(reverse("profile", args=[user.username]))
    else:
        form = CustomUserChangeForm(instance=user)

    return render(request, "blog/profile_update.html", {"form": form})


def register(request):
    if request.method == "POST":
        form = CustomUserCreationForm(request.POST, request.FILES)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect(reverse("profile", args=[user.username]))
    else:
        form = CustomUserCreationForm()

    return render(request, "registration/register.html", {"form": form})


def login_view(request):
    error_message = None

    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect(reverse("profile", args=[user.username]))
        else:
            error_message = "Неверное имя пользователя или пароль."

    return render(request, "registration/login.html", {"error_message": error_message})


def logout_view(request):
    logout(request)
    return redirect("/")


class ArticleListView(ListView):
    model = Article
    template_name = "blog/article_list.html"
    context_object_name = "articles"

    def get_queryset(self):
        queryset = super().get_queryset()
        query = self.request.GET.get("q")

        if query:
            queryset = queryset.filter(
                Q(title__icontains=query) | Q(content__icontains=query)
            )
        return queryset


@method_decorator(login_required, name="dispatch")
class ArticleCreateView(CreateView):
    model = Article
    fields = ["title", "preview", "content"]
    template_name = "blog/article_create.html"
    success_url = "/"

    def form_valid(self, form):
        form.instance.author = self.request.user
        return super().form_valid(form)


@method_decorator(login_required, name="dispatch")
class ArticleDetailView(DetailView):
    model = Article
    template_name = "blog/article_detail.html"


def is_author(user, article_id):
    try:
        article = Article.objects.get(pk=article_id)
        return article.author == user
    except Article.DoesNotExist:
        return False


class ArticleUpdateView(UpdateView):
    model = Article
    fields = ["title", "preview", "content"]
    template_name = "blog/article_update.html"

    def get_success_url(self):
        return reverse("article_detail", kwargs={"pk": self.object.pk})

    @method_decorator(login_required)
    def dispatch(self, request, *args, **kwargs):
        if is_author(request.user, self.kwargs["pk"]):
            return super().dispatch(request, *args, **kwargs)
        else:
            return render(request, "blog/forbidden.html")


class ArticleDeleteView(DeleteView):
    model = Article
    template_name = "blog/article_delete.html"
    success_url = "/"

    @method_decorator(login_required)
    def dispatch(self, request, *args, **kwargs):
        if is_author(request.user, self.kwargs["pk"]):
            return super().dispatch(request, *args, **kwargs)
        else:
            return render(request, "blog/forbidden.html")
