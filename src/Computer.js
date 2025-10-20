import { Player } from "./Player.js";

export class Computer extends Player {
  constructor(boardSize) {
    super(boardSize);
  }

  attack(gameboard) {
    const MAX_ATTEMPTS = 1000;
    let attempts = 0;
    let result;
    while (true) {
      if (attempts > MAX_ATTEMPTS) {
        throw new Error("Attempted to attack too many times");
      }
      const rowIndex = Math.floor(Math.random() * gameboard.size);
      const columnIndex = Math.floor(Math.random() * gameboard.size);
      if (gameboard.board[rowIndex][columnIndex].isHit) {
        continue;
      } else {
        result = gameboard.receiveAttack(rowIndex, columnIndex);
        break;
      }
    }
    return result;
  }
}
