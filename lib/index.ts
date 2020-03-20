import * as http from "http";
import * as Events from "events";
import onionRings from "./onionRings";
interface Context {
  req: http.IncomingMessage;
  res: http.ServerResponse;
  app: tsKoa;
}

export type Middleware = (ctx: Context, next: () => void) => Promise<void>;

export default class tsKoa extends Events {
  constructor(options?: any) {
    super();
  }

  private middleware: Middleware[] = [];

  use(fn: Middleware) {
    this.middleware.push(fn);
    return this;
  }

  private entrance = onionRings(this.middleware);

  callback = async (req: http.IncomingMessage, res: http.ServerResponse) => {
    try {
      let ctx = {
        req,
        res,
        app: this
      };
      await this.entrance(ctx);
    } catch (error) {
      console.error(error);
    } finally {
      res.end();
    }
  };

  createServer() {
    return http.createServer(this.callback);
  }
}
