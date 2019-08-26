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
    const app = new index_1.default({ port: "8080" });
    app.use(async (ctx, next) => {
        console.log("get into 1");
        ctx.res.write("hello world! 1");
        next();
    });
    app.use(async (ctx, next) => {
        console.log("get into 2");
        ctx.res.end("hello world! 2");
    });
    app.listen("666", () => {
        console.log("tsKoa serveing...");
    });
});
//# sourceMappingURL=index.js.map