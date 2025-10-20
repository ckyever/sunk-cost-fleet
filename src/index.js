import { Computer } from "./Computer.js";
import { delay } from "./utility.js";
import { Human } from "./Human.js";
import "./styles.css";

function renderBoards() {
  playerBoard.innerHTML = "";
  opponentBoard.innerHTML = "";
  playerBoard.appendChild(player.gameboard.generateHtml());
  opponentBoard.appendChild(opponent.gameboard.generateHtml());
}

const DEFAULT_COMPUTER_WAIT_TIME = 1000; // in milliseconds

const player = new Human();
const opponent = new Computer();

const playerBoard = document.querySelector(".player .board-container");
const opponentBoard = document.querySelector(".opponent .board-container");

player.randomlyPlaceShips();
opponent.randomlyPlaceShips();
renderBoards();

// Human player makes the first move
let isPlayersTurn = true;

opponentBoard.addEventListener("click", (event) => {
  if (isPlayersTurn) {
    const rowIndex = event.target.dataset.y;
    const columnIndex = event.target.dataset.x;

    if (rowIndex != null && columnIndex != null) {
      opponent.gameboard.receiveAttack(rowIndex, columnIndex);
      renderBoards();

      // Computer makes a turn
      isPlayersTurn = false;
      delay(DEFAULT_COMPUTER_WAIT_TIME).then(() => {
        opponent.attack(player.gameboard);
        isPlayersTurn = true;
        renderBoards();
      });
    }
  }
});
