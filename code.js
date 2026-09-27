const txt = document.getElementById("ginger-text");
const defaultGingerText = "What Makes him Speical👌";
const activeGingerText = "HE IS GINGEEER😭😭😭";

// 1. Asset preloading to prevent lag/stutter on mobile networks
const preloadAssets = [
    "Images/job.gif",
    "Images/gym.gif",
    "Images/giphy.gif",
    "Images/singer.gif",
    "Images/feet.gif",
    "Images/vecteezy_ribbon-background-realistic-modern-design_1436671.jpg"
];

preloadAssets.forEach(src => {
    const img = new Image();
    img.src = src;
});

// 2. Interaction state functions (desktop hover & script triggers)
function change() {
    if (txt) txt.innerText = activeGingerText;
}

function def() {
    if (txt) txt.innerText = defaultGingerText;
}

function changeBack() {
    document.body.classList.add("feet-active");
}

function preBack() {
    document.body.classList.remove("feet-active");
}

// 3. Touch & click handling for flexible mobile + PC support
function initInteractions() {
    const cards = document.querySelectorAll(".imgs");

    cards.forEach(box => {
        box.addEventListener("click", (e) => {
            e.stopPropagation();
            const isCurrentlyRevealed = box.classList.contains("revealed");

            // Close other revealed cards for clean single focus
            cards.forEach(other => {
                if (other !== box && other.classList.contains("revealed")) {
                    other.classList.remove("revealed");
                    if (other.id === "hair-img") def();
                    if (other.id === "feet-img") preBack();
                }
            });

            // Toggle current card
            if (isCurrentlyRevealed) {
                box.classList.remove("revealed");
                if (box.id === "hair-img") def();
                if (box.id === "feet-img") preBack();
            } else {
                box.classList.add("revealed");
                if (box.id === "hair-img") change();
                if (box.id === "feet-img") changeBack();
            }
        });
    });

    // Tap outside to close any open cards on mobile
    document.addEventListener("click", () => {
        cards.forEach(card => card.classList.remove("revealed"));
        def();
        preBack();
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initInteractions);
} else {
    initInteractions();
}