const loginForm = document.getElementById('loginForm');
const errorDisplay = document.getElementById('error-message');
const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password');

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyAx2mhVjPurrxCdonpbWcnLfl2jpNtl9xg",
    authDomain: "gctu-hostels.firebaseapp.com",
    projectId: "gctu-hostels",
    storageBucket: "gctu-hostels.firebasestorage.app",
    messagingSenderId: "187198065351",
    appId: "1:187198065351:web:8c2ba3f0bedb4c58898ce2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Toggle password visibility
if (togglePassword && password) {
    togglePassword.addEventListener('click', function () {
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });
}

// Login form handler
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const inputUsername = document.getElementById('Username').value.trim();
    const inputPassword = document.getElementById('password').value;

    errorDisplay.innerText = "";

 try {
        // First, check localStorage (fast fallback)
        const savedData = localStorage.getItem('registeredUser');
        if (savedData) {
            const user = JSON.parse(savedData);
            if (inputUsername === user.username && inputPassword === user.password) {
                // Show success popup
                const loginPopup = document.getElementById('loginPopup');
                const popupMessage = document.getElementById('popupMessage');
                const userName = user.fullName || user.username || 'Student';
                popupMessage.innerHTML = `Welcome back, ${userName}! Redirecting...`;
                loginPopup.classList.add('show');
                document.getElementById('popupOkBtn').onclick = () => {
                    window.location.href = 'homepage.html';
                };
                return;
            }
        }
        
        // If not in localStorage, search Firestore by username
        const usersRef = db.collection('users');
        const querySnapshot = await usersRef.where('username', '==', inputUsername).get();
        
        if (querySnapshot.empty) {
            errorDisplay.innerText = "No account found with that username!";
            return;
        }
        
        // Get the user data
        let userData = null;
        let userId = null;
        querySnapshot.forEach(doc => {
            userData = doc.data();
            userId = doc.id;
        });
        
        // Now try to sign in with email (Firebase Auth needs email)
        if (userData && userData.email) {
            try {
                const userCredential = await auth.signInWithEmailAndPassword(userData.email, inputPassword);
                
                // Save to localStorage for next time
                localStorage.setItem('registeredUser', JSON.stringify({
                    fullName: userData.fullName,
                    username: userData.username,
                    email: userData.email,
                    password: inputPassword
                }));
                
                // Show success popup
                const loginPopup = document.getElementById('loginPopup');
                const popupMessage = document.getElementById('popupMessage');
                const userName = userData.fullName || inputUsername;
                popupMessage.innerHTML = `Welcome back, ${userName}! Redirecting...`;
                loginPopup.classList.add('show');
                document.getElementById('popupOkBtn').onclick = () => {
                    window.location.href = 'homepage.html';
                };
                
            } catch (authError) {
                errorDisplay.innerText = "Wrong password!";
            }
        } else {
            errorDisplay.innerText = "Account found but email missing. Please contact support.";
        }
        
    } catch (error) {
        console.error("Login error:", error);
        errorDisplay.innerText = "Something went wrong. Please try again.";
    }
});

    /* Get user from localStorage (saved during signup)
    const savedData = localStorage.getItem('registeredUser');

    if (!savedData) {
        errorDisplay.innerText = "No account found! Please sign up first.";
        return;
    }

    const user = JSON.parse(savedData);

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
*/