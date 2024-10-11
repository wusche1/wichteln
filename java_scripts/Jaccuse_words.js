import { loadJaccuseWords } from './databank.js';

let wordsData = [];
let filteredWordsData = [];

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM Content Loaded");
    const wordsList = document.getElementById('words-list');
    const sortViewsButton = document.getElementById('sort-views');
    const sortUpvotesButton = document.getElementById('sort-upvotes');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    
    
    if (!wordsList) {
        console.error("Could not find element with id 'words-list'");
        return;
    }
    
    console.log("Attempting to load Jaccuse words");
    loadJaccuseWords().then(words => {
        console.log("Words loaded:", words);
        wordsData = Object.entries(words).map(([key, word]) => ({key, ...word}));
        filteredWordsData = [...wordsData];
        renderTable(filteredWordsData);
        
        sortViewsButton.addEventListener('click', () => {
            filteredWordsData.sort((a, b) => b.n_plays - a.n_plays);
            renderTable(filteredWordsData);
        });
        
        sortUpvotesButton.addEventListener('click', () => {
            filteredWordsData.sort((a, b) => b.n_upvote - a.n_upvote);
            renderTable(filteredWordsData);
        });

        searchButton.addEventListener('click', performSearch);
        searchInput.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                performSearch();
            }
        });
    }).catch(error => {
        console.error("Error loading Jaccuse words:", error);
        wordsList.innerHTML = '<p>Error loading words. Please try again later.</p>';
    });
});

function performSearch() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    filteredWordsData = wordsData.filter(word => 
        word.author.toLowerCase().includes(searchTerm) || 
        word.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
    renderTable(filteredWordsData);
}

function renderTable(data) {
    const wordsList = document.getElementById('words-list');
    let html = '<table class="words-table">';
    html += `
        <thead>
            <tr>
                <th>Author</th>
                <th>Views</th>
                <th>Upvotes</th>
                <th>Tags</th>
                <th>Creation Time</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
    `;
    for (const word of data) {
        const creationTime = word.creationTime ? new Date(word.creationTime).toLocaleString() : 'Unknown';
        html += `
            <tr>
                <td>${word.author}</td>
                <td>${word.n_plays}</td>
                <td>${word.n_upvote}</td>
                <td>${word.tags.join(', ')}</td>
                <td>${creationTime}</td>
                <td><button class="play-button" data-key="${word.key}">Play</button></td>
            </tr>
        `;
    }
    html += '</tbody></table>';
    wordsList.innerHTML = html;

    // Add event listener for play buttons
    wordsList.addEventListener('click', function(event) {
        if (event.target.classList.contains('play-button')) {
            const key = event.target.getAttribute('data-key');
            redirectToPlay(key);
        }
    });

    function redirectToPlay(key) {
        localStorage.setItem('playKey', key);
        window.location.href = 'jaccuse_play.html';
    }
}