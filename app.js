import express from "express";
import bodyParser from "body-parser";
import { blockersRoute, usersRoute } from "./routes";
import { configs } from "./configs";

const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(`${configs.apiPrefix}/blockers`, blockersRoute);
server.use(`${configs.apiPrefix}/users`, usersRoute);

export default server;
