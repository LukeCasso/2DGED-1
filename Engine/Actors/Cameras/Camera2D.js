class Camera2D extends Actor2D {

    constructor(id, transform, actorType, statusType) {
        super(
            id,
            transform,
            actorType,
            CollisionType.Collidable,
            statusType
        );
    }

    /**
     * Updates state information and executes attached behavior(s)
     *
     * @param {GameTime} gameTime
     * @see Actor2D::update()
     * @memberof Camera2D
     */
    update(gameTime) {
        super.update(gameTime);
    }

    /**
     * Allows the context to be transformed (i.e. translation, rotation, scale) based on the camera 
     * (i.e. allows us to create camera effects on-screen).
     * 
     * @param {*} context
     * @see DebugDrawer::drawBoundingBox()
     * @memberof Camera2D
     */
    setContext(context) {

        let transform = this.transform;

        context.translate(transform.origin.x, transform.origin.y);
        context.scale(transform.scale.x, transform.scale.y);
        context.rotate(transform.rotationInRadians);
        context.translate(-transform.origin.x, -transform.origin.y);
        context.translate(-transform.translation.x, -transform.translation.y);
    }

    equals(other) {
        return super.equals(other);
    }

    toString() {

        // Call parent - is this methods necessary?
        return super.toString();
    }

    clone() {
        return new Camera2D(
            this.id,
            this.transform,
            this.actorType,
            this.collisionType,
            this.statusType
        );
    }
}