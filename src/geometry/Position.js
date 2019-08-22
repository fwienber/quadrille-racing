import {Vector} from "./Vector.js";

export class Position extends Vector {

  propagate(momentum) {
    return this.add(momentum);
  }

}