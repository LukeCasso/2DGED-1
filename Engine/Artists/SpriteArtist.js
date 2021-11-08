/**
 * Renders the pixel data from a spritesheet at a source location (x, y, width, heigth) stored in sourcePosition.
 * 
 * @author Niall McGuinness
 * @version 1.0
 * @class SpriteArtist
 */

class SpriteArtist extends Artist {

    constructor(context, spriteSheet, alpha, sourcePosition, sourceDimensions) {
        super(context, spriteSheet, alpha);

        this.sourcePosition = sourcePosition;
        this.sourceDimensions = sourceDimensions;
    }

    /**
     * Currently unused as, unlike AnimatedSpriteArtist, we are drawing the same pixel data in each draw call.
     *
     * @param {Sprite} parent (unused)
     * @memberof SpriteArtist
     */
    update(gameTime, parent) {

    }

    /**
     * Renders pixel data from spritesheet to canvas
     *
     * @param {Sprite} parent the Sprite object that this artist is attached to
     * @memberof SpriteArtist
     */
    draw(gameTime, parent) {

        // Save whatever context settings were used before this (color, line, text styles)
        // This will allow us to restore later
        this.context.save();

        // Access the transform for the parent that this artist is attached to

        // The parent, in this case, is some Sprite object (i.e., 'enemySprite').
        // Remember, the sprite class has an 'artist' property (i.e., a Sprite Artist).
        // This allows the sprite to call the Sprite Artist's draw function.
        // The sprite then passes a reference to itself through as the 'parent' to the
        // draw function (using 'this').
        // 
        // That allows the Sprite Artist to access properties that belong to the parent,
        // such as the transform listed below.
        let transform = parent.transform;

        // Set the objects transparency
        this.context.globalAlpha = this.alpha;

        // Draw image
        this.context.drawImage(
            this.spriteSheet,
            this.sourcePosition.x,
            this.sourcePosition.y,
            this.sourceDimensions.x,
            this.sourceDimensions.y,
            transform.translation.x - transform.origin.x,
            transform.translation.y - transform.origin.y,
            transform.dimensions.x * transform.scale.x,
            transform.dimensions.y * transform.scale.y
        );

        // Restore the state of our context before we began to draw
        this.context.restore();
    }

    // Clone allows us to quickly create deep-copies of our objects
    clone() {
        return new SpriteArtist(this.context, this.spriteSheet, this.alpha, this.sourcePosition, this.sourceDimensions);
    }
}