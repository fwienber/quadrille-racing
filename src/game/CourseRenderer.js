const SCALE = 25;

export class CourseRenderer {

  constructor(canvas, course, racers) {
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    this.course = course;
    this.racers = racers;
  }

  render() {
    this.context.lineCap = "butt";
    this.context.fillStyle = "white";

    // clear
    let width = this.canvas.width;
    let height = this.canvas.height;
    this.context.fillRect(0, 0, width, height);

    // quadrille paper
    this.context.lineWidth = 0.1;
    this.context.strokeStyle = "#DFAB91";
    this.context.beginPath();
    for (let x = 0; x < width; x += SCALE / 5) {
      this.context.moveTo(x, 0);
      this.context.lineTo(x, height);
    }
    for (let y = 0; y < width; y += SCALE / 5) {
      this.context.moveTo(0, y);
      this.context.lineTo(width, y);
    }
    this.context.stroke();

    this.context.lineWidth = 0.4;
    this.context.beginPath();
    for (let x = 0; x < width; x += SCALE) {
      this.context.moveTo(x, 0);
      this.context.lineTo(x, height);
    }
    for (let y = 0; y < width; y += SCALE) {
      this.context.moveTo(0, y);
      this.context.lineTo(width, y);
    }
    this.context.stroke();

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
    this.renderPolyline(this.course.innerBorder.positions);
    this.context.stroke();

    // render racers
    for (let racer of this.racers) {
      this.context.beginPath();
      this.context.strokeStyle = racer.color;
      this.renderPolyline(racer.track);
      this.context.stroke();

      this.context.fillStyle = racer.color;
      for (let position of racer.track) {
        this.renderFilledCircle(position, SCALE / 8);
      }
      if (racer.crashed) {
        this.context.fillStyle = "grey";
      } else if (racer.finished) {
        this.context.fillStyle = "white";
      }
      this.renderFilledCircle(racer.position, SCALE / 4);

      for (let candidate of racer.nextPositionCandidates) {
        this.renderFilledCircle(candidate, SCALE / 25);
      }
    }
  }

  renderFilledCircle(position, radius) {
    this.context.beginPath();
    this.context.arc(SCALE * position.x, SCALE * position.y, radius, 0, 2 * Math.PI);
    this.context.fill();
    this.context.stroke();
  }

  renderLine(line) {
    this.context.moveTo(SCALE * line.start.x, SCALE * line.start.y);
    this.context.lineTo(SCALE * line.end.x, SCALE * line.end.y);
  }

  renderPolyline(polyLine) {
    let firstPoint = polyLine[0];
    this.context.moveTo(SCALE * firstPoint.x, SCALE * firstPoint.y);
    for (let i = 1; i < polyLine.length; ++i) {
      this.context.lineTo(SCALE * polyLine[i].x, SCALE * polyLine[i].y);
    }
  }
}