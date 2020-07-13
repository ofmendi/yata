from .models import User
from rest_framework import serializers
from django.contrib.auth.hashers import make_password


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = "__all__"

    def create(self, validated_data):
        validated_data["is_active"] = True
        validated_data["password"] = make_password(validated_data["password"])
        return super(UserSerializer, self).create(validated_data)
