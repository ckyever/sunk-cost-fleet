import { Ship } from "./Ship.js";

export class Gameboard {
  static MISSED_SHOT = "MISS";

  constructor(size) {
    this.size = size;
    this.board = this.#generateBoard(size);
    this.ships = [];
  }

  #generateBoard(size) {
    const board = [];
    for (let i = 0; i < size; i++) {
      const row = new Array(size).fill(null);
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
      if (this.board[rowIndex][columnIndex] != null) {
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
      this.board[rowIndex][columnIndex] = newShip.id;
    });

    return true;
  }

  #isCoordinateIndexValid(coordinateIndex) {
    return coordinateIndex >= 0 && coordinateIndex < this.size;
  }

  receiveAttack(rowIndex, columnIndex) {
    const position = this.board[rowIndex][columnIndex];
    if (position == null || position === Gameboard.MISSED_SHOT) {
      this.board[rowIndex][columnIndex] = Gameboard.MISSED_SHOT;
      return false;
    } else {
      const shipIndex = this.ships.findIndex((ship) => ship.id === position);
      this.ships[shipIndex].hit();
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
        square.dataset.x = x;
        square.dataset.y = y;
        boardElement.appendChild(square);
      }
    }

    return boardElement;
  }
}
