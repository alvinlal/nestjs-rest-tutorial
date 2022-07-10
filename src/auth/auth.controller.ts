import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
  Req,
  Res,
  Session,
} from '@nestjs/common';
import AuthService from './auth.service';
import { SignupDto } from './dto';
import ConfirmUserDto from './dto/ConfirmUser.dto';
import { Request, Response } from 'express';

@Controller('auth')
export default class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signup(@Body() body: SignupDto) {
    return this.authService.signup(body);
  }

  @Post('/confirm')
  confirmUser(@Body() body: ConfirmUserDto) {
    return this.authService.confirmUser(body);
  }

  @Post('/login')
  async login(@Req() req: Request) {
    const user = await this.authService.login(req.body);
    if (user) {
      req.session.userId = user.id;
      return {
        ...user,
      };
    }
    throw new ForbiddenException('incorrect credentials');
  }

  @Get('/logout')
  async logout(@Session() session, @Res() res: Response) {
    const logoutPromise = new Promise<{ success: boolean }>(
      (resolve, reject) => {
        session.destroy((err) => {
          if (err) {
            console.error(err);
            return reject({ success: false });
          }
          res.clearCookie('qid');
          return resolve({ success: true });
        });
      },
    );
    const { success } = await logoutPromise;
    return res.json({ success });
  }
}
