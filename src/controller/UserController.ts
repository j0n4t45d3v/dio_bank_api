import { Request, Response } from 'express';
import { UserService } from '../service/UserService';

export class UserController {
  public userService: UserService;

  constructor(userService: UserService = new UserService()) {
    this.userService = userService;
  }

  public getAllUser(req: Request, res: Response): Response {
    const users: UserService = this.userService;
    return res.status(200).json(users.getUsers());
  }

  public createUser(req: Request, res: Response): Response {
    const { name, email } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Nome obrigatorio' });
    }

    if (!email) {
      return res.status(400).json({ message: 'Email obrigatorio' });
    }

    const user: UserService = this.userService;
    user.createUser(name, email);
    return res.status(201).json({ message: 'User created' });
  }

  public deleteUser(req: Request, res: Response): Response {
    const { id } = req.params;

    for (const i of this.userService.getUsers()) {
      if (i.name === id) {
        this.userService.deleteUser(id);
      }
    }
    return res.status(200).json({ message: 'Usuario deletado' });
  }
}
