/**
 * @author James Farrell
 */
class PlayerShootController {

    /**
     * 
     * @param {*} objectManager 
     * @param {*} bulletSprite 
     * @param {*} fireIntervalMs 
     */
    constructor(objectManager, keyboardManager, bulletSprite, fireIntervalMs) {
        this.objectManager = objectManager;
        this.keyboardManager = keyboardManager;

        this.bulletSprite = bulletSprite;
        this.fireIntervalMs = fireIntervalMs;

        // Create internal time variable
        this.timeSinceLastBullet = 0;
    }

    /**
     * 
     * @param {*} gameTime 
     * @param {*} parent 
     */
    update(gameTime, parent) {

        // If the user is pressing the space bar
        if (this.keyboardManager.isKeyDown(Keys.Space)) {

            // If enough time has passed since the last bullet was fired
            if (this.timeSinceLastBullet >= this.fireIntervalMs) {

                // Clone the bullet sprite
                let bullet = this.bulletSprite.clone();

                // Update the status type of the bullet
                bullet.statusType = StatusType.Updated | StatusType.Drawn;

                // Move the bullet to the player
                bullet.transform.setTranslation(parent.transform.translation);

                // Add the bullet to the object manager
                this.objectManager.add(bullet);

                // Reset time
                this.timeSinceLastBullet = 0;
            }
        }

        // Increase time using gameTime
        this.timeSinceLastBullet += gameTime.elapsedTimeInMs;
    }

    /**
     * 
     * @returns 
     */
    clone() {
        return new PlayerShootController(
            this.bulletSprite.clone(),
            this.moveDirection,
            this.moveSpeed
        );
    }
}