document.addEventListener('DOMContentLoaded', function() {
  const mainContent = document.getElementById('main-content');
  
  if (localStorage.getItem('isLoggedIn') === 'true') {
      // Show suggestion form
      mainContent.innerHTML = `
          <h1>Suggest Words</h1>
          <!-- Your suggestion form here -->
          <form id="suggestion-form">
              <label for="word1">Word 1:</label>
              <input type="text" id="word1" name="word1" required>
              <label for="word2">Word 2:</label>
              <input type="text" id="word2" name="word2" required>
              <label for="tag-input">Tags:</label>
              <input type="text" id="tag-input" name="tag-input">
              <button type="submit" id="suggest-button">Suggest</button>
              <ul id="tag-list"></ul>
              <p id="suggestion-status"></p>
          </form>
      `;
      setupSuggestionForm();
  } else {
      mainContent.innerHTML = `
          <h1>Suggest Words</h1>
          <p>You are not logged in. Please enter your name to suggest words.</p>
          <form id="suggestion-form">
              <label for="name">Name:</label>
              <input type="text" id="name" name="name" required>
              <label for="word1">Word 1:</label>
              <input type="text" id="word1" name="word1" required>
              <label for="word2">Word 2:</label>
              <input type="text" id="word2" name="word2" required>
              <label for="tag-input">Tags:</label>
              <input type="text" id="tag-input" name="tag-input">
              <button type="submit" id="suggest-button">Suggest</button>
              <ul id="tag-list"></ul>
              <p id="suggestion-status"></p>
          </form>
      `;
      setupSuggestionFormForGuest();
  }
});

let tags = [];

function setupSuggestionForm() {
  const suggestButton = document.getElementById('suggest-button');
  suggestButton.addEventListener('click', handleSuggestion);

  const tagInput = document.getElementById('tag-input');
  tagInput.addEventListener('keypress', handleTagInput);
}

function setupSuggestionFormForGuest() {
  const suggestButton = document.getElementById('suggest-button');
  suggestButton.addEventListener('click', handleSuggestionForGuest);

  const tagInput = document.getElementById('tag-input');
  tagInput.addEventListener('keypress', handleTagInput);
}

function handleTagInput(event) {
  if (event.key === 'Enter') {
      event.preventDefault();
      const tagInput = event.target;
      const tag = tagInput.value.trim();
      if (tag && !tags.includes(tag)) {
          tags.push(tag);
          updateTagList();
          tagInput.value = '';
      }
  }
}

function handleSuggestion(event) {
  event.preventDefault();
  const word1 = document.getElementById('word1').value.trim();
  const word2 = document.getElementById('word2').value.trim();
  const author = localStorage.getItem('userName');
  const statusElement = document.getElementById('suggestion-status');

  if (word1 && word2 && author) {
      try {
          addJaccuseWord(word1, word2, author, ['user_suggested', ...tags]);
          statusElement.textContent = 'Words suggested successfully!';
          document.getElementById('word1').value = '';
          document.getElementById('word2').value = '';
          tags = [];
          updateTagList();
      } catch (error) {
          statusElement.textContent = 'Error suggesting words. Please try again.';
          console.error('Error suggesting words:', error);
      }
  } else {
      statusElement.textContent = 'Please enter both words.';
  }
}

function handleSuggestionForGuest(event) {
  event.preventDefault();
  const word1 = document.getElementById('word1').value.trim();
  const word2 = document.getElementById('word2').value.trim();
  const author = document.getElementById('name').value.trim();
  const statusElement = document.getElementById('suggestion-status');

  if (word1 && word2 && author) {
      try {
          addJaccuseWord(word1, word2, author, ['guest_suggested', ...tags]);
          statusElement.textContent = 'Words suggested successfully!';
          document.getElementById('word1').value = '';
          document.getElementById('word2').value = '';
          document.getElementById('name').value = '';
          tags = [];
          updateTagList();
      } catch (error) {
          statusElement.textContent = 'Error suggesting words. Please try again.';
          console.error('Error suggesting words:', error);
      }
  } else {
      statusElement.textContent = 'Please enter both words and your name.';
  }
}

function updateTagList() {
  const tagList = document.getElementById('tag-list');
  tagList.innerHTML = '';
  tags.forEach((tag, index) => {
      const li = document.createElement('li');
      li.textContent = tag;
      const removeButton = document.createElement('button');
      removeButton.textContent = 'x';
      removeButton.onclick = () => removeTag(index);
      li.appendChild(removeButton);
      tagList.appendChild(li);
  });
}

function removeTag(index) {
  tags.splice(index, 1);
  updateTagList();
}