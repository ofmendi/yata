from rest_framework import viewsets, status
from .models import Notification
from .serializers import NotificationSerializer
from rest_framework.views import APIView
from rest_framework.response import Response


class NotificationViewSet(APIView):

    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer

    def get(self, request):
        if 'all' in request.query_params.keys():
            data = self.serializer_class(self.queryset.filter(
                owner=self.request.user), many=True)
            for notification in self.queryset.filter(is_new=True, owner=self.request.user):
                notification.is_new = False
                notification.save()
            return Response(data.data, status=status.HTTP_200_OK)

        new_notifications = self.serializer_class(
            self.queryset.filter(is_new=True, owner=self.request.user), many=True)

        return Response(new_notifications.data)
