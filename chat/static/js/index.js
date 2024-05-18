// chat/static/index.js
document.addEventListener("DOMContentLoaded", function() {
console.log("Sanity check from index.js.");


let rooms = [
    { name: "room1", info: "some info" },
    { name: "room2", info: "some info" }

];


    // Function to populate the select element with room options
    function populateRoomSelect() {
        document.querySelector("#roomSelect").innerHTML = ""; // Clear existing options
        rooms.forEach(room => {
            let option = document.createElement("option");
            option.value = `${room.name} (${room.info})`;
            option.textContent = room.name.charAt(0).toUpperCase() + room.name.slice(1);
            document.querySelector("#roomSelect").appendChild(option);
        });
    }



// focus 'roomInput' when user opens the page
document.querySelector("#roomInput").focus();

// submit if the user presses the enter key
document.querySelector("#roomInput").onkeyup = function(e) {
    if (e.keyCode === 13) {  // enter key
        document.querySelector("#roomConnect").click();
    }
};

// redirect to '/room/<roomInput>/'
document.querySelector("#roomConnect").onclick = function() {
    let roomName = document.querySelector("#roomInput").value;

    if (roomName) {
        // Check if the room already exists
        if (!rooms.some(room => room.name === roomName)) {
            rooms.push({ name: roomName });
            populateRoomSelect();
        }
        console.log("Connecting to room:", roomName);
        window.location.pathname = "chat/" + roomName + "/";
    } else {
        alert("Please enter a room name.");
    }
};
    

// redirect to '/room/<roomSelect>/'
document.querySelector("#roomSelect").onchange= function() {
    let roomName = document.querySelector("#roomSelect").value.split(" (")[0];
    window.location.pathname = "chat/" + roomName + "/";
    };
});