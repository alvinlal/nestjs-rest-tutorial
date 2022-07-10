import { faker } from '@faker-js/faker';
import { Test } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import mockPrismaService from '../test-utils/mocks/services/mockPrismaService';
import AddPostDto from './dto/AddPost.dto';
import PostService from './post.service';

describe('PostService', () => {
  let postService: PostService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        PostService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();
    postService = module.get<PostService>(PostService);
  });

  it('should be defined', () => {
    expect(postService).toBeDefined();
  });

  it('should create a new post record and return the record id', async () => {
    const addPostDto: AddPostDto = {
      title: faker.lorem.sentence(),
      post: faker.lorem.sentences(),
    };
    expect(
      await postService.addPost(addPostDto, faker.datatype.uuid()),
    ).toEqual({
      id: expect.any(String),
      success: true,
    });
  });
});
