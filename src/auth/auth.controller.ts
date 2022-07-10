import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import AuthService from './auth.service';
import { SignupDto } from './dto';
import ConfirmUserDto from './dto/ConfirmUser.dto';
import LocalAuthGuard from './guard/LocalAuth.guard';
import { Request } from 'express';
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
  async login(@Req() req: Request) {
    return req.user;
  }

  @Get('/logout')
  async logout() {
    return '';
  }
}
