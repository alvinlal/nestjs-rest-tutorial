import { IsNotEmpty } from 'class-validator';

export default class AddPostDto {
  @IsNotEmpty({ message: 'title cannot be empty' })
  title: string;

  @IsNotEmpty({ message: 'Post cannot be empty' })
  post: string;
}
