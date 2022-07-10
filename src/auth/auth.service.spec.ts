import { faker } from '@faker-js/faker';
import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { REDIS } from '../redis/redis.constants';
import mockConfigService from '../test-utils/mocks/services/mockConfigService';
import mockPrismaService from '../test-utils/mocks/services/mockPrismaService';
import mockRedisService from '../test-utils/mocks/services/mockRedisService';
import mockUtilService from '../test-utils/mocks/services/mockUtilService';
import UtilService from '../utils/utils.service';
import AuthService from './auth.service';
import { SignupDto } from './dto';
import LoginDto from './dto/Login.dto';

describe('AuthService', () => {
  let authService: AuthService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,

        {
          provide: PrismaService,
          useValue: mockPrismaService,
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

  it('should create a new user record and return the record', async () => {
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

  it('should login a user and return user details', async () => {
    const loginDto: LoginDto = {
      email: faker.internet.email(),
      password: '123456',
    };
    expect(await authService.login(loginDto)).toEqual({
      id: expect.any(String),
      firstname: expect.any(String),
      lastname: expect.any(String),
    });
  });
});
