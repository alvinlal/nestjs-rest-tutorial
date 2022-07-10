import { faker } from '@faker-js/faker';
import { Test } from '@nestjs/testing';
import mockPostService from '../test-utils/mocks/services/mockPostService';
import AddPostDto from './dto/AddPost.dto';
import PostController from './post.controller';
import PostService from './post.service';

describe('PostController', () => {
  let postController: PostController;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [PostController],
      providers: [
        {
          provide: PostService,
          useValue: mockPostService,
        },
      ],
    }).compile();
    postController = module.get<PostController>(PostController);
  });

  it('should be defined', () => {
    expect(postController).toBeDefined();
  });

  it('should add a post', () => {
    const postDto: AddPostDto = {
      title: faker.lorem.sentence(),
      post: faker.lorem.sentences(10),
    };
    expect(
      postController.addPost(postDto, { userId: faker.datatype.uuid() }),
    ).toEqual({
      id: expect.any(String),
      success: true,
    });
  });
});
