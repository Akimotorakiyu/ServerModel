import * as  http from "http";
import * as  Events from "events";
import { listenerCount } from "cluster";

class tsKoa extends Events {
    constructor(parameters: { port: string }) {
        super()
    }

    callback() {
        return (req, res) => {
            res.end("hello world!")
        }
    }

    server: http.Server;

    middleware = [];

    context:{};
    request:{};
    response:{};

    listen(...args) {
        this.server = http.createServer(this.callback())
        return this.server.listen(...args)
    }
}

export default tsKoa