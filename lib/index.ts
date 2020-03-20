import * as http from "http";
import * as Events from "events";
import onionRings from "./onionRings";
interface Context {
  req: http.IncomingMessage;
  res: http.ServerResponse;
  app: tsKoa;
}

type Middleware = (ctx: Context, next: () => void) => Promise<void>;

class tsKoa extends Events {
  constructor(options?: any) {
    super();
  }

  createServer() {
    const entrance = onionRings(this.middleware);

    return http.createServer(
      async (req: http.IncomingMessage, res: http.ServerResponse) => {
        try {
          let ctx = {
            req,
            res,
            app: this
          };
          await entrance(ctx);
        } catch (error) {
          console.error(error);
        } finally {
          res.end();
        }
      }
    );
  }

  private middleware: Middleware[] = [];

  use(fn: Middleware) {
    this.middleware.push(fn);
    return this;
  }
}

export default tsKoa;
