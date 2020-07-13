from .models import User
from .serializers import UserSerializer
from rest_framework import status, response, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, AllowAny


class UserViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAdminUser, )
    serializer_class = UserSerializer
    queryset = User.objects.all()


class RegistrationView(APIView):

    permission_classes = (AllowAny, )
    serializer_class = UserSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        data = serializer.validated_data
        User.objects.create_user(
            email=data['email'],
            username=data['username'],
            password=data['password']
        )
        return Response({
            "message": f'User {data["username"]} has been created.',
        }, status=status.HTTP_201_CREATED)
