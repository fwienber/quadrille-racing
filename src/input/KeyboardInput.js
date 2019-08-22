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
    window.addEventListener("keypress", e => {
      this.lastKey = e.key;
    });
  }

  direction(index) {
    let lastKey = this.lastKey;
    this.lastKey = undefined;
    return this.keymap[lastKey] || Direction.ZERO;
  }
}
