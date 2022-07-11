import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable({})
export default class IsConfirmedGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    return request.user.confirmed;
  }
}
