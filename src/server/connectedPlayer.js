class ConnectedPlayer {
  constructor(id) {
    this.id = id;
    this.playerX = 200;
    this.playerY = 100;
    this.playerName = "P" + id.slice(0, 2);
    this.moveRigth = false;
    this.moveLeft = false;
    this.moveUp = false;
    this.moveDown = false;
    this.speed = 10;
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
