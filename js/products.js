function addToCart(button) {
    const cart = getCart();
    const id = button.dataset.id;
    let found = false;

    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === id) {
            cart[i].quantity++;
            found = true;
        }
    }

    if (!found) {
        cart.push({
            id: id,
            name: button.dataset.name,
            price: Number(button.dataset.price),
            quantity: 1
        });
    }

    saveCart(cart);

    button.textContent = "Added ✓"
    setTimeout(() => {
        button.textContent = "Add to cart";
    }, 900);
}

function filterProducts() {
    const query = document.getElementById("product-search").value.trim().toLowerCase();
    const category = document.getElementById("category-filter").value;
    const cards = document.querySelectorAll(".product-card");
    let visible = 0;

    for (let i = 0; i < cards.length; i++) {
        const matchesText = cards[i].textContent.toLowerCase().includes(query);
        const matchesCategory = category === "" || cards[i].dataset.category === category;
        
        if (matchesText && matchesCategory) {
            cards[i].style.display = ""
            visible++;
        } 
        else {
            cards[i].style.display = "none";
        }
    }

    const message = document.getElementById("results-message");
    if (visible === 0) {
        message.textContent = "No products match you search";
    }
    else if (visible === cards.length) {
        message.textContent = `Showing ${visible} of ${cards.length} products`;
    }
}

// Links like  products.html#shipping should open with that category picked
function loadCategoryFromLink() {
    const category = window.location.hash.replace("#","");
    if (category === "shipping" || category === "labels" || category === "print") {
        document.getElementById("category-filter").value = category;
    }
}

loadCategoryFromLink();
filterProduct();