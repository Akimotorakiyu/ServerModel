import onionRings, { Middleware } from "./onionRings";

export interface BaseContext {
  path?: string;
  method?:string;
}

type Path = string|number|symbol

export default class Router<T extends BaseContext> {
  private routesMap = new Map<Path, (ctx: T) => Promise<void>>();

  routes: Middleware<T> = async (ctx: T, next) => {
    const entrance = this.routesMap.get(ctx.path);
    if (entrance) {
      await entrance(ctx);
    }
    await next();
  };

  use(type: Path, routes: Middleware<T>[]) {
    this.routesMap.set(type, onionRings(routes));
  }
}
