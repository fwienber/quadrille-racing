import {Direction} from "../geometry/Momentum.js";

const KEY_MAPPINGS = [
  {
    "q": Direction.NW,
    "w": Direction.N,
    "e": Direction.NE,
    "a": Direction.W,
    "d": Direction.E,
    "y": Direction.SW,
    "x": Direction.S,
    "c": Direction.SE
  },
  {
    "t": Direction.NW,
    "z": Direction.N,
    "u": Direction.NE,
    "g": Direction.W,
    "j": Direction.E,
    "b": Direction.SW,
    "n": Direction.S,
    "m": Direction.SE
  }
];

export class KeyboardInput {
  constructor(layout) {
    this.keymap = KEY_MAPPINGS[layout];
    window.addEventListener("keydown", e => {
      this.lastKey = e.key;
    });
    window.addEventListener("keyup", e => {
      if (this.lastKey === e.key) {
        this.lastKey = undefined;
      }
    });
  }

  direction(index) {
    return this.keymap[this.lastKey] || Direction.ZERO;
  }
}
