import { loadJaccuseWords } from './databank.js';

// Initialize variables
var player_number = 0;
var player_minority = 0;
var canvas;
var ctx;
var topic_list = [];
var phase = "start";


var min_word = "";
var maj_word = "";

let var_minority_id = [];
let var_condemmed_id = [];


function getUniqueTags(jaccuseWords) {
    const tags = Object.values(jaccuseWords).reduce((acc, word) => {
      return [...acc, ...word.tags];
    }, []);
    const uniqueTags = [...new Set(tags)];
    return uniqueTags;
  }

  async function main() {
    const jaccuseWords = await loadJaccuseWords();
    topic_list = getUniqueTags(jaccuseWords);
    console.log(topic_list);

    initializeButtons(jaccuseWords); // Create buttons on page load
}
// Function to initialize buttons without color
function initializeButtons(jaccuseWords) {
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
        startGame(player_number_input.value, jaccuseWords);
    });
    start_options.appendChild(start_button);
}

// Function to update button colors

let MustHaveTopics = [];
let ForbiddenTopics = [];
let buttonStates = {};
function toggleFileSelection(topic) {
    var indexInTopicList = topic_list.indexOf(topic); // Get the index of the topic in the original list
    var button = document.getElementById('topic-button-' + indexInTopicList); // Access the button by its original list index
  
    if (!buttonStates[topic]) {
      buttonStates[topic] = 0; // Initialize button state to 0 (grey)
    }
  
    buttonStates[topic] = (buttonStates[topic] + 1) % 3; // Cycle through states (0, 1, 2)
  
    switch (buttonStates[topic]) {
      case 0:
        button.style.backgroundColor = 'white';
        if (ForbiddenTopics.includes(topic)) {
          ForbiddenTopics.splice(ForbiddenTopics.indexOf(topic), 1);
        }
        break;
      case 1:
        button.style.backgroundColor = 'green';
        MustHaveTopics.push(topic);
        break;
      case 2:
        button.style.backgroundColor = 'red';
        ForbiddenTopics.push(topic);
        MustHaveTopics.splice(MustHaveTopics.indexOf(topic), 1);
        break;
    }
  }

function shuffleArray(array) {
    return [...array].sort(() => Math.random() - 0.5);
  }

  function select_valid_place(jaccuseWords) {
    var valid_words = {};
    for (const word in jaccuseWords) {
        const tags = jaccuseWords[word].tags; // assign tags to a variable
        if (MustHaveTopics.every(tag => tags.includes(tag)) && !ForbiddenTopics.some(tag => tags.includes(tag))) {
          valid_words[word] = jaccuseWords[word];
        }
      }
    console.log(valid_words);
    return valid_words;
  }

function startGame(player_number,jaccuseWords) {

    var pl1, pl2; // Define pl1 and pl2 here

    // Get the number of players from the input
    player_number = Math.max(5, Math.min(player_number, 15));
    player_minority = Math.floor(player_number / 2-.1);
    console.log(player_number);
    console.log(player_minority);

    // Initialize the array with 0s and then fill in 1s for the minority.
    var_minority_id = Array(player_number).fill(0).fill(1, 0, player_minority);
    shuffleArray(var_minority_id);
    var_condemmed_id = Array(player_number).fill(0);

    // Remove start options
    var cardsContainer = document.getElementById('player_cards');
    cardsContainer.innerHTML = '';

    // select random line of place_list
    var valid_words = select_valid_place(jaccuseWords);
    if (valid_words.length === 0) {
      console.log("No valid places found");
      return;
    }

  

    // select random element of the jacccuseWords dictionary
    const keys = Object.keys(valid_words);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];

    pl1 = valid_words[randomKey]["word1"];
    pl2 = valid_words[randomKey]["word2"];

  

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
    

        //g
    
        const cardFront = document.createElement('div');
        cardFront.className = 'card-front';
    
        const cardBack = document.createElement('div');
        cardBack.className = 'card-back';
        cardBack.textContent = role; // Set the text for the back of the card
    
        // Add event listener to toggle card visibility
        card.addEventListener('click', function() {
            card.classList.toggle('flipped');
            if (phase =="choose" && ! card.classList.contains('flipped')) {
                card.className += ' deactivated_card';;
            }

            //see if al cards are deactivated, and game phase is choose. If so, move to next phase.
            if (document.querySelectorAll('.deactivated_card').length == player_number && phase == "choose") {
                phase = "vote";
                for (let i = 0; i < player_number; i++) {
                    document.querySelectorAll('.cards')[i].classList.remove('deactivated_card');
                }
                add_condemn_button(player_number);
            }
            
          });
    
        // Assemble the card
        card.appendChild(cardFront);
        card.appendChild(cardBack);
    
        // Add the card to the container
        cardsContainer.appendChild(card);
    }
    phase = "choose";
}

function add_condemn_button(player_number) {
    var cardsContainer = document.getElementById('condemmed_button');
    cardsContainer.innerHTML = ''; // Clear previous buttons
    //create a condemn button under each card
    for (let i = 0; i < player_number; i++) {
        let button = document.createElement('button');
        button.textContent = "Condemn";
        button.id = 'condemn_button-' + i; // Assign a unique ID

        button.addEventListener('click', (function(i) {
            return function() {
                let card = document.querySelectorAll('.cards')[i];
                var_condemmed_id[i] = 1;
                card.classList.add('deactivated_card');
                check_win_condition();
            };
        })(i));
        cardsContainer.appendChild(button);
    }

}

function check_win_condition() {
    var not_condemmed_minority = 0;
    var condemmed_majority = 0;
    player_number = var_minority_id.length;
    console.log(var_minority_id);
    console.log(var_condemmed_id);
    for (let i = 0; i < player_number; i++) {
        console.log("new loop iteration")
        console.log(var_minority_id[i]);
        console.log(var_condemmed_id[i]);
        if (var_minority_id[i] == 1 && var_condemmed_id[i] == 0) {
            not_condemmed_minority++;
        }
        if (var_minority_id[i] == 0 && var_condemmed_id[i] == 1) {
            condemmed_majority++;
        }
    }

    if (not_condemmed_minority == 0) {
        alert("Majority wins!");
    }
    if (condemmed_majority >=2) {
        alert("Minority wins!");
    }
    return;
}



main(); // Add this line to call the main function
