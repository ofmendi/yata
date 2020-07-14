from rest_framework.serializers import ModelSerializer, StringRelatedField
from .models import Notification


class NotificationSerializer(ModelSerializer):
    todo = StringRelatedField()

    class Meta:
        model = Notification
        fields = ('todo', 'notification_time')
