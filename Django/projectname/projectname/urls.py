from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("appname/", include("appname.urls")),
    path("admin/", admin.site.urls),
]