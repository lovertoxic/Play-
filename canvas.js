const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// Set up game variables
let playerX = 200;
let playerY = 500;
let playerSpeed = 5;
let obstacles = [];
let score = 0;

// Draw player
function drawPlayer() {
    ctx.fillStyle = 'red';
    ctx.fillRect(playerX, playerY, 50, 50);
}

// Draw obstacles
function drawObstacles() {
    obstacles.forEach((obstacle) => {
        ctx.fillStyle = 'blue';
        ctx.fillRect(obstacle.x, obstacle.y, 50, 50);
    });
}

// Update game state
function update() {
    // Move obstacles
    obstacles.forEach((obstacle) => {
        obstacle.y += 5;
        if (obstacle.y > canvas.height) {
            obstacles.splice(obstacles.indexOf(obstacle), 1);
            score++;
        }
    });

    // Generate new obstacles
    if (Math.random() < 0.1) {
        obstacles.push({ x: Math.random() * (canvas.width - 50), y: 0 });
    }

    // Check collisions
    obstacles.forEach((obstacle) => {
        if (checkCollision(playerX, playerY, obstacle.x, obstacle.y)) {
            alert('Game Over!');
            // Reset game state
            playerX = 200;
            playerY = 500;
            obstacles = [];
            score = 0;
        }
    });
}

// Check collision between player and obstacle
function checkCollision(x1, y1, x2, y2) {
    return x1 < x2 + 50 && x1 + 50 > x2 && y1 < y2 + 50 && y1 + 50 > y2;
}

// Handle user input
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        playerX -= playerSpeed;
    } else if (e.key === 'ArrowRight') {
        playerX += playerSpeed;
    }
});

// Main game loop
function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawObstacles();
    update();
    ctx.fillStyle = 'black';
    ctx.font = '24px Arial';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(`Score: ${score}`, 10, 10);
    requestAnimationFrame(loop);
}

loop();
