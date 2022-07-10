import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from '@redis/client';
import {
  registerDecorator,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationOptions,
} from 'class-validator';
import { confirmUserPrefix } from '../auth/auth.constants';
import { REDIS } from '../redis/redis.constants';

@ValidatorConstraint({ name: 'IsConfirmTokenValid', async: true })
@Injectable()
export class IsConfirmTokenValidConstraint
  implements ValidatorConstraintInterface
{
  constructor(@Inject(REDIS) private readonly redis: RedisClientType) {}
  async validate(token: string): Promise<boolean> {
    return !!(await this.redis.v4.get(confirmUserPrefix + token));
  }
}

export function IsConfirmTokenValid(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsConfirmTokenValidConstraint,
    });
  };
}
