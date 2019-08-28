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

    createServer() {
        const entrance = this.onionRings();

        return http.createServer(async (req: http.IncomingMessage, res: http.ServerResponse) => {
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
        })
    }

    private callback() {
        return
    }

    private middleware: Middleware[] = [];

    use(fn: Middleware) {
        this.middleware.push(fn)
        return this.use.bind(this)
    }

    private onionRings() {
        const middleware = this.middleware;

        return (ctx: Context) => {
            let index = 0;

            async function theNext(deep: number) {
                const fn = middleware[deep];
                fn ? await fn(ctx, theNext.bind(null, ++index)) : "";
            }

            return theNext(index);
        }
    }
}

export default tsKoa
