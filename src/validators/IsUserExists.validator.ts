import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationOptions,
} from 'class-validator';
import AuthService from '../auth/auth.service';

@ValidatorConstraint({ name: 'IsEmailExists', async: true })
@Injectable()
export class IsUserExistsConstraint implements ValidatorConstraintInterface {
  constructor(protected readonly authService: AuthService) {}
  async validate(email: string): Promise<boolean> {
    return !(await this.authService.userExists(email));
  }
}

export function IsUserExists(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserExistsConstraint,
    });
  };
}
