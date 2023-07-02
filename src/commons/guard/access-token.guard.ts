import { ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UsersService } from 'src/users/services/users.service';

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
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET
      })

      const user = await this.userService.findByUUID(payload.uuid)
      if (!user) {
        throw new ForbiddenException()
      }

      payload.primary = user.id
      
      request.user = payload;
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
