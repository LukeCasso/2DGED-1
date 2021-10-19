// Create a handle to our canvas
const canvas = document.getElementById("main_canvas");

// Get a handle to our canvas 2D context
const context = canvas.getContext("2d");

/* GAME VARIABLES HERE */

// Create a function that will load our game
function loadGame() {
    loadAssets();
    initializeGame();
    window.requestAnimationFrame(animate);
}

let invadersSpriteSheet;
let backgroundSpriteSheet;

// Load assets from webpage
function loadAssets() {
    invadersSpriteSheet = document.getElementById("invaders_sprite_sheet");
    backgroundSpriteSheet = document.getElementById("background_sprite_sheet");
}

// Set up game values
function initializeGame() {

}

// Create a function that will run every time the browser updates
function animate(now) {

    // Update game state
    update();

    // Re-draw updated game state
    draw();

    // Loop
    window.requestAnimationFrame(animate);
}

// Create a function that will update our game
function update() {

    let v1 = new Vector2(0, 0);
    let v2 = Vector2.Zero;

    // let v3 = v1 + v2;

    // Changes v1
    v1.add(v2);

    let v3 = Vector2.Add(v1, v2);

    let r1 = Rect.Zero;
    let r2 = Rect.Zero;

    r1.contains(r2);

}

let totalTime = 0;
let bShowFirstFrame = true;

let sX = 0;
let sY = 0;
let sWidth = 22;
let sHeight = 16;

// Create a function that will re-draw our updated game
function draw() {
    clearCanvas();

    // Draw background image
    context.drawImage(
        backgroundSpriteSheet,
        0,
        0,
        canvas.clientWidth,
        canvas.clientHeight
    );

    // Count time
    // Here, we assume that 16ms have passed since the last draw call (i.e., 60 FPS)
    totalTime += 16;

    // If 300ms have passed
    if (totalTime > 300) {

        // Invert the value of bShowFirstFrame
        // Which in turn will show the 'other' frame
        bShowFirstFrame = !bShowFirstFrame; // toggle between true and false each time the code is ran

        // Reset total time
        totalTime = 0;
    }

    // If we want to show the first frame
    if (bShowFirstFrame) {

        // Set our selection to start at 0
        sY = 0;
    }

    // Otherwise
    else {

        // Set our selection to start at 16
        sY = 16;
    }

    // Draw the sprite with the given parameters
    context.drawImage(
        invadersSpriteSheet,        // Sprite sheet
        sX,                         // Start selection x
        sY,                         // Start selection y
        sWidth,                     // Selection width
        sHeight,                    // Selection height
        canvas.clientWidth / 2,     // Draw x
        canvas.clientHeight / 2,    // Draw y
        sWidth,                     // Draw width
        sHeight                     // Draw height
    );
}

// Why is this important?
// Well, if we consider a game which runs on two seperate computers
// One machine may run at 120 FPS, while the other runs at 60 FPS.

// The machine which runs at 120 FPS will call the 'requestAnimationFrame' function 120 times per second
// The machine which runs at 60 FPS will call the 'requestAnimationFrame' function 60 times per second
// As such, the game will be updated twice as often for the player running at 120 FPS.

// Why is this a problem?
// Well, let's imagine that we have an animation cycle that updates every 300ms
// We could count how much time has passed by adding 16ms to a total time variable in the 'requestAnimationFrame' function
// However, we cannot be sure that 16ms are passing each time 'requestAnimationFrame' is called
// requestAnimationFrame is called each time the browser updates, and the browser may update 120 times per second (which is only 
// 8ms between each frame)
// As such, we will reach 300ms twice as quick when running at 120 FPS, as compared to 60 FPS.

// So, we need to come up with a system that relies on the amount of time that has passed, not on the number of frames
// Luckily, requestAnimationFrame provides us with access to a variable - now - which keeps track of the total number of ms since
// the start of the game

// Through this, we can calculate how much time has passed, and how much time is between each frame

// So, how do we do this?
// Well, we can pass now through to update as an argument
// We can then do some basic maths with now to calculate various desireable values (such as total time, and time since last frame)
// We can then use these values to update our game

// As such, our game loop now relies on the amount of time that has passed, and not the number of frames

function clearCanvas() {
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}

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

// Load our game when the webpage is loaded
window.addEventListener("load", loadGame);