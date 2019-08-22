import {Position} from "./Position.js";

export class Line {

  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  intersect(line) { // returns position
    // based on https://de.wikipedia.org/wiki/Schnittpunkt

    let x1 = this.start.x;
    let y1 = this.start.y;
    let x2 = this.end.x;
    let y2 = this.end.y;

    let x3 = line.start.x;
    let y3 = line.start.y;
    let x4 = line.end.x;
    let y4 = line.end.y;

    let xs_numerator = ((x4-x3)*(x2*y1 - x1*y2) - (x2 - x1)*(x4*y3 - x3*y4));
    let ys_numerator = ((y1-y2) * (x4*y3 - x3*y4) - (y3-y4)*(x2*y1 - x1*y2));
    let denominator = ((y4-y3)*(x2-x1) - (y2-y1)*(x4-x3));

    if (denominator != 0) {
      let xs = xs_numerator / denominator;
      let ys = ys_numerator / denominator;

      // is intersection within this line?

      let isOnLine = function(line) {
        let x_min = Math.min(line.start.x, line.end.x);
        let x_max = Math.max(line.start.x, line.end.x);
        let y_min = Math.min(line.start.y, line.end.y);
        let y_max = Math.max(line.start.y, line.end.y);

        return (xs>=x_min && xs<=x_max && ys>=y_min && ys<=y_max)
      }

      if (isOnLine(this) && isOnLine(line)) {
        return new Position(xs, ys);
      }
      else {
        return null;
      }

    }
    else {
      return null;
    }
  }

}