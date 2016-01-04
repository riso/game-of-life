import {
	Engine
}
from "./engine";

describe('Game of life engine', () => {

	describe("initialization", () => {

		let dummy;

		beforeEach(() => {
			dummy = new Engine();
		});

		it("should start as empty", () => {
			expect(dummy.world).toBe(undefined);

			dummy = new Engine(4); // create a square world sized 4x4
			expect(dummy.world.length).toEqual(4);
			expect(dummy.world[0].length).toEqual(4);
			expect(dummy.world[0][0]).toEqual(false);
			expect(dummy.empty()).toBe(true);
		});

		it("should start at beginning of time", () => {
			expect(dummy.time).toBe(0);
		});

	});

	describe("world rules", () => {

		let game;

		beforeEach(() => {
			game = new Engine(4);
		});

		it("should be able to change cells life", () => {

			let dummy = new Engine();

			expect(() => dummy.set(4, 4)).toThrow(new Error("Invalid cell number"));

			game = new Engine(4);

			expect(() => game.set(4, 4)).toThrow(new Error("Invalid cell number"));

			expect(game.world[2][1]).toBe(false);
			game.set(2, 1);
			expect(game.world[2][1]).toBe(true);

			game.set(2, 1, false);
			expect(game.world[2][1]).toBe(false);
		});

		it("should be able to compute alive neighbors", () => {
			expect(game.neighbors(2, 2)).toBe(0);

			game.set(2, 3);
			expect(game.neighbors(2, 2)).toBe(1);

			game.set(0, 0);
			expect(game.neighbors(2, 2)).toBe(1);
		});

		it("should determine next generation value according to number of alive neighbors", () => {
			// 4x4, everything is dead
			expect(game.world[1][1]).toBe(false);

			// 0 0 0 0
			// 0 0 0 0 -> with this everything is still dead
			// 0 1 1 0
      // 0 0 0 0
			game.set(1, 2);
			game.set(2, 2);
			expect(game._nextGen(1, 1)).toBe(false);
			expect(game._nextGen(1, 2)).toBe(false);
			expect(game._nextGen(2, 2)).toBe(false);

			// 0 0 0 0
			// 0 1 0 0 -> all three cells should stay alive, and (2, 1) becomes alive
			// 0 1 1 0
      // 0 0 0 0
			game.set(1, 1);
			expect(game._nextGen(1, 1)).toBe(true);
			expect(game._nextGen(1, 2)).toBe(true);
			expect(game._nextGen(2, 2)).toBe(true);
			expect(game._nextGen(2, 1)).toBe(true);

			// 0 0 1 0
			// 0 1 1 0 -> here (1, 1) and (2, 1) die, everything else should stay alive
			// 0 1 1 0
      // 0 0 0 0
			game.set(2, 0);
			game.set(2, 1);
			expect(game._nextGen(1, 1)).toBe(false);
			expect(game._nextGen(1, 2)).toBe(true);
			expect(game._nextGen(2, 2)).toBe(true);
			expect(game._nextGen(2, 1)).toBe(false);
			expect(game._nextGen(2, 0)).toBe(true);
		});
	});

	describe("world evolutions", () => {

		let game;

		beforeEach(() => {
			game = new Engine(3);
		});

    it("should evolve over time", () => {
      // 0 0 0
      // 0 0 0 -> with this everything will die
      // 0 1 1
			game.set(1, 2);
			game.set(2, 2);
      game.nextGen();
      expect(game.world[1][2]).toBe(false);
      expect(game.world[2][2]).toBe(false);

      // 0 0 0
			// 0 1 0 -> with this everything becomes alive
			// 0 1 1
			game.set(1, 1);
      game.set(1, 2);
      game.set(2, 2);
      game.nextGen();
      expect(game.world[0][0]).toBe(true);
      expect(game.world[0][1]).toBe(true);
      expect(game.world[0][2]).toBe(true);
      expect(game.world[1][0]).toBe(true);
			expect(game.world[1][1]).toBe(true);
			expect(game.world[1][2]).toBe(true);
      expect(game.world[2][0]).toBe(true);
			expect(game.world[2][1]).toBe(true);
      expect(game.world[2][2]).toBe(true);

      // 0 1 1
      // 1 1 1 -> here everything dies
      // 1 1 1
      game.nextGen();
      expect(game.world[0][0]).toBe(false);
      expect(game.world[0][1]).toBe(false);
      expect(game.world[0][2]).toBe(false);
      expect(game.world[1][0]).toBe(false);
			expect(game.world[1][1]).toBe(false);
			expect(game.world[1][2]).toBe(false);
      expect(game.world[2][0]).toBe(false);
			expect(game.world[2][1]).toBe(false);
      expect(game.world[2][2]).toBe(false);
    });
	});

});
