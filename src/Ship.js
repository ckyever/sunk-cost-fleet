export class Ship {
  constructor(length) {
    this.length = length;
    this.health = length;
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
