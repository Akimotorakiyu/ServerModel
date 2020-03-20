import onionRings from "./onionRings";

import { Middleware } from "./index";

type Method = "get" | "post";

export default class Router {
  private routesMap = new Map<Method, Map<string, Middleware[]>>();

  constructor(parameters) {}

  routes: Middleware = async (ctx, next) => {
 
  };

  use(method: Method, pathSnipt: string, routes: Middleware[]) {
    if (!this.routesMap.has(method)) {
      this.routesMap.set(method, new Map());
    }
    const methodRoutesMap = this.routesMap.get(method);

    methodRoutesMap.set(pathSnipt, routes);
  }
}
