/*
 * Class to store all sprite data for space invaders
 */
class SpriteData {

    // Sprite position on Sprite Sheet
    static ENEMY_ONE_FRAMES = [
        {
            // Animation Frame 1
            x: 0,
            y: 0,
            width: 22,
            height: 16,
        },
        {
            // Animation Frame 2
            x: 0,
            y: 16,
            width: 22,
            height: 16,
        },
    ];

    // Sprite position on Sprite Sheet
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

    // Sprite position on Sprite Sheet
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

    static BARRIER_HEIGHT = 24;
    static BARRIER_WIDTH = 36;
    static BARRIER_x = 84;
    static BARRIER_y = 8;

    // Sprite position on Sprite Sheet
    static PLAYER_FRAMES = [
        {
            x: 62,
            y: 0,
            width: 22,
            height: 16,
        }
    ];
}