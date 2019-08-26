import * as  http from "http";
import * as  Events from "events";
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
        let entrance = this.compose();

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

    compose = function () {
        let middleware = this.middleware;
        return function (ctx: any) {
            let index = 0;
            async function theNext(deep: number) {
                let fn = middleware[deep];
                fn ? await fn(ctx, theNext.bind(null, ++index)) : "";
            }
            return theNext(index);
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