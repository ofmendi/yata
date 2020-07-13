from django.urls import path, include
from .views import UserViewSet, RegistrationView, WhoamiView, LogOutView
from rest_framework import routers

router = routers.DefaultRouter()
router.register('users', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('registration/', RegistrationView.as_view()),
    path('whoami/', WhoamiView.as_view()),
    path('logout/', LogOutView.as_view()),
]
