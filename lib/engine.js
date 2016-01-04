import * as _ from "lodash";

class Engine {
  constructor(size) {
    this.time = 0;
    if (size) this.world = Array.from(new Array(size), () => {
      return Array.from(new Array(size), () => false);
    });
  }

  empty() {
    if (!this.world) return true;
    return this.world.every((col) => {
      return col.every((cell) => cell === false);
    });
  }

  /**
   * Marks a cell with the given value.
   *
   * {Number} x
   * {Number} y
   * {Boolean} alive, or true if undefined / null
   */
  set(x, y, alive) {
    this._validateRange(x, y);
    this.world[x][y] = alive === false ? false : true;
  }

  neighbors(x, y) {
    this._validateRange(x, y);
    let count = 0;
    const w = this.world;
    // we assume a 'contiguous' world and we 'rotate' around the given position
    x = x === 0 ? w.length - 1 : x - 1;
    count += w[x][y] ? 1 : 0;
    y = y === 0 ? w[x].length - 1 : y - 1;
    count += w[x][y] ? 1 : 0;
    x = x === w.length - 1 ? 0 : x + 1;
    count += w[x][y] ? 1 : 0;
    x = x === w.length - 1 ? 0 : x + 1;
    count += w[x][y] ? 1 : 0;
    y = y === w[x].length - 1 ? 0 : y + 1;
    count += w[x][y] ? 1 : 0;
    y = y === w[x].length - 1 ? 0 : y + 1;
    count += w[x][y] ? 1 : 0;
    x = x === 0 ? w.length - 1 : x - 1;
    count += w[x][y] ? 1 : 0;
    x = x === 0 ? w.length - 1 : x - 1;
    count += w[x][y] ? 1 : 0;

    return count;
  }

  nextGen() {
    this.world = _.map((col, x) => {
      return _.map((row, y) => {
        return this._nextGen(x, y);
      });
    });
    this.time++;
  }

  _nextGen(x, y) {
    let neighbors = this.neighbors(x, y);

    // cell is alive
    if (this.world[x][y]) {
      switch (neighbors) {
        // lt 2 neighbors => death by starvation
        case 0:
        case 1:
          return false;
        // 2 or 3 neighbors => live another day
        case 2:
        case 3:
          return true;
        // gt 3 neighbors => death by overpopulation
        default:
          return false;
      }
    }

    // cell is dead
    if (neighbors === 3) return true; // reproduce and flourish
    return false; // stay arid and dead
  }

  _validateRange(x, y) {
    if (!this.world) throw new Error("Invalid cell number");
    if (x >= this.world.length || y >= this.world[x].length)
      throw new Error("Invalid cell number");
  }
}

export {Engine};
