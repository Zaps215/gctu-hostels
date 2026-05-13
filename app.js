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
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const inputUsername = document.getElementById('Username').value.trim();
    const inputPassword = document.getElementById('password').value;

    errorDisplay.innerText = "";

    // Get user from localStorage
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
    if (inputUsername === user.username && inputPassword === user.password) {
        // Show success popup
        const loginPopup = document.getElementById('loginPopup');
        const popupMessage = document.getElementById('popupMessage');
        
        const userName = user.fullName || user.username || 'Student';
        popupMessage.innerHTML = `Welcome back, ${userName}! Redirecting to Homepage...`;
        
        loginPopup.classList.add('show');
        
        document.getElementById('popupOkBtn').onclick = function() {
            window.location.href = 'homepage.html';
        };
    } else {
        errorDisplay.innerText = "Wrong username or password!";
    }
});