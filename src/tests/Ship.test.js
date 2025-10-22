/* eslint-disable no-undef */
import { Ship } from "../Ship.js";

test("Create ship object", () => {
  const ship = new Ship(3, []);
  expect(typeof ship).toBe("object");
});

test("Create ship sets an ID", () => {
  const ship = new Ship(4, []);
  // Second ship created in this file so ID should be 2
  expect(ship.id).toBe(2);
});

test("Create small ship", () => {
  const ship = new Ship(2, []);
  expect(ship.length).toBe(2);
});

test("Create large ship", () => {
  const ship = new Ship(6, []);
  expect(ship.length).toBe(6);
});

test("Hit ship for the first time", () => {
  const ship = new Ship(4, []);
  ship.hit();
  expect(ship.health).toBe(3);
});

test("Hit sunk ship", () => {
  const ship = new Ship(1, []);
  ship.hit();
  ship.hit();
  expect(ship.health).toBe(0);
});

test("Sink ship", () => {
  const ship = new Ship(2, []);
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});
