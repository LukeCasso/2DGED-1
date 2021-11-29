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

    keyboardManager = new KeyboardManager();

    soundManager = new SoundManager(
        notificationCenter,
        GameData.AUDIO_CUE_ARRAY
    );
}

function initializeCameras() {

    let transform = new Transform2D(
        Vector2.Zero,                   // Translation 
        0,                              // Rotation
        Vector2.One,                    // Scale
        new Vector2(                    // Origin
            canvas.clientWidth / 2,
            canvas.clientHeight / 2
        ),
        new Vector2(                    // Dimensions
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
}

function initializeBackground() {

    let transform;
    let artist;
    let sprite;

    for (let i = 0; i < GameData.BACKGROUND_DATA.length; i++) {

        artist = new ScrollingSpriteArtist(
            context,
            GameData.BACKGROUND_DATA[i].spriteSheet,
            1,
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
}

function resetGame() {

    clearCanvas();
    startGame();
}

window.addEventListener("load", start);