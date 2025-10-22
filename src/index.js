import { Computer } from "./Computer.js";
import { delay } from "./utility.js";
import diceIcon from "./assets/dice.svg";
import { Human } from "./Human.js";
import newGameIcon from "./assets/new-game.svg";
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
const newGameIconElement = document.querySelector(".new-game .icon");
const newGameText = document.querySelector(".new-game-text");

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
  newGameText.textContent = "Randomise Layout";
  newGameIconElement.src = diceIcon;

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
    animateShot(".opponent", rowIndex, columnIndex);
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
    const [isAttackSuccessful, coordinates] = opponent.attack(player.gameboard);
    renderBoards();
    animateShot(".player", coordinates[0], coordinates[1]);
    if (isAttackSuccessful) {
      if (checkForWinner()) {
        break;
      }
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

function animateShot(boardSelector, rowIndex, columnIndex) {
  const square = document.querySelector(
    `${boardSelector} .square[data-y="${rowIndex}"][data-x="${columnIndex}"]`,
  );
  square.classList.add("shot-animation");
  setTimeout(() => {
    square.classList.remove("shot-animation");
  }, 500);
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

  newGameText.textContent = "New Game";
  newGameIconElement.src = newGameIcon;
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
