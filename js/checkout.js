function placeOrder() {
    const cart = getCart();

    if (cart.length === 0) {
        alert("Your cart is empty! Add something before checking out.");
        window.location.href = "products.html";
        return false;
    }

    if (!emailValidator()) {
        return false;
    }

    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        total += cart[i].price * cart[i].quantity;
    }

    const ref = "PP-" + String(Date.now()).slice(-5);

    localStorage.removeItem(CART_KEY);
    updateCartCount();
    document.getElementById("checkout-form").reset();
    document.getElementById("checkout-message").textContent = `Demo order submitted! Reference ${ref}, total ${formatMoney(total)}. No real order or payment was created.`;

    // Stop form from submitting for now
    return false;
}