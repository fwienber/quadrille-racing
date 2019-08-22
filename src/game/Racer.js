import {Vector} from "../geometry/Vector.js";
import {Line} from "../geometry/Line.js";
import {Direction} from "../geometry/Momentum.js";

const NEIGHBORS = [];
for (let y = -1; y <=1; ++y) {
  for (let x = -1; x <=1; ++x) {
    NEIGHBORS.push(new Vector(x, y));
  }
}
const NULL_VECTOR = new Vector(0, 0);

export class Racer {
  constructor(color, startPosition, momentum = NULL_VECTOR) {
    this.color = color;
    this.track = [startPosition]; // of positions
    this.momentum = momentum;
    this.state = "racing";
  }

  get position() {
    return this.track[this.track.length - 1];
  }

  get nextCenterPosition() {
    return this.position.add(this.momentum);
  }

  get nextPositionCandidates() {
    let nextCenterPosition = this.nextCenterPosition;
    return NEIGHBORS.map(neighbor => nextCenterPosition.add(neighbor));
  }

  move(acceleration = NULL_VECTOR) {
    this.momentum = this.momentum.add(acceleration);
    let currentPosition = this.position;
    let nextPosition = currentPosition.add(this.momentum);
    this.track.push(nextPosition);
    return new Line(currentPosition, nextPosition);
  }

  crash() {
    this.momentum = Direction.ZERO;
    this.state = "crashed";
  }

  get crashed() {
    return this.state === "crashed";
  } 

  finish() {
    this.momentum = Direction.ZERO;
    this.state = "finished";
  }

  get finished() {
    return this.state === "finished";
  }

  toString() {
    return "Racer(" + this.color + ", pos=" + this.position + ", momentum=" + this.momentum + ")";
  }
}
