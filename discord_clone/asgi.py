"""
ASGI config for discord_clone project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application
#from channels.routing import ProtocolTypeRouter, URLRouter
#from chat import routing 
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
import chat.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'discord_clone.settings')

application = ProtocolTypeRouter({
    'http':get_asgi_application(),
    'websocket':AuthMiddlewareStack(
        URLRouter(
            chat.routing.websocket_urlpatterns
        )
    )
})
'''
async def application(scope, receive, send):
    if scope['type'] == 'http':
        await application(scope, receive, send)
    elif scope['type'] == 'websocket':
        pass
    else:
        raise NotImplementedError(f"Unknown scope type {scope['type']}")
'''
