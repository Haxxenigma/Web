from django.views import generic
from .models import User


class IndexView(generic.ListView):
    template_name = "appname/index.html"
    context_object_name = "latest_users"

    def get_queryset(self):
        """Return the last five registered users."""
        return User.objects.order_by("-date")[:5]


class DetailView(generic.DetailView):
    model = User
    template_name = "appname/detail.html"