import { Body, Controller, Post, Session, UseGuards } from '@nestjs/common';
import AddPostDto from './dto/AddPost.dto';
import PostService from './post.service';

@Controller('post')
export default class PostController {
  constructor(private readonly postService: PostService) {}
  @Post()
  addPost(@Body() body: AddPostDto, @Session() session) {
    return this.postService.addPost(body, session.userId);
  }
}
