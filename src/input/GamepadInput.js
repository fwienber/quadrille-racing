import {Vector} from "../geometry/Vector.js";

const CROSS_UP = 12;
const CROSS_DOWN = 13;
const CROSS_LEFT = 14;
const CROSS_RIGHT = 15;
const BURGER = 9;
const AXES_LIMIT = 0.5;

export class GamepadInput {
  constructor(number, callback) {
    this.gamepads = [];
    window.addEventListener("gamepadconnected", e => {
      if (e.gamepad.mapping === "standard") {
        this.gamepads.push(e.gamepad.index);
        if (this.gamepads.length === number) {
          callback(this);
        }
      }
    });
    window.addEventListener("gamepaddisconnected", e => {
      let removeIndex = this.gamepads.findIndex(index => index === e.gamepad.index);
      if (removeIndex >= 0) {
        this.gamepads.slice(removeIndex, 1);
      }
    });
  }

  direction(index) {
    let gamepad = window.navigator.getGamepads()[this.gamepads[index]];
    if (gamepad) {
      let buttons = gamepad.buttons;
      if (buttons[BURGER].pressed) {
        return null;
      }
      let leftRight = gamepad.axes[0];
      let upDown = gamepad.axes[1];
      let deltaX =  buttons[CROSS_LEFT].pressed || leftRight < -AXES_LIMIT ? -1
              : buttons[CROSS_RIGHT].pressed || leftRight > AXES_LIMIT ? 1
                      : 0;
      let deltaY =  buttons[CROSS_UP].pressed || upDown < -AXES_LIMIT ? -1
              : buttons[CROSS_DOWN].pressed || upDown > AXES_LIMIT ? 1
                      : 0;
      return new Vector(deltaX, deltaY);
    }
  }
}
