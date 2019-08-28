import * as  http from "http";
import * as  Events from "events";

interface Context {
    req: http.IncomingMessage,
    res: http.ServerResponse,
    app: tsKoa
}

type Middleware = (ctx: Context, next: () => void) => Promise<void>;

class tsKoa extends Events {

    constructor(options?: any) {
        super()
    }

    private callback() {
        let entrance = this.onionRings();

        return async (req: http.IncomingMessage, res: http.ServerResponse) => {
            try {
                let ctx = {
                    req,
                    res,
                    app: this
                }
                await entrance(ctx);
            } catch (error) {
                console.error(error)
            } finally {
                res.end();
            }
        }
    }

    private onionRings() {
        let middleware = this.middleware;

        return (ctx: Context) => {
            let index = 0;

            async function theNext(deep: number) {
                let fn = middleware[deep];
                fn ? await fn(ctx, theNext.bind(null, ++index)) : "";
            }

            return theNext(index);
        }
    }

    private middleware: Middleware[] = [];

    listen(...args) {
        return http.createServer(this.callback()).listen(...args)
    }

    use(fn: Middleware) {
        this.middleware.push(fn)
        return this.use.bind(this)
    }
}

export default tsKoa
