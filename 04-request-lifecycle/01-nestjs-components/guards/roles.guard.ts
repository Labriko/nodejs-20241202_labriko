import { CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";

export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const userRole = request.getHeader("x-role");

    if (userRole !== 'admin') {
      throw new ForbiddenException();
    }

    return true;
  }
}
