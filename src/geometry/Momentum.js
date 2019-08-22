import {Vector} from "./Vector.js";

export class Direction {
  static N = new Vector(0, -1);
  static S = new Vector(0, 1);
  static E = new Vector(1, 0);
  static W = new Vector(-1, 0);
  static NW = Direction.N.add(Direction.W);
  static NE = Direction.N.add(Direction.E);
  static SW = Direction.S.add(Direction.W);
  static SE = Direction.S.add(Direction.E);
  static ZERO = new Vector(0, 0);
}

export class Momentum extends Vector {

}