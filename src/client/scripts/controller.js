class Controller {
  constructor(params) {
    this.control_container = params.control_container;
    this.controller = this.control_container.getChildByName("control");
    this.socket = params.socket;
    this.joystick_texture = params.joystick_texture;
    this.x_curent = 0;
    this.y_curent = 0;
    this.x_origin = 0;
    this.y_origin = 0;
    this.activatio_distnce = 50;
    this.controller.on("touchstart", (e) => {
      console.log(this.joystick_texture);
      const joystick = new PIXI.Sprite.from(this.joystick_texture);

      this.x_origin = e.data.global.x;
      this.y_origin = e.data.global.y;
      joystick.x = this.x_origin;
      joystick.y = this.y_origin;
      this.control_container.addChild(joystick);
    });
    this.controller.on("touchend", (e) => {
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
