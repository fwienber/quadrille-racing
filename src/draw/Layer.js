export const QUADRILLE_SIZE_PX = 25;

export class Layer {

  constructor(width, height) {
    this.canvas = document.createElement("canvas");
    this.width = this.canvas.width = width;
    this.height = this.canvas.height = height;
    document.body.appendChild(this.canvas);
    this.context = this.canvas.getContext("2d");
    this.context.lineCap = "butt";
  }

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  renderFilledCircle(position, radius) {
    this.context.beginPath();
    this.context.arc(QUADRILLE_SIZE_PX * position.x, QUADRILLE_SIZE_PX * position.y, radius, 0, 2 * Math.PI);
    this.context.fill();
    this.context.stroke();
  }

  renderLine(line) {
    this.context.moveTo(QUADRILLE_SIZE_PX * line.start.x, QUADRILLE_SIZE_PX * line.start.y);
    this.context.lineTo(QUADRILLE_SIZE_PX * line.end.x, QUADRILLE_SIZE_PX * line.end.y);
  }

  renderPolyline(polyLine) {
    let firstPoint = polyLine[0];
    this.context.moveTo(QUADRILLE_SIZE_PX * firstPoint.x, QUADRILLE_SIZE_PX * firstPoint.y);
    for (let i = 1; i < polyLine.length; ++i) {
      this.context.lineTo(QUADRILLE_SIZE_PX * polyLine[i].x, QUADRILLE_SIZE_PX * polyLine[i].y);
    }
  }
}