from django.contrib import admin
from .models import MyModel
from chat.models import Room, Message

# Register your models here.
admin.site.register(MyModel)
admin.site.register(Room)
admin.site.register(Message)