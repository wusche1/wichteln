function initializeGoogleSignIn() {
  console.log("Initializing Google Sign-In");
  console.log("Current origin:", window.location.origin);
  console.log("Client ID:", "663759759562-koons6upuoj2n06l9ncf7of7c00b4qhf.apps.googleusercontent.com");

  google.accounts.id.initialize({
    client_id: "663759759562-koons6upuoj2n06l9ncf7of7c00b4qhf.apps.googleusercontent.com",
    callback: handleCredentialResponse
  });

  console.log("Google Sign-In initialized");

  google.accounts.id.renderButton(
    document.getElementById("g_id_signin"),
    { theme: "outline", size: "large" }
  );

  console.log("Sign-In button rendered");

  google.accounts.id.prompt();

  console.log("One Tap prompt displayed");
}

document.addEventListener("DOMContentLoaded", initializeGoogleSignIn);