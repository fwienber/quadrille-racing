import {GamepadInput} from "./GamepadInput.js"
import {Vector} from "../geometry/Vector.js";

const NUM_CONTROLLERS = 2;

export function testAll() {
  let players = [];
  for (let i = 0; i < NUM_CONTROLLERS; ++i) {
    players.push(new Vector(0,0));
  }
  
  new GamepadInput(NUM_CONTROLLERS, gamepadInput => {
    let id = window.setInterval(() => {
      for (let i = 0; i < NUM_CONTROLLERS; ++i) {
        let direction = gamepadInput.direction(i);
        if (!direction) {
          window.clearInterval(id);
        }
        console.log(i + ": " + direction);
        players[i] = players[i].add(direction);
        console.log(i + "=> " + players[i]);
      }
    }, 1000);
  });
}
