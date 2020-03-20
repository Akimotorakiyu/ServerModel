import TsKoa, { Context } from "../lib/index";
import Router from "../lib/router";

const app = new TsKoa();

const router = new Router();

async function admin(ctx: Context, next: () => Promise<void>) {
  console.log("login")
  ctx.res.write("login success");
}

router.use("get", "login", [admin]);

import * as IO from "socket.io";

app.use(async (ctx, next) => {
  ctx.res.setHeader("Access-Control-Allow-Origin", "*");
  console.log(ctx.req.url);
  ctx.res.write("hello world! 1");
  ctx.req.on("data", data => {
    console.log(data);
  });
  next();
});

app.use(router.routes)

app.use(async (ctx, next) => {
  ctx.res.write("hello world! 2");

  next();
});

app.use(router.routes)

const server = app.createServer();

const io = IO(server);

server.listen("9000", () => {
  console.log("tsKoa serveing...");
});

io.on("connection", function(socket) {
  console.log("a user connected");
  socket.on("connect", function() {
    console.log("user disconnected");
    socket.emit("message", "welcome!");
  });
  socket.on("message", data => {
    socket.broadcast.send(data);
  });
  socket.on("disconnect", function() {
    console.log("user disconnected");
  });
});
