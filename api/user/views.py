from .models import User
from .serializers import UserSerializer
from rest_framework import status, response, viewsets
from rest_framework.permissions import IsAdminUser, AllowAny


class UserViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAdminUser, )
    serializer_class = UserSerializer
    queryset = User.objects.all()

