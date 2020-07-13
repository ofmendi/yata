from .models import User
from .serializers import UserSerializer
from rest_framework import status, response, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, AllowAny
from rest_framework_jwt.utils import jwt_decode_handler
from our_jwt_token.models import BlackListedToken


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


class WhoamiView(APIView):

    def get(self, request):
        return Response({
            "message": jwt_decode_handler(self.request.auth)
        }, status=status.HTTP_200_OK)


class LogOutView(APIView):

    def get(self, request):
        user = self.request.user
        jti = jwt_decode_handler(self.request.auth).get('jti')
        revoked = BlackListedToken.objects.create(user=user, token_id=jti)
        response = Response({
            "message": f"{self.request.user} has been logout."
        }, status=status.HTTP_200_OK)
        response.delete_cookie('access_token')
        return response
