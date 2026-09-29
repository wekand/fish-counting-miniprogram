from django.urls import path
from . import views

urlpatterns = [
    path('fishbase/', views.fish_base),
    path('upload/', views.upload),
]
