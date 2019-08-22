export class Vector {
  constructor(x, y) {
    this._elements = [x, y];
  }

  get x() {
    return this._elements[0];
  }

  get y() {
    return this._elements[1];
  }

  add(anotherVector) {
    return new Vector(this.x + anotherVector.x, this.y + anotherVector.y)
  };

  invert() {
    return new Vector( - this.x, - this.y );
  }

  toString() {
    return "(" + this.x + ", " +this.y + ")";
  }
}