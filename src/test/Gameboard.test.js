/* eslint-disable no-undef */
import { Gameboard } from "../Gameboard.js";
import { Ship } from "../Ship.js";

test("Create gameboard object", () => {
  const game = new Gameboard(10);
  expect(typeof game).toBe("object");
});

test("Create small gameboard", () => {
  const game = new Gameboard(4);
  expect(game.board).toEqual([
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ]);
});

test("Create large gameboard", () => {
  const game = new Gameboard(10);
  expect(game.board).toEqual([
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
  ]);
});
