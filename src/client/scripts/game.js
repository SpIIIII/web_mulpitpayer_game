class Game {
  constructor(params) {
    this.socket = params.socket;
    this.app = params.app;
    this.textures = params.textures;
    this.control_container = params.control_container;
    this.entities = {};
    this.Map_ = new Map_(this);
    this.Camera = new Camera(this);
    this.controller = new Controller(this);
    this.socket = params.socket;
  }

  init() {
    this.Camera.init();
  }

  setMat(Map_) {
    this.Map_.setMap(Map_);
    this.Camera.setMap(this.Map_);
  }

  setEntities(entities) {
    entities.forEach((entity) => {
      this.entities[entity.id] = entity;
      if (this.entities[entity.id].type === "player") {
        this.entities[entity.id].sprite = new PIXI.Sprite.from(
          this.textures.char_texture
        );
      }
    });
  }

  setID(id) {
    this.ID = id;
  }

  disconnectPlayer(id) {
    this.Camera.removeSprite(id);
    delete this.entities[id];
  }

  update() {
    this.Camera.draw();
  }
}
