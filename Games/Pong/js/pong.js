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
    ball = new Arc(new Vector2(canvas.clientWidth / 2, canvas.clientHeight / 2), 10, 0, Math.PI * 2);
    // Create a vector which will determine where the ball will 
    // move at the start of the game

    // To do this, we will use JavaScripts built-in Math.random() function

    // What does random do?
    // Random creates a random number between 0 and 1 - for example, this number could be 0.2

    // What does multiplying it by 10 do?
    // Multiplying it by 10 turns 0.2 into 2
    // So, effectively, we are now creating a random number between 0 and 10

    // What does subtracting 5 do?
    // Subtracting 5 turns our 2 into -3
    // So, effectively, we are now creating a random number between -5 and 5

    let randomX = Math.floor((Math.random() * 10) - 5);
    let randomY = Math.floor((Math.random() * 10) - 5);

    ballMovementVector = new Vector2(randomX, randomY);

    // Okay, but what's wrong with this?
    // There are a number of things
    // One, the ball sometimes doesn't move - this is because both the x
    // and the y value that were generated were equal to 0

    // Also, sometimes the ball moves directly up or directly down - this is because
    // the x value is equal to 0, and the y value is not

    // Finally, we can see the speed of the ball changes each time we start our game

    // So, how do we fix these problems?
    // Well first of all, we will need to create a function that will create a random
    // number between two values (-5 and 5), but will exclude a particular value (0) 

    // WRTIE THIS FUNCTION FOR HOMEWORK

    // Next, we will need to figure out why our ball changes speed each time we reload
    // our game

    // Well, if we think about it, the length of the Vector that we created will ultimately
    // dictate how much distance that we're going to move each frame

    // This isn't good - we want a Vector that will move the ball in a particular direction,
    // but at the same speed as every other vector

    // So, how can we do this? 
    // Well, what do we know about Vectors? They have a length and a direction
    // 
    // If we want our ball to move the same distance each frame, then we need to make
    // sure that every vector that we create has the same length
    //
    // To do this, we will need to normalise each Vector the we create

    // What does normalize mean? Well, normalizing a Vector means that we convert it into 
    // a unit vector (a unit Vector is a Vector which has a length of 1).

    // So, let's create a method that will normalise our vector
    // (See the Vector2 class to see how we wrote the normalize function)
    ballMovementVector.normalize();

    // Create a speed for the ball to move
    // This will be used later to speed our movement up
    ballSpeed = 3;
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
}

// Create a function that will re-draw our updated game
function draw() {
    clearCanvas("rgb(230, 230, 230)");
    ball.draw(context, 1, "blue", "green", false);
}

function clearCanvas(color) {
    context.save();
    context.fillStyle = color;
    context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    context.restore();
}

window.addEventListener("load", loadGame);