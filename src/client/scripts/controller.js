class Controller {
  constructor(game) {
    this.control_container = game.control_container;
    this.controller = this.control_container.getChildByName("control");
    this.socket = game.socket;
    this.joystick_texture = game.joystick_texture;
    this.x_curent = 0;
    this.y_curent = 0;
    this.x_origin = 0;
    this.y_origin = 0;
    this.activatio_distnce = 40;
    this.controller.on("touchstart", (e) => {
      this.joystick = new PIXI.Sprite.from(game.textures.joystick_texture);
      this.joystick.name = "joystick";
      this.x_origin = e.data.global.x;
      this.y_origin = e.data.global.y;
      this.joystick.x = this.x_origin - 150;
      this.joystick.y = this.y_origin - 100;
      this.control_container.addChild(this.joystick);
    });
    this.controller.on("touchend", (e) => {
      this.control_container.removeChild(this.joystick);
      this.socket.emit("keyPressed", { inputId: "all_stop" });
    });
    this.controller.on("touchmove", (e) => {
      this.emmitMovement(e);
    });
  }
  emmitMovement(e) {
    let x = e.data.global.x - this.x_origin;
    let y = e.data.global.y - this.y_origin;
    if (
      Math.pow(x, 2) + Math.pow(y, 2) >=
      Math.pow(this.activatio_distnce, 2)
    ) {
      if (x > Math.abs(y)) {
        this.socket.emit("keyPressed", { inputId: "left", state: false });
        this.socket.emit("keyPressed", { inputId: "right", state: true });
      }
      if (x < -Math.abs(y)) {
        this.socket.emit("keyPressed", { inputId: "right", state: false });
        this.socket.emit("keyPressed", { inputId: "left", state: true });
      }
      if (y > Math.abs(x)) {
        this.socket.emit("keyPressed", { inputId: "up", state: false });
        this.socket.emit("keyPressed", { inputId: "down", state: true });
      }
      if (y < -Math.abs(x)) {
        this.socket.emit("keyPressed", { inputId: "down", state: false });
        this.socket.emit("keyPressed", { inputId: "up", state: true });
      }
    } else {
      this.socket.emit("keyPressed", { inputId: "all_stop" });
    }
  }
}
