// Function to store signup data in localStorage
function saveUserData(name, surname, email, password) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.email === email);

    if (userExists) {
        showMessage('User with this email already exists. Please log in.', 'error');
        return false;
    }

    users.push({ name, surname, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    showMessage('Account created successfully! You can now log in.', 'success');
    return true;
}

// Function to validate login credentials and redirect if valid
function validateLogin(email, password) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    console.log("Stored Users:", users);

    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        showMessage(`Welcome back, ${user.name}!`, 'success');
        setTimeout(() => {
            window.location.href = 'homenew.html'; // Redirect to home page
        }, 3000); // Delay redirection to let the user read the message
    } else {
        showMessage('Incorrect email or password. Please try again.', 'error');
    }
}

// Event listener for signup form submission
document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('signupFname').value.trim();
    const surname = document.getElementById('signupLname').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;

    if (saveUserData(name, surname, email, password)) {
        document.getElementById('signupForm').style.display = 'none';
        document.getElementById('loginForm').style.display = 'block';
    }
});

// Event listener for login form submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('loginemail').value.trim();
    const password = document.getElementById('loginPassword').value;

    if (!validateEmail(email)) {
        alert("Invalid email format.");
        return;
    }
    if (!validatePassword(password)) {
        alert("Password must be at least 8 characters long and include uppercase, lowercase, digits, and special characters.");
        return;
    }

    // Attempt login and check for errors
    console.log("Attempting login for:", email); // Debugging: Show the login email
    validateLogin(email, password);
});

// Helper functions for email and password validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

// Toggle between login and signup forms
document.getElementById('goToSignup').addEventListener('click', function() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'block';
});

document.getElementById('goToLogin').addEventListener('click', function() {
    document.getElementById('signupForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
});
