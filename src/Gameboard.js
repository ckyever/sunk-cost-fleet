import { Ship } from "./Ship.js";

export class Gameboard {
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
    // Check all coordinates are valid first
    // We use a standard for loop so we can exit early when finding an invalid coordinate
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
}
