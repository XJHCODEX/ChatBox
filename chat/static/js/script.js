function sendMessage() {
    var messageInput = document.getElementById('message-input');
    var message = messageInput.value.trim();

    if (message !== '') {
        var chatWindow = document.getElementById('chat-window');
        var messageElement = document.createElement('div');
        messageElement.textContent = message;
        chatWindow.appendChild(messageElement);

        // Scroll to the bottom of the chat window
        chatWindow.scrollTop = chatWindow.scrollHeight;

        // Clear the message input field
        messageInput.value = '';
    }
}