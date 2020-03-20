import onionRings from "./onionRings";

import { Middleware, Context } from "./index";
import { URL } from "url";

type Method = "get" | "post";

export default class Router {
  private routesMap = new Map<
    Method,
    Map<string, (ctx: Context) => Promise<void>>
  >();

  constructor(parameters) {}

  routes: Middleware = async (ctx, next) => {
    const urlInfo = new URL(ctx.req.url);

    const pathnameArray = urlInfo.pathname.split("/");
    if (!this.routesMap.has(ctx.req.method as Method)) {
      const methodRoutesMap = this.routesMap.get(ctx.req.method as Method);

      if (methodRoutesMap.has(pathnameArray[0])) {
        const entrance = methodRoutesMap.get(pathnameArray[0]);

        await entrance(ctx);
        await next();
      }
    }
  };

  use(method: Method, pathSnipt: string, routes: Middleware[]) {
    if (!this.routesMap.has(method)) {
      this.routesMap.set(method, new Map());
    }
    const methodRoutesMap = this.routesMap.get(method);

    methodRoutesMap.set(pathSnipt, onionRings(routes));
  }
}
