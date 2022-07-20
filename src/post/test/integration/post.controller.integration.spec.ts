import { Test } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { PrismaService } from '../../../prisma/prisma.service';
import * as request from 'supertest';
import { postStub } from '../stubs/post.stub';
import { userStub } from '../../../user/test/stubs/user.stub';
import { INestApplication } from '@nestjs/common';

describe('PostController', () => {
  let prisma: PrismaService;
  let app: INestApplication;
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    prisma = module.get<PrismaService>(PrismaService);
    await prisma.cleanDatabase();
  });

  afterAll(async () => {
    await prisma.cleanDatabase();
    await app.close();
  });

  describe('findAllPosts()', () => {
    it('should not allow unauthenticated users', async () => {
      const response = await request(app.getHttpServer()).get('/post');
      expect(response.status).toBe(403);
      expect(response.body).toEqual({
        error: 'Forbidden',
        message: 'Forbidden resource',
        statusCode: 403,
      });
    });
  });
});
