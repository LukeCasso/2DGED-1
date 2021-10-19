/**
 * Represents any drawn non-player or non-player character entity within a game with position information (e.g. pickup, obstacle, UI element)
 * 
 * @author Niall McGuinness
 * @version 1.0
 * @class Sprite
 */

 class Sprite {

    constructor(id, transform, artist) {
        this.id = id;
        this.transform = transform;
        this.artist = artist;
    }

    update(gameTime) {

    }

    draw(gameTime) {
        this.artist.draw(gameTime, this);
    }

    clone() {
        return new Sprite(this.id + "- Clone", this.transform.clone(), this.artist.clone());   
    }
}