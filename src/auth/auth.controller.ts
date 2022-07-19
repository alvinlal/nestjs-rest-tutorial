import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import AuthService from './auth.service';
import { SignupDto } from './dto';
import ConfirmUserDto from './dto/ConfirmUser.dto';
import LocalAuthGuard from './guard/LocalAuth.guard';
import { Request } from 'express';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import LoginDto from './dto/Login.dto';

@ApiTags('Auth')
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

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ApiBody({ type: LoginDto })
  async login(@Req() req: Request) {
    return req.user;
  }

  @Post('/logout')
  async logout(@Req() req: Request) {
    const logoutPromise = new Promise((resolve, reject) => {
      req.logout((err) => {
        if (err) {
          console.error(err);
          return reject({ success: false });
        }
        return resolve({ success: true });
      });
    });
    return await logoutPromise;
  }
}
