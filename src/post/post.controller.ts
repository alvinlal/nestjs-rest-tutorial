import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import IsAuthenticatedGuard from '../auth/guard/IsAuthenticated.guard';
import AddPostDto from './dto/AddPost.dto';
import PostService from './post.service';
import { Request } from 'express';
@Controller('post')
export default class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(IsAuthenticatedGuard)
  @Post()
  addPost(@Body() body: AddPostDto, @Req() req: Request) {
    return this.postService.addPost(body, req.user.id);
  }
}
