import { faker } from '@faker-js/faker';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
const mockUserService = {
  createUser: (user: Prisma.UserCreateInput) => {
    return {
      id: faker.datatype.uuid(),
      firstname: user.firstname,
      lastname: user.lastname,
    };
  },
  findByEmail: async (email: string): Promise<User> => {
    return {
      id: faker.datatype.uuid(),
      email,
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      createdAt: new Date(),
      updatedAt: new Date(),
      password: await bcrypt.hash('test', 10),
      confirmed: false,
    };
  },
};

export default mockUserService;
