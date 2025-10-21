import { Computer } from "./Computer.js";
import { delay } from "./utility.js";
import { Human } from "./Human.js";
import "./styles.css";

const DEFAULT_COMPUTER_WAIT_TIME = 1000; // in milliseconds

const playerBoard = document.querySelector(".player .board-container");
const opponentBoard = document.querySelector(".opponent .board-container");
const gameoverDialog = document.querySelector("dialog.gameover");
const result = document.querySelector("dialog.gameover .result");
const playerBoardTurnIndicator = document.querySelector(
  ".player .turn-indicator",
);
const opponentBoardTurnIndicator = document.querySelector(
  ".opponent .turn-indicator",
);
const newGameButton = document.querySelector(".new-game");

let player;
let opponent;
let isPlayersTurn;
let consecutiveHitCount;
let isGameInProgress;

function newGame() {
  player = new Human();
  opponent = new Computer();

  player.randomlyPlaceShips();
  opponent.randomlyPlaceShips();
  renderBoards();

  // Human player makes the first move
  isPlayersTurn = true;
  consecutiveHitCount = 0;
  isGameInProgress = true;
  opponentBoard.classList.add("active");

  // If the game hasn't started this is the same as randomising
  newGameButton.textContent = "Randomise Layout";

  renderTurnIndicator();
}

function renderBoards() {
  playerBoard.innerHTML = "";
  opponentBoard.innerHTML = "";
  playerBoard.appendChild(player.gameboard.generateHtml());
  player.gameboard.renderShips(".player");
  opponentBoard.appendChild(opponent.gameboard.generateHtml());
  opponent.gameboard.renderShips(".opponent");
}

function renderTurnIndicator() {
  if (isPlayersTurn) {
    playerBoardTurnIndicator.style.display = "none";
    opponentBoardTurnIndicator.style.display = "block";
    if (consecutiveHitCount >= 1) {
      opponentBoardTurnIndicator.textContent = "It's a hit! Take another shot";
    } else {
      opponentBoardTurnIndicator.textContent = "Click a square to fire at";
    }
  } else {
    playerBoardTurnIndicator.style.display = "block";
    if (consecutiveHitCount >= 1) {
      playerBoardTurnIndicator.textContent = "Another one incoming...";
    } else {
      playerBoardTurnIndicator.textContent = "Shot incoming...";
    }
    opponentBoardTurnIndicator.style.display = "none";
  }
}

function checkForWinner() {
  let gameFinished = false;
  if (player.gameboard.isAllShipsSunk()) {
    gameoverDialog.showModal();
    result.textContent = "You lost";
    isGameInProgress = false;
    gameFinished = true;
  } else if (opponent.gameboard.isAllShipsSunk()) {
    gameoverDialog.showModal();
    result.textContent = "You won!";
    isGameInProgress = false;
    gameFinished = true;
  }
  return gameFinished;
}

function humansTurn(clickEvent) {
  const rowIndex = clickEvent.target.dataset.y;
  const columnIndex = clickEvent.target.dataset.x;

  if (rowIndex != null && columnIndex != null) {
    const isAttackSuccessful = opponent.gameboard.receiveAttack(
      rowIndex,
      columnIndex,
    )[0];
    renderBoards();
    if (isAttackSuccessful) {
      consecutiveHitCount++;
      return true;
    } else {
      consecutiveHitCount = 0;
    }
  }
  return false;
}

async function computersTurn() {
  while (true) {
    await delay(DEFAULT_COMPUTER_WAIT_TIME);
    const isAttackSuccessful = opponent.attack(player.gameboard);
    renderBoards();
    if (isAttackSuccessful) {
      // Make another attack
      consecutiveHitCount++;
      renderTurnIndicator();
      continue;
    } else {
      consecutiveHitCount = 0;
      break;
    }
  }
}

// Initialise game
newGame();

// Event listeners
let turnInProgress = false;
opponentBoard.addEventListener("click", async (event) => {
  if (!isGameInProgress) {
    return;
  }
  if (turnInProgress) {
    return;
  }
  if (event.target.classList.contains("hit")) {
    // If square has already been hit do nothing
    return;
  }

  newGameButton.textContent = "New Game";
  turnInProgress = true;
  if (isPlayersTurn) {
    isPlayersTurn = humansTurn(event);
    renderTurnIndicator();
    if (checkForWinner()) {
      turnInProgress = false;
      return;
    }
    if (!isPlayersTurn) {
      opponentBoard.classList.remove("active");
      await computersTurn();
      checkForWinner();
      isPlayersTurn = true;
      opponentBoard.classList.add("active");
      renderTurnIndicator();
    }
  }
  turnInProgress = false;
});

newGameButton.addEventListener("click", () => {
  newGame();
});

// Gameover dialog buttons
const closeDialog = document.querySelector("dialog.gameover .close");
closeDialog.addEventListener("click", () => {
  gameoverDialog.close();
});

const gameoverNewGame = document.querySelector("dialog.gameover .new-game");
gameoverNewGame.addEventListener("click", () => {
  gameoverDialog.close();
  newGame();
});
