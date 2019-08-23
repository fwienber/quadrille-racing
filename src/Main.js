import {GAME_SETTINGS} from "./GameSettings.js";
import {Racer} from "./game/Racer.js";
import {Vector} from "./geometry/Vector.js";
import {Course} from "./game/Course.js";
import {Line} from "./geometry/Line.js";
import {waitForGamepads} from "./input/GamepadInput.js";
import {KeyboardInput} from "./input/KeyboardInput.js";
import {Polyline} from "./geometry/Polyline.js";
import {Direction} from "./geometry/Momentum.js";
import {readCourseFromSvg} from "./reader/SvgCourseReader.js";
import {createPaper} from "./game/Paper.js";

const WIDTH = 1280;
const HEIGHT = 720;

//const NUM_RACERS = 2;
//const NUM_GAMEPADS = 1;
//const RACER_COLORS = ["red", "blue", "green"];
const DEBUG=true;

class Main {

  constructor() {
    this.gameLoop = this.gameLoop.bind(this);
    this.startGame = this.startGame.bind(this);
    this.gameSettings = GAME_SETTINGS;
  }

  newGame() {
    readCourseFromSvg(WIDTH, HEIGHT, this.gameSettings.courseLayout, this.startGame);
    // this.startGame(Main.createSimpleCourse());
  }

  static createSimpleCourse() {
    let startOuter = new Vector(1, 1);
    let startInner = new Vector(1, 5);
    let startLine = new Line(startOuter, startInner);
    let finishOuter = new Vector(12,14);
    let finishInner = new Vector(8,14);
    let finishLine = new Line(finishOuter, finishInner);
    let outerBorder = new Polyline(startOuter, new Vector(7,1), new Vector(10,3), new Vector(12,8), finishOuter);
    let innerBorder = new Polyline(startInner, new Vector(6,5), new Vector(7,7), new Vector(8,10), finishInner);
    return new Course(startLine, outerBorder, [innerBorder], finishLine);
  }

  startGame(course) {
    this.course = course;
    this.racers = this.initializeRacers(course, this.gameSettings.numRacers);

    this.paper = createPaper(WIDTH, HEIGHT, this.gameSettings, this.course, this.racers);
    this.paper.quadrilleLayer.render();
    this.paper.courseLayer.render();

    waitForGamepads(this.gameSettings.numGamePads, controllers => {
      for (let i = 0; i < this.gameSettings.numRacers - this.gameSettings.numGamePads; ++i) {
        controllers.push(new KeyboardInput(i));
      }
      this.controllers = controllers;
      window.requestAnimationFrame(this.gameLoop);
    });

    this.gameSettings.timeout = this.gameSettings.startTimeout;
  }

  initializeRacers(course, numRacers) {
    let start = course.startLine.start;
    let end = course.startLine.end;
    let isVertical = (Math.abs(start.x - end.x) < Math.abs(start.y - end.y));
    let momentumVector = Direction.ZERO;
    let placingVector = Direction.ZERO;
    if (isVertical) {
      momentumVector = (end.y > start.y) ? Direction.E : Direction.W;
      placingVector = (end.y > start.y) ? Direction.S : Direction.N;
    }
    else {
      momentumVector = (end.x > start.x) ? Direction.N : Direction.S;
      placingVector = (end.x > start.x) ? Direction.E : Direction.W;
    }
    let racers = [];

    let startlineVector = end.substract(start);
    let centerStartlinePosition = start.add(startlineVector.multiply(0.5)).round();
    let currentRacerPosition = centerStartlinePosition.add(momentumVector).substract(placingVector.multiply(numRacers/2)).round();

    for (let i = 0; i < this.gameSettings.numRacers; ++i) {
      // noinspection JSSuspiciousNameCombination
      let racer = new Racer(this.gameSettings.racerColors[i], currentRacerPosition);
      racer.move(momentumVector);
      racers.push(racer);
      currentRacerPosition = currentRacerPosition.add(placingVector);
    }

    return racers
  }

  gameLoop(timestamp) {
    if (!this.start) {
      this.start = timestamp;
    }
    let timeDelta = timestamp - this.start;
    if (timeDelta < this.gameSettings.timeout) {
      this.paper.feedbackLayer.render(timeDelta, this.controllers);
    } else {
      this.start = timestamp;
      for (let i = 0; i < this.gameSettings.numRacers; ++i) {
        let racer = this.racers[i];
        if (racer.finished) {
          continue;
        }

        let direction = this.controllers[i].direction();
        let lastLine = racer.move(direction);
        if (this.course.intersect(lastLine)) {
          if (DEBUG) {
            console.debug("Racer ", racer, " crashed into boundary.");
          }
          racer.crossBoundary();
        }
        if (this.course.intersectsFinishLine(lastLine) && !racer._crossedFinishLine) {
          if (DEBUG) {
            console.debug("Racer ", racer, " crossed finishing line.");
          }
          racer._crossedFinishLine = true;
          racer.crossFinishLine();
          if (racer.roundsFinished>=this.gameSettings.numRoundsToWin) {
            racer.finish();
          }
          this.recalculateTimeout();
          if (DEBUG) {
            console.debug("Let's do the timewarp again: timeout=", this.gameSettings.timeout, " ms");
          }
        } else {
          racer._crossedFinishLine = false;
        }
        this.paper.racersLayer.render();
      }
    }
    window.requestAnimationFrame(this.gameLoop);
  }

  recalculateTimeout() {
    let timeDelta = this.gameSettings.startTimeout -this.gameSettings.finalTimeout
    let roundsFinished = this.racers.map(racer => racer.roundsFinished);
    let maxRounds = Math.max(... roundsFinished);
    let newTimeout = Math.round(this.gameSettings.startTimeout - maxRounds * timeDelta/this.racers.length);

    this.gameSettings.timeout = newTimeout;
  }
}

window.main = new Main();
window.main.newGame();
