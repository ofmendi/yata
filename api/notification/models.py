from django.db import models
from todo.models import Todo
from user.models import User
from uuid import uuid4


class Notification(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    todo = models.ForeignKey(Todo, on_delete=models.CASCADE)
    notification_time = models.DateTimeField(auto_now_add=True)
    is_new = models.BooleanField(default=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)