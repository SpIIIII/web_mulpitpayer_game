const map_ = require("./map");
const camera = require("./camera");

class Game {
  constructor() {
    this.Map_ = new map_();
    const Camera = new camera();
    this.entities = {};
    this.players = {};
  }

  addEntity(entity) {
    this.entities[entity.id] = entity;
  }
  addPlayer(player) {
    this.players[player.id] = player;
  }

  removeEntity(id) {
    delete this.entities[id];
  }
  removePlayer(id) {
    delete this.players[id];
  }

  getListEntities() {
    return Object.values(this.entities);
  }

  update() {
    for (let id in this.entities) {
      this.entities[id].update();
    }
    for (let id in this.players) {
      this.players[id].update();
    }
  }
  getEntities() {
    return this.entities;
  }

  getMap() {
    return this.Map_;
  }
}

module.exports = Game;
