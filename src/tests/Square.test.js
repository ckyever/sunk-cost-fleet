import { Square } from "../Square.js";

test("Create empty square", () => {
  const emptySquare = new Square();
  expect(typeof emptySquare).toBe("object");
});
