import {Layer} from "../draw/Layer.js";

export class FeedbackLayer extends Layer {

  constructor(width, height, gameSettings, racers) {
    super(width, height);
    this.gameSettings = gameSettings;
    this.racers = racers;
  }

  render(timeDelta, controllers) {
    this.clear();

    // render timeout circle:
    let middleX = this.width / 2;
    let middleY = this.height / 2;

    this.context.fillStyle = "rgba(140,140,180,.6)";
    this.context.beginPath();
    this.context.moveTo(middleX, middleY);
    this.context.arc(middleX, middleY, 40, 0, 2 * Math.PI * (timeDelta / this.gameSettings.timeout));
    this.context.lineTo(middleX, middleY);
    this.context.fill();

    // render timeout seconds:
    this.context.font = "24px comic-sans";
    this.context.textAlign = "center";
    this.context.textBaseline = "middle";
    this.context.fillStyle = "black";
    this.context.fillText(parseFloat(Math.round((this.gameSettings.timeout - timeDelta)/1000 * 10) / 10).toFixed(1) + " s", middleX, middleY);

    // render next target points
    for (let i = 0; i < this.gameSettings.numRacers; ++i) {
      let racer = this.racers[i];
      if (racer.finished) {
        continue;
      }
      this.context.fillStyle = this.context.strokeStyle = "gray";
      for (let candidate of racer.nextPositionCandidates) {
        this.renderFilledCircle(candidate, 1);
      }
      let direction = controllers[i].direction();
      let nextPosition = racer.nextCenterPosition.add(direction);
      this.context.fillStyle = this.context.strokeStyle = racer.color;
      this.renderFilledCircle(nextPosition, 3);
    }
  }

}