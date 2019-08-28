/// <reference types="node" />
import * as http from "http";
import * as Events from "events";
interface Context {
    req: http.IncomingMessage;
    res: http.ServerResponse;
    app: tsKoa;
}
declare type Middleware = (ctx: Context, next: () => void) => Promise<void>;
declare class tsKoa extends Events {
    constructor(options?: any);
    private callback;
    private onionRings;
    private middleware;
    createServer(): http.Server;
    use(fn: Middleware): any;
}
export default tsKoa;
