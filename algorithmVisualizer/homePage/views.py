from django.shortcuts import render, redirect
from django.urls import reverse


# Create your views here.

def home(request):
    return render(request, "home.html")

def about(request):
    return render(request, "about.html")

def contributors(request):
    return render(request, "contributor.html")

# def sortingAlgorithm(request):
#     # url = reverse('sortingAlgorithm:index')
#     return render(request, 'sortingAlgorithm/index.html')

