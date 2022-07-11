import { faker } from '@faker-js/faker';
import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { REDIS } from '../redis/redis.constants';
import mockConfigService from '../test-utils/mocks/services/mockConfigService';
import mockRedisService from '../test-utils/mocks/services/mockRedisService';
import mockUserService from '../test-utils/mocks/services/mockUserService';
import mockUtilService from '../test-utils/mocks/services/mockUtilService';
import { UserService } from '../user/user.service';
import UtilService from '../utils/utils.service';
import AuthService from './auth.service';
import { SignupDto } from './dto';

describe('AuthService', () => {
  let authService: AuthService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,

        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: UtilService,
          useValue: mockUtilService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
        {
          provide: REDIS,
          useValue: mockRedisService,
        },
      ],
    }).compile();
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('should signup a user and return the user', async () => {
    const signupDto: SignupDto = {
      email: faker.internet.email(),
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      password: faker.internet.password(),
    };
    expect(await authService.signup(signupDto)).toEqual({
      id: expect.any(String),
      firstname: signupDto.firstname,
      lastname: signupDto.lastname,
    });
  });

  it('should validate a user', async () => {
    expect(
      await authService.validateUser(faker.internet.email(), 'test'),
    ).toEqual({
      id: expect.any(String),
      firstname: expect.any(String),
      lastname: expect.any(String),
    });
  });
});
