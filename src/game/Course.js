
export class Course {

  constructor(startLine, outerBorder, islands = [], finishLine = null) {
    this.startLine = startLine;
    //this.innerBorder = innerBorder;
    this.outerBorder = outerBorder;
    this.islands = islands;
    this.finishLine = finishLine || startLine;
  }

  intersect(line) {
    return this.outerBorder.intersect(line) ||
            this.islands.some(
                    (island) => island.intersect(line));
  }

  intersectsFinishLine(line) {
    return this.finishLine.intersect(line);
  }
}