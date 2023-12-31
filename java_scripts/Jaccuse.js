var player_number = 0;
var player_minority = 0;
var canvas;
var ctx;
var place_list = [];
var topic_list = [];
var chosen_topics = [];

var min_word = "";
var maj_word = "";

let var_minority_id = [];

document.querySelectorAll('.cards').forEach(card => {
    card.addEventListener('click', function() {
      card.classList.toggle('flipped');
    });
  });
  


function getUniqueTopics(placeList) {
    const topics = placeList.map(place => place[2]); // Get the third element from each sub-array
    const uniqueTopics = [...new Set(topics)]; // Remove duplicates
    return uniqueTopics;
}

function main() {
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

    var start_options = document.getElementById('start_options');
    let player_number_input = document.createElement('input');
    player_number_input.type = 'number';
    player_number_input.id = 'player_number_input';
    player_number_input.value = 5;
    player_number_input.min = 5;
    player_number_input.max = 15;
    player_number_input.step = 1;
    start_options.appendChild(player_number_input);

    let start_button = document.createElement('button');
    start_button.textContent = 'Start Game';
    start_button.id = 'start_button';
    start_button.addEventListener('click', function() {
        startGame(player_number_input.value);
    });
    start_options.appendChild(start_button);
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
        button.style.color = 'black';
    } else {
        chosen_topics.push(topic); // Add topic back to chosen list
        console.log(chosen_topics);
        button.style.backgroundColor = 'white';
        button.style.color = 'black';
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // ES6 array destructuring
    }
}

function startGame(player_number) {
    // Get the number of players from the input
    player_number = Math.max(5, Math.min(player_number, 15));
    player_minority = Math.floor(player_number / 2) - .5;
    console.log(player_number);
    console.log(player_minority);

    // Initialize the array with 0s and then fill in 1s for the minority.
    var_minority_id = Array(player_number).fill(0).fill(1, 0, player_minority);
    shuffleArray(var_minority_id);

    // Remove start options
    var cardsContainer = document.getElementById('player_cards');
    cardsContainer.innerHTML = '';

    // select random line of place_list
    var place = place_list[Math.floor(Math.random() * place_list.length)];
    pl1 = place[0];
    pl2 = place[1];

    // randomly choose minority word and majority word form pl1 and pl2
    var minority_word = Math.floor(Math.random() * 2);
    if (minority_word == 0) {
        min_word = pl1;
        maj_word = pl2;
    } else {
        min_word = pl2;
        maj_word = pl1;
    }

    //make buttons for each player, represenging cards.
    //if the button is clicked, it will show the player their word.
    //if the button is clicked again, it will hide the word.
    for (let i = 0; i < player_number; i++) {
        // Determine the role for this card
        let role = var_minority_id[i] ? min_word : maj_word;
        
        // Create card elements
        const card = document.createElement('div');
        card.className = 'cards';
    
        const cardFront = document.createElement('div');
        cardFront.className = 'card-front';
    
        const cardBack = document.createElement('div');
        cardBack.className = 'card-back';
        cardBack.textContent = role; // Set the text for the back of the card
    
        // Add event listener to toggle card visibility
        card.addEventListener('click', function() {
            card.classList.toggle('flipped');
          });
    
        // Assemble the card
        card.appendChild(cardFront);
        card.appendChild(cardBack);
    
        // Add the card to the container
        cardsContainer.appendChild(card);
    }
}

function togglePlayerCard(player_id) {
    var player_card = document.getElementById('player_card_' + player_id);
    if (player_card.textContent == 'Player ' + (player_id + 1)) {
        player_card.textContent = var_minority_id[player_id] ? min_word : maj_word;
    } else {
        player_card.textContent = 'Player ' + (player_id + 1);
    }
}


