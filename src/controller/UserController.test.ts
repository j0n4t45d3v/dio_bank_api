import { Request } from 'express';
import { IUser, UserService } from '../service/UserService';
import { makeMockResponse } from '../__mocks__/mockResponse.mock';
import { UserController } from './UserController';

describe('UserController', () => {
  const mockUserService: Partial<UserService> = {
    createUser: jest.fn(),
    getUsers: jest.fn(),
    db: [
      {
        name: 'John Doe',
        email: 'kenaa@example.com',
      },
      {
        name: 'Jane Doe',
        email: 'kenaa@example.com',
      },
    ],
  };

  const db = new UserService(mockUserService.db);
  const userController = new UserController(db);

  it('Deve retornar o BadRequest do name', () => {
    const mockRequest = {
      body: {
        email: 'jonatas@gmail.com',
      },
    } as Request;

    const mockResponse = makeMockResponse();

    userController.createUser(mockRequest, mockResponse);

    expect(mockResponse.state.status).toBe(400);
    expect(mockResponse.state.json).toMatchObject({
      message: 'Nome obrigatorio',
    });
  });

  it('Deve retornar o BadRequest do email', () => {
    const mockRequest = {
      body: {
        name: 'jonatas',
      },
    } as Request;

    const mockResponse = makeMockResponse();

    userController.createUser(mockRequest, mockResponse);

    expect(mockResponse.state.status).toBe(400);
    expect(mockResponse.state.json).toMatchObject({
      message: 'Email obrigatorio',
    });
  });

  it('Deve adicionar um novo usuario', () => {
    const mockRequest = {
      body: {
        name: 'Jonatas',
        email: 'jonatas@gmail.com',
      },
    } as Request;
    const mockResponse = makeMockResponse();
    userController.createUser(mockRequest, mockResponse);

    expect(mockResponse.state.status).toBe(201);

    expect(mockResponse.state.json).toMatchObject({ message: 'User created' });
  });

  it('Deve retornar todos os usuarios', () => {
    const mockRequest = {} as Request;
    const mockResponse = makeMockResponse();

    userController.getAllUser(mockRequest, mockResponse);

    expect(mockResponse.state.status).toBe(200);
    expect(mockResponse.state.json).toMatchObject(
      mockUserService.db as Array<IUser>
    );
  });

  it('Deve deletar o usuario', () => {
    const mockRequest = {
      params: {
        id: 'Jonatas',
      },
    } as unknown as Request;

    const mockResponse = makeMockResponse();
    userController.deleteUser(mockRequest, mockResponse);

    expect(mockResponse.state.status).toBe(200);
    expect(mockResponse.state.json).toMatchObject({
      message: 'Usuario deletado',
    });
  });
});
