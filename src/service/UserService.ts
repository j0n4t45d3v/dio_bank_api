import { AppDataSource } from '../database/data-source';
import { User } from '../entities/User';
import { UserRepository } from '../repositories/UserRespository';

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository = new UserRepository(AppDataSource.manager)) {
    this.userRepository = userRepository;
  }

  public createUser(
    name: string,
    email: string,
    password: string
  ): Promise<User> {
    const user = new User(name, email, password);
    return this.userRepository.createUser(user);
  }

  public deleteUser(id: string): void {}

  public getUser(): void{}
}
