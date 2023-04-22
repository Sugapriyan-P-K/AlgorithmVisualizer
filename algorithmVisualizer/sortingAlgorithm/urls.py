from django.urls import path
from . import views


app_name = 'sortingAlgorithm'
urlpatterns = [
    path("", views.index, name="index"),
]