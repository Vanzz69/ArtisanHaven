// =============================================
// 🔥 js/auth.js — Real Firebase Authentication
// =============================================
// This turns the fake login/signup in index.html into REAL Firebase Auth + Buyer/Seller roles
// Persistent across refreshes, stores role & seller profile in Firestore

let currentUser = {
    loggedIn: false,
    uid: null,
    email: null,
    role: 'buyer',        // 'buyer' or 'seller'
    name: 'Guest',
    avatar: '👋',
    shopName: null,
    bio: null
};

let authInstance = null;
let dbInstance = null;

// Initialize Auth & Firestore (called once)
async function initAuth() {
    const firebaseInit = await initializeFirebase();
    if (!firebaseInit) return;

    authInstance = firebaseInit.auth;
    dbInstance = firebaseInit.db;

    // Real-time auth state listener (this powers the navbar)
    authInstance.onAuthStateChanged(async (user) => {
        if (user) {
            currentUser.loggedIn = true;
            currentUser.uid = user.uid;
            currentUser.email = user.email;
            currentUser.name = user.displayName || user.email?.split('@')[0] || 'Artisan';

            // Fetch or create user profile in Firestore
            const userRef = dbInstance.collection('users').doc(user.uid);
            const doc = await userRef.get();

            if (doc.exists) {
                const data = doc.data();
                currentUser.role = data.role || 'buyer';
                currentUser.shopName = data.shopName || (currentUser.role === 'seller' ? 'My Shop' : null);
                currentUser.bio = data.bio || null;
            } else {
                // New user — default to buyer
                await userRef.set({
                    role: 'buyer',
                    email: user.email,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                });
                currentUser.role = 'buyer';
            }

            updateAccountUI();
            console.log('%c👋 User authenticated as ' + currentUser.role, 'background:#166534;color:#fff;padding:1px 4px;border-radius:3px');
        } else {
            currentUser.loggedIn = false;
            currentUser.uid = null;
            updateAccountUI();
        }
    });

    console.log('%c✅ Auth system ready — real Firebase login live!', 'background:#c2410f;color:#fff;padding:2px 6px;border-radius:4px');
}

// ===================== REAL AUTH FUNCTIONS =====================
async function loginWithEmail(email, password) {
    if (!authInstance) await initAuth();
    try {
        await authInstance.signInWithEmailAndPassword(email, password);
        hideAuthModal();
        showToast("Welcome back to ArtisanHaven ✨");
        return true;
    } catch (error) {
        console.error(error);
        alert("❌ Login failed: " + error.message);
        return false;
    }
}

async function signupWithEmail(email, password, role) {
    if (!authInstance) await initAuth();
    try {
        const userCredential = await authInstance.createUserWithEmailAndPassword(email, password);
        
        // Create user document with role
        await dbInstance.collection('users').doc(userCredential.user.uid).set({
            role: role,
            email: email,
            shopName: role === 'seller' ? 'My Artisan Shop' : null,
            bio: role === 'seller' ? 'Tell your story… every piece has a soul.' : null,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        hideAuthModal();
        showToast(role === 'seller' ? "🎉 Welcome, new maker! Your shop is ready." : "🎉 Account created! Welcome to the family.");
        
        // Auto-open seller modal if they chose seller
        if (role === 'seller') setTimeout(showSellModal, 600);
        return true;
    } catch (error) {
        console.error(error);
        alert("❌ Signup failed: " + error.message);
        return false;
    }
}

async function googleSignIn() {
    if (!authInstance) await initAuth();
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
        await authInstance.signInWithPopup(provider);
        // Role will be set in onAuthStateChanged (defaults to buyer)
        hideAuthModal();
        showToast("Signed in with Google — welcome home!");
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

async function logout() {
    if (!authInstance) return;
    await authInstance.signOut();
    showToast("Logged out. Come back soon! 🪔");
}

// ===================== UI HELPERS (overrides demo) =====================
function updateAccountUI() {
    const nameEl = document.getElementById('user-name');
    const roleEl = document.getElementById('user-role');
    const avatarEl = document.getElementById('user-avatar');

    if (currentUser.loggedIn) {
        nameEl.textContent = currentUser.name;
        roleEl.innerHTML = currentUser.role === 'seller' 
            ? `<span class="text-[#c2410f] flex items-center gap-1"><i class="fa-solid fa-leaf"></i> Seller</span>` 
            : `Buyer`;
        avatarEl.innerHTML = currentUser.role === 'seller' ? '🪔' : '🛍️';
    } else {
        nameEl.textContent = 'Guest';
        roleEl.textContent = 'Browse as Buyer';
        avatarEl.innerHTML = '👋';
    }
}

// Override the fake functions that already exist in index.html
window.fakeLogin = async function() {
    const emailInput = document.getElementById('login-email');
    const email = emailInput ? emailInput.value : 'demo@artisanhaven.com';
    const success = await loginWithEmail(email, 'demo123');
    if (success) updateAccountUI();
};

window.fakeGoogleLogin = googleSignIn;

window.fakeSignup = async function() {
    const email = prompt("For demo: enter any email (e.g. you@email.com)", "v@artisanhaven.com") || "demo@artisanhaven.com";
    const password = "demo123";
    const success = await signupWithEmail(email, password, selectedRole || 'buyer');
    if (success) updateAccountUI();
};

// Make real functions available to inline script
window.loginWithEmail = loginWithEmail;
window.signupWithEmail = signupWithEmail;
window.googleSignIn = googleSignIn;
window.logout = logout;
window.initAuth = initAuth;
window.currentUser = currentUser;   // so other files can read it
