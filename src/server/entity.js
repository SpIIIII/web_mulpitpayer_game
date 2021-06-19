class Entity {
  constructor() {}
  getLocation() {
    if (this.location_X) {
      return [this.locaton_X, this.location_Y];
    } else return [];
  }
  update() {}
}

module.exports = Entity;
