# ArtisanHaven ✨

**The warm, earthy marketplace for handmade & artisan treasures.**

A beautiful, fully functional V1 marketplace connecting passionate makers (sellers) with mindful buyers — inspired by Amazon but with soul. Think cozy indie Etsy vibes meets modern polish.

### 🎨 Design & Vibe
- Warm & earthy palette: terracotta oranges, forest greens, creamy beiges, soft wood tones
- Handcrafted feel with buttery-smooth micro-animations, scroll reveals, hover glows, and gentle spring motions
- Fully responsive (mobile-first)

### ✨ Core Features (V1)
- Stunning Hero Landing page
- Product listing with powerful filters (category, price, artisan location, rating, material)
- Dynamic Seller Profile pages
- Cart with flying animations + persistent state
- Full checkout flow
- Firebase Auth (email/password + Google sign-in)
- Role selection on signup: **Buyer** or **Seller**
- Seller-specific profile creation (shop name, bio, banner, avatar)
- Quick-view product modals
- Demo mode with hardcoded data + Firebase sync

### 🛠 Tech Stack (Zero build step — perfect for GitHub Pages)
- HTML5 + Tailwind CSS (via CDN)
- Vanilla JavaScript + modern browser APIs
- Firebase v10 (Auth + Firestore)
- GSAP (via CDN) for premium animations
- Heroicons + custom SVG illustrations

### 🚀 Quick Start
1. Clone / create repo `artisan-haven`
2. Add all files exactly as I give them
3. Open `index.html` in browser → works instantly (demo mode)
4. (Optional) Connect Firebase for real data & auth

### 🔥 Firebase Setup (Recommended)
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create new project → enable **Authentication** (Email/Password + Google)
3. Enable **Firestore Database** (start in test mode)
4. Copy your Firebase config
5. Replace the placeholder config in `js/firebase-config.js`

### 📁 Project Structure
