import {Layer} from "../draw/Layer.js";

const TRACK_LENGTH = -15;

export class CourseLayer extends Layer {

  constructor(width, height, course) {
    super(width, height);
    this.course = course;
  }

  render() {
    this.clear();

    // render course
    this.context.lineWidth = 1;
    this.context.strokeStyle = "black";
    this.context.setLineDash([2,2]);
    this.context.beginPath();
    this.renderLine(this.course.startLine);
    this.renderLine(this.course.finishLine);
    this.context.stroke();

    this.context.strokeStyle = "black";
    this.context.setLineDash([]);
    this.context.beginPath();
    this.renderPolyline(this.course.outerBorder.positions);
    this.course.islands.forEach(island => {
      this.renderPolyline(island.positions);
    });
    this.context.stroke();
  }

}