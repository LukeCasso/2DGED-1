// Defines the actors that we find in our game
const ActorType = {
    /*
     * VERY IMPORTANT - The order of the actors below DEFINES the draw order!
     * Which means that if we were to set Background to 20 then it would be
     * the highest number and thus LAST thing to be drawn. That would mean we 
     * would NOT see anything EXCEPT the background sprite because it would 
     * be DRAWN OVER everything else.
     */
    Background: 0,
    NPC: 1,
    Player: 2,
    Projectile: 3

    // Add as many actor types as your game needs here BUT remember that the 
    // assigned number will determine drawn sort order...
};

const StatusType = {
    Off: 0,     // 0000
    Drawn: 1,   // 0001
    Updated: 2, // 0010

    // Add more here as required but ENSURE they are 2^N values
    // It's important that the values are powers of two because we combine them 
    // using a Bitwise OR operation
    // For example, StatusType.Updated | StatusType.Drawn
};

// We use this to define colours for drawing to the screen
// For example, ClearScreen(Color.Black)
const Color = {
    Black: "#000000",
    White: "#FFFFFF",
    Grey: "#8B8680",
    CornFlowerBlue: "#6495ED",
    LightGreen: "#CACB63",
    DarkGreen: "#688318",
    
    // Add more colors that you use often here
    // Use https://html-color-codes.info/colors-from-image/ to determine hex codes 
    // for colors that you use in free 3rd party images/sprites that you find online
};

// Used by any entity which listens for key input
const Keys = {
    Space: 32,                  // ASCII Key Value
    Enter: 13,
    ArrowLeft: 37,
    ArrowUp: 38,
    ArrowRight: 39,
    ArrowDown: 40,
    A: 65,
    B: 66,
    C: 67,
    D: 68,
    E: 69,
    F: 70,
    G: 71,
    H: 72,
    I: 73,
    J: 74,
    K: 75,
    L: 76,
    M: 77,
    N: 78,
    O: 79,
    P: 80,
    Q: 81,
    R: 82,
    S: 83,
    T: 84,
    U: 85,
    V: 86,
    W: 87,
    X: 88,
    Y: 89,
    Z: 90,
    F1: 112,
    F2: 113,
    F3: 114,
    F4: 115,
    F5: 116,
    F6: 117,
    F7: 118,
    F8: 119,
    F9: 120,
    F10: 121,
    F11: 122,
    F12: 123,
    NumPad0: 96,
    NumPad1: 97,
    NumPad2: 98,
    NumPad3: 99,
    NumPad4: 100,
    NumPad5: 101,
    NumPad6: 102,
    NumPad7: 103,
    NumPad8: 104,
    NumPad9: 105,
};