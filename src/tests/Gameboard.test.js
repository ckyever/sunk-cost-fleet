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

test("Place horizontal small ship", () => {
  const game = new Gameboard(4);
  game.place([
    [0, 0],
    [0, 1],
  ]);
  const shipId = game.ships[0].id;
  expect(game.board).toEqual([
    [shipId, shipId, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ]);
});

test("Place vertical small ship", () => {
  const game = new Gameboard(4);
  game.place([
    [0, 0],
    [1, 0],
  ]);
  const shipId = game.ships[0].id;
  expect(game.board).toEqual([
    [shipId, null, null, null],
    [shipId, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ]);
});

test("Place small ship outside of board", () => {
  const game = new Gameboard(4);
  expect(
    game.place([
      [0, 0],
      [-1, 0],
    ]),
  ).toBe(false);
});

test("Place larger ship than board", () => {
  const game = new Gameboard(4);
  expect(
    game.place([
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
      [5, 0],
    ]),
  ).toBe(false);
});

test("Place two ships", () => {
  const game = new Gameboard(4);
  game.place([
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
  ]);
  const firstShipId = game.ships[0].id;
  game.place([
    [0, 1],
    [0, 2],
    [0, 3],
  ]);
  const secondShipId = game.ships[1].id;
  expect(game.board).toEqual([
    [firstShipId, secondShipId, secondShipId, secondShipId],
    [firstShipId, null, null, null],
    [firstShipId, null, null, null],
    [firstShipId, null, null, null],
  ]);
});

test("Place colliding ships", () => {
  const game = new Gameboard(4);
  game.place([
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
  ]);
  expect(
    game.place([
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
    ]),
  ).toBe(false);
});
