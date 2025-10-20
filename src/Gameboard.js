import { Ship } from "./Ship.js";
import { Square } from "./Square.js";

export class Gameboard {
  static SHOT_TYPE_MISSED = "MISS";
  static SHOT_TYPE_HIT = "HIT";
  static MIN_SHIP_LENGTH = 2;
  static MAX_SHIP_LENGTH = 4;

  constructor(size) {
    this.size = size;
    this.board = this.#generateBoard(size);
    this.ships = [];
  }

  #generateBoard(size) {
    const board = [];
    for (let rowIndex = 0; rowIndex < size; rowIndex++) {
      const row = [];
      for (let columnIndex = 0; columnIndex < size; columnIndex++) {
        row.push(new Square());
      }
      board.push(row);
    }
    return board;
  }

  place(coordinateList) {
    // Check if each coordinate is valid and is not already populated
    for (let i = 0; i < coordinateList.length; i++) {
      let rowIndex;
      let columnIndex;
      try {
        rowIndex = coordinateList[i][0];
        columnIndex = coordinateList[i][1];
      } catch {
        throw new Error(`Invalid coordinate - ${coordinateList[i]}`);
      }
      if (!this.#isCoordinateIndexValid(rowIndex)) {
        return false;
      }
      if (!this.#isCoordinateIndexValid(columnIndex)) {
        return false;
      }
      if (this.board[rowIndex][columnIndex].shipId != null) {
        return false;
      }
    }

    // Create ship
    const newShip = new Ship(coordinateList.length);
    this.ships.push(newShip);

    // Place the ship on the board
    coordinateList.forEach((coordinate) => {
      let rowIndex;
      let columnIndex;
      try {
        rowIndex = coordinate[0];
        columnIndex = coordinate[1];
      } catch {
        throw new Error(`Invalid coordinate - ${coordinate}`);
      }
      this.board[rowIndex][columnIndex].shipId = newShip.id;
    });

    return true;
  }

  #isCoordinateIndexValid(coordinateIndex) {
    return coordinateIndex >= 0 && coordinateIndex < this.size;
  }

  receiveAttack(rowIndex, columnIndex) {
    const square = this.board[rowIndex][columnIndex];
    if (square.shipId == null) {
      this.board[rowIndex][columnIndex].isHit = true;
      return false;
    } else {
      const shipIndex = this.ships.findIndex(
        (ship) => ship.id === square.shipId,
      );
      this.ships[shipIndex].hit();
      this.board[rowIndex][columnIndex].isHit = true;
      return true;
    }
  }

  isAllShipsSunk() {
    const totalSunk = this.ships.reduce((totalSunk, ship) => {
      if (ship.isSunk()) {
        return totalSunk + 1;
      } else {
        return totalSunk;
      }
    }, 0);
    return totalSunk === this.ships.length;
  }

  generateHtml() {
    const boardElement = document.createElement("div");
    boardElement.classList = "board";
    boardElement.style.gridTemplate = `repeat(${this.size}, 1fr) / repeat(${this.size}, 1fr)`;

    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        const square = document.createElement("div");
        square.classList = "square";

        // CKYTODO: Temporary styling to visualise placed ships
        const shipId = this.board[y][x].shipId;
        if (shipId != null) {
          square.textContent = shipId;
          square.classList.add("ship");
        }

        if (this.board[y][x].isHit) {
          square.classList.add("hit");
        }

        square.dataset.x = x;
        square.dataset.y = y;
        boardElement.appendChild(square);
      }
    }

    return boardElement;
  }
}
