const loginForm = document.getElementById('loginForm');
const errorDisplay = document.getElementById('error-message');
const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password');

// Toggle password visibility
if (togglePassword && password) {
    togglePassword.addEventListener('click', function () {
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });
}

// Login form handler - SIMPLE VERSION
loginForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const inputUsername = document.getElementById('Username').value.trim();
    const inputPassword = document.getElementById('password').value;

    errorDisplay.innerText = "";

    try {
        console.log("Sending login request...");
        // Send to backend API (NOT localStorage)
        const response = await fetch('https://gctu-hostels.onrender.com/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: inputUsername, password: inputPassword })
        });

        const data = await response.json();
         console.log("Response:", data);

        if (response.ok) {
            // Save user to localStorage (for frontend state)
            localStorage.setItem('registeredUser', JSON.stringify(data.user));

    /* Get user from localStorage
    const savedData = localStorage.getItem('registeredUser');

    if (!savedData) {
        errorDisplay.innerText = "No account found! Please sign up first.";
        return;
    }

    const user = JSON.parse(savedData);
    console.log("Saved user:", user);
    console.log("Input username:", inputUsername);
    console.log("Input password:", inputPassword);

    // Check credentials
    if (inputUsername === user.username && inputPassword === user.password) {*/

        // Show success popup
        const loginPopup = document.getElementById('loginPopup');
        const popupMessage = document.getElementById('popupMessage');
        
        const userName = data.user.fullName || data.user.username || 'Student';
        popupMessage.innerHTML = `Welcome back, ${userName}! Redirecting to Homepage...`;
        
        loginPopup.classList.add('show');
        
        document.getElementById('popupOkBtn').onclick = function() {
            window.location.href = 'homepage.html';
        };
    } else {
        errorDisplay.innerText = data.error || "Login failed!";
    }
     } catch (err) {
        console.error("Error:", err);
        errorDisplay.innerText = "Cannot connect to server. Make sure backend is running on port 5000.";
    }
});