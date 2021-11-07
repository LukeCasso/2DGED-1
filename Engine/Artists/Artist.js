/**
 * Base class for all artists
 * 
 * @author Niall McGuinness
 * @version 1.0
 * @class Artist
 */
class Artist {

    get alpha() {
        return this._alpha;
    }
    set alpha(value) {
        this._alpha = (value > 1 || value < 0) ? 1 : value;
    }

    constructor(context, spriteSheet, alpha) {
        this.context = context;
        this.spriteSheet = spriteSheet;
        this.alpha = alpha;
    }

    /**
     * Currently unused.
     *
     * @param {GameTime} gameTime (unused)
     * @param {Sprite} parent (unused)
     * @memberof Artist
     */
    update(gameTime, parent) {

    }

    /**
     * Currently unused.
     *
     * @param {GameTime} gameTime (unused)
     * @param {Sprite} parent
     * @memberof Artist
     */
    draw(gameTime, parent) {

    }

    equals(other) {
        return (
            GDUtility.IsSameTypeAsTarget(this, other) &&
            this.context === other.context &&
            this.spriteSheet === other.spriteSheet &&
            this.alpha === other.alpha
        );
    }

    clone() {
        return new Artist(this.context, this.spriteSheet, this.alpha);
    }

    toString() {
        return "[" + this.context + "," + this.spriteSheet + "," + this.alpha + "]";
    }
}