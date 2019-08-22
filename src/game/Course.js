
export class Course {

  constructor(startLine, innerBorder, outerBorder, finishLine = null) {
    this.startLine = startLine;
    this.innerBorder = innerBorder;
    this.outerBorder = outerBorder;
    this.finishLine = finishLine || startLine;
  }

  intersect(line) {
    return this.innerBorder.intersect(line) || this.outerBorder.intersect(line);
  }

  intersectsFinishLine(line) {
    return this.finishLine.intersect(line);
  }
}