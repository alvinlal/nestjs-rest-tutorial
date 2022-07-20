import { faker } from '@faker-js/faker';

export const postStub = (authorId?) => {
  return {
    title: faker.lorem.sentence(),
    post: faker.lorem.sentences(10),
    authorId,
  };
};
