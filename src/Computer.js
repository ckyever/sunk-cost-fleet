import { Player } from "./Player.js";
import { getCoordinateListDifferences } from "./utility.js";

export class Computer extends Player {
  constructor(boardSize) {
    super(boardSize);
    this.hitsToExplore = [];
  }

  #getRandomBoardPosition(gameboard) {
    const rowIndex = Math.floor(Math.random() * gameboard.size);
    const columnIndex = Math.floor(Math.random() * gameboard.size);
    return [rowIndex, columnIndex];
  }

  #getPotentialShipSquare(gameboard) {
    const [centralRowIndex, centralColumnIndex] = this.hitsToExplore[0];
    let square;

    // Check squares above
    let rowIndex = centralRowIndex - 1;
    let columnIndex = centralColumnIndex;
    while (gameboard.isCoordinateIndexValid(rowIndex)) {
      square = gameboard.board[rowIndex][columnIndex];
      if (square.isHit) {
        if (square.shipId == null) {
          // This is a miss so check the next direction
          break;
        } else {
          // This is a hit so keep going up
          rowIndex--;
        }
      } else {
        // Found an unhit square
        return [rowIndex, columnIndex];
      }
    }

    // Check squares below
    rowIndex = centralRowIndex + 1;
    columnIndex = centralColumnIndex;
    while (gameboard.isCoordinateIndexValid(rowIndex)) {
      square = gameboard.board[rowIndex][columnIndex];
      if (square.isHit) {
        if (square.shipId == null) {
          // This is a miss so check the next direction
          break;
        } else {
          // This is a hit so keep going down
          rowIndex++;
        }
      } else {
        // Found an unhit square
        return [rowIndex, columnIndex];
      }
    }

    // Check squares to the right
    rowIndex = centralRowIndex;
    columnIndex = centralColumnIndex + 1;
    while (gameboard.isCoordinateIndexValid(columnIndex)) {
      square = gameboard.board[rowIndex][columnIndex];
      if (square.isHit) {
        if (square.shipId == null) {
          // This is a miss so check the next direction
          break;
        } else {
          // This is a hit so keep right
          columnIndex++;
        }
      } else {
        // Found an unhit square
        return [rowIndex, columnIndex];
      }
    }

    // Check squares to the left
    rowIndex = centralRowIndex;
    columnIndex = centralColumnIndex - 1;
    while (gameboard.isCoordinateIndexValid(columnIndex)) {
      square = gameboard.board[rowIndex][columnIndex];
      if (square.isHit) {
        if (square.shipId == null) {
          // This is a miss so check the next direction
          break;
        } else {
          // This is a hit so keep going left
          columnIndex--;
        }
      } else {
        // Found an unhit square
        return [rowIndex, columnIndex];
      }
    }

    // It should find something, so shouldn't reach this far
    throw new Error("Exploring potential ship failed");
  }

  #removeSunkShipFromExploreQueue(sunkCoordinates) {
    const differences = getCoordinateListDifferences(
      this.hitsToExplore,
      sunkCoordinates,
    );
    return differences;
  }

  attack(gameboard) {
    const MAX_ATTEMPTS = 1000;
    let isHit, sunkShipCoordinates;
    let rowIndex, columnIndex;

    let attempts = 0;
    while (true) {
      if (attempts > MAX_ATTEMPTS) {
        throw new Error("Attempted to attack too many times");
      }

      if (this.hitsToExplore.length == 0) {
        // We don't know where any potential ships are so pick randomly
        [rowIndex, columnIndex] = this.#getRandomBoardPosition(gameboard);
      } else {
        // Explore the hits in our queue
        [rowIndex, columnIndex] = this.#getPotentialShipSquare(gameboard);
      }

      if (gameboard.board[rowIndex][columnIndex].isHit) {
        continue;
      } else {
        [isHit, sunkShipCoordinates] = gameboard.receiveAttack(
          rowIndex,
          columnIndex,
        );
        if (isHit) {
          if (sunkShipCoordinates.length > 0) {
            // Ship has been sunk so make sure we don't explore any of its coordinates
            this.hitsToExplore =
              this.#removeSunkShipFromExploreQueue(sunkShipCoordinates);
          } else {
            this.hitsToExplore.push([rowIndex, columnIndex]);
          }
        }
        break;
      }
    }
    const coordinate = [rowIndex, columnIndex];
    return [isHit, coordinate];
  }
}
