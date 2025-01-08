const basket = document.getElementById("basket");
const scoreboard = document.getElementById("scoreboard");
const livesDisplay = document.getElementById("lives");
const gameOverMessage = document.getElementById("game-over");
const gameContainer = document.querySelector(".game-container");

let score = 0;
let lives = 10; // Start with 10 lives
let playerName = "";
let level = 1;
let basketPosition = 160; // Initial basket position
let fallingObjects = [];
const gameWidth = 400; // Width of the game container
const gameHeight = 600; // Height of the game container
let fallingSpeed = 2; // Initial falling speed
let isDragging = false;
let leaderboardData = []; // Holds top 3 scores

// Prompt for player name
function getPlayerName() {
    playerName = prompt("Enter your name:");
    if (!playerName) {
        playerName = "Anonymous";
    }
    document.getElementById("player-name").textContent = `Player: ${playerName}`;
}

// Update leaderboard
function updateLeaderboard() {
    leaderboardData.push({ name: playerName, score });
    leaderboardData.sort((a, b) => b.score - a.score);
    leaderboardData = leaderboardData.slice(0, 3); // Keep top 3

    leaderboard.innerHTML = "";
    leaderboardData.forEach((entry, index) => {
        const li = document.createElement("li");
        li.textContent = `${index + 1}. ${entry.name} - ${entry.score}`;
        leaderboard.appendChild(li);
    });
}

// End the game
function endGame() {
    gameOverMessage.classList.remove("hidden");
    updateLeaderboard();
    fallingObjects.forEach((object) => gameContainer.removeChild(object));
    fallingObjects = [];
}
// Update basket position on touch move
gameContainer.addEventListener("touchmove", (event) => {
    const touch = event.touches[0];
    const containerRect = gameContainer.getBoundingClientRect();
    const touchX = touch.clientX - containerRect.left;
    basketPosition = Math.max(0, Math.min(touchX - 40, gameWidth - 80));
    basket.style.left = `${basketPosition}px`;
    event.preventDefault(); // Prevent browser scrolling
});

// Create multiple falling objects
function createFallingObject() {
    const fallingObject = document.createElement("div");
    fallingObject.classList.add("falling-object");
    fallingObject.style.left = `${Math.random() * (gameWidth - 20)}px`; // Random x-position
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

// Update falling objects
function updateFallingObjects() {
    fallingObjects.forEach((object, index) => {
        const currentTop = parseInt(object.style.top);
        object.style.top = `${currentTop + fallingSpeed}px`;

        // Check if object reaches the bottom
        if (currentTop + 20 >= gameHeight) {
            lives -= 1; // Decrease lives
            livesDisplay.textContent = `Lives: ${lives}`;
            gameContainer.removeChild(object);
            fallingObjects.splice(index, 1);
            if (lives === 0) {
                endGame();
            }
        }

        // Check for collision with basket
        const objectLeft = parseInt(object.style.left);
        if (
            currentTop + 20 >= 580 &&
            objectLeft > basketPosition - 20 &&
            objectLeft < basketPosition + 80
        ) {
            score += 10 * level; // Score increases with level
            scoreboard.textContent = `Score: ${score}`;
            gameContainer.removeChild(object);
            fallingObjects.splice(index, 1);
        }
    });
}

// Game loop
function gameLoop() {
    if (Math.random() < 0.02 * level) {
        createFallingObject();
    }
    updateFallingObjects();
    if (lives > 0) {
        requestAnimationFrame(gameLoop);
    }
}

// End the game
function endGame() {
    gameOverMessage.classList.remove("hidden");
    fallingObjects.forEach((object) => gameContainer.removeChild(object));
    fallingObjects = [];
}

// Increase difficulty over time
function increaseDifficulty() {
    setInterval(() => {
        if (lives > 0) {
            level++;
            fallingSpeed += 0.5;
        }
    }, 10000);
}

// Start the game
livesDisplay.textContent = `Lives: ${lives}`; // Display initial lives
gameLoop();
increaseDifficulty();
