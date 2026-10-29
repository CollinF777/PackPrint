function simulateSync() {
    const button = document.getElementById("simulate-sync");
    const time = new Date().toLocaleTimeString();

    document.getElementById("sync-message").textContent = `Demo sync simulated at ${time}. No supplier API was contacted.`;
    button.textContent = "Sync simulated ✓";
    button.disabled = true;

    setTimeout(() => {
        button.textContent = "Simulate sync";
        button.disabled = false;
    }, 1600);
}