/* ================================
   SISTEMA DE CARRINHO - RELLI SILVER
   ================================ */

// Carregar carrinho do localStorage
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

// Salvar carrinho
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

// Atualiza número no ícone 🛒
function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);

    document.querySelectorAll(".cart-count").forEach(el => {
        el.textContent = count;
    });
}

// Renderizar itens no carrinho.html
function renderCart() {
    const cart = getCart();
    const container = document.getElementById("cartItemsList");
    const subtotalEl = document.getElementById("subtotal");
    const itemCountEl = document.getElementById("itemCount");
    const totalEl = document.getElementById("total");

    if (!container) return;

    container.innerHTML = "";

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <h2>Seu carrinho está vazio</h2>
                <p>Adicione produtos para continuar sua compra.</p>
                <a href="index.html#produtos" class="btn-primary">Ver Produtos</a>
            </div>
        `;
        subtotalEl.textContent = "R$ 0,00";
        totalEl.textContent = "R$ 0,00";
        itemCountEl.textContent = "0";
        return;
    }

    let subtotal = 0;

    cart.forEach((item, index) => {
        const totalItem = item.price * item.quantity;
        subtotal += totalItem;

        container.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" class="item-image">

                <div class="item-details">
                    <p class="item-name">${item.name}</p>
                    <p class="item-meta">Aro: ${item.size || "–"}</p>
                </div>

                <div class="item-actions">
                    <div class="quantity-control">
                        <button class="qty-btn" onclick="changeQty(${index}, -1)">−</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>
                    </div>

                    <p class="item-total">R$ ${totalItem.toFixed(2)}</p>
                    <button class="remove-item" onclick="removeItem(${index})">Remover</button>
                </div>
            </div>
        `;
    });

    subtotalEl.textContent = `R$ ${subtotal.toFixed(2)}`;
    totalEl.textContent = `R$ ${subtotal.toFixed(2)}`;
    itemCountEl.textContent = cart.length;
}

// Mudar quantidade
function changeQty(index, amount) {
    const cart = getCart();

    cart[index].quantity += amount;

    if (cart[index].quantity < 1) cart[index].quantity = 1;

    saveCart(cart);
    renderCart();
}

// Remover item
function removeItem(index) {
    const cart = getCart();

    cart.splice(index, 1);

    saveCart(cart);
    renderCart();
}

// Limpar carrinho
document.getElementById("clearCart")?.addEventListener("click", () => {
    localStorage.removeItem("cart");
    renderCart();
    updateCartCount();
});

// Inicializar ao abrir a página
renderCart();
updateCartCount();
