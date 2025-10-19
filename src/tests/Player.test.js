import { Player } from "../Player.js";

test("Create player object", () => {
  const player = new Player();
  expect(typeof player).toBe("object");
});

test("Randomly place small number of ships", () => {
  const player = new Player();
  player.randomlyPlaceShips(2);
  expect(player.gameboard.ships.length).toBe(2);
});

test("Randomly place large number of ships", () => {
  const player = new Player();
  player.randomlyPlaceShips(7);
  expect(player.gameboard.ships.length).toBe(7);
});
