// Create a handle to our canvas
const canvas = document.getElementById("main_canvas");

// Get a handle to our canvas 2D context
const context = canvas.getContext("2d");

/** CORE GAME LOOP CODE - DO NOT CHANGE */

let gameTime;
let objectManager;

function start() {

    // Create a new gameTime object
    // This will allow us to keep track of the time in our game
    gameTime = new GameTime();

    // Load game elements
    load();

    // Initialize game elements
    initialize();

    // Start the game loop
    window.requestAnimationFrame(animate);
}

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

    // Call the update method of the object manager class
    // to update all sprites
    objectManager.update(gameTime);
}

function draw(gameTime) {

    // Clear previous draw
    clearCanvas(Color.White);

    // Call the draw method of the object manager class
    // to draw all sprites
    objectManager.draw(gameTime);
}

function clearCanvas() {
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}

/** GAME SPECIFIC CODE BELOW - CHANGE AS NECESSARY */

let invadersSpriteSheet;
let backgroundSpriteSheet;

function load() {

    loadAssets();
}

function loadAssets() {

    loadSpriteSheets();
    loadSounds();
}

function loadSpriteSheets() {

    invadersSpriteSheet = document.getElementById("invaders_sprite_sheet");
    backgroundSpriteSheet = document.getElementById("background_sprite_sheet");
}

function loadSounds() {

    // TO DO...
}

function initialize() {

    initializeManagers();
    initializeSprites();
}

function initializeManagers() {

    objectManager = new ObjectManager(context);
}

function initializeSprites() {

    initializeBackground();
    initializeEnemies();
    initializePlayers();
    initializeBarriers();
}

function initializeBackground() {

    let transform = null;
    let artist = null;

    // Set up the sprite transform
    // The transform of a given object dictates three things:
    // Where on the screen the object is placed (translation)
    // What rotation is applied to the object (rotation)
    // How big the object is (scale)
    // We can also define the pivot point of the object (origin)
    // And the original size of the object, before it is scaled (dimension)
    transform = new Transform2D(
        Vector2.Zero,                   // Translation
        0,                              // Rotation
        Vector2.One,                    // Scale
        Vector2.Zero,                   // Origin
        new Vector2(                    // Dimension
            canvas.clientWidth,
            canvas.clientHeight
        ),
    );

    // Set up the sprite artist
    // The sprite artist uses the following parameters to draw a sprite to the canvas:
    //
    // CONTEXT - allows the artist to draw to the canvas
    // SPRITE SHEET - provides the artist with an image to create a sprite from
    // ALPHA - dictates how transparent the sprite should be
    // SELECTION START POINT - dictates where on the sprite sheet to start a selection from
    // SELECTION AREA - dictates how large the selection area is

    // Using these parameters, the sprite artist can select an area of the SPRITE SHEET (as defined by
    // the SELECTION START POINT, and the SELECTION AREA), to draw to the canvas using CONTEXT.

    // In this case, we are selecting the entire background image - from the top left corner of the
    // image (0, 0), to the bottom right of the image (image width, image height).
    artist = new SpriteArtist(
        context,                                                // 2D Context                   (Context)
        backgroundSpriteSheet,                                  // Sprite sheet                 (Image)
        1,                                                      // Alpha                        (Number)
        Vector2.Zero,                                           // Selection start point        (Vector2)
        new Vector2(                                            // Selection area (             (Vector2)
            backgroundSpriteSheet.width,                                // selection width
            backgroundSpriteSheet.height                                // selection height
        )                                                       // )
    );

    let backgroundSprite = new Sprite(
        "background",                                           // ID
        transform,                                              // Transform
        ActorType.Background,                                   // ActorType    (Background, NPC, Player, Projectile)
        StatusType.Drawn,                                       // StatusType   (Off, Drawn, Updated)
        artist                                                  // Artist
    );

    // Add to the object manager
    objectManager.add(backgroundSprite);
}

