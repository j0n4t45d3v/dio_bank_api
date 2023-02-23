import { EntityManager } from 'typeorm';
import { User } from '../entities/User';
import { getMockEntityManager } from '../__mocks__/mockEntityManager.mock';
import { UserRepository } from './UserRespository';

describe('UserRepository', () => {
  let userRepository: UserRepository;
  let managerMock: Partial<EntityManager>;

  const mockUser: User = {
    id: '1',
    name: 'John Doe',
    email: 'kenaa@example.com',
    password: '123456',
  };

  beforeAll(async () => {
    managerMock = await getMockEntityManager({
      saveReturn: mockUser,
    });
    userRepository = new UserRepository(managerMock as EntityManager);
  });

  it('Deve cadastrar um novo usuario no banco de dados', async () => {
    const response = await userRepository.createUser(mockUser);

    expect(managerMock.save).toHaveBeenCalled();
    expect(response).toMatchObject(mockUser);
  });
});
