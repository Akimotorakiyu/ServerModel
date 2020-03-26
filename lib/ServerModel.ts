import * as Events from "events";

import onionRings, { Middleware } from "./onionRings";
import { BaseContext } from "./Router";

export interface ServerModelContext<T> extends BaseContext {
  app: T;
}

export default abstract class ServerModel<
  T,
  C extends ServerModelContext<T>
> extends Events {
  private middleware: Middleware<C>[] = [];

  use(fn: Middleware<C>) {
    this.middleware.push(fn);
    return this;
  }

  private entrance = onionRings(this.middleware);

  callback = async (ctx: C) => {
    try {
      await this.entrance(ctx);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };
}
