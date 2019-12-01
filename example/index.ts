import tsKoa from "../lib/index";

const app = new tsKoa();

app.use(async (ctx, next) => {
  console.log("get into 1");
  ctx.res.write("hello world! 1");
  console.log(ctx.req.headers);

  ctx.req.on("data", data => {
    console.log(data);
  });

  next();
});

app.createServer().listen("9000", () => {
  console.log("tsKoa serveing...");
});
