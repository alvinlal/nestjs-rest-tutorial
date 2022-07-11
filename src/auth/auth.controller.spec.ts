import { Test } from '@nestjs/testing';
import AuthController from './auth.controller';
import AuthService from './auth.service';
import mockAuthService from '../test-utils/mocks/services/mockAuthService';
import { faker } from '@faker-js/faker';
import { SignupDto } from './dto';
import ConfirmUserDto from './dto/ConfirmUser.dto';
import mockRequest from '../test-utils/mocks/express/mockRequest';

describe('AuthController', () => {
  let authController: AuthController;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();
    authController = module.get<AuthController>(AuthController);
  });

  it('should be defined ', () => {
    expect(authController).toBeDefined();
  });

  it('should signup an user', () => {
    const signupDto: SignupDto = {
      email: faker.internet.email(),
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      password: faker.internet.password(),
    };
    expect(authController.signup(signupDto)).toEqual({
      id: expect.any(String),
      firstname: signupDto.firstname,
      lastname: signupDto.lastname,
    });
  });

  it('should confirm a user', () => {
    const confirmUserDto: ConfirmUserDto = {
      token: faker.datatype.uuid(),
    };
    expect(authController.confirmUser(confirmUserDto)).toEqual({
      success: true,
    });
  });

  it('should login a user', async () => {
    expect(await authController.login(mockRequest)).toEqual({
      id: expect.any(String),
      firstname: expect.any(String),
      lastname: expect.any(String),
    });
  });

  it('should logout a user', async () => {
    expect(await authController.logout(mockRequest)).toEqual({
      success: true,
    });
    expect(mockRequest.logout).toBeCalledTimes(1);
  });
});
