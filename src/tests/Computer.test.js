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

function getTotalHits(board) {
  const totalHits = board.reduce((totalHits, row) => {
    let rowHits = 0;
    row.forEach((square) => {
      if (square.isHit) {
        rowHits++;
      }
    });
    return totalHits + rowHits;
  }, 0);
  return totalHits;
}

test("Computer can hit an opponents square", () => {
  const computer = new Computer();
  const opponent = new Player();
  computer.attack(opponent.gameboard);
  const totalHits = getTotalHits(opponent.gameboard.board);
  expect(totalHits).toBe(1);
});

test("Computer can hit two of the opponents squares", () => {
  const computer = new Computer();
  const opponent = new Player();
  computer.attack(opponent.gameboard);
  computer.attack(opponent.gameboard);
  const totalHits = getTotalHits(opponent.gameboard.board);
  expect(totalHits).toBe(2);
});
