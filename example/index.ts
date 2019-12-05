import tsKoa from "../lib/index";
import * as wsio from "socket.io";
const app = new tsKoa();

app.use(async (ctx, next) => {
  ctx.res.write("hello world! 1");
  ctx.req.on("data", data => {
    console.log(data);
  });
  ctx.res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

const server = app.createServer().listen("9000", () => {
  console.log("tsKoa serveing...");
});

const ws = wsio(server);

ws.on("connection", function(socket) {
  socket.on("broadcast", data => {
    socket.broadcast.send(data);
  });

  socket.on("message", data => {
    socket.send(data);
  });

  socket.on("disconnect", socket => {
    ws.emit("user disconnected");
  });
});
