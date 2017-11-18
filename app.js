import express from "express";
import bodyParser from "body-parser";
import { blockersRoute, usersRoute } from "./routes";
import cors from "cors";
import morgan from "morgan";
import compression from "compression";
import { configs } from "./configs";

const server = express();

server.use(compression());
server.use(
  cors({
    origin: "*",
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
  })
);

server.use(morgan("combined"));

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(`${configs.apiPrefix}/blockers`, blockersRoute);
server.use(`${configs.apiPrefix}/users`, usersRoute);

export default server;
