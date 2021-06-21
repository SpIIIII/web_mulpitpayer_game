// import { Camera } from "./scripts";
// import Map_ from "./map";
// import math from "mathjs";

let socket = io();

let mobile = navigator.userAgent.toLowerCase().match(/mobile/i);
let body = document.getElementsByTagName("BODY")[0];
body.setAttribute("accept-charset", "utf-8");
let canvas = document.getElementById("gameMap");
let height = window.innerHeight - 4;
let width = 600;

window.onload = () => {
  const char_texture = "../static/test_char/sprite_1.png";
  const grass_texture = "../static/grass_tile.png";
  const asphalt_texture = "../static/asphalt_tile.png";
  const joystick_texture = "../static/joystick.png";
  const textures = {
    char_texture: char_texture,
    grass_texture: grass_texture,
    asphalt_texture: asphalt_texture,
    joystick_texture: joystick_texture,
  };
  const app = new PIXI.Application({
    antialias: true,
    view: canvas,
    width: 600,
    height: height,
    resolution: window.devicePixelRatio,
    autoDensity: true,
  });
  let control_container = new PIXI.Container();
  let control = new PIXI.Graphics();
  control.name = "control";
  control_container.addChild(control);
  app.stage.addChild(control_container);
  control.beginFill();
  control.drawRect(0, 200, app.view.width, app.view.height);
  control.endFill();
  control.interactive = true;

  if (!mobile) {
    app.stage.scale.set(1.69);
  }

  const game = new Game({
    app: app,
    textures: textures,
    control_container: control_container,
    socket: socket,
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

  // const cashedEntities = {};
  const gameLoop = () => {
    game.update();
  };
  app.ticker.add(gameLoop);

  socket.on("init", (params) => {
    game.setMat(params.map);
    game.setID(params.youID);
  });
  socket.on("disc", (id) => {
    game.disconnectPlayer(id);
  });

  socket.on("update", (entities_) => {
    game.setEntities(entities_);
  });
};

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

// app.loader.onError.add((error) => console.error(error));
