// Create a handle to our canvas
const canvas = document.getElementById("main_canvas");

// Get a handle to our canvas 2D context
const context = canvas.getContext("2d");

// Add variables here

// Create a function that will load our game
function loadGame() {

    // Load game assets
    loadAssets();

    // Initialize all sprites
    initializeSprites();

    // Set up game elements
    initializeGame();

    // Start the game loop
    window.requestAnimationFrame(animate);
}

// Create a function that will reset our game
function resetGame() {

    // Clear the canvas
    clearCanvas();

    // Reload our game
    loadGame();
}

let invadersSpriteSheet;
let backgroundSpriteSheet;

function loadAssets() {
    invadersSpriteSheet = document.getElementById("invaders_sprite_sheet");
    backgroundSpriteSheet = document.getElementById("background_sprite_sheet");
}

let backgroundSprite = null;
let enemySprite = null;
let clonedEnemySprite1 = null;
let clonedEnemySprite2 = null;
let clonedEnemySprite3 = null;
let clonedEnemySprite4 = null;

function initializeSprites() {
    
    let transform;
    let artist;

    // CREATE BACKGROUND SPRITE

    // Set up the sprite transform
    // The transform of a given object dictates three things:
    // Where on the screen the object is placed
    // What rotation is applied to the object (in radians)
    // How big the object is
    transform = new Transform2D(
        Vector2.Zero,                                           // Where on the screen the object is placed (Translation)
        0,                                                      // What rotation is applied to the object   (Rotation)
        new Vector2(canvas.clientWidth, canvas.clientHeight)    // How big the object is                    (Scale)
    );

    // The transform of a given object allows us to easily move, rotate, or scale it - all from one place

    // Set up the sprite artist
    // The sprite artist uses the following parameters to draw a sprite to the canvas:
    //
    // CONTEXT - allows the artist to draw to the canvas
    // SPRITE SHEET - provides the artist with an image to create a sprite from
    // SELECTION START POINT - dictates where on the sprite sheet to start a selection from
    // SELECTION AREA - dictates how large the selection area is

    // Using these parameters, the sprite artist can select an area of the SPRITE SHEET (as defined by
    // the SELECTION START POINT, and the SELECTION AREA), to draw to the canvas using CONTEXT.
    
    // In this case, we are selecting the entire background image - from the top left corner of the
    // image (0, 0), to the bottom right of the image (image width, image height).
    artist = new SpriteArtist(
        context,                                                // 2D Context                   (Context)
        backgroundSpriteSheet,                                  // Sprite sheet                 (Image)
        Vector2.Zero,                                           // Selection start point        (Vector2)
        new Vector2(                                            // Selection area (             (Vector2)
            backgroundSpriteSheet.width,                                // selection width
            backgroundSpriteSheet.height                                // selection height
        )                                                       // )
    );

    // Once the transform and artist has been successfully set up,
    // we can create the sprite
    backgroundSprite = new Sprite("Background", transform, artist);

    // Please note that we are only creating the sprites in this function - we are
    // not actually drawing any of these sprites yet. To draw these sprites, we must
    // call their draw function (e.g., backgroundSprite.draw()).

    // So, each frame, we should loop through all of our sprites and call their draw
    // function (we do this in the main game draw function below).

    // To create another sprite, we can then just repeat this above process (see below,
    // where I use the invaders sprite sheet to create an enemy sprite).

    // CREATE ENEMY SPRITE

    // Set up the sprite transform
    transform = new Transform2D(
        new Vector2(                    // Translation i.e., where on the canvas we want to draw the sprite
            canvas.clientWidth / 2, 
            canvas.clientHeight / 2
        ),
        0,                              // Rotation (in radians)
        new Vector2(22, 16)             // Scale i.e., how big we want to draw the sprite
    );

    // Set up the sprite artist
    artist = new SpriteArtist(
        context,                        // Context
        invadersSpriteSheet,            // Sprite sheet
        new Vector2(
            38,                         // Selection start x    (I calculated this by examing the sprite sheet in microsoft paint)
            0                           // Selection start y    (I calculated this by examing the sprite sheet in microsoft paint)
        ),
        new Vector2(
            24,                         // Selection width      (I calculated this by examing the sprite sheet in microsoft paint)
            16                          // Selection height     (I calculated this by examing the sprite sheet in microsoft paint)
        )
    );
    
    // Create enemy sprite
    enemySprite = new Sprite("Enemy", transform, artist);

    // In space invaders, we want to have many enemies on the screen at one time
    // So, rather than setting up a new sprite artist and transform for each new enemy sprite
    // we can just call the .clone() method of the Sprite class to create a deep copy of the
    // enemy sprite that we already created.
    
    // Calling the .clone() method of the Sprite class will give us a deep-copy of the enemySprite
    // object i.e., we are creating an entirely seperate version of the enemySprite object that we
    // can then use in our game. It's important to note that the cloned object will have the same 
    // properties as the original object (such as the transform), but we can change the properties
    // ourselves.

    // Create a clone of the enemy sprite
    clonedEnemySprite1 = enemySprite.clone();

    // Translate the cloned sprite 
    // i.e., move the cloned sprite by some distance in the x, 
    // and by some distance in the y (as defined by a Vector2)
    clonedEnemySprite1.transform.translateBy(new Vector2(24, 0));

    // Repeat the above process to create a line of cloned enemy sprites

    clonedEnemySprite2 = enemySprite.clone();
    clonedEnemySprite2.transform.translateBy(new Vector2(-24, 0));

    clonedEnemySprite3 = enemySprite.clone();
    clonedEnemySprite3.transform.translateBy(new Vector2(24 * 2, 0));

    clonedEnemySprite4 = enemySprite.clone();
    clonedEnemySprite4.transform.translateBy(new Vector2(-24 * 2, 0));

    // ###################################################################
    //
    // Exercise - place the player (spaceship), other enemies, and barriers 
    // into the scene
    //
    // ####################################################################
}

