import express from "express";
import bodyParser from "body-parser";
import logger from "winston";
import { Response } from "./utils";

import { subscribeHandlers } from "./events";
import spdy from "spdy";
import fs from "fs";
import server from "./app";

const PORT = process.env.PORT || 5001;

const sslOptions = {
  key: fs.readFileSync(__dirname + "/server.key"),
  cert: fs.readFileSync(__dirname + "/server.crt"),
  spdy: {
    protocols: ["h2", "spdy/3.1", "http/1.1"],
    plain: false
  }
};

server.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

server.get("*", (req, res) => {
  Response.success(
    res,
    "Cognitio | Knowledge Enterprise | Built for Devs. by Devs."
  );
});

if (process.env.NODE_ENV === "production") {
  server.listen(PORT, () =>
    logger.info(`Cognitio API server started on PORT ${PORT}`.green)
  );
} else {
  spdy
    .createServer(sslOptions, server)
    .listen(PORT, () =>
      logger.info(`Cognitio API server started on PORT ${PORT}`.green)
    );
}

subscribeHandlers();

export default server;
