class Map {
  constructor() {
    this.height = 128;
    this.widht = 128;
    this.tiles = new Array(this.height * this.widht).fill(0);
  }
}

module.exports = Map;
