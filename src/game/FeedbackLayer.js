import {Layer} from "../draw/Layer.js";

export class FeedbackLayer extends Layer {

  constructor(width, height, gameSettings, racers) {
    super(width, height);
    this.gameSettings = gameSettings;
    this.racers = racers;
  }

  render(timeDelta, controllers) {
    this.clear();

    this.context.fillStyle = "blue";
    this.context.beginPath();
    this.context.moveTo(500, 400);
    this.context.arc(500, 400, 50, 0, 2 * Math.PI * (timeDelta / this.gameSettings.timeout));
    this.context.lineTo(500, 400);
    this.context.fill();

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