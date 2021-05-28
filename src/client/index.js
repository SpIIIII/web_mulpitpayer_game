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

app.loader.add("bunny", "./static/grass.png").load((loader, resources) => {
  // This creates a texture from a 'bunny.png' image
  const bunny = new PIXI.Sprite(resources.bunny.texture);

  // Setup the position of the bunny
  bunny.x = app.renderer.width / 2;
  bunny.y = app.renderer.height / 2;

  // Rotate around the center
  bunny.anchor.x = 0.5;
  bunny.anchor.y = 0.5;

  // Add the bunny to the scene we are building
  app.stage.addChild(bunny);

  // Listen for frame updates
  app.ticker.add(() => {
    // each frame we spin the bunny around a bit
    bunny.rotation += 0.01;
  });
});

// socket.on("update", (entities) => {
//   ctx.clearRect(0, 0, 600, windowHeigth());
//   entities.forEach((entity) => {
//     ctx.fillText(entity.playerName, entity.playerX, entity.playerY);
//   });
// });

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
