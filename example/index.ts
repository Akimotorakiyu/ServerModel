import tsKoa from "../lib/index"

const app = new tsKoa();

app.use(async (ctx, next) => {
    console.log("get into 1")
    ctx.res.write("hello world! 1")

    next()
})

app.use(async (ctx, next) => {
    console.log("get into 2")
    ctx.res.write("hello world! 2")
    next()
})

app.createServer().listen("666", () => {
    console.log("tsKoa serveing...")
})

app.createServer().listen("777", () => {
    console.log("tsKoa serveing...")
})

app.use(async (ctx, next) => {
    console.log("get into 3")
    ctx.res.write("hello world! 3")
    next()
})

setTimeout(() => {
    app.use(async (ctx, next) => {
        console.log("get into 4")
        ctx.res.write("hello world! 4")
        next()
    })
}, 3000)