import { Player } from "../Player.js";

test("Create player object", () => {
  const player = new Player();
  expect(typeof player).toBe("object");
});
