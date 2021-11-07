/**
 * Represents any drawn non-player or non-player character entity within a game with position information (e.g. pickup, obstacle, UI element)
 * 
 * @author Niall McGuinness
 * @version 1.0
 * @class Sprite
 */

class Sprite extends Actor2D {

    get artist() {
        return this._artist;
    }

    set artist(artist) {
        this._artist = artist;
    }

    /**
     * 
     * @param {*} id 
     * @param {*} transform 
     * @param {*} actorType 
     * @param {*} statusType 
     * @param {*} artist 
     */
    constructor(id, transform, actorType, statusType, artist) {
        super(id, transform, actorType, statusType);

        this.artist = artist;
    }

    /**
     * 
     * @param {GameTime} gameTime 
     */
    update(gameTime) {
        if ((this.statusType & StatusType.Updated) != 0) {
            this.artist.update(gameTime, this);
        }

        super.update(gameTime);
    }

    /**
     * 
     * @param {GameTime} gameTime 
     */
    draw(gameTime) {
        if ((this.statusType & StatusType.Drawn) != 0) {
            this.artist.draw(gameTime, this);
        }
    }

    /**
     * 
     * @returns 
     */
    clone() {
        return new Sprite(
            this.id + " - clone",
            this.transform.clone(),
            this.actorType,
            this.statusType,
            this.artist.clone()
        );
    }
}