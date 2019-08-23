import {Vector} from "../geometry/Vector.js";

const CROSS_UP = 12;
const CROSS_DOWN = 13;
const CROSS_LEFT = 14;
const CROSS_RIGHT = 15;
const AXES_LIMIT = 0.5;

export function waitForGamepads(callback) {
  let gamepads = [];

  let timeoutId;
  function gamepadConnectedListener(e) {
    if (timeoutId) {
      window.clearTimeout(timeoutId);
    }
    timeoutId = window.setTimeout(() => {
      window.removeEventListener("gamepadconnected", gamepadConnectedListener);
      callback(gamepads);
    }, 500);
    if (e.gamepad.mapping === "standard") {
      gamepads.push(new GamepadInput(e.gamepad.index));
    }
  }
  window.addEventListener("gamepadconnected", gamepadConnectedListener);
}

class GamepadInput {
  constructor(index) {
    this.index = index;
  }

  direction() {
    let gamepad = window.navigator.getGamepads()[this.index];
    if (gamepad) {
      let buttons = gamepad.buttons;
      let leftRight = gamepad.axes[0];
      let upDown = gamepad.axes[1];
      let deltaX = buttons[CROSS_LEFT].pressed || leftRight < -AXES_LIMIT ? -1
              : buttons[CROSS_RIGHT].pressed || leftRight > AXES_LIMIT ? 1
                      : 0;
      let deltaY = buttons[CROSS_UP].pressed || upDown < -AXES_LIMIT ? -1
              : buttons[CROSS_DOWN].pressed || upDown > AXES_LIMIT ? 1
                      : 0;
      return new Vector(deltaX, deltaY);
    }
  }
}
