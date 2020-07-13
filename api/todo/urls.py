from rest_framework import routers
from django.urls import path, include
from .views import TodoViewSet

router = routers.DefaultRouter()
router.register('todos', TodoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
