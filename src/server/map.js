class Map_ {
  constructor() {
    this.height = 128;
    this.width = 128;
    this.tiles = new Array(this.height * this.width).fill(0);
  }
  getMap() {
    return this.tiles;
  }
}

module.exports = Map_;
