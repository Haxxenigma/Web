from django.urls import path
from . import views

urlpatterns = [
    path("", views.ArticleListView.as_view(), name="article_list"),
    path("accounts/register/", views.register, name="register"),
    path("accounts/login/", views.login_view, name="login"),
    path("accounts/logout/", views.logout_view, name="logout"),
    path("<str:user_link>/", views.profile, name="profile"),
    path("<str:user_link>/update/", views.profile_update, name="profile_update"),
    path("article/create/", views.ArticleCreateView.as_view(), name="article_create"),
    path("article/<int:pk>/", views.ArticleDetailView.as_view(), name="article_detail"),
    path(
        "article/<int:pk>/update/",
        views.ArticleUpdateView.as_view(),
        name="article_update",
    ),
    path(
        "article/<int:pk>/delete/",
        views.ArticleDeleteView.as_view(),
        name="article_delete",
    ),
]
