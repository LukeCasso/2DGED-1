/**
 * Represents a pair of numeric values
 */
class Vector2 {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    
    set x(value) {
        this._x = value;
    }
    set y(value) {
        this._y = value;
    }

    normalize() {
        let length = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));

        if (length != 0) {
            this.x /= length;
            this.y /= length;
        }
    }

    clone() {
        return new Vector2(this.x, this.y);
    }
}