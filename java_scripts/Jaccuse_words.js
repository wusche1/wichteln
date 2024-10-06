import { loadJaccuseWords  } from './databank.js';

document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM Content Loaded");
  const wordsList = document.getElementById('words-list');
  
  if (!wordsList) {
    console.error("Could not find element with id 'words-list'");
    return;
  }
  
  console.log("Attempting to load Jaccuse words");
  loadJaccuseWords().then(words => {
      console.log("Words loaded:", words);
      let html = '<h1>J\'accuse Words</h1>';
      for (const [key, word] of Object.entries(words)) {
          html += `
              <div class="word-card">
                  <h2>${word.word1} - ${word.word2}</h2>
                  <p>Author: ${word.author}</p>
                  <p>Views: ${word.n_plays}</p>
                  <p>Upvotes: ${word.n_upvote}</p>
                  <p>Tags: ${word.tags.join(', ')}</p>
                  <a href="jaccuse_play.html?word=${key}" class="button">Play</a>
              </div>
          `;
      }
      wordsList.innerHTML = html;
  }).catch(error => {
      console.error("Error loading Jaccuse words:", error);
      wordsList.innerHTML = '<p>Error loading words. Please try again later.</p>';
  });
});