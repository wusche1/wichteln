function handleCredentialResponse(response) {
  console.log("Encoded JWT ID token: " + response.credential);
  // Hier können Sie den Token verarbeiten
}

function initializeGoogleSignIn() {
  google.accounts.id.initialize({
    client_id: "663759759562-koons6upuoj2n06l9ncf7of7c00b4qhf.apps.googleusercontent.com",
    callback: handleCredentialResponse
  });

  google.accounts.id.renderButton(
    document.getElementById("g_id_signin"),
    { theme: "outline", size: "large" }
  );

  google.accounts.id.prompt();
}

document.addEventListener("DOMContentLoaded", initializeGoogleSignIn);