import {Layer} from "../draw/Layer.js";

const TRACK_LENGTH = -15;

const RACING_TRACK_FILL_STYLE = "rgba(0,0,255, 0.2)";
const OBSTACLE_FILL_STYLE = "rgba(0,255,0, 0.2)";

export class CourseLayer extends Layer {

  constructor(width, height, course) {
    super(width, height);
    this.course = course;
  }

  render() {

    this.context.fillStyle = OBSTACLE_FILL_STYLE;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);


    // render course

    // ... outer border
    this.renderFilledPolyline(this.course.outerBorder, RACING_TRACK_FILL_STYLE);

    // ... islands
    this.course.islands.forEach(island => {
      this.renderFilledPolyline(island, OBSTACLE_FILL_STYLE);
    });

    // ... startline
    this.context.lineWidth = 1;
    this.context.strokeStyle = "black";
    this.context.setLineDash([2,2]);
    this.context.beginPath();
    this.renderLine(this.course.startLine);
    this.renderLine(this.course.finishLine);
    this.context.stroke();
  }

  renderFilledPolyline(polyline, fillStyle) {
    // cut out
    this.context.globalCompositeOperation = "destination-out";

    this.context.beginPath();
    this.renderPolyline(polyline.positions);
    this.context.fillStyle = "black";
    this.context.fill();

    // render
    this.context.globalCompositeOperation = "source-over";

    this.context.strokeStyle = "black";
    this.context.setLineDash([]);
    this.context.beginPath();
    this.renderPolyline(polyline.positions);
    this.context.stroke();
    this.context.fillStyle = fillStyle;
    this.context.fill();

  }

}