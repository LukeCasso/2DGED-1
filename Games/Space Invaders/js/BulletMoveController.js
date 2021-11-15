/**
 * @author James Farrell
 */
class BulletMoveController {

    /**
     * 
     * @param {*} moveDirection 
     * @param {*} moveSpeed 
     */
    constructor(moveDirection, moveSpeed) {
        this.moveDirection = moveDirection;
        this.moveSpeed = moveSpeed;
    }

    /**
     * 
     * @param {*} gameTime 
     * @param {*} parent 
     */
    update(gameTime, parent) {
        
        // Calculate velocity vector
        let velocity = Vector2.MultiplyScalar(
            this.moveDirection,
            gameTime.elapsedTimeInMs * this.moveSpeed
        );

        // Move the bullet
        parent.transform.translateBy(velocity);
    }

    /**
     * 
     * @returns 
     */
    clone() {
        return new BulletMoveController(this.moveDirection, this.moveSpeed);
    }
}