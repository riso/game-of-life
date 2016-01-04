import {Engine} from "./engine";

describe('Game of life engine', () => {
  it("should start as empty", () => {
    let g = new Engine(); // create a new empty world
    expect(g.world).toBe(undefined);

    g = new Engine(4); // create a square world sized 4x4
    expect(g.world.length).toEqual(4);
    expect(g.world[0].length).toEqual(4);
    expect(g.world[0][0]).toEqual(false);
    expect(g.empty()).toBe(true);
  });
});
