class Camera {
  constructor(params) {
    this.textures = params.textures;
    this.app = params.app;
    this.entities = {};
  }

  setMap(Map_) {
    let tile_width = 32;
    const tile_height = 8;
    for (let row = 0; row < Map_.height; row++) {
      for (let col = 0; col < Map_.width; col++) {
        let tile = new PIXI.Sprite.from(this.textures.grass_texture);
        this.app.stage.addChild(tile);
        tile.x = col * tile_width + 16 * (row % 2);
        tile.y = row * tile_height;
      }
    }
  }

  draw(params) {
    for (let key in params.entities) {
      if (Object.keys(this.entities).includes(key)) {
        this.entities[key].x = params.entities[key].playerX;
        this.entities[key].y = params.entities[key].playerY;
      } else {
        this.entities[key] = new PIXI.Sprite.from(this.textures.char_texture);
        this.app.stage.addChild(this.entities[key]);
      }
    }
  }
}
