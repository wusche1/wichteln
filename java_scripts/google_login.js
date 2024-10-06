// Define the callback function in the global scope
function handleCredentialResponse(response) {
  console.log("Encoded JWT ID token: " + response.credential);
  // Here you can process the token
}

// Ensure the function is attached to the window object
window.handleCredentialResponse = handleCredentialResponse;

// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log("Page loaded, Google Sign-In should be ready");
});