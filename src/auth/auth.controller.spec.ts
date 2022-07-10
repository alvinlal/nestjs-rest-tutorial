import { Test } from '@nestjs/testing';
import { Request, Response } from 'express';
import AuthController from './auth.controller';
import AuthService from './auth.service';
import { SignupDto } from './dto';
import ConfirmUserDto from './dto/ConfirmUser.dto';
import { faker } from '@faker-js/faker';
import mockAuthService from '../test-utils/mocks/services/mockAuthService';

describe('AuthController', () => {
  let authController: AuthController;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile();
    authController = module.get<AuthController>(AuthController);
  });

  it('should be defined ', () => {
    expect(authController).toBeDefined();
  });

  it('should signup a user', () => {
    const signupDto: SignupDto = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
    };
    expect(authController.signup(signupDto)).toEqual({
      id: expect.any(String),
      firstname: expect.any(String),
      lastname: expect.any(String),
    });
  });

  it('should login a user', async () => {
    const req = {
      body: {
        email: faker.internet.email(),
        password: faker.internet.password(),
      },
      session: {},
    } as Request;
    expect(await authController.login(req)).toEqual({
      id: expect.any(String),
      firstname: expect.any(String),
      lastname: expect.any(String),
    });
    expect(req.session.userId).toBeDefined;
  });

  it('should confirm a user', () => {
    const confirmUserDto: ConfirmUserDto = {
      token: faker.datatype.uuid(),
    };

    expect(authController.confirmUser(confirmUserDto)).toEqual({
      success: true,
    });
  });

  it('should logout a user', async () => {
    const session = {
      userId: faker.datatype.uuid(),
      destroy: jest.fn((callback) => {
        callback();
      }),
    };
    const res = {
      clearCookie: jest.fn(),
      json: jest.fn((data) => data),
    } as unknown as Response;
    expect(await authController.logout(session, res)).toEqual({
      success: true,
    });
    expect(session.destroy).toBeCalledTimes(1);
    expect(res.clearCookie).toBeCalledTimes(1);
  });
});
