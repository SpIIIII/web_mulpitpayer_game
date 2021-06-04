var socket = io();

var mobile = navigator.userAgent.toLowerCase().match(/mobile/i);
var body = document.getElementsByTagName("BODY")[0];
var canvas = document.getElementById("gameMap");
// var ctx = canvas.getContext("2d");
var height = window.innerHeight - 4;
var width = 600;
// var windowHeigth = () => {
//   return body.clientHeight - 4;
// };
// var windowWidth = () => {
//   return body.clientWidth;
// };
// const cahngeHeight = () => {
//   if (!mobile) {
//     body.style.maxWidth = "600px";
//   }
//   canvas.setAttribute("width", windowWidth());
//   canvas.setAttribute("height", windowHeigth() - 4);
//   if (!mobile) {
//     ctx.scale(1.7, 1.7);
//   }
// };
const app = new PIXI.Application({
  view: canvas,
  width: 600,
  height: height,
  resolution: window.devicePixelRatio,
  autoDensity: true,
});

if (window.addEventListener) {
  window.addEventListener(
    "resize",
    () => {
      height = window.innerHeight - 4;
      app.renderer.resize(width, height);
    },
    true
  );
}
// cahngeHeight();

// document.body.appendChild(app.view);

// app.loader.add("player", "./static/grass.png");
// app.loader.load((loader, resources) => {
cashedEntities = {};
const gameLoop = () => {
  for (key in entities) {
    if (Object.keys(cashedEntities).includes(key)) {
      cashedEntities[key].x = entities[key].playerX;
      cashedEntities[key].y = entities[key].playerY;
    } else {
      cashedEntities[key] = new PIXI.Sprite.from("./static/grass.png");
      app.stage.addChild(cashedEntities[key]);
    }
  }
};
app.ticker.add(gameLoop);
// });
const entities = {};

socket.on("update", (entities_) => {
  entities_.forEach((entity) => {
    entities[entity.id] = entity;
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

app.loader.onError.add((error) => console.error(error));

// window.addEventListener("beforeunload", (event) => {});
