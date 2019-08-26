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
    constructor(parameters: {
        port: string;
    });
    private callback;
    private compose;
    private server;
    private middleware;
    listen(...args: any[]): http.Server;
    use(fn: Middleware): any;
}
export default tsKoa;
