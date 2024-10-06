function handleCredentialResponse(response) {
  console.log("Encoded JWT ID token: " + response.credential);

  // Decode the JWT token
  const payload = JSON.parse(atob(response.credential.split('.')[1]));

  // Store user information in localStorage
  localStorage.setItem('userName', payload.name);
  localStorage.setItem('userEmail', payload.email);
  localStorage.setItem('isLoggedIn', 'true');

  console.log("User Name: " + localStorage.getItem('userName'));
  console.log("User Email: " + localStorage.getItem('userEmail'));

  // You can call a function here to update your UI or perform other actions
  updateUIWithUserInfo();
}

// Ensure the function is attached to the window object
window.handleCredentialResponse = handleCredentialResponse;

function updateUIWithUserInfo() {
  // Update UI based on login status
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  if (isLoggedIn) {
      console.log("User is logged in: " + localStorage.getItem('userName'));
      // Update UI elements as needed
  } else {
      console.log("No user is logged in");
      // Update UI elements for logged out state
  }
}

// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log("Page loaded, Google Sign-In should be ready");
  updateUIWithUserInfo(); // Check login status on page load
});

// Function to log out the user
function logOut() {
  localStorage.removeItem('userName');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('isLoggedIn');
  updateUIWithUserInfo(); // Update UI after logout
}