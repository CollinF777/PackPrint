function showCart() {
    const cart = getCart();
    const container = document.getElementById("cart-items");
    const checkoutLink = document.getElementById("checkout-link");
    let subtotal = 0;

    if (cart.length === 0) {
        container.innerHTML = '<p>Your cart is empty. <a href="products.html">Browse products</a> to add something.</p>';
        checkoutLink.href = "products.html";
        checkoutLink.textContent = "Browse products →";
    } 
    else {
        let html = ""
        for (let i = 0; i < cart.length; i++) {
            const item = cart[i];
            subtotal += item.price * item.quantity;
            html += '<article class="cart-row">' +
                '<div>' +
                    '<h3>' + item.name + '</h3>' +
                    '<p>' + formatMoney(item.price) + ' each</p>' +
                    '<button type="button" class="remove-item" onclick="removeItem(\'' + item.id + '\')">Remove</button>' +
                '</div>' +
                '<div class="quantity-control">' +
                    '<button type="button" onclick="changeQuantity(\'' + item.id + '\', -1)">-</button>' +
                    '<strong>' + item.quantity + '</strong>' +
                    '<button type="button" onclick="changeQuantity(\'' + item.id + '\', 1)">+</button>' +
                    '</div>' +
                    '<div class="cart-price">' + formatMoney(item.price * item.quantity) + 
                '</div>' +
            '</article>';
        }
        container.innerHTML = html;
        checkoutLink.href = "checkout.html";
        checkoutLink.textContent = "Continue to checkout →";
    }

    document.getElementById("cart-subtotal").textContent = formatMoney(subtotal);
    document.getElementById("cart-total").textContent = formatMoney(subtotal);
}

function changeQuantity(id, amount) {
    const cart = getCart();

    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === id) {
            cart[i].quantity += amount;
            if (cart[i].quantity <= 0) {
                cart.splice(i, 1);
            }
            break;
        }
    }

    saveCart(cart);
    showCart()
}

function removeItem(id) {
    const cart = getCart();

    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === id) {
            cart.splice(i, 1);
            break;
        }
    }

    saveCart(cart);
    showCart();
}

showCart();