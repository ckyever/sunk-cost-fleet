export class Ship {
  static #nextShipId = 1;

  constructor(length) {
    this.length = length;
    this.health = length;
    this.id = Ship.#nextShipId;
    Ship.#nextShipId++;
  }

  hit() {
    if (!this.isSunk()) {
      this.health--;
    }
  }

  isSunk() {
    return this.health === 0;
  }
}
