document.addEventListener('DOMContentLoaded', function () {
    let url = `ws://${window.location.host}/ws/socket-server/`;
    const chatSocket = new WebSocket(url);
    chatSocket.onmessage = function (e) {
        let data = JSON.parse(e.data);
        console.log('Data:', data);
        console.log('Received Data:', data); 

        if (data.type === 'chat') {
            let chatWindow = document.getElementById('room-chat-window');
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
        chatSocket.send(JSON.stringify({'user': loggedInUser , 'message': message}));
        form.reset();
    });
});

let chatMessageInput = document.querySelector("#chatMessageInput");
let chatMessageSend = document.querySelector("#chatMessageSend");
let onlineUsersSelector = document.querySelector("#onlineUsersSelector");

// adds a new option to 'onlineUsersSelector'
function onlineUsersSelectorAdd(value) {
    if (document.querySelector("option[value='" + value + "']")) return;
    let newOption = document.createElement("option");
    newOption.value = value;
    newOption.innerHTML = value;
    onlineUsersSelector.appendChild(newOption);
}

// removes an option from 'onlineUsersSelector'
function onlineUsersSelectorRemove(value) {
    let oldOption = document.querySelector("option[value='" + value + "']");
    if (oldOption !== null) oldOption.remove();
}

/*
// focus 'chatMessageInput' when user opens the page
chatMessageInput.focus();

// submit if the user presses the enter key
chatMessageInput.onkeyup = function(e) {
    if (e.keyCode === 13) {  // enter key
        chatMessageSend.click();
    }
};

// clear the 'chatMessageInput' and forward the message
chatMessageSend.onclick = function() {
    if (chatMessageInput.value.length === 0) return;
    // TODO: forward the message to the WebSocket
    chatMessageInput.value = "";
};

*/