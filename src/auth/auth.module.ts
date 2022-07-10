import { Module } from '@nestjs/common';
import { IsConfirmTokenValidConstraint } from 'src/validators/IsConfirmTokenValid.validator';
import { IsUserExistsConstraint } from '../validators/isUserExists.validator';
import AuthController from './auth.controller';
import AuthService from './auth.service';

@Module({
  providers: [
    AuthService,
    IsUserExistsConstraint,
    IsConfirmTokenValidConstraint,
  ],
  controllers: [AuthController],
})
export default class AuthModule {}
