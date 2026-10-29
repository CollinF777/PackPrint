// Shared cart helpers on every page after login
const CART_KEY = "packprint-cart";

function getCart() {
    try {
        const cart= JSON.parse(localStorage.getItem(CART_KEY));
        if (Array.isArray(cart)) {
            return cart;
        }
    } catch (error) {
        // If the cart is missing data or has bad data just restart
    }
    return [];
}

function saveCart (cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartCount();
}

function formatMoney(amount) {
    return `$ ${Number(amount).toFixed(2)}`
}

function updateCartCount() {
    const cart = getCart();
    let count = 0;
    for (let i = 0; i < cart.length; i++) {
        count += cart[i].quantity;
    }
    document.getElementById("cart-count").textContent = count;
}

function logout() {
    alert("You have been logged out.");
    window.location.href = "index.html";
    // stop link from loading twice
    return false;
}

// So everytime the page changes the cart count stays right
updateCartCount();