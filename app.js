// Google Sign-In
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId());
    console.log('Name: ' + profile.getName());
    console.log('Email: ' + profile.getEmail());
    
    // Pass the login data to the extension
    chrome.runtime.sendMessage({
        action: "login",
        email: profile.getEmail(),
        name: profile.getName()
    });
}

// Save settings and pass them to the extension
document.getElementById('save-settings').addEventListener('click', function () {
    let rateLimit = document.getElementById('rateLimit').value;
    let notifications = document.getElementById('notification').checked;

    let settings = {
        rateLimit: rateLimit,
        notifications: notifications
    };

    // Send the settings to the Chrome extension
    chrome.runtime.sendMessage({
        action: "saveSettings",
        settings: settings
    });

    alert('Settings saved!');
});
