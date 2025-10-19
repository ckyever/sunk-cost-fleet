import { Gameboard } from "../Gameboard.js";
import { Human } from "../Human.js";
import { Player } from "../Player.js";

test("Create human player object", () => {
  const human = new Human();
  expect(human).toBeInstanceOf(Player);
});

test("Create human player with default board size", () => {
  const human = new Human();
  const defaultBoard = new Gameboard(10);
  expect(human.gameboard).toEqual(defaultBoard);
});

test("Create human player with small board size", () => {
  const human = new Human(4);
  const smallBoard = new Gameboard(4);
  expect(human.gameboard).toEqual(smallBoard);
});
