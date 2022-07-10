import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { IsConfirmTokenValidConstraint } from 'src/validators/IsConfirmTokenValid.validator';
import { UserModule } from '../user/user.module';
import { IsUserExistsConstraint } from '../validators/isUserExists.validator';
import AuthController from './auth.controller';
import AuthService from './auth.service';
import SessionSerializer from './session.serializer';
import LocalStrategy from './strategy/local.strategy';

@Module({
  imports: [UserModule, PassportModule.register({ session: true })],
  providers: [
    AuthService,
    IsUserExistsConstraint,
    IsConfirmTokenValidConstraint,
    LocalStrategy,
    SessionSerializer,
  ],
  controllers: [AuthController],
})
export default class AuthModule {}
