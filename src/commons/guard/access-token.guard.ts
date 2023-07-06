import { ExecutionContext, ForbiddenException, HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UsersService } from 'src/users/services/users.service';
import { UserStatusToString } from '../enum';

@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt')  {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly userService: UsersService) {
    super()
  }

  async canActivate(context: ExecutionContext):  Promise<boolean>{
    const isPublic = this.reflector.getAllAndOverride('isPublic', [
      context.getHandler(),
      context.getClass()
    ])
    
    if (isPublic) return true
    
    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)
    if (!token) {
      throw new UnauthorizedException('Access denied, invalid token.');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET
      })

      const user = await this.userService.findByUUID(payload.uuid)
      if (!user) {
        throw new ForbiddenException('Access denied, invalid user')
      }

      if (user.status != 1){
        throw new ForbiddenException(`User status is ${UserStatusToString(user.status)}`)
      }

      const xPermissionName = this.extractXHeader(request, "X-User-Permission")
      if (!xPermissionName) {
        throw new ForbiddenException(`X-User-Permission is empty`)
      }

      const hasPermission = await this.userService.userPermissionIsExist({permission: xPermissionName, user_id: user.id})
      if (!hasPermission) {
        throw new ForbiddenException(`No permission to access this action`)
      }

      if (!payload.role || payload.role == undefined) {
        throw new ForbiddenException('Access denied by user role.')
      }

      payload.primary = user.id
      request.user = payload;
    } catch (error) {
      throw new HttpException(error.message, error.status, { cause: error})
    }

    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private extractXHeader(request: Request, key: string): string | undefined {
    const value = request.headers[key.toLocaleLowerCase()];
    if (value) {
      return value.toString()
    }
    return undefined
  }
}
