const makeList = async function () {
    await Talk.ready;

    // Establish the array which acts as a data source for the list
    const channelData = [
        {name: "#general", id: 1},
        {name: "#dev-team", id: 2},
        {name: "#random", id: 3},
        {name: "#qa-team", id: 4},
        {name: "#release-tickets", id: 5},
        {name: "#demo-env", id: 6}
    ];

    // Get the container element for the list
    const listContainer = document.getElementById('channel-list');

    // Make the list
    const listElement = document.createElement('ul');

    // Add the list to the container
    listContainer.appendChild(listElement);

    // Set up a loop that goes through the items in channelData one at a time
    for (let channel of channelData) {
        // Create a list item for each channel
        const listItem = document.createElement('li');

        // Add the channel text and id to the list item
        listItem.innerHTML = channel.name;
        listItem.id = channel.id;

        // Add the list item to listElement
        listElement.appendChild(listItem);
    }
};
makeList();