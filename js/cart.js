// js/cart.js — Persistent cart with flying animation
let cart = [];

function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    cart.push({...product});
    updateCartCount();
    
    // Flying animation
    const flying = document.createElement('div');
    flying.textContent = '🛍️';
    flying.style.cssText = 'position:fixed; font-size:2rem; z-index:99999; pointer-events:none;';
    document.body.appendChild(flying);
    
    gsap.to(flying, {
        x: document.getElementById('cart-count').getBoundingClientRect().left - 50,
        y: 80,
        scale: 0.3,
        opacity: 0,
        duration: 0.8,
        ease: "power2.in",
        onComplete: () => flying.remove()
    });
    
    showToast(`${product.title} added ✨`);
}

function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.length;
}

function showCart() {
    const container = document.getElementById('cart-items');
    container.innerHTML = cart.length ? cart.map((item,i) => `
        <div class="flex gap-4 border-b pb-6">
            <img src="${item.image}" class="w-20 h-20 object-cover rounded-2xl">
            <div class="flex-1">
                <p class="font-medium">${item.title}</p>
                <p class="text-[#a37a5e]">${item.seller}</p>
                <p class="font-bold text-2xl">₹${item.price}</p>
            </div>
            <button onclick="removeFromCart(${i});showCart()" class="text-red-400 text-2xl">×</button>
        </div>
    `).join('') : `<p class="py-12 text-center text-[#a37a5e]">Your basket is empty.<br>Fill it with handmade magic!</p>`;
    
    document.getElementById('cart-total').textContent = `₹${cart.reduce((a,b)=>a+b.price,0)}`;
    document.getElementById('cart-sidebar').classList.remove('hidden');
    document.getElementById('cart-sidebar').classList.add('flex');
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
}

function proceedToCheckout() {
    hideCart();
    const total = cart.reduce((a,b)=>a+b.price,0);
    document.getElementById('final-total').textContent = total;
    document.getElementById('checkout-modal').classList.remove('hidden');
    document.getElementById('checkout-modal').classList.add('flex');
}

window.addToCart = addToCart;
window.showCart = showCart;
window.hideCart = () => {
    const el = document.getElementById('cart-sidebar');
    el.classList.add('hidden'); el.classList.remove('flex');
};
window.removeFromCart = removeFromCart;
window.proceedToCheckout = proceedToCheckout;
window.completeFakeCheckout = () => {
    hideCheckout();
    cart = [];
    updateCartCount();
    showToast("🎉 Order placed! Thank you (demo)");
};
