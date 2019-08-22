import {Vector} from "../geometry/Vector.js";
import {Momentum} from "../geometry/Momentum";

const NEIGHBORS = [];
for (let y = -1; y <=1; ++y) {
  for (let x = -1; x <=1; ++x) {
    NEIGHBORS.push(new Vector(x, y));
  }
}

export class Racer {
  constructor(color, startPosition, momentum = new Momentum(0,0)) {
    this.color = color;
    this.track = [startPosition]; // of positions
    this.momentum = momentum;
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

  move(acceleration) {
    this.momentum = this.momentum.add(acceleration);
    let nextPosition = this.position.propagate(this.momentum);
    this.track.push(nextPosition);
    return nextPosition;
  }
}
