import { Player } from "./Player.js";

export class Computer extends Player {
  constructor(boardSize) {
    super(boardSize);
    this.lastSuccessfulHit = null;
  }

  #getRandomBoardPosition(gameboard) {
    const rowIndex = Math.floor(Math.random() * gameboard.size);
    const columnIndex = Math.floor(Math.random() * gameboard.size);
    return [rowIndex, columnIndex];
  }

  #findNextHitFromPreviousOne(gameboard) {
    const MAX_DIRECTION_TO_CHECK = 4;
    let rowIndex,
      columnIndex = null;

    for (let i = 0; i < MAX_DIRECTION_TO_CHECK; i++) {
      [rowIndex, columnIndex] = this.lastSuccessfulHit;
      switch (i) {
        case 0: // up
          rowIndex--;
          break;
        case 1: // right
          columnIndex++;
          break;
        case 2: // down
          rowIndex++;
          break;
        case 3: // left
          columnIndex--;
          break;
      }

      if (
        gameboard.isCoordinateIndexValid(rowIndex) &&
        gameboard.isCoordinateIndexValid(columnIndex) &&
        !gameboard.board[rowIndex][columnIndex].isHit
      ) {
        // We've found the next valid shot
        break;
      } else {
        // Setting it to null ensures that if
        rowIndex = null;
        columnIndex = null;
      }
    }

    // None of it's surrounding hits are valid so just get a random position
    if (rowIndex == null || columnIndex == null) {
      this.lastSuccessfulHit = null;
      [rowIndex, columnIndex] = this.#getRandomBoardPosition(gameboard);
    }
    return [rowIndex, columnIndex];
  }

  attack(gameboard) {
    const MAX_ATTEMPTS = 1000;

    let attempts = 0;
    let isHit, isSunk;
    while (true) {
      if (attempts > MAX_ATTEMPTS) {
        throw new Error("Attempted to attack too many times");
      }

      let rowIndex;
      let columnIndex;

      // If not last successful last hit get random position
      if (this.lastSuccessfulHit == null) {
        [rowIndex, columnIndex] = this.#getRandomBoardPosition(gameboard);
      } else {
        [rowIndex, columnIndex] = this.#findNextHitFromPreviousOne(gameboard);
      }

      if (gameboard.board[rowIndex][columnIndex].isHit) {
        continue;
      } else {
        [isHit, isSunk] = gameboard.receiveAttack(rowIndex, columnIndex);
        if (isHit) {
          if (isSunk) {
            // Sunk so no need to find the rest of the ship
            this.lastSuccessfulHit = null;
          } else {
            // Successful hit so remember this coordinate to try find the next ship
            this.lastSuccessfulHit = [rowIndex, columnIndex];
          }
        }
        break;
      }
    }
    return isHit;
  }
}
