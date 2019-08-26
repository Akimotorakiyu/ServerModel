import * as  http from "http";
import * as  Events from "events";

interface Context {
    req: http.IncomingMessage,
    res: http.ServerResponse,
    app: tsKoa
}

type Middleware = (ctx: Context) => void

class tsKoa extends Events {
    constructor(parameters: { port: string }) {
        super()
    }

    callback() {
        return (req, res) => {
            res.end("hello world!")
        }
    }

    server: http.Server;

    middleware: Middleware[] = [];

    listen(...args) {
        this.server = http.createServer(this.callback())
        // 返回server以支持链式调用
        return this.server.listen(...args)
    }

    use(fn: (ctx: Middleware) => void) {
        this.middleware.push()
        // 返回use以支持链式调用
        return this.use.bind(this)
    }
}

export default tsKoa