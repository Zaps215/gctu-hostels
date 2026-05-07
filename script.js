const SignupForm = document.getElementById('signupForm');
const errorDisplay = document.getElementById('error-message');

SignupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const fullName = document.getElementById('fullName').value.trim();
    const username = document.getElementById('Username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    errorDisplay.innerText = "";

    if (!fullName || !username || !email || !password || !confirmPassword) {
        errorDisplay.innerText = "All fields are required.";
        return;
    }
    
    if (password.length < 8) {
        errorDisplay.innerText = "Password should be at least 8 characters.";
        return;
    }
    
    if (password !== confirmPassword) {
        errorDisplay.innerText = "Passwords do not match! Try again.";
        return;
    }

    // Save to localStorage (WORKING)
    const newUser = { fullName, username, email, password };
    localStorage.setItem('registeredUser', JSON.stringify(newUser));
    
    // Show popup
    const successPopup = document.getElementById('successPopup');
    successPopup.classList.add('show');

    document.getElementById('popupOkBtn').onclick = function() {
        window.location.href = 'login.html';
    };
});

// Toggle password visibility
function setupToggles() {
    const togglePassword = document.querySelector('#togglePassword');
    const password = document.querySelector('#password');
    const toggleConfirm = document.querySelector('#toggleConfirm');
    const confirmPassword = document.querySelector('#confirmPassword');
    
    if (togglePassword && password) {
        togglePassword.addEventListener('click', function() {
            const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
            password.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }
    
    if (toggleConfirm && confirmPassword) {
        toggleConfirm.addEventListener('click', function() {
            const type = confirmPassword.getAttribute('type') === 'password' ? 'text' : 'password';
            confirmPassword.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }
}

setupToggles();