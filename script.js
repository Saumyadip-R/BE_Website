const basket = document.getElementById("basket");
const scoreboard = document.getElementById("scoreboard");
const livesDisplay = document.getElementById("lives");
const gameOverMessage = document.getElementById("game-over");
const gameContainer = document.querySelector(".game-container");

let score = 0;
let lives = 10; // Start with 10 lives
let level = 1;
let basketPosition = 160;
let fallingObjects = [];
const gameWidth = 400;
const gameHeight = 600;
let fallingSpeed = 2;
let isDragging = false;

// Create multiple falling objects
function createFallingObject() {
    const fallingObject = document.createElement("div");
    fallingObject.classList.add("falling-object");
    fallingObject.style.left = `${Math.random() * (gameWidth - 20)}px`;
    fallingObject.style.top = "0px";
    gameContainer.appendChild(fallingObject);
    fallingObjects.push(fallingObject);
}

// Move the basket using arrow keys
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" && basketPosition > 0) {
        basketPosition -= 30; // Increase sensitivity
    } else if (event.key === "ArrowRight" && basketPosition < gameWidth - 80) {
        basketPosition += 30;
    }
    basket.style.left = `${basketPosition}px`;
});

// Enable dragging the baske
