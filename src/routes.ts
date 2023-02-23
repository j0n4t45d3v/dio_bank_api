import { Router } from 'express';
import { UserController } from './controller/UserController';
import { UserService } from './service/UserService';

export const routes = Router();
const user = new UserController(new UserService());

// rota principal
routes.get('/', () => {});

// rota de usuario
routes.get('/users', user.getAllUser);
routes.post('/users', user.createUser);
