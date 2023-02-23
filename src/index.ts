import express from 'express';
import 'reflect-metadata';
import { AppDataSource } from './database/data-source';
import { routes } from './routes';

const server = express();



server.use(express.json());
const route = routes;

server.use(route);

server.listen(3000, () => {
  console.log('Server rodando ...');
});
