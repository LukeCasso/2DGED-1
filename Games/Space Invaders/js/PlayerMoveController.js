class PlayerMoveController {

    constructor(movementSpeed) {
        this.movementSpeed = movementSpeed;

        this.keyState = {};

        window.addEventListener("keydown", (event) => {
            this.keyState[event.code] = true;
        });

        window.addEventListener("keyup", (event) => {
            delete this.keyState[event.code];
        });
    }

    update(gameTime, parent) {

        if (this.keyState[Keys.A]) {
            parent.transform.translateBy(
                new Vector2(
                    -1 * this.movementSpeed,
                    0
                )
            );
        }
        else if (this.keyState[Keys.D]) {
            parent.transform.translateBy(
                new Vector2(
                    1 * this.movementSpeed,
                    0
                )
            );
        }
    }
}