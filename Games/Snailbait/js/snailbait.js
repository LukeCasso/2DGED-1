// Create a handle to our canvas
const canvas = document.getElementById("main_canvas");

// Get a handle to our canvas 2D context
const context = canvas.getContext("2d");

/** CORE GAME LOOP CODE - DO NOT CHANGE */

let gameTime;

let notificationCenter;

let cameraManager;
let objectManager;
let keyboardManager;
let soundManager;
let gameStateManager;
let menuManager;

function start() {

    // Create a new gameTime object
    // This will allow us to keep track of the time in our game
    gameTime = new GameTime();

    // Load game elements
    load();

    // Initialize game elements
    initialize();

    // Publish an event to pause the object manager (i.e. no update, no draw) and show the menu
    notificationCenter.notify(
        new Notification(
            NotificationType.Menu,
            NotificationAction.ShowMenuChanged,
            [StatusType.Off]
        )
    );

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

    // Call the update method of the game state manager
    // class to update the game state
    gameStateManager.update(gameTime);

    // Call the update method of the menu manager class to
    // check for menu state changes
    menuManager.update(gameTime);

    // Call the update method of the camera manager class
    // to update all cameras
    cameraManager.update(gameTime);
}

function draw(gameTime) {

    // Clear previous draw
    clearCanvas();

    // Call the draw method of the object manager class
    // to draw all sprites
    objectManager.draw(gameTime);
}

function clearCanvas() {
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}

/** GAME SPECIFIC CODE BELOW - CHANGE AS NECESSARY */

let spriteSheet;
let jungleSpriteSheet;

function load() {

    loadAssets();
}

function loadAssets() {

    loadSpriteSheets();
}

function loadSpriteSheets() {

    spriteSheet = document.getElementById("snailbait_sprite_sheet");
    jungleSpriteSheet = document.getElementById("snailbait_jungle_tileset");
}

function initialize() {

    initializeNotificationCenter();
    initializeManagers();
    initializeCameras();
    initializeSprites();
}

function initializeNotificationCenter() {
    notificationCenter = new NotificationCenter();
}

function initializeManagers() {

    cameraManager = new CameraManager(
        "Camera Manager"
    );

    objectManager = new ObjectManager(
        "Object Manager",
        notificationCenter,
        context,
        StatusType.Drawn | StatusType.Updated,
        cameraManager
    );

    keyboardManager = new KeyboardManager(
        "Keyboard Manager"
    );

    soundManager = new SoundManager(
        "Sound Manager",
        notificationCenter,
        GameData.AUDIO_CUE_ARRAY
    );

    gameStateManager = new MyGameStateManager(
        "Game State Manager",
        notificationCenter,
        100,                            // Initial player health
        36                              // Initial player ammo
    )

    menuManager = new MyMenuManager(
        "Menu Manager",
        notificationCenter,
        keyboardManager
    );
}

function initializeCameras() {

    let transform = new Transform2D(
        Vector2.Zero,
        0,
        Vector2.One,
        new Vector2(
            canvas.clientWidth / 2,
            canvas.clientHeight / 2
        ),
        new Vector2(
            canvas.clientWidth,
            canvas.clientHeight
        )
    );

    let camera = new Camera2D(
        "Camera 1",
        transform,
        ActorType.Camera,
        StatusType.Updated
    );

    camera.attachController(
        new FlightCameraController(
            keyboardManager,
            [
                Keys.Numpad4, Keys.Numpad6, Keys.Numpad7, Keys.Numpad9,
                Keys.Numpad8, Keys.Numpad2, Keys.Numpad5
            ],
            new Vector2(3, 0),
            Math.PI / 180,
            new Vector2(0.005, 0.005)
        )
    );

    cameraManager.add(camera);
}

function initializeSprites() {

    initializeBackground();
    initializePlatforms();
    initializePickups();

    initializeOnScreenText();
}

function initializeBackground() {

    let transform;
    let artist;
    let sprite;

    for (let i = 0; i < GameData.BACKGROUND_DATA.length; i++) {

        artist = new ScrollingSpriteArtist(
            context,
            1,
            GameData.BACKGROUND_DATA[i].spriteSheet,
            GameData.BACKGROUND_DATA[i].sourcePosition,
            GameData.BACKGROUND_DATA[i].sourceDimensions,
            canvas.clientWidth,
            canvas.clientHeight
        );

        transform = new Transform2D(
            GameData.BACKGROUND_DATA[i].translation,
            GameData.BACKGROUND_DATA[i].rotation,
            GameData.BACKGROUND_DATA[i].scale,
            GameData.BACKGROUND_DATA[i].origin,
            new Vector2(
                canvas.clientWidth,
                canvas.clientHeight
            )
        );

        sprite = new Sprite(
            GameData.BACKGROUND_DATA[i].id,
            transform,
            GameData.BACKGROUND_DATA[i].actorType,
            GameData.BACKGROUND_DATA[i].collisionType,
            StatusType.Updated | StatusType.Drawn,
            artist,
            GameData.BACKGROUND_DATA[i].scrollSpeedMultiplier,
            GameData.BACKGROUND_DATA[i].layerDepth
        );

        objectManager.add(sprite);
    }

    // Sort all background sprites by depth 0 (back) -> 1 (front)
    objectManager.sort(
        ActorType.Background,
        function sortAscendingDepth(a, b) {
            return a.layerDepth - b.layerDepth;
        }
    );
}

