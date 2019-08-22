import {Racer} from "./game/Racer.js";
import {Vector} from "./geometry/Vector.js";
import {CourseRenderer} from "./game/CourseRenderer.js";
import {Course} from "./game/Course.js";
import {Line} from "./geometry/Line.js";
import {waitForGamepads} from "./input/GamepadInput.js";
import {KeyboardInput} from "./input/KeyboardInput.js";

const NUM_RACERS = 2;
const NUM_GAMEPADS = 0;
const RACER_COLORS = ["red", "blue", "green"];

class Main {

  newGame() {
    let startOuter = new Vector(1, 1);
    let startInner = new Vector(1, 5);
    let startLine = new Line(startOuter, startInner);
    let finishOuter = new Vector(12,14);
    let finishInner = new Vector(8,14);
    let finishLine = new Line(finishOuter, finishInner);
    let outerBorder = [startOuter, new Vector(7,1), new Vector(10,3), new Vector(12,8), finishOuter];
    let innerBorder = [startInner, new Vector(6,5), new Vector(7,7), new Vector(8,10), finishInner];

    let racers = [];
    for (let i = 0; i < NUM_RACERS; ++i) {
      let racer = new Racer(RACER_COLORS[i], new Vector(1, 2 + i));
      racer.move(new Vector(1,0));
      racers.push(racer);
    }

    let canvas = document.createElement("canvas");
    canvas.width = 701;
    canvas.height = 601;
    document.body.appendChild(canvas);

    let course = new Course(startLine, innerBorder, outerBorder, finishLine);
    let courseRenderer = new CourseRenderer(canvas, course, racers);
    courseRenderer.render();

    waitForGamepads(NUM_GAMEPADS, controllers => {
      for (let i = 0; i < NUM_RACERS - NUM_GAMEPADS; ++i) {
        controllers.push(new KeyboardInput(i));
      }
      let id = window.setInterval(() => {
        for (let i = 0; i < NUM_RACERS; ++i) {
          let direction = controllers[i].direction();
          if (!direction) {
            window.clearInterval(id);
          }
          console.log(i + ": " + direction);
          racers[i].move(direction);
          console.log(i + "=> " + racers[i].position);
          courseRenderer.render();
        }
      }, 3000);
    });
  }

}

window.main = new Main();
window.main.newGame();
