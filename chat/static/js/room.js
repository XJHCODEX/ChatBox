const chatSocket = new WebSocket('`ws://${window.location.host}/ws/socket-server/');  // Connect to your WebSocket server

chatSocket.onmessage = function(event) {
    const message = JSON.parse(event.data);
    if (message.type === 'online_users') {
        updateOnlineUsers(message.users);
    }
};

function updateOnlineUsers(users) {
    const onlineUsersSelector = document.getElementById('onlineUsersSelector');
    onlineUsersSelector.innerHTML = '';  // Clear the existing list
    users.forEach(user => {
        const option = document.createElement('option');
        option.value = user.id;  // Set the value to the user's ID or username
        option.text = user.username;  // Display the username
        onlineUsersSelector.appendChild(option);
    });
}
