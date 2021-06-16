class Map_ {
  constructor() {
    this.height = 32;
    this.width = 32;
    this.tiles = new Array(this.height * this.width).fill(0);
  }
  getMap() {
    return this.tiles;
  }
}

module.exports = Map_;
