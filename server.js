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
import spdy from 'spdy';
import fs from 'fs';
import HE from 'he-sdk-nodejs';

const PORT = process.env.PORT || 5001;
const server = express();
const sslOptions = {
  key: fs.readFileSync(__dirname + '/server.key'),
  cert:  fs.readFileSync(__dirname + '/server.crt'),
  spdy: {
    protocols: ['h2', 'spdy/3.1', 'http/1.1'],
    plain: false,
  }
};

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

server.post('/compile', (req, res) => {
  const source = `import sys;print(sys.path)`;
  const settings = {
    'client_secret': '664e9b3a4dcc4810e8c8a1b262a1e11a5bd94056' ,
    'async': 0 ,
    'lang': 'PYTHON' ,
    'time_limit': 5,
    'memory_limit': 262144
  };

  HE.run(settings , source , function(err , result){
    if (err) return Response.badRequest(res, err);
    Response.success(res, JSON.parse(result));
  });
});

server.get('*', (req, res) => {
  Response.success(res, 'Cognitio | Knowledge Enterprise | Built for Devs. by Devs.')
});

if (process.env.NODE_ENV === 'production') {
  server.listen(PORT, () =>
      logger.info(`Cognitio API server started on PORT ${PORT}`.green));
} else {
  spdy.createServer(sslOptions, server)
  .listen(PORT, () =>
    logger.info(`Cognitio API server started on PORT ${PORT}`.green));
}

subscribeHandlers();

export default server;
