import { faker } from '@faker-js/faker';
import { Request } from 'express';

const mockRequest = {
  logout: jest.fn((callback) => {
    callback();
  }),
  user: {
    id: faker.datatype.uuid(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
  },
} as unknown as Request;

export default mockRequest;
