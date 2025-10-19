import { Player } from "../Player.js";

test("Create player object", () => {
  const player = new Player();
  expect(typeof player).toBe("object");
});

test("Randomly place ships", () => {
  const player = new Player();
  player.randomlyPlaceShips();
  expect(player.gameboard.ships.length).toBe(5);
});
