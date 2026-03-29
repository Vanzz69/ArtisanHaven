// js/animations.js — Extra buttery motions & scroll reveals
function runExtraAnimations() {
    // Product cards stagger
    gsap.from(".product-card", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: "#products-grid", start: "top 80%" }
    });
    
    // Makers grid
    gsap.from("#makers-grid > div", {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        scrollTrigger: { trigger: "#makers", start: "top 75%" }
    });
}

window.runExtraAnimations = runExtraAnimations;