function initializeEnemies() {

    let transform = null;
    let artist = null;

    /********************************* ANIMATED ENEMY ONE *********************************/

    // Where and how to draw our sprite on screen
    transform = new Transform2D(
        new Vector2(                        // Translation
            canvas.clientWidth / 2,
            50
        ),
        0,                                  // Rotation
        new Vector2(2, 2),                  // Scale (Scale x2)
        Vector2.Zero,                       // Origin (Top-Left Corner)
        new Vector2(22, 16)                 // Source Dimensions
    );

    // What area of a sprite sheet to draw on screen
    artist = new AnimatedSpriteArtist(
        context,
        invadersSpriteSheet,
        1,                                      // Opaque
        SpriteData.ENEMY_ONE_FRAMES,            // Array of Source Position and Source Dimensions
        0,                                      // Start frame
        1,                                      // End frame
        5                                       // Animation frame rate (speed)
    );

    let animatedEnemyOneSprite = new Sprite(
        "Animated Enemy 1",                     // Unique ID
        transform,                              // Transform (Set up above)
        ActorType.NPC,                          // Non playable character
        StatusType.Updated | StatusType.Drawn,  // Draw and update this sprite
        artist                                  // Artist (Set up above)
    );

    // Add to the object manager
    objectManager.add(animatedEnemyOneSprite);

    /********************************* ANIMATED ENEMY TWO *********************************/

    // Where and how to draw our sprite on screen
    transform = new Transform2D(
        new Vector2(                        // Translation
            canvas.clientWidth / 2,
            150
        ),
        0,                                  // Rotation
        new Vector2(2, 2),                  // Scale (Scale x2)
        Vector2.Zero,                       // Origin (Top-Left Corner)
        new Vector2(16, 16)                 // Source Dimensions
    );

    // What area of a sprite sheet to draw on screen
    artist = new AnimatedSpriteArtist(
        context,
        invadersSpriteSheet,
        1, // Opaque
        SpriteData.ENEMY_TWO_FRAMES,            // Array of Source Position and Source Dimensions
        0,                                      // Start frame
        1,                                      // End frame
        3                                       // Animation frame rate (speed)
    );

    let animatedEnemyTwoSprite = new Sprite(
        "Animated Enemy 2",                     // Unique ID
        transform,                              // Transform (Set up above)
        ActorType.NPC,                          // Non playable character
        StatusType.Updated | StatusType.Drawn,  // Draw and update this sprite
        artist                                  // Artist (Set up above)
    );

    // Add to the object manager
    objectManager.add(animatedEnemyTwoSprite);

    /******************************** ANIMATED ENEMY THREE ********************************/

    // Where and how to draw our sprite on screen
    transform = new Transform2D(
        new Vector2(                        // Translation
            canvas.clientWidth / 2,
            100
        ),
        0,                                  // Rotation
        new Vector2(2, 2),                  // Scale (Scale x2)
        Vector2.Zero,                       // Origin (Top-Left Corner)
        new Vector2(24, 16)                 // Source Dimensions
    );

    // What area of a sprite sheet to draw on screen
    artist = new AnimatedSpriteArtist(
        context,
        invadersSpriteSheet,
        1,                                      // Opaque
        SpriteData.ENEMY_THREE_FRAMES,          // Array of Source Position and Source Dimensions
        0,                                      // Start frame
        1,                                      // End frame
        10                                      // Animation frame rate (speed)
    );

    let animatedEnemyThreeSprite = new Sprite(
        "Animated Enemy 3",                     // Unique ID
        transform,                              // Transform (Set up above)
        ActorType.NPC,                          // Non playable character
        StatusType.Updated | StatusType.Drawn,  // Draw and update this sprite
        artist                                  // Artist (Set up above)
    );

    // Add to the object manager
    objectManager.add(animatedEnemyThreeSprite);

    /********************************* ENEMY THREE CLONES *********************************/

    let clonedEnemySprite = null;

    // Loop 10 times
    for (let i = -5; i < 5; i++) {

        // Create a clone of animated enemy three
        clonedEnemySprite = animatedEnemyThreeSprite.clone();

        // Move the clone (relative to the animatedEnemyThreeSprite's position)
        clonedEnemySprite.transform.translateBy(
            new Vector2(
                i * 50,             // -250, -200, -150, -100, -50, 0, 50, 100, 150, 200, 250
                50
            )
        );

        // Add this clone to our object manager
        objectManager.add(clonedEnemySprite);
    }
}

function initializePlayers() {

    let transform;
    let artist;

    transform = new Transform2D(
        new Vector2(
            canvas.clientWidth / 2 - SpriteData.PLAYER_WIDTH / 2,
            canvas.clientHeight - 100
        ),
        0,
        new Vector2(2, 2),
        Vector2.Zero,
        new Vector2(SpriteData.PLAYER_WIDTH, SpriteData.PLAYER_HEIGHT)
    );

    artist = new SpriteArtist(
        context,
        invadersSpriteSheet,
        1,
        new Vector2(SpriteData.PLAYER_X, SpriteData.PLAYER_Y),
        new Vector2(SpriteData.PLAYER_WIDTH, SpriteData.PLAYER_HEIGHT),
    );

    let playerSprite = new Sprite(
        "Player",
        transform,
        ActorType.Player,
        StatusType.Updated | StatusType.Drawn,
        artist
    );

    // TO DO - ATTACH PLAYER MOVE CONTROLLER

    // Add to the object manager
    objectManager.add(playerSprite);
}

function initializeBarriers() {

    // TO DO: ADD BARRIER SPRITES
}

function resetGame() {

    clearCanvas();
    startGame();
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

// Load our game when the webpage loads
window.addEventListener("load", start);

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