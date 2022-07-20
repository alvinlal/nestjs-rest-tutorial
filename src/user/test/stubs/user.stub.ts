import { faker } from '@faker-js/faker';
import { Prisma } from '@prisma/client';

export const userStub = (): Prisma.UserCreateInput => {
  return {
    id: faker.datatype.uuid(),
    email: faker.internet.email(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    password: faker.internet.password(),
  };
};
