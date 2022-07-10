import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { IsConfirmTokenValidConstraint } from 'src/validators/IsConfirmTokenValid.validator';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { IsUserExistsConstraint } from '../validators/isUserExists.validator';
import AuthController from './auth.controller';
import AuthService from './auth.service';
import LocalStrategy from './strategy/local.strategy';

@Module({
  imports: [UserModule, PassportModule],
  providers: [
    UserService,
    AuthService,
    IsUserExistsConstraint,
    IsConfirmTokenValidConstraint,
    LocalStrategy,
  ],
  controllers: [AuthController],
})
export default class AuthModule {}
