from rest_framework_jwt.utils import jwt_payload_handler
from uuid import uuid4


def jwt_custom_payload_handler(user):
    payload = jwt_payload_handler(user)
    payload['jti'] = str(uuid4())
    return payload
