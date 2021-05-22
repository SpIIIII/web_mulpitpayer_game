const express = require("express");
const app = express();
// var server = require("http").Server(app)

let connectedPlayerId = 0;
const connectedPlayers = {};
class ConnectedPlayer {
  constructor(params) {
    let playerX = 0;
    let playerY = 0;
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
  console.log("someone connected");
  connectedPlayers[connectedPlayerId] = new ConnectedPlayer(connection);
  connectedPlayerId++;

  connection.on("leave", (data) => {
    console.log("someone leave");
  });
});

setInterval(() => {}, 1000 / 25);
