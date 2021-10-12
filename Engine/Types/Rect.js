/**
 * Primitive to support drawing rectangles
 */
 class Rect {

    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }
    get position() {
        return this._position;
    }

    set width(value) {
        this._width = value > 0 ? value : 0;
    }
    set height(value) {
        this._height = value > 0 ? value : 0;
    }
    set position(value) {
        this._position = value;
    }

    constructor(width, height, position) {
        this._width = width;
        this._height = height;
        this._position = position;
    }

    /**
     * Draw this rect to the screen
     * 
     * @param {CanvasRenderingContext2D} context 
     * @param {Number} lineWidth 
     * @param {String} strokeStyle 
     * @param {String} fillStyle 
     */
    draw(context, lineWidth, strokeStyle = null, fillStyle = null) {

        context.lineWidth = lineWidth;

        // If a stroke style has been provided
        // Then add a stroke to the rect
        if (strokeStyle !== null) {
            context.strokeStyle = strokeStyle;
            
            context.strokeRect(
                this.position.x, 
                this.position.y, 
                this.width, 
                this.height
            );
        }

        // If a fill style has been provided
        // Then add fill to the rect
        if (fillStyle !== null) {
            context.fillStyle = fillStyle;
    
            context.fillRect(
                this.position.x,
                this.position.y,
                this.width,
                this.height,
            );
        }
    }

    /**
     * Move this rect by some distance on the x and y, as
     * defined by delta
     * 
     * For example, if delta is the Vector (2, 2), the we 
     * will move this rect by 2 pixels in the x axis, and 
     * 2 pixels in the y axis
     * 
     * @param {Vector2} delta 
     */
    move(delta) {
        this.position.x += delta.x;
        this.position.y += delta.y;
    }

    /**
     * Move this rect to the x, y position on our cavnas
     * that is defined by the input Vector 'position'
     * 
     * @param {Vector2} position 
     */
    moveTo(position) {
        this.position.x = position.x;
        this.position.y = position.y;
    }

    /**
     * Create a clone of this Rect object 
     * 
     * @returns a deep-copy of this Rect object
     */
    clone() {
        return new Rect(this.width, this.height, this.position);
    }
}