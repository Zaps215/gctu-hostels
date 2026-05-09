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

// Signup form handler (NO async - simple version)
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
    
    if (password.length < 8) {
        errorDisplay.innerText = "Password should be at least 8 characters.";
        return;
    }
    
    if (password !== confirmPassword) {
        errorDisplay.innerText = "Passwords do not match! Try again.";
        return;
    }

    // Save to localStorage
    const newUser = { fullName, username, email, password };
    localStorage.setItem('registeredUser', JSON.stringify(newUser));
    
    console.log("User saved:", newUser);
    
    // Show popup
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
/*const SignupForm = document.getElementById('signupForm');
const errorDisplay = document.getElementById('error-message');

// Supabase configuration
const SUPABASE_URL = "https://rvbccjhzifuuvtcodiax.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2YmNjamh6aWZ1dXZ0Y29kaWF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc4NDA4OTUsImV4cCI6MjA5MzQxNjg5NX0.0wSntxEPJAPjP_egA_Z32qyl8vuDLkP1_yMQb-tSnzg";

// Initialize Supabase
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


SignupForm.addEventListener('submit',  async (e) => {
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
    
 // 2. Try to save to Supabase (optional - doesn't break anything)
    try {
        const { error } = await supabase
            .from('app_users')
            .insert([{
                full_name: fullName,
                username: username,
                email: email,
                password: password
            }]);
        
        if (error) {
            console.log("Supabase error (non-critical):", error.message);
        } else {
            console.log("✅ User also saved to Supabase!");
        }
    } catch(err) {
        console.log("Supabase not available, but localStorage works.");
    }

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

setupToggles();*/