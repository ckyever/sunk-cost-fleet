import { Computer } from "./Computer.js";
import { Human } from "./Human.js";
import "./styles.css";

const player = new Human();
const opponent = new Computer();

const playerBoard = document.querySelector(".player .board-container");
const opponentBoard = document.querySelector(".opponent .board-container");

player.randomlyPlaceShips();
opponent.randomlyPlaceShips();
renderBoards();

function renderBoards() {
  playerBoard.innerHTML = "";
  opponentBoard.innerHTML = "";
  playerBoard.appendChild(player.gameboard.generateHtml());
  opponentBoard.appendChild(opponent.gameboard.generateHtml());
}

// Alternate between turns
// If players turn allow click
// On click will call receiveAttack
// If computer turn
// Randomise place on grid and call receiveattack
// Check if all ships have sunk
// Go to next players turn
let isPlayersTurn = true;

// while (
//   !player.gameboard.isAllShipsSunk() ||
//   !opponent.gameboard.isAllShipsSunk()
// ) {}

opponentBoard.addEventListener("click", (event) => {
  if (isPlayersTurn) {
    const rowIndex = event.target.dataset.y;
    const columnIndex = event.target.dataset.x;

    if (rowIndex != null && columnIndex != null) {
      console.log(`${rowIndex}, ${columnIndex}`);
      opponent.gameboard.receiveAttack(rowIndex, columnIndex);
      renderBoards();
    }
  }
});
