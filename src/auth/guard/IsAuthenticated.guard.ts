import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable({})
export default class IsAuthenticatedGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    return request.isAuthenticated();
  }
}
