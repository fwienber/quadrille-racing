
export class Course {

  constructor(startLine, innerBorder, outerBorder, finishLine = null) {
    this.startLine = startLine;
    this.innerBorder = innerBorder;
    this.outerBorder = outerBorder;
    this.finishLine = finishLine || startLine;
  }

}