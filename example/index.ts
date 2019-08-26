import tsKoa from "../lib/index"

const app = new tsKoa({ port: "8080" });

app.use(async (ctx, next) => {
    console.log("get into 1")
    ctx.res.write("hello world! 1")

    next()
})

app.use(async (ctx, next) => {
    console.log("get into 2")
    ctx.res.end("hello world! 2")
})

app.listen("666", () => {
    console.log("tsKoa serveing...")
})