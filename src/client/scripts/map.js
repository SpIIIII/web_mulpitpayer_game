class Map_ {
  constructor(app) {
    this.app = app;
    this.tiles = [];
    this.height = 0;
    this.width = 0;
  }
  heightLightTile(params) {
    // if
  }

  setMap(map_) {
    this.height = map_.height;
    this.width = map_.width;
    this.tiles = map_.tiles;
  }

  drawMap() {
    this.tiles.forEach((tile) => {});
  }
}

class Tile {
  constructor() {
    this.entities = [];
  }
}
