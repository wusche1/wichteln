var player_number = 0;
var player_minority = 0;
var canvas;
var ctx;
var place_list = [];
var topic_list = [];
var chosen_topics = [];


function getUniqueTopics(placeList) {
    const topics = placeList.map(place => place[2]); // Get the third element from each sub-array
    const uniqueTopics = [...new Set(topics)]; // Remove duplicates
    return uniqueTopics;
}

function main() {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');

    topic_list = getUniqueTopics(place_list);
    chosen_topics = [...topic_list]; // Create a copy of the topic_list
    console.log(topic_list);

    initializeButtons(); // Create buttons on page load
}
// Function to initialize buttons without color
function initializeButtons() {
    var buttonContainer = document.getElementById('buttonContainer');
    buttonContainer.innerHTML = ''; // Clear previous buttons

    for (let i = 0; i < topic_list.length; i++) {
        let topic = topic_list[i];
        let button = document.createElement('button');
        button.textContent = topic;
        button.id = 'topic-button-' + i; // Assign a unique ID

        button.addEventListener('click', function() {
            toggleFileSelection(topic);
        });
        buttonContainer.appendChild(button);
    }
}

// Function to update button colors
function toggleFileSelection(topic) {
    var indexInChosen = chosen_topics.indexOf(topic);
    var indexInTopicList = topic_list.indexOf(topic); // Get the index of the topic in the original list
    var button = document.getElementById('topic-button-' + indexInTopicList); // Access the button by its original list index

    if (indexInChosen > -1) {
        chosen_topics.splice(indexInChosen, 1); // Remove topic from chosen list
        console.log(chosen_topics);
        button.style.backgroundColor = 'grey';
        button.style.color = 'white';
    } else {
        chosen_topics.push(topic); // Add topic back to chosen list
        console.log(chosen_topics);
        button.style.backgroundColor = 'white';
        button.style.color = 'black';
    }
}

