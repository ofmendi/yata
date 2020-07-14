from rest_framework import routers
from django.urls import path, include
from .views import NotificationViewSet

urlpatterns = [
    path('notifications', NotificationViewSet.as_view()),
]
