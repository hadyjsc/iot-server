import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { SecurityService } from 'src/commons/helpers/security.service';
import { UsersService } from 'src/users/services/users.service';
import { UserRepository } from 'src/users/repositories/user.repository';
import { Mailer } from 'src/commons/helpers/mailer.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AccessTokenStrategy } from './strategy/access-token.strategy';
import { RefreshTokenStrategy } from './strategy/refresh-token.strategy';
import { AuthRepository } from './repositories/auth.repository';
import { PassportModule } from '@nestjs/passport';
import { PermissionsService } from 'src/permissions/services/permissions.service';
import { PermissionRepository } from 'src/permissions/repositories/permission.repository';

@Module({
  imports:[
    PassportModule,
    JwtModule.register({})
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
    SecurityService, 
    UsersService, 
    UserRepository, 
    Mailer, 
    JwtService, 
    AccessTokenStrategy,
    RefreshTokenStrategy,
    AuthRepository,
    PermissionsService,
    PermissionRepository
  ]
})
export class AuthModule { }
