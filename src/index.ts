import express from 'express';
import {routes} from './routes';

const server = express();
const route = routes;

server.use(route);

server.listen(3000, () => {
  console.log('Server rodando ...');
});
