import * as  http from "http";
import * as  Events from "events";
import compose from "./tools/compose"
interface Context {
    req: http.IncomingMessage,
    res: http.ServerResponse,
    app: tsKoa
}

type Middleware = (ctx: Context, next: () => void) => Promise<void>;

class tsKoa extends Events {
    constructor(parameters: { port: string }) {
        super()
    }

    callback() {
        let entrance = compose(this.middleware);

        return async (req, res) => {
            try {
                let ctx = {
                    req,
                    res,
                    app: this
                }

                entrance(ctx);
            } catch (error) {

                console.error(error)

            }
            // res.end("hello world!")
        }
    }

    server: http.Server;

    middleware: Middleware[] = [];

    listen(...args) {
        this.server = http.createServer(this.callback())
        // 返回server以支持链式调用
        return this.server.listen(...args)
    }

    use(fn: Middleware) {
        this.middleware.push(fn)
        // 返回use以支持链式调用
        return this.use.bind(this)
    }
}

export default tsKoa