function login() {
    if (!emailValidator()) {
        return false;
    }
    alert("Login successful!");
    window.location.href="dashboard.html";
    // This is just to prevent the form from actually submitting for now
    return false;
}

function createAccount() {
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (!emailValidator()) {
        return false;
    }
    
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return false;
    }
    alert("Account created successfully!");
    window.location.href="index.html";
    return false;
}

function emailValidator() {
    const email = document.getElementById("email").value;
    const emailPattern = /^[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z]{3,}$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address!");
        return false;
    }
    return true;
}