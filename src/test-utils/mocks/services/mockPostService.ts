import { faker } from '@faker-js/faker';

const mockPostService = {
  addPost: jest.fn(() => {
    return {
      id: faker.datatype.uuid(),
      success: true,
    };
  }),
};

export default mockPostService;
