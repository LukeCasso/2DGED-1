// Create a handle to our canvas
let canvas = document.getElementById("main_canvas");

// Get a handle to our canvas 2D context
let context = canvas.getContext("2d");

// Create some variables that will represent the various elements
// of our game

// Ball variables
let ball;
let ballMovementVector;
let ballSpeed;

// Paddle variables
let leftPaddle;
let rightPaddle;
let paddleWidth;
let paddleHeight;
let margin;

let paddleMovementSpeed;

// Create a function that will load our game
function loadGame() {
    initializeGame();
    window.requestAnimationFrame(animate);
}

// Set up game values
function initializeGame() {

    initializeBall();
    initializePaddles();
}

function initializeBall() {
    // Create a ball at the center of our screen
    ball = new Arc(
        new Vector2(canvas.clientWidth / 2, canvas.clientHeight / 2),
        10,
        0,
        Math.PI * 2
    );

    // Generate a random x and a random y value
    let randomX = getRandomInRangeExcluding(-10, 10, 0);
    let randomY = getRandomInRangeExcluding(-0.5, 0.5, 0);

    // Use our random x and random y values to create a Vector2 that will
    // determine what direction our ball moves in at the start of our game
    ballMovementVector = new Vector2(randomX, randomY);

    // (See the Vector2 class to see how we wrote the normalize function)
    ballMovementVector.normalize();

    // Create a speed for the ball to move
    // This will be used later to speed our movement up
    ballSpeed = 3;
}

function initializePaddles() {

    paddleWidth = 10;
    paddleHeight = 80;
    margin = 10;

    leftPaddle = new Rect(
        paddleWidth,
        paddleHeight,
        new Vector2(

            // Place the paddle on the left hand side of our canvas

            // We use a small margin value (10px) to move the canvas in slightly
            // from the left of the canvas
            margin,

            // Place the paddle at the center of our canvas (y axis)

            // Subtract half of the paddles height to move the center point of 
            // the paddle up to the center line of the canvas

            // We must do this because the Rect object is drawn starting from the 
            // top-left corner

            // If we don't do this, the top-left corner of our Rect would be placed 
            // along the center line of our cavnas, and as such, the rest of the
            // Rect would be drawn below the center line
            canvas.clientHeight / 2 - (paddleHeight / 2)
        )
    );

    rightPaddle = new Rect(
        paddleWidth,
        paddleHeight,
        new Vector2(
            // Place the paddle on the right hand side of our canvas (canvas width
            // on the x axis)

            // We must subtract the width of the paddle to factor in how wide the 
            // paddle is (remember, the Rect object is drawn from the top-left
            // corner)

            // If we didn't factor in the paddle's width, then the paddle would begin
            // to be drawn from the edge of our canvas, and would ultimately be drawn
            // outside of our canvas

            // We also subtract a small margin (10px) to move the paddle in from the 
            // right-hand side of the canvas
            canvas.clientWidth - paddleWidth - margin,
            canvas.clientHeight / 2 - (paddleHeight / 2)
        )
    );

    // Set the paddle movement speed
    paddleMovementSpeed = 2;
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
    checkCollisions();

    updateBall();
    updatePaddles();
}

function updateBall() {
    ball.position.x += ballMovementVector.x * ballSpeed;
    ball.position.y += ballMovementVector.y * ballSpeed;
}

function updatePaddles() {

    // Loop through the keysDown object
    
    // The keysDown object contains a list of all the keys which are
    // currently held-down by the user
    for (const key in keysDown) {

        // Initialize paddle movement vectors
        // Is this a good place to initialize these Vectors?
        let leftPaddleMovement = new Vector2(0, 0);
        let rightPaddleMovement = new Vector2(0, 0);

        // If the user is pressing the w key, create a Vector that will move
        // the left paddle upwards
        if (key === "w") {
            leftPaddleMovement = new Vector2(0, -paddleMovementSpeed);
        }

        // If the user is pressing the s key, create a Vector that will move 
        // the left paddle downwards
        else if (key === "s") {
            leftPaddleMovement = new Vector2(0, paddleMovementSpeed);
        }

        // Check if it is safe to move the left paddle
        // i.e. check if moving the paddle will move it outside of the cavnas
        if (
            leftPaddle.position.y + leftPaddleMovement.y > 0 &&
            leftPaddle.position.y + leftPaddleMovement.y + paddleHeight < canvas.clientHeight
        ) {

            // Move the paddle if it is safe to move
            leftPaddle.move(leftPaddleMovement);
        }

        // If the user is pressing the ArrowUp key, create a Vector that will move 
        // the right paddle upwards
        if (key === "ArrowUp") {
            rightPaddleMovement = new Vector2(0, -paddleMovementSpeed);
        }

        // If the user is pressing the ArrowDown key, create a Vector that will move
        // the right paddle downwards
        else if (key === "ArrowDown") {
            rightPaddleMovement = new Vector2(0, paddleMovementSpeed);
        }

        // Check if it is safe to move the right paddle
        // i.e. check if moving the paddle will move it outside of the cavnas
        if (
            rightPaddle.position.y + rightPaddleMovement.y > 0 &&
            rightPaddle.position.y + rightPaddleMovement.y + paddleHeight < canvas.clientHeight /* - margin */
        ) {

            // Move the paddle if it is safe to move
            rightPaddle.move(rightPaddleMovement);
        }
    }
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

        // Change the colour of the ball if it touches the bottom of 
        // our canvas
        ballColor = altColor1;
    }

    // Check if the ball is leaving the top of our canvas
    else if (ball.position.y - ball.radius <= 0) {

        ballMovementVector.y *= -1;

        // Change the colour of the ball if it touches the top of our
        // canvas
        ballColor = altColor2;
    }
}

let ballColor = "black";
let altColor1 = "red";
let altColor2 = "green";

// Create a function that will re-draw our updated game
function draw() {
    clearCanvas("rgb(230, 230, 230)");

    drawBall();
    drawPaddles();
}

function drawBall() {

    // Draw ball
    ball.draw(context, 1, ballColor, ballColor, false);
}

function drawPaddles() {

    // Draw left paddle
    leftPaddle.draw(context, 1, "blue");

    // Draw right paddle
    rightPaddle.draw(context, 1, "blue");
}

function clearCanvas(color) {
    context.save();
    context.fillStyle = color;
    context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    context.restore();
}

// Load our game when the webpage is loaded
window.addEventListener("load", loadGame);

let keysDown = {};

// Add an event listener that will be triggered when the
// user presses (or holds) a button

// In this example, we are using an anonymouse function
// i.e. a function without a name
window.addEventListener("keydown", function (event) {

    // Add the button that the user has pressed to a 
    // keysDown object
    keysDown[event.key] = true;
});

// Add an event listener that will be triggered when the 
// user releases a button

// In this example, we are using an anonymouse function
// i.e. a function without a name
window.addEventListener("keyup", function (event) {

    // Remove the key that the user is no longer pressing
    // from our keysDown object
    delete keysDown[event.key];
});

// Code referenced: https://www.toolbox.com/tech/devops/question/random-number-generator-needs-to-exclude-two-values-121014/ 
function getRandomInRangeExcluding(min, max, excl) {
    let value = excl;

    while (value == excl) {
        value = Math.floor(Math.random() * (max - min + 1) + min);
    }

    return value;
}