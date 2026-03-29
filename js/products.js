// =============================================
// 🔥 js/products.js — Real Firestore Products
// =============================================
// Syncs with the beautiful product grid, filters, quick view, and cart

let products = []; // will be loaded from Firestore (falls back to demo data)

// Default demo products (used if Firestore is empty)
const demoProducts = [
    { id: 1, title: "Terracotta Bloom Vase", price: 1850, category: "Pottery", seller: "Priya Ceramics", rating: 4.9, location: "Kerala", image: "https://picsum.photos/id/1015/600/600", desc: "Hand-thrown with love using Kerala river clay. Each piece is unique." },
    { id: 2, title: "Handwoven Ajrakh Silk Stole", price: 3200, category: "Textiles", seller: "Rajasthan Loom", rating: 5, location: "Rajasthan", image: "https://picsum.photos/id/160/600/600", desc: "Natural dyes & traditional 16-step block printing by master artisans." },
    { id: 3, title: "Wooden Diya Candle Holder Set", price: 950, category: "Woodwork", seller: "Himalayan Roots", rating: 4.8, location: "Himachal", image: "https://picsum.photos/id/29/600/600", desc: "Carved from fallen pine. Perfect for your Diwali altar." },
    { id: 4, title: "Sterling Silver Moon Earrings", price: 4200, category: "Jewelry", seller: "Silver Thread Co.", rating: 4.9, location: "Odisha", image: "https://picsum.photos/id/201/600/600", desc: "Hand-forged with real moonstone. Lightweight everyday magic." },
    { id: 5, title: "Macramé Wall Hanging – Boho Dream", price: 1650, category: "Textiles", seller: "Knots & Threads", rating: 5, location: "Goa", image: "https://picsum.photos/id/1005/600/600", desc: "100% recycled cotton rope. Made to order in your preferred color." },
    { id: 6, title: "Ceramic Matcha Bowl – Wabi Sabi", price: 1250, category: "Pottery", seller: "Priya Ceramics", rating: 4.7, location: "Kerala", image: "https://picsum.photos/id/133/600/600", desc: "Asymmetric beauty. Holds your mindfulness ritual perfectly." },
    { id: 7, title: "Brass Incense Burner – Lotus", price: 2800, category: "Metalwork", seller: "Moradabad Masters", rating: 4.9, location: "Uttar Pradesh", image: "https://picsum.photos/id/251/600/600", desc: "Lost-wax casting technique passed through 7 generations." },
    { id: 8, title: "Hand-embroidered Patchwork Cushion", price: 2100, category: "Textiles", seller: "Kutch Sisters", rating: 5, location: "Gujarat", image: "https://picsum.photos/id/1009/600/600", desc: "Vintage kantha + mirror work. One of a kind." }
];

async function loadProducts() {
    if (!dbInstance) {
        console.warn("Firestore not ready yet – using demo data");
        products = [...demoProducts];
        renderProducts(products);
        return;
    }

    try {
        const snapshot = await dbInstance.collection('products').get();
        
        if (snapshot.empty) {
            // First time → seed demo products into Firestore
            console.log("%c🌱 Seeding demo products into Firestore...", "color:#c2410f");
            for (let p of demoProducts) {
                await dbInstance.collection('products').doc(p.id.toString()).set(p);
            }
            products = [...demoProducts];
        } else {
            products = snapshot.docs.map(doc => ({ id: parseInt(doc.id), ...doc.data() }));
        }

        console.log(`%c✅ Loaded ${products.length} live products from Firestore`, "background:#166534;color:white;padding:2px 6px;border-radius:4px");
        renderProducts(products);
    } catch (err) {
        console.error("Firestore error, falling back to demo:", err);
        products = [...demoProducts];
        renderProducts(products);
    }
}

// Make sure other files can use the current products array
window.products = products;
window.loadProducts = loadProducts;

// Re-export the render function so index.html can still call it
window.renderProducts = renderProducts;
window.filterProducts = filterProducts;
window.quickCategoryFilter = quickCategoryFilter;
