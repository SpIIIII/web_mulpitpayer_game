var socket = io();
var ctx = document.getElementById("gameMap").getContext("2d");
ctx.fillText("P", 20, 20);

window.addEventListener("beforeunload", (event) => {
  console.log("it's leave");
  socket.emit("leave");
});
