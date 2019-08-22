import {Line} from "./Line.js"

export class Polyline {

  constructor(...positions) {
    this.positions = positions;
  }

  segmentCount() {
    return this.positions.length - 1;
  }

  getSegment(index) {
    if (index > this.segmentCount()-1 || index<0) {
      return null;
    }
    return new Line(this.positions[index], this.positions[index+1]);
  }

  intersect(line) {
    for (let i=0; i< this.segmentCount(); i++) {
      let intersect = this.getSegment(i).intersect(line);
      if (intersect) {
        return intersect;
      }
    }
    return null;
  }
}