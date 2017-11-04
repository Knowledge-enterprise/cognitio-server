import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import logger from 'winston';
import compression from 'compression';
import { blockersRoute, usersRoute } from './routes';
import { Response } from './utils';
import { configs } from './configs';
import { subscribeHandlers } from './events';

const PORT = process.env.PORT || 5001;
const server = express();

server.use(compression());
server.use(cors({
  origin: '*',
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204
}));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(morgan('combined'));
server.use(`${configs.apiPrefix}/blockers`, blockersRoute);
server.use(`${configs.apiPrefix}/users`, usersRoute);
server.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

server.get('*', (req, res) => {
  Response.success(res, 'Cognitio | Knowledge Enterprise | Built for Devs. by Devs.')
});

server.listen(PORT, () =>
  logger.info(`Cognitio API server started on PORT ${PORT}`.green));

subscribeHandlers();

export default server;
