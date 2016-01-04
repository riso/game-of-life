class Engine {
  constructor(size) {
    if (size) this.world = Array.from(new Array(size), () => {
      return Array.from(new Array(size), () => false);
    });
  }

  empty() {
    if (!this.world) return true;
    return this.world.every((row) => {
      return row.every((cell) => cell === false);
    });
  }

}

export {Engine};
