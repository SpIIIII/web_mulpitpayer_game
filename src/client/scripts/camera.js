class Camera {
  constructor(params) {
    this.textures = params.textures;
    this.app = params.app;
    this.sprites = {};
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
    console.log(Object.keys(this.sprites).length);
    for (let key in params.entities) {
      if (Object.keys(this.sprites).includes(key)) {
        this.sprites[key].x = params.entities[key].location_X;
        this.sprites[key].y = params.entities[key].location_Y;
      } else {
        this.sprites[key] = params.entities[key].sprite;
        this.app.stage.addChild(this.sprites[key]);
      }
      // if (!Object.keys(params.entities).includes(key)) {
      //   this.app.stage.removeChild(this.sprites[key]);
      //   delete this.sprites[key];
      // }
    }
  }
}
