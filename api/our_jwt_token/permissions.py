from rest_framework import permissions
from rest_framework_jwt.utils import jwt_decode_handler
from .models import BlackListedToken

class IsTokenValid(permissions.BasePermission):
    def has_permission(self, request, view):
        user_id = request.user.id            
        is_allowed_user = True
        jti = jwt_decode_handler(request.auth).get('jti')
 
        try:
            is_blackListed = BlackListedToken.objects.get(user=user_id, token_id=jti)
            if is_blackListed:
                is_allowed_user = False
        except BlackListedToken.DoesNotExist:
            is_allowed_user = True
        return is_allowed_user