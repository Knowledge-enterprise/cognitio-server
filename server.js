import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import logger from 'winston';
import compression from 'compression';
import { blockersRoute, usersRoute } from './routes';
import { Response } from './utils';
import configs from './configs/config';

const PORT = process.env.PORT || 3001;
const server = express();

server.use(compression());
server.use(bodyParser.json({ limit: '10mb' }));
server.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
server.use(morgan('combined'));
server.use(`${configs.apiPrefix}/blockers`, blockersRoute);
server.use(`${configs.apiPrefix}/users`, usersRoute);

server.get('*', (req, res) => {
  Response.success(res, 'Cognitio | Knowledge Enterprise | Built for Devs. by Devs.')
});

server.listen(PORT, () =>
  logger.info(`Cognitio API server started on PORT ${PORT}`));

export default server;
