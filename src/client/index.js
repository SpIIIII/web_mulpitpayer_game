var socket = io();

var mobile = navigator.userAgent.toLowerCase().match(/mobile/i);
var body = document.getElementsByTagName("BODY")[0];
var windowHeigth = () => {
  return body.clientHeight;
};
var windowWidth = () => {
  return body.clientWidth;
};

var canvas = document.getElementById("gameMap");
var ctx = canvas.getContext("2d");
const cahngeHeight = () => {
  if (!mobile) {
    body.style.maxWidth = "600px";
  }
  canvas.setAttribute("width", windowWidth());
  canvas.setAttribute("height", windowHeigth() - 4);
  if (!mobile) {
    ctx.scale(1.7, 1.7);
  }
};

if (window.addEventListener) {
  window.addEventListener("resize", cahngeHeight, true);
}

cahngeHeight();

// ctx.fillText("P", 490, 490);

socket.on("update", (entities) => {
  ctx.clearRect(0, 0, 600, windowHeigth());
  entities.forEach((entity) => {
    ctx.fillText(entity.playerName, entity.playerX, entity.playerY);
  });
});

document.onkeydown = (event) => {
  if (event.keyCode === 68 || event.keyCode === 39)
    socket.emit("keyPressed", { inputId: "right", state: true });
  if (event.keyCode === 83 || event.keyCode === 40)
    socket.emit("keyPressed", { inputId: "down", state: true });
  if (event.keyCode === 65 || event.keyCode === 37)
    socket.emit("keyPressed", { inputId: "left", state: true });
  if (event.keyCode === 87 || event.keyCode === 38)
    socket.emit("keyPressed", { inputId: "up", state: true });
};
document.onkeyup = (event) => {
  if (event.keyCode === 68 || event.keyCode === 39)
    socket.emit("keyPressed", { inputId: "right", state: false });
  if (event.keyCode === 83 || event.keyCode === 40)
    socket.emit("keyPressed", { inputId: "down", state: false });
  if (event.keyCode === 65 || event.keyCode === 37)
    socket.emit("keyPressed", { inputId: "left", state: false });
  if (event.keyCode === 87 || event.keyCode === 38)
    socket.emit("keyPressed", { inputId: "up", state: false });
};

// window.addEventListener("beforeunload", (event) => {});
