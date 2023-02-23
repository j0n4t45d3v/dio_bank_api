import { Request, Response } from 'express';
import { UserService } from '../service/UserService';

export class UserController {
  public userService: UserService;

  constructor(userService: UserService = new UserService()) {
    this.userService = userService;
  }

  public getUser(req: Request, res: Response): Response {
    return res.status(200);
  }

  public createUser(req: Request, res: Response): Response {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Todos os campos são obrigatorio' });
    }

    const user: UserService = this.userService;
    user.createUser(name, email, password);
    return res.status(201).json({ message: 'User created' });
  }

  public deleteUser(req: Request, res: Response): Response {
    /* const { id } = req.params;

     for (const i of this.userService.getUser()) {
     if (i.name === id) {
        this.userService.deleteUser(id);
      }
    } */
    return res.status(200).json({ message: 'Usuario deletado' });
  }
}
