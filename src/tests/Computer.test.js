import { Computer } from "../Computer.js";
import { Gameboard } from "../Gameboard.js";
import { Player } from "../Player.js";

test("Create computer player object", () => {
  const computer = new Computer();
  expect(computer).toBeInstanceOf(Player);
});

test("Create computer player with default board size", () => {
  const computer = new Computer();
  const defaultBoard = new Gameboard(10);
  expect(computer.gameboard).toEqual(defaultBoard);
});
