const SCALE = 10;

export class CourseRenderer {

  constructor(canvas, course, racers) {
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    this.course = course;
    this.racers = racers;
  }

  render() {
    this.context.lineWidth = 1;
    this.context.lineCap = "butt";
    this.context.fillStyle = "white";

    // clear
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // render course
    this.context.strokeStyle = "black";
    this.context.setLineDash([2,2]);
    this.context.beginPath();
    this.renderLine(this.course.startLine);
    this.renderLine(this.course.finishLine);
    this.context.stroke();

    this.context.strokeStyle = "black";
    this.context.setLineDash([]);
    this.context.beginPath();
    this.renderPolyLine(this.course.outerBorder);
    this.renderPolyLine(this.course.innerBorder);
    this.context.stroke();

    for (let racer of this.racers) {
      this.context.beginPath();
      this.context.strokeStyle = racer.color;
      this.renderPolyLine(racer.track);
      this.context.stroke();
      this.context.beginPath();
      this.context.fillStyle = racer.color;
      this.context.arc(SCALE * racer.position.x, SCALE * racer.position.y, SCALE/4, 0, 2 * Math.PI);
      this.context.fill();
    }
  }

  renderLine(line) {
    this.context.moveTo(SCALE * line.start.x, SCALE * line.start.y);
    this.context.lineTo(SCALE * line.end.x, SCALE * line.end.y);
  }

  renderPolyLine(polyLine) {
    let firstPoint = polyLine[0];
    this.context.moveTo(SCALE * firstPoint.x, SCALE * firstPoint.y);
    for (let i = 1; i < polyLine.length; ++i) {
      this.context.lineTo(SCALE * polyLine[i].x, SCALE * polyLine[i].y);
    }
  }
}