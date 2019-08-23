import {Layer, QUADRILLE_SIZE_PX} from "../draw/Layer.js";

export class QuadrilleLayer extends Layer {

  constructor(width, height) {
    super(width, height);
  }

  render() {
    this.clear();

    this.context.fillStyle = "white";
    this.context.fillRect(0, 0, this.width, this.height);

    this.context.strokeStyle = "#DFAB91";

    this.context.lineWidth = 0.1;
    this.renderQuadrilles(QUADRILLE_SIZE_PX / 5);

    this.context.lineWidth = 0.4;
    this.renderQuadrilles(QUADRILLE_SIZE_PX);
  }

  renderQuadrilles(step) {
    this.context.beginPath();
    for (let x = 0; x < this.width; x += step) {
      this.context.moveTo(x, 0);
      this.context.lineTo(x, this.height);
    }
    for (let y = 0; y < this.height; y += step) {
      this.context.moveTo(0, y);
      this.context.lineTo(this.width, y);
    }
    this.context.stroke();

  }
}