function initializePlatforms() {

    let artist;
    let transform;

    let spriteArchetype;
    let spriteClone = null;

    artist = new SpriteArtist(
        context,
        1,
        GameData.PLATFORM_DATA.spriteSheet,
        GameData.PLATFORM_DATA.sourcePosition,
        GameData.PLATFORM_DATA.sourceDimensions
    );

    transform = new Transform2D(
        Vector2.Zero,
        GameData.PLATFORM_DATA.rotation,
        GameData.PLATFORM_DATA.scale,
        GameData.PLATFORM_DATA.origin,
        GameData.PLATFORM_DATA.sourceDimensions,
        GameData.PLATFORM_DATA.explodeBoundingBoxInPixels
    );

    spriteArchetype = new Sprite(
        GameData.PLATFORM_DATA.id,
        transform,
        GameData.PLATFORM_DATA.actorType,
        GameData.PLATFORM_DATA.collisionType,
        StatusType.Updated | StatusType.Drawn,
        artist,
        GameData.PLATFORM_DATA.scrollSpeedMultiplier,
        GameData.PLATFORM_DATA.layerDepth
    );

    // Check out the Constant.js file - it contains an object called
    // PLATFORM_DATA, which contains an array property called translationArray.
    // This translationArray simply contains a list of positions for where we
    // want to position the platforms on our screen. Take a look at this array
    // to understand more.
    for (let i = 0; i < GameData.PLATFORM_DATA.translationArray.length; i++) {

        // Clone sprite
        spriteClone = spriteArchetype.clone();

        // Update id
        spriteClone.id = spriteClone.id + " " + i;

        // Update translation
        spriteClone.transform.setTranslation(GameData.PLATFORM_DATA.translationArray[i]);

        // Add to object manager
        objectManager.add(spriteClone);
    }
}

function initializePickups() {

    let artist;
    let transform;

    let spriteArchetype = null;
    let spriteClone = null;

    artist = new AnimatedSpriteArtist(
        context,                                        // Context
        1,                                              // Alpha
        GameData.COLLECTIBLES_ANIMATION_DATA            // Animation data
    );

    transform = new Transform2D(
        new Vector2(530, 250),                          // Translation
        0,                                              // Rotation
        Vector2.One,                                    // Scale
        Vector2.Zero,                                   // Origin
        artist.getBoundingBoxByTakeName("Gold Glint"),  // Dimensions
        0                                               // Explode By Value
    );

    spriteArchetype = new Sprite(
        "Gold",
        transform,
        ActorType.Pickup,
        CollisionType.Collidable,
        StatusType.Updated | StatusType.Drawn,
        artist,
        1,
        1
    );

    // Create 5 pickups
    for (let i = 1; i <= 5; i++) {

        // Clone sprite
        spriteClone = spriteArchetype.clone();

        // Update ID
        spriteClone.id = spriteClone.id + " " + i;

        // Translate sprite
        spriteClone.transform.translateBy(
            new Vector2(
                (i * 100),
                0
            )
        );

        // Set sprite take
        spriteClone.artist.setTake("Gold Glint");

        // Add to object manager
        objectManager.add(spriteClone);
    }
}

function initializeOnScreenText() {

    let transform;
    let artist;
    let sprite;

    transform = new Transform2D(
        new Vector2(10, 10),
        0,
        Vector2.One,
        Vector2.Zero,
        new Vector2(10, 10),
        0
    );

    artist = new TextSpriteArtist(
        context,
        "Go, go, go!",
        FontType.InformationMedium,
        Color.White,
        TextAlignType.Left,
        200,
        1,
    );

    sprite = new Sprite(
        "Text UI Info",
        transform,
        ActorType.HUD,
        CollisionType.NotCollidable,
        StatusType.Updated | StatusType.Drawn,
        artist,
        1,
        1
    );

    objectManager.add(sprite);
}

function resetGame() {

    clearCanvas();
    startGame();
}

// Start the game once the page has loaded
window.addEventListener("load", start);