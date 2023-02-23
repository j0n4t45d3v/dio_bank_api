import { IUser, UserService } from './UserService';

describe('UserService', () => {
  const mockDb: Array<IUser> = [];
  const userService = new UserService(mockDb);

  it('Deve adicionar um novo usuario', () => {
    const mockConsole = jest.spyOn(global.console, 'log');
    userService.createUser('Jonatas', 'jonatas@test.com');

    expect(mockConsole).toHaveBeenCalledWith('usuario criado');
  });
});
