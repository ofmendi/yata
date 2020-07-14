from rest_framework import routers
from django.urls import path, include
from .views import ReminderView


urlpatterns = [
    path('reminder/', ReminderView.as_view()),
]
