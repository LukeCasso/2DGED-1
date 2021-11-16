/*
 * Class to store all sprite data for space invaders
 */
class SpriteData {

    // Sprite position and dimensions on Sprite Sheet
    static ENEMY_ONE_FRAMES = [
        {
            // Animation Frame 1
            x: 0,                   // Source Position
            y: 0,
            width: 22,              // Source Dimensions
            height: 16,
        },
        {
            // Animation Frame 2
            x: 0,                   // Source Position
            y: 16,
            width: 22,              // Source Dimension
            height: 16,
        },
    ];

    // Sprite position and dimensions on Sprite Sheet
    static ENEMY_TWO_FRAMES = [
        {
            // Animation Frame 1
            x: 22,
            y: 0,
            width: 16,
            height: 16,
        },
        {
            // Animation Frame 2
            x: 22,
            y: 16,
            width: 16,
            height: 16,
        },
    ];

    // Sprite position and dimensions on Sprite Sheet
    static ENEMY_THREE_FRAMES = [
        {
            // Animation Frame 1
            x: 38,
            y: 0,
            width: 24,
            height: 16,
        },
        {
            // Animation Frame 2
            x: 38,
            y: 16,
            width: 24,
            height: 16,
        },
    ];

    static BULLET_WIDTH = 7;
    static BULLET_HEIGHT = 12;

    // Sprite position and dimensions on Sprite Sheet
    static BULLET_FRAMES = [
        {
            x: 67,
            y: 20,
            width: this.BULLET_WIDTH,
            height: this.BULLET_HEIGHT
        },
        {
            x: 74,
            y: 20,
            width: this.BULLET_WIDTH,
            height: this.BULLET_HEIGHT
        },
    ];

    // Player Sprite position on Sprite Sheet
    static PLAYER_X = 62;
    static PLAYER_Y = 0;
    static PLAYER_WIDTH = 22;
    static PLAYER_HEIGHT = 16;

    // Barrier Sprite position on Sprite Sheet
    static BARRIER_HEIGHT = 24;
    static BARRIER_WIDTH = 36;
    static BARRIER_x = 84;
    static BARRIER_y = 8;
}

class GameData {

    // Speed variables
    static PLAYER_SPEED = 0.2;
    static BULLET_SPEED = 0.25;

    // Measured in milliseconds
    static FIRE_INTERVAL = 500;
}