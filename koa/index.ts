import * as http from "http";

import { ServerModel, ServerModelContext, router } from "../lib";

export interface Context extends ServerModelContext<tsKoa> {
  req: http.IncomingMessage;
  res: http.ServerResponse;
}

export default class tsKoa extends ServerModel<tsKoa, Context> {
  createServer() {
    return http.createServer((req, res) => {
      this.callback({
        app: this,
        req,
        res,
        path: "",
        method:""
      });
    });
  }
}
