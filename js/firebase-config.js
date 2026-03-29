// =============================================
// 🔥 Firebase Configuration for ArtisanHaven
// =============================================
// 
// 1. Go to https://console.firebase.google.com
// 2. Create a new project (or use existing)
// 3. Enable Authentication → Email/Password + Google
// 4. Enable Firestore Database (start in "test mode" for now)
// 5. Click the gear icon → Project settings → Your apps → Web app
// 6. Copy the config object below and REPLACE the placeholder values
// 
// This file is imported by auth.js, products.js, etc.

const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",           // ← REPLACE
  authDomain: "your-project-id.firebaseapp.com",               // ← REPLACE
  projectId: "your-project-id",                                // ← REPLACE
  storageBucket: "your-project-id.appspot.com",                // ← REPLACE
  messagingSenderId: "123456789012",                           // ← REPLACE
  appId: "1:123456789012:web:xxxxxxxxxxxxxxxxxxxxxxxx"         // ← REPLACE
};

// Initialize Firebase only once (we'll do this in app.js)
let firebaseApp = null;
let auth = null;
let db = null;

async function initializeFirebase() {
  if (firebaseApp) return; // already initialized

  // Load Firebase SDK from CDN (no build tools needed)
  if (!window.firebase) {
    const script1 = document.createElement('script');
    script1.src = 'https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js';
    await new Promise(resolve => { script1.onload = resolve; document.head.appendChild(script1); });

    const script2 = document.createElement('script');
    script2.src = 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth-compat.js';
    await new Promise(resolve => { script2.onload = resolve; document.head.appendChild(script2); });

    const script3 = document.createElement('script');
    script3.src = 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore-compat.js';
    await new Promise(resolve => { script3.onload = resolve; document.head.appendChild(script3); });
  }

  firebaseApp = firebase.initializeApp(firebaseConfig);
  auth = firebase.auth();
  db = firebase.firestore();

  console.log('%c✅ Firebase initialized for ArtisanHaven', 'background:#166534;color:#fff;padding:2px 6px;border-radius:4px');
  return { auth, db };
}

// Make it available globally for other JS files
window.firebaseConfig = firebaseConfig;
window.initializeFirebase = initializeFirebase;
