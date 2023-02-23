import { Request } from 'express';
import { makeMockResponse } from '../__mocks__/mockResponse.mock';
import { UserController } from './UserController';

const mockUserService = {
  createUser: jest.fn(),
};

jest.mock('../service/UserService', () => {
  return {
    UserService: jest.fn().mockImplementation(() => {
      return mockUserService;
    }),
  };
});

describe('UserController', () => {
  const userController = new UserController();

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
      message: 'Todos os campos são obrigatorio',
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
      message: 'Todos os campos são obrigatorio',
    });
  });

  it('Deve retornar o BadRequest do password', () => {
    const mockRequest = {
      body: {
        name: 'jonatas',
        email: 'jonatas@gmail.com',
      },
    } as Request;

    const mockResponse = makeMockResponse();

    userController.createUser(mockRequest, mockResponse);

    expect(mockResponse.state.status).toBe(400);
    expect(mockResponse.state.json).toMatchObject({
      message: 'Todos os campos são obrigatorio',
    });
  });

  it('Deve adicionar um novo usuario', () => {
    const mockRequest = {
      body: {
        name: 'Jonatas',
        email: 'jonatas@gmail.com',
        password: 'password',
      },
    } as Request;
    const mockResponse = makeMockResponse();
    userController.createUser(mockRequest, mockResponse);

    expect(mockResponse.state.status).toBe(201);

    expect(mockResponse.state.json).toMatchObject({ message: 'User created' });
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
