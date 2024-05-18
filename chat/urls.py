from django.urls import path
from . import views
from .views import delete_channel

urlpatterns = [
    path('', views.home),
    path('delete/<int:channel_id>/', delete_channel, name='delete_channel'),
]