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

test("Receive a single missed attack", () => {
  const game = new Gameboard(4);
  expect(game.receiveAttack(0, 0)).toBe(false);
});

test("Receive a single successful attack", () => {
  const game = new Gameboard(4);
  game.place([
    [0, 0],
    [0, 1],
    [0, 2],
  ]);
  expect(game.receiveAttack(0, 0)).toBe(true);
});

test("Reflect a missed attack on gameboard", () => {
  const game = new Gameboard(4);
  game.receiveAttack(0, 0);
  expect(game.board).toEqual([
    [Gameboard.MISSED_SHOT, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ]);
});

test("Reflect a successful attack on ship", () => {
  const game = new Gameboard(4);
  game.place([
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
  ]);
  game.place([
    [0, 1],
    [0, 2],
    [0, 3],
  ]);
  game.receiveAttack(0, 2);
  expect(game.ships[1].health).toBe(2);
});

test("Reflect a successful attack on two different ships", () => {
  const game = new Gameboard(4);
  game.place([
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
  ]);
  game.place([
    [0, 1],
    [0, 2],
    [0, 3],
  ]);
  game.receiveAttack(0, 0);
  game.receiveAttack(0, 1);
  expect(game.ships[0].health).toBe(3);
  expect(game.ships[1].health).toBe(2);
});

test("Sink a ship", () => {
  const game = new Gameboard(4);
  game.place([
    [1, 1],
    [1, 2],
    [1, 3],
  ]);
  game.receiveAttack(1, 1);
  game.receiveAttack(1, 2);
  game.receiveAttack(1, 3);
  expect(game.ships[0].isSunk()).toBe(true);
});

test("Sink all ships on board", () => {
  const game = new Gameboard(4);
  game.place([
    [3, 1],
    [3, 2],
    [3, 3],
  ]);
  game.place([
    [2, 1],
    [2, 2],
  ]);
  game.receiveAttack(3, 1);
  game.receiveAttack(3, 2);
  game.receiveAttack(3, 3);
  game.receiveAttack(2, 1);
  game.receiveAttack(2, 2);
  expect(game.isAllShipsSunk()).toBe(true);
});

test("Sink some ships on the board", () => {
  const game = new Gameboard(4);
  game.place([
    [3, 1],
    [3, 2],
    [3, 3],
  ]);
  game.place([
    [2, 1],
    [2, 2],
  ]);
  game.receiveAttack(3, 1);
  game.receiveAttack(3, 2);
  game.receiveAttack(3, 3);
  game.receiveAttack(2, 1);
  expect(game.isAllShipsSunk()).toBe(false);
});
