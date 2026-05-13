const SignupForm = document.getElementById('signupForm');
const errorDisplay = document.getElementById('error-message');



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

// Signup form handler
SignupForm.addEventListener('submit', function(e) {
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
    
    if (password.length < 6) {
        errorDisplay.innerText = "Password must be at least 6 characters.";
        return;
    }
    
    if (password !== confirmPassword) {
        errorDisplay.innerText = "Passwords do not match! Try again.";
        return;
    }

    // 1. Save to localStorage (ALWAYS works)
    const newUser = { fullName, username, email, password };
    localStorage.setItem('registeredUser', JSON.stringify(newUser));
    console.log("✅ Saved to localStorage");

   
    // Show success popup
    const successPopup = document.getElementById('successPopup');
    if (successPopup) {
        successPopup.classList.add('show');
    }
    
    const okBtn = document.getElementById('popupOkBtn');
    if (okBtn) {
        okBtn.onclick = function() {
            window.location.href = 'login.html';
        };
    }
});