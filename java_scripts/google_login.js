function onGoogleLoginSuccess(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send the ID to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }
  
  function onGoogleLoginFailure(error) {
    console.log('Google login failed: ' + error);
  }
  
  gapi.load('auth2', function() {
    gapi.auth2.init({
      client_id: 'YOUR_CLIENT_ID',
      callback: onGoogleLoginSuccess,
      scope: 'profile email',
      context: 'http://localhost:3000'
    });
  });
  
  function loginWithGoogle() {
    gapi.auth2.getAuthInstance().signIn({
      prompt: 'select_account'
    }).then(function(googleUser) {
      onGoogleLoginSuccess(googleUser);
    }, function(error) {
      onGoogleLoginFailure(error);
    });
  }