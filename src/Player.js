import { Gameboard } from "./Gameboard.js";
export class Player {
  constructor(boardSize = 10) {
    this.gameboard = new Gameboard(boardSize);
  }

  randomlyPlaceShips(numberOfShips) {
    let placeAttempts = 0;

    while (numberOfShips > 0) {
      if (placeAttempts > 100) {
        throw new Error("Took too long to place ships");
      }

      const shipLength = Math.floor(
        Math.random() *
          (Gameboard.MAX_SHIP_LENGTH - Gameboard.MIN_SHIP_LENGTH + 1),
      );
      const isVertical = Math.random() > 0.5 ? true : false;
      const startingRowIndex = Math.floor(Math.random() * this.gameboard.size);
      const startingColumnIndex = Math.floor(
        Math.random() * this.gameboard.size,
      );

      let coordinateList = [];
      if (isVertical) {
        for (let i = startingRowIndex; i < shipLength; i++) {
          coordinateList.push([i, startingColumnIndex]);
        }
      } else {
        // Horizontal ship
        for (let i = startingColumnIndex; i < shipLength; i++) {
          coordinateList.push([startingRowIndex, i]);
        }
      }

      if (this.gameboard.place(coordinateList)) {
        numberOfShips--;
      }
    }
  }
}
