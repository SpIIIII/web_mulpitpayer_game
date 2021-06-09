class Game {
  constructor(params) {
    this.Map_ = new Map_();
    this.Camera = new Camera({ app: params.app, textures: params.textures });
    // this.Camera = params.camera;
    // this.map_ = params.map_;
    this.entities = {};
    // this.Camera.drawMap(this.map_);
  }

  setMat(Map_) {
    this.Map_.setMap(Map_);
    this.Camera.setMap(this.Map_);
  }

  setEntities(entities) {
    entities.forEach((entity) => {
      this.entities[entity.id] = entity;
    });
  }

  init() {
    this.Camera.init();
  }

  update() {
    this.Camera.draw({ entities: this.entities, map: this.map_ });
  }
}
