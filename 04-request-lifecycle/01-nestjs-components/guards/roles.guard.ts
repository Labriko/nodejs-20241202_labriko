import { CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";

export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const userRole = request.get("x-role");

    if (userRole !== 'admin') {
      throw new ForbiddenException('Доступ запрещён: требуется роль admin');
    }

    return true;
  }
}
