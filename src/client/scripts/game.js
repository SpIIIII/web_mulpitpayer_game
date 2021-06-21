class Game {
  constructor(params) {
    this.Map_ = new Map_();
    this.textures = params.textures;
    this.Camera = new Camera({ app: params.app, textures: this.textures });
    this.controller = new Controller({
      control_container: params.control_container,
      socket: params.socket,
      joystick_texture: this.textures.joystick_texture,
    });
    this.socket = params.socket;
    this.entities = {};
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
    this.Camera.draw({ entities: this.entities, map: this.map_ });
  }
}
