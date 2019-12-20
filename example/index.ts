import tsKoa from "../lib/index";
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