// Create a gameTime variable which will
// hold a reference to our gameTime object
let gameTime;

function initializeGame() {

    // Create a new gameTime object
    // This will allow us to keep track of the time in our game
    gameTime = new GameTime();
}

// Create a function that will be called each time our browser updates
function animate(now) {

    // Update game time
    gameTime.update(now);

    // Update game
    update(gameTime);

    // Re-draw game
    draw(gameTime);

    // Loop
    window.requestAnimationFrame(animate);
}

function update(gameTime) {

    // console.log(gameTime.TotalElapsedTimeInMs);
}

// Create a function that will re-draw our updated game
function draw(gameTime) {

    // Clear canvas
    clearCanvas();

    // Draw background sprite
    backgroundSprite.draw();

    // Draw enemy sprite
    enemySprite.draw();

    // Draw cloned sprites
    clonedEnemySprite1.draw();
    
    // Draw clone sprite
    clonedEnemySprite2.draw();

    // Draw clone sprite
    clonedEnemySprite3.draw();
    
    // Draw clone sprite
    clonedEnemySprite4.draw();
}

// Why is using gameTime instead of frame rate important?
// Well, if we consider a game which runs on two seperate computers
// One machine may run at 120 FPS, while the machine runs at 60 FPS.

// The machine which runs at 120 FPS will call the 'requestAnimationFrame' function 120 times per second.
// The machine which runs at 60 FPS will call the 'requestAnimationFrame' function 60 times per second.
// As such, the game will be updated twice as often for the player running at 120 FPS.

// Why is this a problem?
// Well, let's imagine that we have an animation cycle that updates every 300ms
// We could roughly estimate how much time has passed by adding 16ms to a total time variable in the 'requestAnimationFrame' function
// However, we cannot be sure that 16ms are passing each time 'requestAnimationFrame' is called
// requestAnimationFrame is called each time that the browser updates, and the browser may update 120 times per second (which is only 
// 8ms between each frame), or 30 times per second (which is 32ms between each frame).

// As such, we will reach 300ms three times as quick when running at 120 FPS, as compared to when running at 30 FPS.
// So, we need to come up with a solution that accurately describes the amount of time that has passed, rather than relying on an 
// estimated measure based on the number of frame.

// Luckily, requestAnimationFrame provides us with access to a variable - 'now' - which keeps track of the total time since the start
// of our game (in ms)

// Through this, we can calculate how much time has passed, and how much time is between each frame

// So, how do we do this?
// Well, we can pass 'now' through to update as an argument
// We can then do some basic maths with 'now' to calculate various desireable values (such as total time, and time since last frame)
// See the GameTime class for information on how these calculations work
// We can then use these values to update our game

// As such, our game loop now relies on the amount of time that has passed, and not the number of frames

function clearCanvas() {
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}

// Load our game when the webpage loads
window.addEventListener("load", loadGame);

// Create an object which will store all of our currently held keys
let keysDown = {};

// Trigger a function when a key is pressed
window.addEventListener("keydown", function (event) {

    keysDown[event.key] = true;
});

// Trigger a function when a key is released
window.addEventListener("keyup", function (event) {

    delete keysDown[event.key];
});