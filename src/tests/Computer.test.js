import { Computer } from "../Computer.js";
import { Player } from "../Player.js";

test("Create computer player object", () => {
  const computer = new Computer();
  expect(computer).toBeInstanceOf(Player);
});
