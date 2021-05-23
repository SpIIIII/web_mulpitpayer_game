const express = require("express");
const app = express();
// var server = require("http").Server(app)

let connectedPlayerId = 0;
const connectedPlayers = {};
const connections = {};
class ConnectedPlayer {
  constructor(id) {
    this.id = id;
    this.playerX = 250;
    this.playerY = 250;
    this.playerName = "P" + id;
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

app.use(express.static(__dirname + "/src/client"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/src/client/index.html");
});

var server = app.listen(process.env.PORT || 8082, () => {
  var adress = server.address();
  console.log("Server running at adress %s", adress);
});

// listen for reqs :)
var io = require("socket.io")(server);
io.on("connection", (connection) => {
  connections[connectedPlayerId] = connection;
  const connectedPlayer = new ConnectedPlayer(connectedPlayerId);
  connectedPlayers[connectedPlayerId] = connectedPlayer;
  connectedPlayerId++;

  connection.on("keyPressed", (data) => {
    if (data.inputId === "right") connectedPlayer.moveRigth = data.state;
    if (data.inputId === "left") connectedPlayer.moveLeft = data.state;
    if (data.inputId === "up") connectedPlayer.moveUp = data.state;
    if (data.inputId === "down") connectedPlayer.moveDown = data.state;
  });

  connection.on("disconnect", () => {
    console.log("someone leave");
    delete connections[connectedPlayerId];
    delete connectedPlayers[connectedPlayerId];
    connectedPlayerId--;
  });

  // connection.on("leave", (data) => {
  //   console.log("someone leave");
  // });
});

setInterval(() => {
  const entities = [];
  for (let id in connections) {
    connectedPlayers[id].update();
    entities.push(connectedPlayers[id]);
  }
  for (let id in connections) {
    connections[id].emit("update", entities);
  }
}, 1000 / 25);
