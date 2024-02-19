from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

handler404 = "ProjectDiplom.views.not_found_view"

urlpatterns = [
    path("", include("blog.urls")),
    path("admin/", admin.site.urls),
    path("markdownx/", include("markdownx.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)