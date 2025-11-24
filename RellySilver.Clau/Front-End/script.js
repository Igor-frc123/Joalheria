// Produtos de exemplo
        const products = [
            { id: 1, name: 'Anel de Ouro 18k com Diamante', price: 3500, image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400' },
            { id: 2, name: 'Colar de Pérolas Naturais', price: 2800, image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400' },
            { id: 3, name: 'Brincos de Esmeralda', price: 4200, image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400' },
            { id: 4, name: 'Pulseira de Ouro Branco', price: 3100, image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400' },
            { id: 5, name: 'Anel Solitário com Rubi', price: 5600, image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400' },
            { id: 6, name: 'Conjunto Colar e Brincos', price: 6800, image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400' },
        ];

        let cart = [];

        // Renderizar produtos
        function renderProducts() {
            const grid = document.getElementById('productGrid');
            grid.innerHTML = products.map(product => `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <div class="product-price">R$ ${product.price.toLocaleString('pt-BR')}</div>
                        <button class="add-to-cart" onclick="addToCart(${product.id})">
                            Adicionar ao Carrinho
                        </button>
                    </div>
                </div>
            `).join('');
        }

        // Adicionar ao carrinho
        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            
            updateCart();
        }

        // Atualizar carrinho
        function updateCart() {
            const cartCount = document.getElementById('cartCount');
            const cartItems = document.getElementById('cartItems');
            const cartTotal = document.getElementById('cartTotal');
            
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            cartCount.textContent = totalItems;
            
            cartItems.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>Quantidade: ${item.quantity}</p>
                        <p style="color: var(--primary); font-weight: bold;">R$ ${(item.price * item.quantity).toLocaleString('pt-BR')}</p>
                    </div>
                </div>
            `).join('');
            
            cartTotal.textContent = `R$ ${totalPrice.toLocaleString('pt-BR')}`;
        }

        // Modal do carrinho
        const cartBtn = document.getElementById('cartBtn');
        const cartModal = document.getElementById('cartModal');
        const closeCart = document.getElementById('closeCart');

        cartBtn.addEventListener('click', () => {
            cartModal.classList.add('active');
        });

        closeCart.addEventListener('click', () => {
            cartModal.classList.remove('active');
        });

        cartModal.addEventListener('click', (e) => {
            if (e.target === cartModal) {
                cartModal.classList.remove('active');
            }
        });

        // Inicializar
        renderProducts();