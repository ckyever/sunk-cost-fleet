import { Computer } from "./Computer.js";
import { Human } from "./Human.js";
import "./styles.css";

const player = new Human();
const opponent = new Computer();

const playerBoard = document.querySelector(".gameboards .player");
const opponentBoard = document.querySelector(".gameboards .opponent");

playerBoard.appendChild(player.gameboard.generateHtml());
opponentBoard.appendChild(opponent.gameboard.generateHtml());
