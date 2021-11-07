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

    add(sprite) {
        // Do we have a row for this ActorType?
        if (!this.sprites[sprite.actorType]) {
            this.sprites[sprite.actorType] = [];
        }

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
        for (let key in this.sprites) {
            for (let sprite of this.sprites[key]) {
                sprite.update(gameTime);
            }
        }
    }

    draw(gameTime) {
        for (let key in this.sprites) {
            for (let sprite of this.sprites[key]) {
                sprite.draw(gameTime);
            }
        }
    }
}