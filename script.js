// Sidebar toggle logic
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("active");
}

// Game logic for "Catch the Falling Object"
const basket = document.getElementById("basket");
const fallingObject = document.getElementById("falling-object");
const scoreboard = document.getElementById("scoreboard");

let score = 0;
let basketPosition = 160; // Starting position of the basket
let objectX = Math.random() * 380; // Random starting position for the object
let objectY = 0; // Starting Y position of the falling object
const gameHeight = 600;
const gameWidth = 400;

// Move the basket using arrow keys
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" && basketPosition > 0) {
        basketPosition -= 20; // Move left
    } else if (event.key === "ArrowRight" && basketPosition < gameWidth - 80) {
        basketPosition += 20; // Move right
    }
    basket.style.left = `${basketPosition}px`;
});

// Update the falling object position
function updateFallingObject() {
    objectY += 5; // Falling speed

    // If the object reaches the bottom
    if (objectY > gameHeight) {
        objectY = 0; // Reset to the top
        objectX = Math.random() * 380; // Random new position
    }

    // Check collision
    if (
        objectY > 580 && // Close to the basket
        objectX > basketPosition - 20 && // Align horizontally with the basket
        objectX < basketPosition + 80 // Align horizontally with the basket
    ) {
        score++;
        objectY = 0; // Reset to the top
        objectX = Math.random() * 380; // Random new position
        scoreboard.textContent = `Score: ${score}`;
    }

    fallingObject.style.top = `${objectY}px`;
    fallingObject.style.left = `${objectX}px`;
}

// Game loop
function gameLoop() {
    updateFallingObject();
    requestAnimationFrame(gameLoop); // Keep the game running
}

// Start the game loop
gameLoop();
