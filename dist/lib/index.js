(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "http", "events"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const http = require("http");
    const Events = require("events");
    class tsKoa extends Events {
        constructor(parameters) {
            super();
            this.onionRings = function () {
                let middleware = this.middleware;
                return function (ctx) {
                    let index = 0;
                    async function theNext(deep) {
                        let fn = middleware[deep];
                        fn ? await fn(ctx, theNext.bind(null, ++index)) : "";
                    }
                    return theNext(index);
                };
            };
            this.middleware = [];
        }
        callback() {
            let entrance = this.onionRings();
            return async (req, res) => {
                try {
                    let ctx = {
                        req,
                        res,
                        app: this
                    };
                    entrance(ctx);
                }
                catch (error) {
                    console.error(error);
                }
            };
        }
        listen(...args) {
            this.server = http.createServer(this.callback());
            return this.server.listen(...args);
        }
        use(fn) {
            this.middleware.push(fn);
            return this.use.bind(this);
        }
    }
    exports.default = tsKoa;
});
//# sourceMappingURL=index.js.map