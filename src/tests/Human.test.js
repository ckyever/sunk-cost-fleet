import { Human } from "../Human.js";
import { Player } from "../Player.js";

test("Create human player object", () => {
  const human = new Human();
  expect(human).toBeInstanceOf(Player);
});
