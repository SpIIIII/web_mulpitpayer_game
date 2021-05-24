const ConnectedPlayer = require("./src/server/connectedPlayer");
const express = require("express");
const app = express();
// var server = require("http").Server(app)

const connectedPlayers = {};
const connections = {};

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
  connections[connection.id] = connection;
  const connectedPlayer = new ConnectedPlayer(connection.id);
  connectedPlayers[connection.id] = connectedPlayer;

  connection.on("keyPressed", (data) => {
    if (data.inputId === "right") connectedPlayer.moveRigth = data.state;
    if (data.inputId === "left") connectedPlayer.moveLeft = data.state;
    if (data.inputId === "up") connectedPlayer.moveUp = data.state;
    if (data.inputId === "down") connectedPlayer.moveDown = data.state;
  });

  connection.on("disconnect", () => {
    console.log("someone leave");
    delete connections[connection.id];
    delete connectedPlayers[connection.id];
    delete connectedPlayer;
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
