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

    connection.on("keyPressed", (data) => {
      if (data.inputId === "right") this.moveRigth = data.state;
      if (data.inputId === "left") this.moveLeft = data.state;
      if (data.inputId === "up") this.moveUp = data.state;
      if (data.inputId === "down") this.moveDown = data.state;
    });
  }

  update() {
    this.updateMove();
  }
  updateMove() {
    if (this.moveRigth) this.playerX += this.speed;
    if (this.moveLeft) this.playerX -= this.speed;
    if (this.moveUp) this.playerY -= this.speed;
    if (this.moveDown) this.playerY += this.speed;
  }
}

module.exports = ConnectedPlayer;
