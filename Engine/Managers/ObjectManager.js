/**
 * This class is responsible for storing and updating all the sprites within the game.
 * @author Niall McGuinness
 * @version 1.0
 * @class ObjectManager
 */
class ObjectManager {

    constructor(context) {
        this.context = context;
        this.sprites = [];
    }

    // Note that this.sprites is a 2D array
    // Each cell in the row contains an array of sprites
    // Each cell is split into sprites based on their ActorType

    // e.g. Array[0] is an array of sprites that have the 'Background' ActorType
    //      Array[1] is an array of sprites that have the 'NPC' ActorType
    //      and so on...

    // This is why it is important that we give each sprite an ActorType, and also
    // why it is important that we correctly order our ActorTypes (because each 'ActorType' 
    // layer is drawn on top of the previous layers).
    add(sprite) {
        // Do we have a row for this ActorType?
        if (!this.sprites[sprite.actorType]) {

            // If not, initialize a row for this ActorType
            this.sprites[sprite.actorType] = [];
        }

        // Add this sprite to the appropriate array
        this.sprites[sprite.actorType].push(sprite);
    }

    find(predicate) {
        // TO DO...
    }

    removeFirstBy(predicate) {
        // TO DO...
    }

    removeAllBy(predicate) {
        // TO DO...
    }

    sort(comparator) {
        // TO DO...
    }

    clear() {
        // TO DO...
    }

    update(gameTime) {

        // Loop through each ActorType
        for (let key in this.sprites) {

            // Loop through each Sprite of ActorType
            for (let sprite of this.sprites[key]) {

                // Update each sprite
                sprite.update(gameTime);
            }
        }
    }

    draw(gameTime) {
        
        // Loop through each ActorType
        for (let key in this.sprites) {
            
            // Loop through each Sprite of ActorType
            for (let sprite of this.sprites[key]) {

                // Draw each sprite
                sprite.draw(gameTime);
            }
        }
    }
}