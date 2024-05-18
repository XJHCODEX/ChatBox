# chat/routing.py

from django.urls import path
from . import consumers
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
websocket_urlpatterns = [
    path('ws/socket-server/', consumers.ChatConsumer.as_asgi()),
    path('ws/chat/(<roomName>)/', consumers.ChatConsumer.as_asgi()),
]

application = ProtocolTypeRouter({
    'websocket': AuthMiddlewareStack(
        URLRouter(
            websocket_urlpatterns
        )
    ),
})