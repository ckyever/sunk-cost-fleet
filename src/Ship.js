export class Ship {
  static #nextShipId = 1;

  constructor(length) {
    this.length = length;
    this.health = length;
    this.id = Ship.#nextShipId;
    Ship.#nextShipId++;
  }

  hit() {
    if (this.isSunk()) {
      return true;
    } else {
      this.health--;
      return false;
    }
  }

  isSunk() {
    return this.health === 0;
  }
}
