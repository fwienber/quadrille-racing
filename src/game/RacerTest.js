import {Racer} from "./Racer.js";
import {Position} from "../geometry/Position.js";
import {Direction} from "../geometry/Momentum.js";

let racer = new Racer("red", new Position(0, 0));

let accelerations = [];

accelerations.push(Direction.N);
accelerations.push(Direction.NE);
accelerations.push(Direction.E);
accelerations.push(Direction.SE);
accelerations.push(Direction.S);
accelerations.push(Direction.SW);
accelerations.push(Direction.W);
accelerations.push(Direction.NW);

for (let acc of accelerations) {
  racer.move(acc);
  console.log("Acceleration: " + acc + ", Racer: " + racer);
}


