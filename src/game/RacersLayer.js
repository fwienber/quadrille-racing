import {Layer, QUADRILLE_SIZE_PX} from "../draw/Layer.js";

const TRACK_LENGTH = -15;

export class RacersLayer extends Layer {

  constructor(width, height, racers) {
    super(width, height);
    this.racers = racers;
  }

  render() {
    this.clear();

    for (let racer of this.racers) {
      let track = racer.track.slice(TRACK_LENGTH);
      this.context.beginPath();
      this.context.strokeStyle = racer.color;
      this.renderPolyline(track);
      this.context.stroke();

      this.context.fillStyle = racer.color;
      for (let position of track) {
        this.renderFilledCircle(position, QUADRILLE_SIZE_PX / 8);
      }
      if (racer.crashed) {
        this.context.fillStyle = "grey";
      } else if (racer.finished) {
        this.context.fillStyle = "white";
      }
      this.renderFilledCircle(racer.position, QUADRILLE_SIZE_PX / 4);
    }
  }
}