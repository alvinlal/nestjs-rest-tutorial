import { Transform, TransformFnParams } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength, NotContains } from 'class-validator';
import { IsUserExists } from '../../validators/isUserExists.validator';

export class SignupDto {
  @IsEmail({}, { message: 'please enter a valid email' })
  @IsUserExists({ message: 'Account already exists, please login' })
  email: string;

  @MinLength(6, { message: 'password should be atleast 6 characters' })
  @NotContains(' ', {
    message: 'password should contain only letter,symbols and numbers',
  })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  password: string;

  @IsNotEmpty({ message: 'Please enter your first name' })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  firstname: string;

  @IsNotEmpty({ message: 'Please enter your last name.' })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  lastname: string;
}
