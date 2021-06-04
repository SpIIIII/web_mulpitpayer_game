const map_ = require("./map");
const camera = require("./camera");

class Game {
  constructor() {
    const Map_ = new map_();
    const Camera = new camera();
    this.entities = {};
  }

  addEntity(entity) {
    this.entities[entity.id] = entity;
  }

  removeEntity(id) {
    delete this.entities[id];
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
