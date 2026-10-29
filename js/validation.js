// Shared form validation used on the login, create account, account, and checkout pages
function emailValidator() {
    const email = document.getElementById("email").value;
    const emailPattern = /^[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z]{3,}$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address!");
        return false;
    }
    return true;
}