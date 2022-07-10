import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationOptions,
} from 'class-validator';
import { UserService } from '../user/user.service';

@ValidatorConstraint({ name: 'IsEmailExists', async: true })
@Injectable()
export class IsUserExistsConstraint implements ValidatorConstraintInterface {
  constructor(protected readonly userService: UserService) {}
  async validate(email: string): Promise<boolean> {
    return !(await this.userService.userExists(email));
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
