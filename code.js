// 1. Asset preloading for instant responsiveness
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

// 2. Configuration for each card's heading text and effects
const cardConfigs = {
    "job-img": {
        textId: "job-text",
        defaultText: "What is his Job🤔",
        activeText: "Marketing🤑🪙"
    },
    "gym-img": {
        textId: "build-text",
        defaultText: "How is his Build",
        activeText: "Mid💩💩"
    },
    "hair-img": {
        textId: "ginger-text",
        defaultText: "What Makes him Speical👌",
        activeText: "HE IS GINGEEER😭😭😭"
    },
    "singer-img": {
        textId: "singer-text",
        defaultText: "What's his Favorite Artist🎤",
        activeText: "Drake🔞"
    },
    "feet-img": {
        textId: "feet-text",
        defaultText: "What does he want?",
        activeText: "FEEEET🔥🔥🔥",
        onActivate: () => document.body.classList.add("feet-active"),
        onDeactivate: () => document.body.classList.remove("feet-active")
    }
};

function revealCard(cardId) {
    const config = cardConfigs[cardId];
    if (!config) return;
    const el = document.getElementById(config.textId);
    if (el) el.innerText = config.activeText;
    if (config.onActivate) config.onActivate();
}

function resetCard(cardId) {
    const config = cardConfigs[cardId];
    if (!config) return;
    const el = document.getElementById(config.textId);
    if (el) el.innerText = config.defaultText;
    if (config.onDeactivate) config.onDeactivate();
}

function resetAllCards() {
    Object.keys(cardConfigs).forEach(cardId => {
        resetCard(cardId);
        const box = document.getElementById(cardId);
        if (box) box.classList.remove("revealed");
    });
}

// Backwards compatibility functions
function change() { revealCard("hair-img"); }
function def() { resetCard("hair-img"); }
function changeBack() { revealCard("feet-img"); }
function preBack() { resetCard("feet-img"); }

// 3. Setup event listeners for hover (Desktop) and tap (Mobile)
function initInteractions() {
    Object.keys(cardConfigs).forEach(cardId => {
        const box = document.getElementById(cardId);
        if (!box) return;

        // Desktop mouse hover events
        box.addEventListener("mouseenter", () => {
            revealCard(cardId);
        });

        box.addEventListener("mouseleave", () => {
            // Only reset if not tapped/pinned on mobile
            if (!box.classList.contains("revealed")) {
                resetCard(cardId);
            }
        });

        // Mobile touch & click events
        box.addEventListener("click", (e) => {
            e.stopPropagation();
            const isCurrentlyRevealed = box.classList.contains("revealed");

            // Close other cards for a clean single reveal
            Object.keys(cardConfigs).forEach(otherId => {
                if (otherId !== cardId) {
                    resetCard(otherId);
                    const otherBox = document.getElementById(otherId);
                    if (otherBox) otherBox.classList.remove("revealed");
                }
            });

            if (isCurrentlyRevealed) {
                box.classList.remove("revealed");
                resetCard(cardId);
            } else {
                box.classList.add("revealed");
                revealCard(cardId);
            }
        });
    });

    // Tap outside resets all cards on mobile
    document.addEventListener("click", () => {
        resetAllCards();
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initInteractions);
} else {
    initInteractions();
}