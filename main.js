const connectedPlayer = require("./src/server/connectedPlayer");
const game = require("./src/server/game");
const express = require("express");
const app = express();
const connections = {};
const Game = new game()

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
  const ConnectedPlayer = new connectedPlayer(connection);
  Game.addEntity(ConnectedPlayer);
  connection.emit("init", Game.getMap())

  connection.on("disconnect", () => {
    delete connections[connection.id];
    Game.removeEntity(connection.id);
    delete ConnectedPlayer;
  });

});



setInterval(() => {
  Game.update()
  for (let id in connections) {
    connections[id].emit("update", Game.listEntities());
  }
}, 25);

