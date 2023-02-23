import { UserService } from './UserService';

jest.mock('../repositories/UserRespository');
jest.mock('../database/data-source', () => {
  initialize: jest.fn();
});

const mockUserRepository = require('../repositories/UserRespository');

describe('UserService', () => {
  const userService = new UserService(mockUserRepository);
  it('Deve adicionar um novo usuario', async () => {
    mockUserRepository.createUser = jest.fn().mockImplementation(() =>
      Promise.resolve({
        id: '1',
        name: 'Jonatas',
        email: 'jonatas@test.com',
      })
    );
    const response = await userService.createUser(
      'Jonatas',
      'jonatas@test.com',
      'password'
    );

    expect(mockUserRepository.createUser).toHaveBeenCalled();
    expect(response).toMatchObject({
      id: '1',
      name: 'Jonatas',
      email: 'jonatas@test.com',
    });
  });
});
