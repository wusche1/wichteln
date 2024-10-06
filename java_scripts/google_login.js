// Define the callback function in the global scope
window.handleCredentialResponse = function(response) {
  console.log("Encoded JWT ID token: " + response.credential);
  // Here you can process the token
};

// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log("Page loaded, Google Sign-In should be ready");
});