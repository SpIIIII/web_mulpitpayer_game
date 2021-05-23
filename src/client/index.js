var socket = io();
var ctx = document.getElementById("gameMap").getContext("2d");
// ctx.fillText("P", 490, 490);

socket.on("update", (entities) => {
  ctx.clearRect(0, 0, 500, 500);
  entities.forEach((entity) => {
    ctx.fillText(entity.playerName, entity.playerX, entity.playerY);
  });
});

document.onkeydown = (event) => {
  if (event.keyCode === 68)
    socket.emit("keyPressed", { inputId: "right", state: true });
  if (event.keyCode === 83)
    socket.emit("keyPressed", { inputId: "down", state: true });
  if (event.keyCode === 65)
    socket.emit("keyPressed", { inputId: "left", state: true });
  if (event.keyCode === 87)
    socket.emit("keyPressed", { inputId: "up", state: true });
};
document.onkeyup = (event) => {
  if (event.keyCode === 68)
    socket.emit("keyPressed", { inputId: "right", state: false });
  if (event.keyCode === 83)
    socket.emit("keyPressed", { inputId: "down", state: false });
  if (event.keyCode === 65)
    socket.emit("keyPressed", { inputId: "left", state: false });
  if (event.keyCode === 87)
    socket.emit("keyPressed", { inputId: "up", state: false });
};

// window.addEventListener("beforeunload", (event) => {});
