import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import AddPostDto from './dto/AddPost.dto';

@Injectable()
export default class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async addPost(data: AddPostDto, userId) {
    const post = { ...data, authorId: userId };
    const { id } = await this.prisma.post.create({
      data: post,
      select: { id: true },
    });
    return {
      id,
      success: true,
    };
  }

  async findAllPosts() {
    return await this.prisma.post.findMany();
  }

  async findPostById(id: string) {
    return await this.prisma.post.findUnique({ where: { id } });
  }
}
