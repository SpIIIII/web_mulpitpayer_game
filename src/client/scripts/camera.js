class Camera {
  constructor(params) {
    this.textures = params.textures;
    this.app = params.app;
    this.entities = {};
  }

  cart_to_isom = (xy) => {
    const x_i = xy[1] - xy[0];
    const y_i = (xy[1] + xy[0]) * 0.5;
    return [x_i, y_i];
  };
  isom_to_cart = (xy) => {
    const x_c = (2 * xy[1] - xy[0]) * 0.5;
    const y_c = (2 * xy[1] + xy[0]) * 0.5;
    return [x_c, y_c];
  };

  setMap(Map_) {
    let tile_width = 16;
    const tile_height = 16;
    for (let row = 0; row < Map_.height; row++) {
      for (let col = 0; col < Map_.width; col++) {
        let tile;
        if (Map_.tiles[row][col] === 0) {
          tile = new PIXI.Sprite.from(this.textures.grass_texture);
        } else {
          tile = new PIXI.Sprite.from(this.textures.asphalt_texture);
        }
        this.app.stage.addChild(tile);
        const xy = this.cart_to_isom([row, col]);
        tile.x = xy[0] * tile_width + (Map_.width - 3) * tile_width;
        tile.y = xy[1] * tile_height;
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
