function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('Logged in as: ' + profile.getName());

    // Display settings after login
    document.getElementById('settings').style.display = 'block';
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}

// Handle settings form submission
document.getElementById('settings-form').addEventListener('submit', function(e) {
    e.preventDefault();
    var limit = document.getElementById('limit').value;

    // Send settings to the server
    fetch('http://localhost:3000/save-settings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ limit })
    }).then(response => response.json())
      .then(data => console.log(data.message));
});
