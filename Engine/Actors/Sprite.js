/**
 * Represents a drawn entity within our game.
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

        //   0011 3 (Drawn | Updated)
        // & 0010
        //   0010
        
        //   0010   (Updated)   <- this.statusType
        // & 0010   (Updated)
        //   0010

        //   0001   (Drawn)     <- this.statusType
        // & 0010   (Updated)
        //   0000
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