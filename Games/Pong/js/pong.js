// Create a handle to our canvas
let canvas = document.getElementById("main_canvas");

// Get a handle to our canvas 2D context
let context = canvas.getContext("2d");

// Create some variables that will represent the various elements
// of our game
let ball;
let leftPaddle;
let rightPaddle;

let ballMovementVector;
let ballSpeed;

// Create a function that will load our game
function loadGame() {
    initializeGame();
    window.requestAnimationFrame(animate);
}

// Set up game values
function initializeGame() {
    // Create a ball at the center of our screen
    ball = new Arc(
        new Vector2(canvas.clientWidth / 2, canvas.clientHeight / 2), 
        10, 
        0, 
        Math.PI * 2
    );

    let randomX = getRandomInRangeExcluding(-10, 10, 0);
    let randomY = getRandomInRangeExcluding(-0.5, 0.5, 0);

    ballMovementVector = new Vector2(randomX, randomY);

    // (See the Vector2 class to see how we wrote the normalize function)
    ballMovementVector.normalize();

    // Create a speed for the ball to move
    // This will be used later to speed our movement up
    ballSpeed = 3;

    let paddleWidth = 10;
    let paddleHeight = 80;
    let margin = 10;

    leftPaddle = new Rect(
        paddleWidth,
        paddleHeight,
        new Vector2(
            margin,
            canvas.clientHeight / 2 - (paddleHeight / 2)
        )
    );
}

function getRandomNumberInRangeExcluding(start, end, excluding) {
    // Return a value between start and end, but that is not equal to excluding
}

// Create a function that will run every time the browser updates
function animate() {
    // Update game state
    update();

    // Re-draw update game state
    draw();

    // Loop
    window.requestAnimationFrame(animate);
}

// Create a function that will update our game
function update() {
    // Move our ball across the screen with every update
    // ball.position.x += 1;
    // ball.position.y += 0.25;

    ball.position.x += ballMovementVector.x * ballSpeed;
    ball.position.y += ballMovementVector.y * ballSpeed;

    checkCollisions();
}

function checkCollisions() {

    // Check if the ball is leaving the right hand side of our canvas
    if (ball.position.x + ball.radius >= canvas.clientWidth) {

        ballMovementVector.x *= -1;
    }
    // Check if the ball is leaving the left hand side of our canvas
    else if (ball.position.x - ball.radius <= 0) {

        ballMovementVector.x *= -1;
    }

    // Check if the ball is leaving the bottom of our canvas
    if (ball.position.y + ball.radius >= canvas.clientHeight) {

        ballMovementVector.y *= -1;

        ballColor = altColor1;
    }
    // Check if the ball is leaving the top of our canvas
    else if (ball.position.y - ball.radius <= 0) {

        ballMovementVector.y *= -1;
        
        ballColor = altColor2;
    }
}

let ballColor = "black";
let altColor1 = "red";
let altColor2 = "green";

// Create a function that will re-draw our updated game
function draw() {
    clearCanvas("rgb(230, 230, 230)");  
    ball.draw(context, 1, ballColor, ballColor, false); // Updated ball draw

    // Draw our left paddle
    leftPaddle.draw(context, 1, "blue");
}

function clearCanvas(color) {
    context.save();
    context.fillStyle = color;
    context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    context.restore();
}

window.addEventListener("load", loadGame);

// Stackoverflow: 
function getRandomInRangeExcluding(min, max, excl) {
    let value = excl;

    while (value == excl) {
        value = Math.floor(Math.random() * (max - min + 1) + min);
    }

    return value;
}