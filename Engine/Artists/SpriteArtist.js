/**
 * Renders the pixel data from a spritesheet at a source location (x, y, width, heigth) stored in sourcePosition.
 * 
 * @author Niall McGuinness
 * @version 1.0
 * @class SpriteArtist
 */

 class SpriteArtist {

    constructor(context, spritesheet, sourcePosition, sourceDimensions, alpha = 1) {
        this.context = context;
        this.alpha = alpha;
        
        this.spritesheet = spritesheet;
        this.sourcePosition = sourcePosition;
        this.sourceDimensions = sourceDimensions;
    }

    /**
     * Currently unused as, unlike AnimatedSpriteArtist, we are drawing the same pixel data in each draw call.
     *
     * @param {GameTime} gameTime (unused)
     * @param {Sprite} parent (unused)
     * @memberof SpriteArtist
     */
    update(gameTime, parent) {

    }

    /**
     * Renders pixel data from spritesheet to canvas
     *
     * @param {GameTime} gameTime (unused)
     * @param {Sprite} parent
     * @memberof SpriteArtist
     */
    draw(gameTime, parent) {

        // Save whatever context settings were used before this (color, line, text styles)
        // This will allow us to restore later
        this.context.save();

        // Access the transform for the parent that this artist is attached to
        let transform = parent.transform;

        // Set transparency
        this.context.globalAlpha = this.alpha;

        // Draw image
        this.context.drawImage(
            this.spritesheet,
            this.sourcePosition.x,
            this.sourcePosition.y,
            this.sourceDimensions.x,
            this.sourceDimensions.y,
            transform.translation.x,// - transform.origin.x,
            transform.translation.y,// - transform.origin.y,
            transform.scale.x,
            transform.scale.y
        );

        // Restore the state of our context before we began to draw
        this.context.restore();
    }

    // Clone allows us to quickly create deep-copies of our objects
    clone() {
        return new SpriteArtist(this.context, this.spritesheet, this.sourcePosition, this.sourceDimensions, this.alpha);
    }
}