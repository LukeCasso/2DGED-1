/**
 * @author James Farrell
 */
class BulletMoveController {

    /**
     * 
     * @param {*} moveDirection 
     * @param {*} moveSpeed 
     */
    constructor(objectManager, moveDirection, moveSpeed) {
        this.objectManager = objectManager;
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

        // Get a list of all enemy sprites
        let enemySprites = this.objectManager.sprites[ActorType.Enemy];

        // Loop through enemy sprites
        for (let index = 0; index < enemySprites.length; index++) {

            // Store a reference to the current enemy
            const enemy = enemySprites[index];
            
            // Store a reference to each bounding box
            const bulletBoundingBox = parent.transform.boundingBox;
            const enemyBoundingBox = enemy.transform.boundingBox;

            // Check if the two bounding boxes are intersecting
            if (bulletBoundingBox.intersects(enemyBoundingBox)) {

                // Remove enemy
                this.objectManager.remove(enemy);

                // Remove bullet
                this.objectManager.remove(parent);
            }
        }

        // Get a list of all enemy sprites
        let decoratorSprites = this.objectManager.sprites[ActorType.Decorator];

        // Loop through enemy sprites
        for (let index = 0; index < decoratorSprites.length; index++) {

            // Store a reference to the current enemy
            const decorator = decoratorSprites[index];
            
            // Store a reference to each bounding box
            const bulletBoundingBox = parent.transform.boundingBox;
            const decoratorBoundingBox = decorator.transform.boundingBox;

            // Check if the two bounding boxes are intersecting
            if (bulletBoundingBox.intersects(decoratorBoundingBox)) {

                // Remove bullet
                this.objectManager.remove(parent);
            }
        }
    }

    /**
     * 
     * @returns 
     */
    clone() {
        return new BulletMoveController(
            this.objectManager,
            this.moveDirection,
            this.moveSpeed
        );
    }
}