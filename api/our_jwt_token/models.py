from django.db import models
from user.models import User


class BlackListedToken(models.Model):
    token_id = models.CharField(max_length=36)
    user = models.ForeignKey(
        User, related_name="token_user", on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ("token_id", "user")
