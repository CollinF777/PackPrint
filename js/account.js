function sendMessage() {
    if (!emailValidator) {
        return false;
    }
    document.getElementById("contact-message").textContent = "Thanks! This demo form has been validated locally. No message wans sent to a server.";
    document.getElementById("contact-form").reset();
    // Just to prevent form from actually submitting for now
    return false;
}