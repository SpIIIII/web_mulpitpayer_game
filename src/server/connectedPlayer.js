class ConnectedPlayer {
  constructor(connection) {
    this.id = connection.id;
    this.playerX = 0;
    this.playerY = 0;
    this.playerName = "P" + this.id.slice(0, 2);
    this.moveRigth = false;
    this.moveLeft = false;
    this.moveUp = false;
    this.moveDown = false;
    this.speed = 2.5;
    this.speedScale = 1;

    connection.on("keyPressed", (data) => {
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
      this.speedScale = 0.7;
    else this.speedScale = 1;
    if (this.moveRigth) this.playerX += this.speed * this.speedScale;
    if (this.moveLeft) this.playerX -= this.speed * this.speedScale;
    if (this.moveUp) this.playerY -= this.speed * this.speedScale;
    if (this.moveDown) this.playerY += this.speed * this.speedScale;
  }
}

module.exports = ConnectedPlayer;
