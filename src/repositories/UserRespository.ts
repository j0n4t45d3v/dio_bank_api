import { EntityManager } from 'typeorm';
import { User } from '../entities/User';

export class UserRepository {
  private manager: EntityManager;

  constructor(manager: EntityManager) {
    this.manager = manager;
  }

  public async createUser(data: User): Promise<User> {
    return this.manager.save(data);
  }

  public async getUser(id: string): Promise<User | null> {
    return this.manager.findOne(User, {
      where: {
        id: id,
      },
    });
  }
}
