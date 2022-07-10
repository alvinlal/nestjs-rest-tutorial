import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';
const mockPrismaService = {
  user: {
    create: jest.fn(({ data }) => {
      return {
        id: faker.datatype.uuid(),
        firstname: data.firstname,
        lastname: data.lastname,
      };
    }),
    findFirst: jest.fn(async () => {
      return {
        id: faker.datatype.uuid(),
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        password: await bcrypt.hash('123456', 10),
      };
    }),
  },
  post: {
    create: jest.fn(() =>
      Promise.resolve({
        id: faker.datatype.uuid(),
      }),
    ),
  },
};

export default mockPrismaService;
