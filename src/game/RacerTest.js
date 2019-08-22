import {Racer} from "./Racer.js";
import {Vector} from "../geometry/Vector.js";
import {Position} from "../geometry/Position.js";

const N = new Vector(0,-1);
const S = new Vector(0, 1);
const E = new Vector(1, 0);
const W = new Vector(-1, 0);
const NW = N.add(W);
const NE = N.add(E);
const SW = S.add(W);
const SE = S.add(E);
const Z = new Vector(0,0);

let racer = new Racer("red", new Position(0, 0));

let accelerations = [];

accelerations.push(N);
accelerations.push(NE);
accelerations.push(E);
accelerations.push(SE);
accelerations.push(S);
accelerations.push(SW);
accelerations.push(W);
accelerations.push(NW);

for (let acc of accelerations) {
  racer.move(acc);
  console.log("Acceleration: " + acc + ", Racer: " + racer);
}


