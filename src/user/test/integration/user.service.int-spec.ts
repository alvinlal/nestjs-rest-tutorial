import { faker } from '@faker-js/faker';
import { Test } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { AppModule } from '../../../app.module';
import { PrismaService } from '../../../prisma/prisma.service';
import { UserService } from '../../user.service';

describe('UserService integration tests', () => {
  let prisma: PrismaService;
  let userService: UserService;
  let user: Prisma.UserCreateInput;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    prisma = module.get<PrismaService>(PrismaService);
    userService = module.get<UserService>(UserService);
    await prisma.cleanDatabase();
  });

  // TODO:- describe method names in unit tests also
  describe('createUser()', () => {
    it('should create user', async () => {
      user = {
        email: faker.internet.email(),
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        password: faker.internet.password(),
      };
      expect(await userService.createUser(user)).toEqual({
        id: expect.any(String),
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        password: user.password,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        confirmed: false,
      });
    });
  });

  describe('findByEmail()', () => {
    it('should return a user by email', async () => {
      expect(await userService.findByEmail(user.email)).toEqual({
        id: expect.any(String),
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        password: user.password,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        confirmed: false,
      });
    });
  });
});
