import { Gameboard } from "./Gameboard.js";
export class Player {
  constructor(boardSize = 10) {
    this.gameboard = new Gameboard(boardSize);
  }

  randomlyPlaceShips() {
    const shipLengths = [2, 2, 3, 3, 4];
    let shipLengthsIndex = 0;
    let numberOfShips = 5;
    let placeAttempts = 0;

    while (numberOfShips > 0) {
      if (placeAttempts > 100) {
        throw new Error("Took too long to place ships");
      }

      const isVertical = Math.random() > 0.5 ? true : false;
      console.log(isVertical);
      const startingRowIndex = Math.floor(Math.random() * this.gameboard.size);
      console.log(startingRowIndex);
      const startingColumnIndex = Math.floor(
        Math.random() * this.gameboard.size,
      );
      console.log(startingColumnIndex);

      let coordinateList = [];
      if (isVertical) {
        for (
          let i = startingRowIndex;
          i < startingRowIndex + shipLengths[shipLengthsIndex];
          i++
        ) {
          coordinateList.push([i, startingColumnIndex]);
        }
      } else {
        // Horizontal ship
        for (
          let i = startingColumnIndex;
          i < startingColumnIndex + shipLengths[shipLengthsIndex];
          i++
        ) {
          coordinateList.push([startingRowIndex, i]);
        }
      }

      if (this.gameboard.place(coordinateList)) {
        console.log(coordinateList);
        shipLengthsIndex++;
        numberOfShips--;
      }
    }
  }
}
