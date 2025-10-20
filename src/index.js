import { Computer } from "./Computer.js";
import { delay } from "./utility.js";
import { Human } from "./Human.js";
import "./styles.css";

const DEFAULT_COMPUTER_WAIT_TIME = 0; // in milliseconds

const playerBoard = document.querySelector(".player .board-container");
const opponentBoard = document.querySelector(".opponent .board-container");
let player;
let opponent;

// Human player makes the first move
let isPlayersTurn = true;
let isGameInProgress = false;

function newGame() {
  player = new Human();
  opponent = new Computer();

  player.randomlyPlaceShips();
  opponent.randomlyPlaceShips();
  renderBoards();
  isPlayersTurn = true;
  isGameInProgress = true;
}

function renderBoards() {
  playerBoard.innerHTML = "";
  opponentBoard.innerHTML = "";
  playerBoard.appendChild(player.gameboard.generateHtml());
  player.gameboard.renderShips(".player");
  opponentBoard.appendChild(opponent.gameboard.generateHtml());
  opponent.gameboard.renderShips(".opponent");
}

function checkForWinner() {
  let gameFinished = false;
  if (player.gameboard.isAllShipsSunk()) {
    console.log("You lost!");
    isGameInProgress = false;
    gameFinished = true;
  } else if (opponent.gameboard.isAllShipsSunk()) {
    console.log("You won!");
    isGameInProgress = false;
    gameFinished = true;
  }
  return gameFinished;
}

newGame();

opponentBoard.addEventListener("click", (event) => {
  if (!isGameInProgress) {
    return;
  }
  if (isPlayersTurn) {
    const rowIndex = event.target.dataset.y;
    const columnIndex = event.target.dataset.x;

    if (rowIndex != null && columnIndex != null) {
      opponent.gameboard.receiveAttack(rowIndex, columnIndex);
      renderBoards();
      if (checkForWinner()) {
        return;
      }

      // Computer makes a turn
      isPlayersTurn = false;
      delay(DEFAULT_COMPUTER_WAIT_TIME).then(() => {
        opponent.attack(player.gameboard);
        isPlayersTurn = true;
        renderBoards();
        if (checkForWinner()) {
          return;
        }
      });
    }
  }
});

const newGameButton = document.querySelector(".new-game");
newGameButton.addEventListener("click", () => {
  newGame();
});
