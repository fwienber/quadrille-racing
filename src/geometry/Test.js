import {Vector} from "./Vector.js";

export function testAll() {
  console.log("=== Vector ===");
  testConstructors();
  testAdd();
  testInvert();
}

function testConstructors() {
  let v = new Vector(1,0);
  console.log("new Vector(1, 0) => " + v);
}

function testAdd() {
  let a = new Vector(1, 0);
  let b = new Vector(0, 1);

  console.log( "Vector.add() => " + a + " + " + b + " = " + a.add(b));
}

function testInvert() {
  let v = new Vector(1, 2);
  console.log(v + ".invert() => " + v.invert());
}