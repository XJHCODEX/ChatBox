# chat/consumers.py

from channels.generic.websocket import WebsocketConsumer
import json
from asgiref.sync import async_to_sync
# from .models import Room, Message  # new import

class ChatConsumer(WebsocketConsumer):
    """
    def __init__(self, *args, **kwargs):
        super().__init__(args, kwargs)
        self.room_name = None
        self.room_group_name = None
        self.room = None
        self.user = None  # new
    """
    def connect(self):
        self.room_group_name = "test"
        """
        self.room_name = self.scope['url_route']['kwargs']['roomInput']
        self.room_group_name = f'chat_{self.room_name}'
        self.room = Room.objects.get(name=self.room_name)
        self.user = self.scope['user']  # new
        """ 
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
    
        self.accept()
        

        ###
    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

        ###
    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        user = text_data_json['user']
        message = text_data_json['message']

        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type':'chat_message',
                'user': user,
                'message':message,
            }
        )

    def chat_message(self, event):
        user = event['user']
        message = event['message']

        self.send(text_data = json.dumps({
            'type':'chat',
            'user': user,
            'message':message
        }))