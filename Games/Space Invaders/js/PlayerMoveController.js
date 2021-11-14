class PlayerMoveController {

    constructor(moveSpeed) {
        this.moveSpeed = moveSpeed;

        this.keyState = {};

        window.addEventListener("keydown", (event) => {
            this.keyState[event.code] = true;
        });

        window.addEventListener("keyup", (event) => {
            delete this.keyState[event.code];
        });
    }

    update(gameTime, parent) {
        
        // If the A key is pressed
        if (this.keyState[Keys.A]) {
            
            // Move left
            parent.transform.translateBy(
                Vector2.MultiplyScalar(Vector2.Left, this.moveSpeed)
            );
        }

        // If the D key is pressed
        else if (this.keyState[Keys.D]) {

            // Move right
            parent.transform.translateBy(    
                Vector2.MultiplyScalar(Vector2.Right, this.moveSpeed)
            );
        }
    }
}