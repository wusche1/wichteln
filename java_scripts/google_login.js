function handleCredentialResponse(response) {
  console.log("Encoded JWT ID token: " + response.credential);
  // Hier können Sie den Token verarbeiten
}

function initializeGoogleSignIn() {
  if (typeof google === 'undefined' || typeof google.accounts === 'undefined') {
    console.error("Google Sign-In library not loaded");
    return;
  }

  try {
    google.accounts.id.initialize({
      client_id: "663759759562-koons6upuoj2n06l9ncf7of7c00b4qhf.apps.googleusercontent.com",
      callback: handleCredentialResponse
    });

    const signInButton = document.getElementById("g_id_signin");
    if (signInButton) {
      google.accounts.id.renderButton(signInButton, { theme: "outline", size: "large" });
    } else {
      console.error("Sign-in button element not found");
    }

    // Kommentieren Sie diese Zeile aus, wenn Sie Probleme mit One Tap haben
    // google.accounts.id.prompt();
  } catch (error) {
    console.error("Error initializing Google Sign-In:", error);
  }
}

// Warten Sie, bis das DOM vollständig geladen ist
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeGoogleSignIn);
} else {
  initializeGoogleSignIn();
}