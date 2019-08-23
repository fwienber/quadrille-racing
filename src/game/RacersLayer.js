import {Layer, QUADRILLE_SIZE_PX} from "../draw/Layer.js";

const TRACK_LENGTH = -15;

export class RacersLayer extends Layer {

  constructor(width, height, gameSettings, racers) {
    super(width, height);
    this.racers = racers;
    this.gameSettings = gameSettings;
  }

  render() {
    this.clear();

    for (let i = 0; i < this.racers.length; ++i) {
      let racer = this.racers[i];
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

      this.context.font = "24px comic-sans";
      this.context.textAlign = "left";
      this.context.textBaseline = "alphabetic";
      this.context.fillStyle = racer.color;
      let text = this.gameSettings.numRoundsToWin - racer.roundsFinished;
      if (racer.finished) {
        text = "finished!";
      } else if (racer.crashed) {
        text += " crashed";
      }
      this.context.fillText(text, 50, this.height - 30 * (this.racers.length - i));
    }
    this.context.font = "14px comic-sans";
    this.context.fillStyle = "black";
    this.context.fillText("rounds to go", 50, this.height - 30 * (this.racers.length + 1));
  }
}