export class Ship {
  static #nextShipId = 1;

  constructor(length, coordinates) {
    this.length = length;
    this.health = length;
    this.id = Ship.#nextShipId;
    this.coordinates = coordinates;
    Ship.#nextShipId++;
  }

  hit() {
    if (this.isSunk()) {
      return true;
    } else {
      this.health--;
      return this.isSunk();
    }
  }

  isSunk() {
    return this.health === 0;
  }
}
