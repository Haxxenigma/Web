from django.shortcuts import render


def not_found_view(request, exception):
    return render(request, "not_found.html", status=404)
