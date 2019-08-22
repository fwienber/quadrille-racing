import {Racer} from "./game/Racer.js";
import {Vector} from "./geometry/Vector.js";
import {CourseRenderer} from "./game/CourseRenderer.js";
import {Course} from "./game/Course.js";
import {Line} from "./geometry/Line.js";
import {waitForGamepads} from "./input/GamepadInput.js";
import {KeyboardInput} from "./input/KeyboardInput.js";
import {Polyline} from "./geometry/Polyline.js";

const NUM_RACERS = 2;
const NUM_GAMEPADS = 1;
const RACER_COLORS = ["red", "blue", "green"];

class Main {

  constructor() {
    this.gameLoop = this.gameLoop.bind(this);
  }

  newGame() {
    let startOuter = new Vector(1, 1);
    let startInner = new Vector(1, 5);
    let startLine = new Line(startOuter, startInner);
    let finishOuter = new Vector(12,14);
    let finishInner = new Vector(8,14);
    let finishLine = new Line(finishOuter, finishInner);
    let outerBorder = new Polyline(startOuter, new Vector(7,1), new Vector(10,3), new Vector(12,8), finishOuter);
    let innerBorder = new Polyline(startInner, new Vector(6,5), new Vector(7,7), new Vector(8,10), finishInner);

    this.racers = [];
    for (let i = 0; i < NUM_RACERS; ++i) {
      let racer = new Racer(RACER_COLORS[i], new Vector(1, 2 + i));
      racer.move(new Vector(1,0));
      this.racers.push(racer);
    }

    let canvas = document.createElement("canvas");
    canvas.width = 701;
    canvas.height = 601;
    document.body.appendChild(canvas);

    this.course = new Course(startLine, innerBorder, outerBorder, finishLine);
    this.courseRenderer = new CourseRenderer(canvas, this.course, this.racers);
    this.courseRenderer.render();

    waitForGamepads(NUM_GAMEPADS, controllers => {
      for (let i = 0; i < NUM_RACERS - NUM_GAMEPADS; ++i) {
        controllers.push(new KeyboardInput(i));
      }
      this.controllers = controllers;
      this.id = window.setInterval(this.gameLoop, 1000);
    });
  }

  gameLoop() {
    for (let i = 0; i < NUM_RACERS; ++i) {
      let racer = this.racers[i];
      if (racer.finished) {
        continue;
      }

      let direction = this.controllers[i].direction();
      if (!direction) {
        window.clearInterval(this.id);
        return;
      }
      let lastLine = racer.move(direction);
      if (this.course.intersect(lastLine)) {
        racer.crash();
      }
      if (this.course.intersectsFinishLine(lastLine)) {
        racer.finish();
      }
      this.courseRenderer.render();
    }
  }

}

window.main = new Main();
window.main.newGame();
