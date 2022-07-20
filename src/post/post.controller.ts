import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import IsAuthenticatedGuard from '../auth/guard/IsAuthenticated.guard';
import AddPostDto from './dto/AddPost.dto';
import PostService from './post.service';
import { Request } from 'express';
import IsConfirmedGuard from '../auth/guard/IsConfirmed.guard';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Post as PostType } from '@prisma/client';
@ApiTags('Post')
@Controller('post')
@UseGuards(IsAuthenticatedGuard, IsConfirmedGuard)
export default class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  addPost(@Body() body: AddPostDto, @Req() req: Request) {
    return this.postService.addPost(body, req.user.id);
  }

  /**
   * A method that fetches all posts
   */
  @ApiOkResponse({ description: 'The list of posts', isArray: true })
  @Get()
  findAllPosts() {
    return this.postService.findAllPosts();
  }
  /**
   * A method that fetches a post by id
   */
  @ApiOkResponse({ description: 'find a post by id' })
  @Get(':id')
  findPostById(@Param('id') id: string): Promise<PostType> {
    return this.postService.findPostById(id);
  }
}
