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
        }
    }

    server: http.Server;

    middleware: Middleware[] = [];

    listen(...args) {
        this.server = http.createServer(this.callback())
        return this.server.listen(...args)
    }

    use(fn: Middleware) {
        this.middleware.push(fn)
        return this.use.bind(this)
    }
}

export default tsKoa