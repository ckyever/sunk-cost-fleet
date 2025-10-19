import { Gameboard } from "./Gameboard.js";
export class Player {
  constructor(boardSize = 10) {
    this.gameboard = new Gameboard(boardSize);
  }
}
