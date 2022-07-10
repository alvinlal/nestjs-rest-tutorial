import { faker } from '@faker-js/faker';
import { SignupDto } from '../../../auth/dto';

const mockAuthService = {
  signup: jest.fn((dto: SignupDto) => {
    return {
      id: faker.datatype.uuid(),
      firstname: dto.firstname,
      lastname: dto.lastname,
    };
  }),
  login: jest.fn(() =>
    Promise.resolve({
      id: faker.datatype.uuid(),
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
    }),
  ),
  confirmUser: jest.fn(() => {
    return {
      success: true,
    };
  }),
};

export default mockAuthService;
