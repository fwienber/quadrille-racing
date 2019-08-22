import {Vector} from "./Vector.js";
import {Position} from "./Position.js";
import {Line} from "./Line.js";

export function testAll() {
  console.log("=== Vector ===");
  testConstructors();
  testAdd();
  testInvert();
  testLineIntersection();
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

function testLineIntersection() {
  console.log("=== LINE INTERSECTION ===");

  let assertion = function(msg, l1, l2, shouldIntersect) {
    console.log(msg);
    let intersection = l1.intersect(l2);
    if (shouldIntersect) {
      if (intersection) {
        console.log("PASSED: lines " + l1 +" and " + l2 + " interesect at " + intersection);
      }
      else {
        console.log("FAILED: lines " + l1 +" and " + l2 + " should intersect, but they do not!");
      }
    }
    else {
      if (intersection) {
        console.log("FAILED: lines " + l1 +" and " + l2 + " should not intersect at " + intersection);
      }
      else {
        console.log("PASSED: lines " + l1 +" and " + l2 + " do not intersect");
      }
    }
  }

  let newline = function(a,b,c,d) {
    return new Line(new Position(a,b), new Position(c,d));
  }


  assertion("Parallel lines",
            newline(1,1,4,4),
            newline(1,2,4,5),
           false);


  assertion("Intersect",
          newline(1,1,4,4),
          newline(1,4,4,1),
          true);


  assertion("intersect outside",
          newline(1,1,4,4),
          newline(3,2,6,3),
          false);

  assertion("Lines overlap",
          newline(1,1,1,5),
          newline(1,3,1,6),
          false);
}