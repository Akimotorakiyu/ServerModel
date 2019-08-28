(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../lib/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const index_1 = require("../lib/index");
    const app = new index_1.default();
    app.use(async (ctx, next) => {
        console.log("get into 1");
        ctx.res.write("hello world! 1");
        next();
    });
    app.use(async (ctx, next) => {
        console.log("get into 2");
        ctx.res.write("hello world! 2");
        next();
    });
    app.createServer().listen("666", () => {
        console.log("tsKoa serveing...");
    });
    app.createServer().listen("777", () => {
        console.log("tsKoa serveing...");
    });
    app.use(async (ctx, next) => {
        console.log("get into 3");
        ctx.res.write("hello world! 3");
        next();
    });
    setTimeout(() => {
        app.use(async (ctx, next) => {
            console.log("get into 4");
            ctx.res.write("hello world! 4");
            next();
        });
    }, 3000);
});
//# sourceMappingURL=index.js.map