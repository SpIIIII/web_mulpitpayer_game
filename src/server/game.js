const map_ = require("./map");
const camera = require("./camera");

class Game {
  constructor() {
    const Map_ = new map_();
    const Camera = new camera();
    this.entities = {};
  }

  listEntities() {
    return Object.values(this.entities);
  }

  update() {
    for (let id in this.entities) {
      this.entities[id].update();
    }
  }
}

module.exports = Game;
