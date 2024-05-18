document.addEventListener('DOMContentLoaded', function () {
    let url = `ws://${window.location.host}/ws/socket-server/`;
    const chatSocket = new WebSocket(url);
    chatSocket.onmessage = function (e) {
        let data = JSON.parse(e.data);
        console.log('Data:', data);
        console.log('Received Data:', data); 

        if (data.type === 'chat') {
            let chatWindow = document.getElementById('chat-window');
            let messageContainer = document.createElement('div');
            messageContainer.classList.add('message');
            messageContainer.textContent = `${data.user}: ${data.message}`;
            chatWindow.appendChild(messageContainer);
            chatWindow.scrollTop = chatWindow.scrollHeight; // Scroll to bottom
        }
    };

    let form = document.getElementById('form');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        let message = e.target.message.value;
        chatSocket.send(JSON.stringify({'user': loggedInUser , 'message': message }));
        form.reset();
    });
});

