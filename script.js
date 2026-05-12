const SignupForm = document.getElementById('signupForm');
const errorDisplay = document.getElementById('error-message');

// Firebase config (YOUR KEYS)
const firebaseConfig = {
    apiKey: "AIzaSyAx2mhVjPurrxCdonpbWcnLfl2jpNtl9xg",
    authDomain: "gctu-hostels.firebaseapp.com",
    projectId: "gctu-hostels",
    storageBucket: "gctu-hostels.firebasestorage.app",
    messagingSenderId: "187198065351",
    appId: "1:187198065351:web:8c2ba3f0bedb4c58898ce2"
};

// Initialize Firebase (if SDK is loaded)
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
console.log("Firebase initialized");

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

    // 2. Try to save to Firebase (doesn't affect signup if fails)
    if (typeof firebase !== 'undefined' && firebase.apps.length) {
        const auth = firebase.auth();
        const db = firebase.firestore();
        
        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const userId = userCredential.user.uid;
                return db.collection('users').doc(userId).set({
                    fullName: fullName,
                    username: username,
                    email: email,
                    createdAt: new Date()
                });
            })
            .then(() => {
                console.log("✅ Also saved to Firebase!");
            })
            .catch((error) => {
                console.log("Firebase note:", error.message);
            });
    }
    
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