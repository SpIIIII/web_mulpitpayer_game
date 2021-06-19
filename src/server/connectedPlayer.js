const entity = require("./entity");
class ConnectedPlayer {
  constructor(connection) {
    this.Entity = new entity();
    this.Entity.id = connection.id;
    this.Entity.type = "player";
    this.Entity.location_X = 0;
    this.Entity.location_Y = 0;
    this.Entity.Name = "P" + this.Entity.id.slice(0, 3);
    this.id = connection.id;
    this.moveRigth = false;
    this.moveLeft = false;
    this.moveUp = false;
    this.moveDown = false;
    this.Entity.speed = 2.5;
    this.Entity.speedScale = 1;

    connection.on("keyPressed", (data) => {
      // console.log(this.Entity.Name, this.Entity.location_X);
      if (data.inputId === "right") this.moveRigth = data.state;
      if (data.inputId === "left") this.moveLeft = data.state;
      if (data.inputId === "up") this.moveUp = data.state;
      if (data.inputId === "down") this.moveDown = data.state;
      if (data.inputId === "all_stop") {
        this.moveRigth = false;
        this.moveLeft = false;
        this.moveUp = false;
        this.moveDown = false;
      }
      if (data.inputId === "x_stop") {
        this.moveRigth = false;
        this.moveLeft = false;
      }
      if (data.inputId === "y_stop") {
        this.moveUp = false;
        this.moveDown = false;
      }
    });
  }

  update() {
    this.updateMove();
  }
  updateMove() {
    if (this.moveRigth + this.moveLeft + this.moveDown + this.moveUp > 1)
      this.Entity.speedScale = 0.7;
    else this.Entity.speedScale = 1;
    if (this.moveRigth) {
      this.Entity.location_X += this.Entity.speed * this.Entity.speedScale;
    }

    if (this.moveLeft)
      this.Entity.location_X -= this.Entity.speed * this.Entity.speedScale;
    if (this.moveUp)
      this.Entity.location_Y -= this.Entity.speed * this.Entity.speedScale;
    if (this.moveDown)
      this.Entity.location_Y += this.Entity.speed * this.Entity.speedScale;
  }
  getEntity() {
    return this.Entity;
  }
}

module.exports = ConnectedPlayer;
