// Define the callback function in the global scopefunction handleCredentialResponse(response) {
  console.log("Encoded JWT ID token: " + response.credential);
  
  // Decode the JWT token
  const payload = JSON.parse(atob(response.credential.split('.')[1]));
  
  // Extract and log user information
  const userName = payload.name;
  const userEmail = payload.email;
  
  console.log("User Name: " + userName);
  console.log("User Email: " + userEmail);
  
  // You can use userName and userEmail variables for further processing
}

// Ensure the function is attached to the window object
window.handleCredentialResponse = handleCredentialResponse;

// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log("Page loaded, Google Sign-In should be ready");
});