/**
 * Stores all the transformations applied to a 2D element (e.g. a sprite, a menu button, a Camera2D)
 * 
 * @author Niall McGuinness
 * @version 1.0
 * @class Transform2D
 */

class Transform2D {

    static get Zero() {
        return new Transform2D(Vector2.Zero, 0, Vector2.Zero);
    }

    get translation() {
        return this._translation;
    }
    get rotationInRadians() {
        return this._rotationInRadians;
    }
    get scale() {
        return this._scale;
    }
    get origin() {
        return this._origin;
    }
    get dimensions() {
        return this._dimensions;
    }
    get isDirty() {
        return this._isDirty;
    }

    set dimensions(dimensions) {
        this._dimensions = dimensions.clone();
        this.isDirty = true;
    }
    set translation(translation) {
        this._translation = translation.clone();
        this.isDirty = true;
    }
    set rotationInRadians(rotationInRadians) {
        this._rotationInRadians = rotationInRadians;
        this.isDirty = true;
    }
    set scale(scale) {
        this._scale = scale.clone();
        this.isDirty = true;
    }
    set origin(origin) {
        this._origin = origin.clone();
        this.isDirty = true;
    }
    set isDirty(isDirty) {
        this._isDirty = isDirty;
    }

    /**
     * Creates an instance of Transform2D.
     *
     * @param {Vector2} translation Vector2 with the position of the sprite on the screen
     * @param {number} rotationInRadians Floating-point angle in radians to rotate the sprite (+ve = CW, -ve=CCW)
     * @param {Vector2} scale Vector2 with the scale of the sprite on the screen
     * @param {Vector2} origin Vector2 centre of rotation for the image between (0,0) and (w,h) of the original image
     * @param {Vector2} dimensions Vector2 original dimensions of the sprite in the image 
     * @memberof Transform2D
     */
    constructor(translation, rotationInRadians, scale, origin, dimensions) {
        this.translation = translation;
        this.rotationInRadians = rotationInRadians;
        this.scale = scale;
        this.origin = origin;
        this.dimensions = dimensions;
    }

    /**
     * Sets the translation of the sprite to a user-defined value. Sets the isDirty flag to
     * indicate to the CollisionPrimitive that the sprite has changed a property that will
     * affect its bounding primitive.
     *
     * @param {Vector2} translation
     * @memberof Transform2D
     */
    setTranslation(translation) {
        this.translation = translation.clone();
    }

    /**
     * Increases/decreases the Vector2 translation of the sprite. We can use
     * this method to move the sprite on-screen. Sets the isDirty flag to indicate to the
     * CollisionPrimitive that the sprite has changed a property that will affect its bounding primitive.
     *
     * @param {Vector2} translateBy Vector2 value used to increment/decrement the translation.
     * @memberof Transform2D
     */
    translateBy(translateBy) {
        this.translation.add(translateBy);
    }

    /**
     * Sets the rotation value (in radians) for the sprite.
     *
     * @param {number} rotationInRadians Floating-point rotation value in radians
     * @memberof Transform2D
     */
    setRotationInRadians(rotationInRadians) {
        this.rotationInRadians = rotationInRadians;
    }

    /**
     * Increases/decreases the rotation value (in radians) for the sprite.
     *
     * @param {number} rotationInRadians Floating-point rotation value in radians
     * @memberof Transform2D
     */
    rotateBy(rotationInRadiansBy) {
        this.rotationInRadians += rotationInRadiansBy;
        this.isDirty = true;
    }

    /**
     * Sets the scale values for the sprite.
     *
     * @param {Vector2} scale Vector2 representing the scale (x,y) values
     * @memberof Transform2D
     */
    setScale(scale) {
        this.scale = scale.clone();
        this.isDirty = true;
    }

    /**
     * Increases/decreases the scale values for the sprite.
     *
     * @param {Vector2} scale Vector2 representing the scale (x,y) values
     * @memberof Transform2D
     */
    scaleBy(scaleBy) {
        this.scale.add(scaleBy);
        this.isDirty = true;
    }

    equals(other) {
        return (
            GDUtility.IsSameTypeAsTarget(this, other) &&
            this.translation.equals(other.translation) &&
            this.rotationInRadians === other.rotationInRadians &&
            this.scale.equals(other.scale) &&
            this.origin.equals(other.origin) &&
            this.dimensions.equals(other.dimensions)
        );
    }

    clone() {
        return new Transform2D(
            this.translation.clone(),
            this.rotationInRadians,
            this.scale.clone(),
            this.origin.clone(),
            this.dimensions.clone()
        );
    }

    toString() {
        return (
            "[" +
            this.translation.toString() +
            "," +
            this.rotationInRadians +
            "," +
            this.scale.toString() +
            "," +
            this.origin.toString() +
            "," +
            this.dimensions.toString() +
            "]"
        );
    }
}