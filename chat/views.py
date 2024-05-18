from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import authenticate, login, logout, views as auth_views
from django.contrib import messages
from django.http import JsonResponse
from .models import Channel, Message, Room
from .forms import ChannelForm
from chat.models import Room


# Create your views here.
def user_login(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, request.POST)
        if form.is_valid():
            username = request.POST['username']
            password = request.POST['password']
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('home')  # Redirect to home page after login
            else:
                messages.error(request, 'Invalid username or password.')
                return render(request, 'login.html', {'form': form, 'show_alert': True})
        else:
            messages.error(request, 'Invalid form submission. Please check your input.')
    else:
        form = AuthenticationForm()
    return render(request, 'login.html', {'form': form})

def user_logout(request):
    logout(request)
    return redirect('login')  # Redirect to login page after logout

@login_required
def home(request):
    user = request.user
    channels = Channel.objects.all()
    form = ChannelForm()
    if request.method == 'POST':
        form = ChannelForm(request.POST)
        if form.is_valid():
            channel = form.save()
            if request.is_ajax():
                return JsonResponse({'name': channel.name, 'id': channel.id})
            return redirect('chat/home.html')
    if request.user.is_authenticated:
        channels = Channel.objects.all()
        messages = Message.objects.filter(channel__in=channels)
        return render(request, 'chat/home.html', {'user': user,'channels': channels, 'messages': messages})
    else:
        return render(request, 'chat/home.html', {'channels': []})  # Render an empty home page for non-logged-in users

@login_required
def create_channel(request):
    if request.method == 'POST':
        form = ChannelForm(request.POST)
        if form.is_valid():
            # Save the channel to the database
            channel = form.save(commit=False)  # Don't commit yet to customize additional fields if needed
            # Customize additional fields if needed
            channel.save()  # Commit the changes to the database
            return redirect('channel_list') 
        # Handle form submission and create a new channel
        # Example: channel = Channel.objects.create(name=request.POST['channel_name'])
        # return redirect('home')  # Redirect to home page after creating the channel
    else:
        form = ChannelForm()
    return render(request, 'chat/create_channel.html')

@login_required
def send_message(request, channel_id):
    if request.method == 'POST':
        # Handle form submission and send a message to the specified channel
        # Example: message = Message.objects.create(channel_id=channel_id, sender=request.user, content=request.POST['message_content'])
        return redirect('home')  # Redirect to home page after sending the message
    return render(request, 'chat/send_message.html', {'channel_id': channel_id})

def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)  # Automatically log in the user after registration
            return redirect('home')  # Redirect to the dashboard or home page
    else:
        form = UserCreationForm()
    return render(request, 'registration/register.html', {'form': form})


def channel_list(request):
    channels = Channel.objects.all()
    form = ChannelForm()
    if request.method == 'POST':
        form = ChannelForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('channel_list')
    return render(request, 'chat/create_channel.html', {'channels': channels, 'form': form})

def channel_detail(request, channel_id):
    channel = Channel.objects.get(id=channel_id)
    return render(request, 'channel_detail.html', {'channel': channel})

def delete_channel(request, channel_id):
    channel = Channel.objects.get(id=channel_id)
    if request.method == 'POST':
        channel.delete()
        return redirect('home')
    return render(request, 'channels/delete_channel.html', {'channel': channel})

def index_view(request):
    return render(request, 'index.html', {
        'rooms': Room.objects.all(),
    })


def room_view(request, room_name):
    chat_room, created = Room.objects.get_or_create(name=room_name)
    return render(request, 'chat/room.html', {
        'room': chat_room,
        'created': created,
    })