import onionRings from "./onionRings";

import { Middleware, Context } from "./index";
import { URL } from "url";

type Method = "get" | "post";

export default class Router {
  private routesMap = new Map<
    Method,
    Map<string, (ctx: Context) => Promise<void>>
  >();

  routes: Middleware = async (ctx, next) => {
    const urlInfo = new URL("https://www.localhost.com" + ctx.req.url);

    const pathnameArray = urlInfo.pathname.split("/");
    console.log(urlInfo.pathname, pathnameArray);
    if (this.routesMap.has(ctx.req.method.toLowerCase() as Method)) {
      console.log(this.routesMap);
      const methodRoutesMap = this.routesMap.get(
        ctx.req.method.toLowerCase() as Method
      );
      console.log(ctx.req.method, methodRoutesMap);
      if (methodRoutesMap && methodRoutesMap.has(pathnameArray[1])) {
        const entrance = methodRoutesMap.get(pathnameArray[1]);
        await entrance(ctx);
      }
    }
    await next();
  };

  use(method: Method, pathSnipt: string, routes: Middleware[]) {
    if (!this.routesMap.has(method)) {
      this.routesMap.set(method, new Map());
    }
    const methodRoutesMap = this.routesMap.get(method);

    methodRoutesMap.set(pathSnipt, onionRings(routes));
  }
}
